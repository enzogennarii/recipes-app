import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CurrRecipeContext } from '../context';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import Recomendations from '../components/Recomendations';

function RecipeDetails() {
  const history = useHistory();
  const splittedPathName = history.location.pathname.split('/');
  const recipeType = splittedPathName[1];

  const {
    recipe,
    ingredients,
    isInProgressRecipe,
    isSharedRecipe,
    isFavorite,
    handleShareRecipe,
    handleFavoriteRecipe,
  } = useContext(CurrRecipeContext);

  if (recipe) {
    let title = '';
    let imgUrl = '';
    let ytUrl = '';
    if (recipeType === 'meals') {
      const { strMealThumb, strMeal, strYoutube } = recipe;
      title = strMeal;
      imgUrl = strMealThumb;
      ytUrl = strYoutube.replace('/watch?v=', '/embed/');
    } else {
      const { strDrinkThumb, strDrink } = recipe;
      title = strDrink;
      imgUrl = strDrinkThumb;
    }
    const { strCategory, strInstructions } = recipe;

    return (
      <div>
        <h2 data-testid="recipe-title">{title}</h2>
        <p data-testid="recipe-category">
          {`${strCategory}${
            recipe.strAlcoholic ? ` - ${recipe.strAlcoholic}` : ''
          }`}

        </p>
        <button
          data-testid="share-btn"
          onClick={ handleShareRecipe }
        >
          <img src={ shareIcon } alt="Share" />
        </button>
        {isSharedRecipe && <p>Link copied!</p>}
        <button
          data-testid="favorite-btn"
          onClick={ handleFavoriteRecipe }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="Favorite" />
        </button>
        <img
          src={ imgUrl }
          alt={ title }
          className="recipe-img"
          data-testid="recipe-photo"
        />
        <ul>
          {
            ingredients.map((ingredient, i) => (
              <li
                key={ Math.random() }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {ingredient}
              </li>
            ))
          }
        </ul>
        <p data-testid="instructions">{strInstructions}</p>
        {
          recipeType === 'meals' && (
            <iframe
              width="224"
              height="126"
              src={ ytUrl }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share"
              allowFullScreen
              data-testid="video"
            />
          )
        }
        <Recomendations />
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
        >
          {!isInProgressRecipe ? 'Start Recipe' : 'Continue Recipe'}
        </button>

      </div>
    );
  }
}

export default RecipeDetails;
