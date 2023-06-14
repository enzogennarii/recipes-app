import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({
  index,
  recipe: {
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  },
}) {
  const RECIPE_PATH = `/${type}s/${id}`;

  const [isSharedRecipe, setIsSharedRecipe] = useState(false);

  const handleShareRecipe = () => {
    const path = `http://localhost:3000${RECIPE_PATH}`;
    copy(path);
    setIsSharedRecipe(true);
  };

  return (
    <div>
      <hr />
      <Link
        to={ RECIPE_PATH }
        data-testid={ `${index}-name-link` }
      >
        <h3
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </h3>
      </Link>

      <button
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleShareRecipe }
      >
        <img src={ shareIcon } alt="Share" />
      </button>

      { isSharedRecipe && (
        <p><small>Link copied!</small></p>
      ) }

      <Link
        to={ RECIPE_PATH }
        data-testid={ `${index}-image-link` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
          className="recipe-img"
        />
      </Link>

      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { type === 'meal' ? `${nationality} - ${category}` : alcoholicOrNot }
      </p>
      {tags.length > 0 && <h3>Ingredients:</h3>}
      {tags.map((tagName) => (
        <p
          key={ tagName }
          data-testid={ `${index}-${tagName}-horizontal-tag` }
        >
          { tagName }
        </p>
      ))}

      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        {`Done date: ${doneDate} `}
      </p>
      <hr />
    </div>
  );
}

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    doneDate: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
  }).isRequired,
};

export default DoneRecipeCard;
