/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function RecipeCard({ recipe = {}, index = 0 }) {
  const [nameRecipe, setNameRecipe] = useState('');
  const [imageRecipe, setImageRecipe] = useState('');

  useEffect(() => {
    if (recipe.idMeal) {
      setNameRecipe(recipe.strMeal);
      setImageRecipe(recipe.strMealThumb);
    }

    if (recipe.idDrink) {
      setNameRecipe(recipe.strDrink);
      setImageRecipe(recipe.strDrinkThumb);
    }
  }, []);

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h2 data-testid={ `${index}-card-name` }>{nameRecipe}</h2>
      <img
        src={ imageRecipe }
        alt={ nameRecipe }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({}),
};

export default RecipeCard;
