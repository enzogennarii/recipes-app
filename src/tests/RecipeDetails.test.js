import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';
import mealsRecipesMocks from './helpers/mocks/mealsRecipes';
import drinksRecipesMocks from './helpers/mocks/drinksRecipes';
import corbaMock from './helpers/mocks/corbaMock';
import ggMock from './helpers/mocks/ggMock';

describe('Testes do componente RecipeDetails', () => {
  afterEach(() => {
    jest.clearAllMocks();
    window.localStorage.clear();
  });

  it('Teste da página da refeição Corba', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mealsRecipesMocks,
    }));

    renderWithRouter(
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
      screen.getByTestId('instructions');
      screen.getByTestId('0-recommendation-title');
    });
  });

  it('Teste da página do drink GG', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => drinksRecipesMocks,
    }));

    renderWithRouter(
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
    await waitFor(() => {
      screen.getByTestId('instructions');
      screen.getByTestId('0-recommendation-title');
      userEvent.click(screen.getByRole('img', { name: /favorite/i }));
      jest.spyOn(Storage.prototype, 'setItem');
      expect(localStorage.setItem).toHaveBeenCalled();
      userEvent.click(screen.getByRole('img', { name: /favorite/i }));
      userEvent.click(screen.getByRole('button', { name: /start recipe/i }));
    });
  });
});
