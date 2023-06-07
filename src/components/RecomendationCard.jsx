import PropTypes from 'prop-types';
import React from 'react';

function RecomendationCard({ recomendation, index }) {
  let title = '';
  let imgUrl = '';
  if (recomendation.strDrink) {
    title = recomendation.strDrink;
    imgUrl = recomendation.strDrinkThumb;
  } else {
    title = recomendation.strMeal;
    imgUrl = recomendation.strMealThumb;
  }
  return (
    <div
      className="recomendation-container"
      data-testid={ `${index}-recommendation-card` }
    >
      <h4 data-testid={ `${index}-recommendation-title` }>{title}</h4>
      <img
        className="recomendation-img"
        src={ imgUrl }
        alt={ title }
      />
    </div>
  );
}

RecomendationCard.propTypes = {
  index: PropTypes.number.isRequired,
  recomendation: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};

export default RecomendationCard;
