import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import MealCard from './MealCard';
import DrinkCard from './DrinkCard';
import { RecipeContext } from '../context';
import FilterRecipes from './FilterRecipes';

function Recipes({ title }) {
  const { recipes } = useContext(RecipeContext);
  if (title === 'Meals') {
    return (
      <div>
        <FilterRecipes />
        {
          recipes.map((meal, i) => (
            <MealCard key={ meal.idMeal } recipe={ meal } index={ i } />
          ))
        }
      </div>
    );
  }
  if (title === 'Drinks') {
    return (
      <div>
        <FilterRecipes />
        {
          recipes.map((drink, i) => (
            <DrinkCard key={ drink.idDrink } recipe={ drink } index={ i } />
          ))
        }
      </div>
    );
  }
}

Recipes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Recipes;
