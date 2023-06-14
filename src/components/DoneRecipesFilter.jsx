import React from 'react';
import PropTypes from 'prop-types';

function DoneRecipesFilter({ setFilteredRecipes, doneRecipes }) {
  const handleFilter = ({ target }) => {
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
        onClick={ handleFilter }
        value="Meals"
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ handleFilter }
        value="Drinks"
      >
        Drinks
      </button>
      <button
        data-testid="filter-by-all-btn"
        onClick={ handleFilter }
      >
        All
      </button>
    </div>
  );
}

DoneRecipesFilter.propTypes = {
  doneRecipes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setFilteredRecipes: PropTypes.func.isRequired,
};

export default DoneRecipesFilter;
