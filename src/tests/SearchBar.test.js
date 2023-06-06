import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './helpers/renderWithRouter';
import UserProvider from '../context/UserProvider';
import RecipeProvider from '../context/RecipeProvider';

import App from '../App';

describe('Testes do componente SearchBar', () => {
  const SEARCH_INPUT = 'search-input';

  it('Verifica se é possível realizar uma busca por ingrediente', () => {
    renderWithRouter(
      <UserProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserProvider>,
      { initialEntries: ['/meals'] },
    );

    const searchIcon = screen.getByRole('img', {
      name: /procurar/i,
    });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadio = screen.getByText(/ingredient/i);
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });

    userEvent.type(searchInput, 'Banana');
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);
  });
  it('Verifica se é possível realizar uma busca por nome', () => {
    renderWithRouter(
      <UserProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserProvider>,
      { initialEntries: ['/meals'] },
    );

    const searchIcon = screen.getByRole('img', {
      name: /procurar/i,
    });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const nameRadio = screen.getByText(/name/i);
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });

    userEvent.type(searchInput, 'Banana');
    userEvent.click(nameRadio);
    userEvent.click(searchBtn);
  });
  it('Verifica se é possível realizar uma busca por primeira letra', () => {
    renderWithRouter(
      <UserProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserProvider>,
      { initialEntries: ['/meals'] },
    );

    const searchIcon = screen.getByRole('img', {
      name: /procurar/i,
    });
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const firstLetterRadio = screen.getByText(/first letter/i);
    const searchBtn = screen.getByRole('button', {
      name: /pesquisar/i,
    });

    userEvent.type(searchInput, 'Banana');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchBtn);
  });
});
