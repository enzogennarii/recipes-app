import PropTypes from 'prop-types';
import React from 'react';

function MealCard({ recipe, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h2 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h2>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

MealCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};

export default MealCard;
