/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from '../hooks/useFetch';

function RecipeDetails() {
  const { fetchData } = useFetch();
  const history = useHistory();

  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const splittedPathName = history.location.pathname.split('/');
  const recipeType = splittedPathName[1];
  const recipeId = splittedPathName[2];

  const fetchRecipe = async () => {
    let URL = '';
    let data = {};
    if (recipeType === 'meals') {
      URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const result = await fetchData(URL);
      data = result.meals;
    } else {
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

  useEffect(() => {
    fetchRecipe();
  }, []);

  useEffect(() => {
    if (recipe) filterIngredients();
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
        <p data-testid="recipe-category">{`${strCategory} - ${recipe.strAlcoholic}`}</p>
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
              width="560"
              height="315"
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
      </div>
    );
  }
}

export default RecipeDetails;
