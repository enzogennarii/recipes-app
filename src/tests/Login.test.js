import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';
import UserProvider from '../context/UserProvider';
import RecipeProvider from '../context/RecipeProvider';

describe('Testes da página de Login', () => {
  const EMAIL_ID = 'email-input';
  const PASSWORD_ID = 'password-input';
  const BTN_LOGIN_ID = 'login-submit-btn';

  it('Testa se os elementos são renderizados corretamente na tela', () => {
    renderWithRouter(
      <UserProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserProvider>,
    );

    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const btnLogin = screen.getByTestId(BTN_LOGIN_ID);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
  });

  it('Testa se o botão de login só está ativado quando o formulário é preenchido corretamente', () => {
    renderWithRouter(
      <UserProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserProvider>,
    );

    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const btnLogin = screen.getByTestId(BTN_LOGIN_ID);

    expect(btnLogin).toBeDisabled();
    userEvent.type(emailInput, 'email.invalido');
    expect(btnLogin).toBeDisabled();
    userEvent.type(passwordInput, '123456');
    expect(btnLogin).toBeDisabled();
    userEvent.clear(passwordInput);
    userEvent.type(passwordInput, '1234567');
    expect(btnLogin).toBeDisabled();
    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'email.valido@teste.com');
    expect(btnLogin).not.toBeDisabled();
  });

  it('Testa se ao submeter o formulário corretamente, é redirecionado para a página de receitas', () => {
    const { history } = renderWithRouter(
      <UserProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserProvider>,
    );

    const emailInput = screen.getByTestId(EMAIL_ID);
    const passwordInput = screen.getByTestId(PASSWORD_ID);
    const btnLogin = screen.getByTestId(BTN_LOGIN_ID);

    userEvent.type(emailInput, 'email.valido@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(btnLogin);

    expect(history.location.pathname).toBe('/meals');
  });
});
