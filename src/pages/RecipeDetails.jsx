/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from '../hooks/useFetch';
import { RecipeContext } from '../context';
import Recomendations from '../components/Recomendations';

function RecipeDetails() {
  const { fetchData } = useFetch();
  const history = useHistory();
  const { setPageName, fetchRecomendations } = useContext(RecipeContext);

  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [isNotDoneRecipe, setIsNotDoneRecipe] = useState(null);

  const splittedPathName = history.location.pathname.split('/');
  const recipeType = splittedPathName[1];
  const recipeId = splittedPathName[2];

  const fetchRecipe = async () => {
    let URL = '';
    let data = {};
    if (recipeType === 'meals') {
      setPageName('Meals');
      URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const result = await fetchData(URL);
      data = result.meals;
    } else {
      setPageName('Drinks');
      URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const result = await fetchData(URL);
      data = result.drinks;
    }
    setRecipe(...data);
  };

  const filterIngredients = () => {
    const recipeKeys = Object.keys(recipe);
    const ingredientKeys = recipeKeys.filter((key) => (
      key.includes('strIngredient') && recipe[key]));
    const ingredientList = ingredientKeys.map((key) => recipe[key]);
    const ingredientsWithMeasures = ingredientList.map((ingredient, index) => {
      const currMeasure = `strMeasure${index + 1}`;
      return `${ingredient} ${recipe[currMeasure] ? ` - ${recipe[currMeasure]}` : ''}`;
    });
    setIngredients(ingredientsWithMeasures);
  };

  const handleIsDoneRecipe = () => {
    const doneRecipesInLS = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesInLS) {
      let isRecipeInLS = null;
      if (recipeType === 'meals') {
        isRecipeInLS = doneRecipesInLS.some(({ id }) => id === recipe.idMeal);
      } else {
        isRecipeInLS = doneRecipesInLS.some(({ id }) => id === recipe.idDrink);
      }
      setIsNotDoneRecipe(!isRecipeInLS);
      return;
    }
    setIsNotDoneRecipe(true);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  useEffect(() => {
    if (recipe) {
      handleIsDoneRecipe();
      filterIngredients();
      fetchRecomendations();
    }
  }, [recipe]);

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
        { isNotDoneRecipe && (
          <button
            className="start-recipe-btn"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
        )}
      </div>
    );
  }
}

export default RecipeDetails;
