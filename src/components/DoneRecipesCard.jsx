import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard({ recipes }) {
  const [isSharedRecipe, setIsSharedRecipe] = useState(false);

  const handleShareRecipe = (type, id) => {
    const path = `http://localhost:3000/${type}s/${id}`;
    copy(path);
    setIsSharedRecipe(true);
  };
  return (
    <div>
      { recipes.map((recipe, index) => (
        <div key={ index }>
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
            data-testid={ `${index}-image-link` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              className="recipe-img"
            />
          </Link>
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.type === 'meal' ? (
              <div>
                { `${recipe.nationality} - ${recipe.category}` }
              </div>
            ) : (
              <div>
                { recipe.alcoholicOrNot }
              </div>
            ) }
          </h3>
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
            data-testid={ `${index}-name-link` }
          >
            <h3
              data-testid={ `${index}-horizontal-name` }
            >
              { recipe.name }
            </h3>
          </Link>
          <h3
            data-testid={ `${index}-horizontal-done-date` }
          >
            { recipe.doneDate }
          </h3>
          <button
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleShareRecipe(recipe.type, recipe.id) }
          >
            Share
          </button>
          { isSharedRecipe && (
            <h3>Link copied!</h3>
          ) }
          {recipe.tags.map((tagName) => (
            <h3
              key={ tagName }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              { tagName }
            </h3>
          ))}
        </div>
      )) }
    </div>
  );
}

DoneRecipesCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default DoneRecipesCard;
