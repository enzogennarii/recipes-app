import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testes do componente DoneRecipes', () => {
  const INITIAL_ENTRIES = '/done-recipes';
  const SECOND_NAME = '1-horizontal-name';

  it('renders DoneRecipes page', () => {
    renderWithRouter(
      <App />,
      { initialEntries: [INITIAL_ENTRIES] },
    );

    expect(screen.findByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.findByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.findByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.findByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.findByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.findByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.findByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.findByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.findByTestId(SECOND_NAME)).toBeInTheDocument();
    expect(screen.findByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.findByTestId('1-horizontal-done-date')).toBeInTheDocument();
    expect(screen.findByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.findByTestId('1-horizontal-share-btn')).toBeInTheDocument();
  });

  it('filters meals recipes correctly', () => {
    renderWithRouter(
      <App />,
      { initialEntries: [INITIAL_ENTRIES] },
    );

    const mealFilterBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkRecipe = screen.getByTestId('1-horizontal-name');
    userEvent.click(mealFilterBtn);
    expect(drinkRecipe).not.toBeInTheDocument();
  });

  it('filters drinks recipes correctly', () => {
    renderWithRouter(
      <App />,
      { initialEntries: [INITIAL_ENTRIES] },
    );

    const drinkFilterBtn = screen.getByTestId('filter-by-drink-btn');
    const mealRecipe = screen.getByTestId(SECOND_NAME);
    userEvent.click(drinkFilterBtn);
    expect(mealRecipe).not.toBeInTheDocument();
  });

  it('renders recipe links', () => {
    renderWithRouter(
      <App />,
      { initialEntries: [INITIAL_ENTRIES] },
    );

    const nameLinkOne = screen.getByTestId('0-name-link');
    const nameLinkTwo = screen.getByTestId('1-name-link');
    const imageLinkOne = screen.getByTestId('0-image-link');
    const imageLinkTwo = screen.getByTestId('1-image-link');
    const expectedRouteOne = '/meals/52771';
    const expectedRouteTwo = '/drinks/178319';

    expect(nameLinkOne).toHaveAttribute('href', expectedRouteOne);
    expect(nameLinkTwo).toHaveAttribute('href', expectedRouteTwo);
    expect(imageLinkOne).toHaveAttribute('href', expectedRouteOne);
    expect(imageLinkTwo).toHaveAttribute('href', expectedRouteTwo);
  });
});
