import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';

describe('Testes do componente Header', () => {
  it('Verifica se o header está presente na página Meals', () => {
    renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    );

    const profileIcon = screen.getByRole('img', {
      name: /perfil/i,
    });

    expect(profileIcon).toBeInTheDocument();
  });

  it('Verifica se, ao clicar no ícone de busca, é exibido um input', () => {
    renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    );

    const searchIcon = screen.getByRole('img', {
      name: /procurar/i,
    });

    userEvent.click(searchIcon);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
});
