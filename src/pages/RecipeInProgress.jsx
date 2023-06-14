import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { CurrRecipeContext } from '../context';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import IngredientCheckboxList from '../components/IngredientCheckboxList';

function RecipeInProgress() {
  const history = useHistory();
  const splittedPathName = history.location.pathname.split('/');
  const recipeType = splittedPathName[1];
  const [enableFinish, setEnableFinish] = useState(false);

  const {
    recipe,
    ingredients,
    isSharedRecipe,
    isFavorite,
    handleShareRecipe,
    handleFavoriteRecipe,
    handleFinishRecipe,
  } = useContext(CurrRecipeContext);

  if (recipe) {
    let title = '';
    let imgUrl = '';
    let ytUrl = '';
    let id = '';
    if (recipeType === 'meals') {
      const { strMealThumb, strMeal, strYoutube, idMeal } = recipe;
      title = strMeal;
      imgUrl = strMealThumb;
      ytUrl = strYoutube.replace('/watch?v=', '/embed/');
      id = idMeal;
    } else {
      const { strDrinkThumb, strDrink, idDrink } = recipe;
      title = strDrink;
      imgUrl = strDrinkThumb;
      id = idDrink;
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
        <IngredientCheckboxList
          ingredients={ ingredients }
          type={ recipeType }
          id={ id }
          setEnableFinish={ setEnableFinish }
        />
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

        <button
          className="start-recipe-btn"
          data-testid="finish-recipe-btn"
          disabled={ !enableFinish }
          onClick={ handleFinishRecipe }
        >
          Finish Recipe
        </button>

      </div>
    );
  }
}

export default RecipeInProgress;
