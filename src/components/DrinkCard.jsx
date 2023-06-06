import PropTypes from 'prop-types';
import React from 'react';

function DrinkCard({ recipe, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h2 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h2>
      <img
        src={ recipe.strDrinkThumb }
        alt={ recipe.strDrink }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

DrinkCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

export default DrinkCard;
