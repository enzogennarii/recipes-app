import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';

import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';
import mealsRecipesMocks from './helpers/mocks/mealsRecipes';
import drinksRecipesMocks from './helpers/mocks/drinksRecipes';
import corbaMock from './helpers/mocks/corbaMock';
import ggMock from './helpers/mocks/ggMock';

jest.mock('clipboard-copy');

describe('Testes do componente RecipeInProgress', () => {
  afterEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  it('Teste path else', () => {
    renderWithRouter(
      <App />,
      { initialEntries: ['/meals/52977/in-progress'] },
    );
  });
  it('Teste da página da refeição Corba', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mealsRecipesMocks,
    }));

    const { history } = renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    );
    await waitFor(() => {
      const corba = screen.getByRole('heading', { name: /corba/i });
      userEvent.click(corba);
    });
    jest.clearAllMocks();

    const mockResponse = (value) => ({ json: async () => value });
    const mockFetch = jest.fn()
      .mockReturnValueOnce(mockResponse(drinksRecipesMocks))
      .mockReturnValueOnce(mockResponse(corbaMock));
    global.fetch = mockFetch;

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /start recipe/i }));
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => userEvent.click(checkbox));
      userEvent.click(screen.getByRole('button', { name: /finish recipe/i }));
      expect(history.location.pathname).toBe('/done-recipes');
    });
  });

  it('Teste da página do drink GG', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => drinksRecipesMocks,
    }));

    const { history } = renderWithRouter(
      <App />,
      { initialEntries: ['/drinks'] },
    );
    await waitFor(() => {
      const gg = screen.getByRole('heading', { name: /gg/i });
      userEvent.click(gg);
    });
    jest.clearAllMocks();

    const mockResponse = (value) => ({ json: async () => value });
    const mockFetch = jest.fn()
      .mockReturnValueOnce(mockResponse(mealsRecipesMocks))
      .mockReturnValueOnce(mockResponse(ggMock));
    global.fetch = mockFetch;
    copy.mockImplementation(() => true);
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /start recipe/i }));
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((checkbox) => userEvent.click(checkbox));
      userEvent.click(screen.getByRole('button', { name: /finish recipe/i }));
      expect(history.location.pathname).toBe('/done-recipes');
    });
  });
});
