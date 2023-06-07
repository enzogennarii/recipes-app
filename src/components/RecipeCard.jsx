/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe = {}, index = 0 }) {
  const [nameRecipe, setNameRecipe] = useState('');
  const [imageRecipe, setImageRecipe] = useState('');
  const [path, setPath] = useState('');

  useEffect(() => {
    if (recipe.idMeal) {
      setNameRecipe(recipe.strMeal);
      setImageRecipe(recipe.strMealThumb);
      setPath(`/meals/${recipe.idMeal}`);
    }

    if (recipe.idDrink) {
      setNameRecipe(recipe.strDrink);
      setImageRecipe(recipe.strDrinkThumb);
      setPath(`/drinks/${recipe.idDrink}`);
    }
  }, []);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link to={ path }>
        <h2 data-testid={ `${index}-card-name` }>{nameRecipe}</h2>
        <img
          src={ imageRecipe }
          alt={ nameRecipe }
          className="recipe-img"
          data-testid={ `${index}-card-img` }
        />
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({}),
};

export default RecipeCard;
