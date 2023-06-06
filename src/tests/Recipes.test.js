import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';
import { drinksCategoriesMocks, mealsCategoriesMocks } from './helpers/mocks/categories';
import mealsRecipiesMocks from './helpers/mocks/mealsRecipes';
import drinksRecipesMocks from './helpers/mocks/drinksRecipes';

describe('Testes do componente Recipes', () => {
  afterEach(() => jest.clearAllMocks());

  it('Verifica se as categorias são exibidas na página de Meals', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mealsCategoriesMocks,
    }));

    renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    );
    expect(global.fetch).toHaveBeenCalledTimes(2);
    await waitFor(() => {
      const beefCatButton = screen.getByRole('button', {
        name: /beef/i,
      });
      expect(beefCatButton).toBeInTheDocument();
    });
  });
  it('Verifica se as categorias são exibidas na página de Drinks', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => drinksCategoriesMocks,
    }));

    renderWithRouter(
      <App />,
      { initialEntries: ['/drinks'] },
    );
    await waitFor(() => {
      const ordinaryCatButton = screen.getByRole('button', {
        name: /ordinary drink/i,
      });
      expect(ordinaryCatButton).toBeInTheDocument();
    });
  });

  it('Verifica se as receitas da página de Meals são renderizadas', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mealsRecipiesMocks,
    }));
    renderWithRouter(
      <App />,
      { initialEntries: ['/meals'] },
    );
    await waitFor(() => {
      mealsRecipiesMocks.meals.forEach((_, index) => {
        const test = screen.getByTestId(`${index}-recipe-card`);
        expect(test).toBeInTheDocument();
      });
    });
  });

  it('Verifica se as receitas da página de Drinks são renderizadas', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => drinksRecipesMocks,
    }));
    renderWithRouter(
      <App />,
      { initialEntries: ['/drinks'] },
    );
    await waitFor(() => {
      mealsRecipiesMocks.meals.forEach((_, index) => {
        const test = screen.getByTestId(`${index}-recipe-card`);
        expect(test).toBeInTheDocument();
      });
    });
  });
});
