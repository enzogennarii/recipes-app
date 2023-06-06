import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';

describe('Testes da página de Login', () => {
  const EMAIL_ID = 'email-input';
  const PASSWORD_ID = 'password-input';
  const BTN_LOGIN_ID = 'login-submit-btn';
  const BTN_PROFILE_ID = 'profile-top-btn';
  const USER_EMAIL_EL_ID = 'profile-email';
  const BTN_DONE_RECIPES_ID = 'profile-done-btn';
  const BTN_FAVORITE_RECIPES_ID = 'profile-favorite-btn';
  const BTN_LOGOUT_ID = 'profile-logout-btn';

  it('Testa se os elementos são renderizados corretamente na tela', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const btnLogin = screen.getByTestId(BTN_LOGIN_ID);

    userEvent.type(emailInput, 'email.valido@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(btnLogin);

    const btnProfile = screen.getByTestId(BTN_PROFILE_ID);
    userEvent.click(btnProfile);

    const userEmailEl = screen.getByTestId(USER_EMAIL_EL_ID);
    const btnDoneRecipes = screen.getByTestId(BTN_DONE_RECIPES_ID);
    const btnFavoriteRecipes = screen.getByTestId(BTN_FAVORITE_RECIPES_ID);
    const btnLogout = screen.getByTestId(BTN_LOGOUT_ID);

    expect(userEmailEl).toBeInTheDocument();
    expect(btnDoneRecipes).toBeInTheDocument();
    expect(btnFavoriteRecipes).toBeInTheDocument();
    expect(btnLogout).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de "Done Recipes", é redirecionado para o endpoint correto', () => {
    const { history } = renderWithRouter(
      <App />,
      { initialEntries: ['/profile'] },
    );

    const btnDoneRecipes = screen.getByTestId(BTN_DONE_RECIPES_ID);
    userEvent.click(btnDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Verifica se ao clicar no botão de "Favorite Recipes", é redirecionado para o endpoint correto', () => {
    const { history } = renderWithRouter(
      <App />,
      { initialEntries: ['/profile'] },
    );

    const btnFavoriteRecipes = screen.getByTestId(BTN_FAVORITE_RECIPES_ID);
    userEvent.click(btnFavoriteRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Verifica se ao clicar no botão de "Logout", é redirecionado para o endpoint correto', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const btnLogin = screen.getByTestId(BTN_LOGIN_ID);

    userEvent.type(emailInput, 'email.valido@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(btnLogin);

    const btnProfile = screen.getByTestId(BTN_PROFILE_ID);
    userEvent.click(btnProfile);

    const btnLogout = screen.getByTestId(BTN_LOGOUT_ID);
    userEvent.click(btnLogout);

    expect(history.location.pathname).toBe('/');
  });
});
