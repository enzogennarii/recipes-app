import React from 'react';
import PropTypes from 'prop-types';

function DoneRecipesFilter({ setFilteredRecipes }) {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  const handleClickBtn = ({ target }) => {
    let filteredRecipes = [];
    if (target.value === 'Meals') {
      filteredRecipes = doneRecipes.filter(({ type }) => type === 'meal');
    } else if (target.value === 'Drinks') {
      filteredRecipes = doneRecipes.filter(({ type }) => type === 'drink');
    } else {
      filteredRecipes = doneRecipes;
    }
    setFilteredRecipes(filteredRecipes);
  };

  return (
    <div>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ handleClickBtn }
        value="Meals"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ handleClickBtn }
        value="Drinks"
      >
        Drinks
      </button>
      <button
        data-testid="filter-by-all-btn"
        onClick={ handleClickBtn }
      >
        All
      </button>
    </div>
  );
}

DoneRecipesFilter.propTypes = {
  setFilteredRecipes: PropTypes.func.isRequired,
};

export default DoneRecipesFilter;
