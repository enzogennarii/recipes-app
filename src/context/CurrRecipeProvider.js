/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import copy from 'clipboard-copy';

import useFetch from '../hooks/useFetch';
import { CurrRecipeContext } from '.';

function CurrRecipeProvider({ children }) {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [isInProgressRecipe, setIsInProgressRecipe] = useState(null);
  const [isSharedRecipe, setIsSharedRecipe] = useState(false);
  const [isFavorite, setIsFavorite] = useState(null);

  const { fetchData } = useFetch();
  const history = useHistory();

  const splittedPathName = history.location.pathname.split('/');
  const recipeType = splittedPathName[1];
  const recipeId = splittedPathName[2];

  const MAX_RECOMENDATIONS_LENGTH = 6;

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

  const fetchRecomendations = async () => {
    let data = [];
    if (recipeType === 'meals') {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetchData(URL);
      data = response.drinks;
    }

    if (recipeType === 'drinks') {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetchData(URL);
      data = response.meals;
    }

    const slicedRecomendations = data.slice(0, MAX_RECOMENDATIONS_LENGTH);

    setRecomendations(slicedRecomendations);
  };

  const handleIngredients = () => {
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

  const handleIsInProgressRecipe = () => {
    const inProgressRecipesInLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipesInLS) {
      let recipeKeys = [];
      if (recipeType === 'meals') {
        recipeKeys = Object.keys(inProgressRecipesInLS.meals);
      } else {
        recipeKeys = Object.keys(inProgressRecipesInLS.drinks);
      }
      const isRecipeInLS = recipeKeys.some((key) => key === recipeId);
      setIsInProgressRecipe(isRecipeInLS);
      return;
    }
    setIsInProgressRecipe(false);
  };

  const handleShareRecipe = () => {
    let path = `http://localhost:3000${history.location.pathname}`;
    const inProgressLength = 12;
    if (path.includes('in-progress')) {
      path = path.slice(0, -inProgressLength);
    }
    copy(path);
    setIsSharedRecipe(true);
  };

  const handleFavoriteRecipe = () => {
    const recipeToFavorite = {
      id: recipeType === 'meals' ? recipe.idMeal : recipe.idDrink,
      type: recipeType === 'meals' ? 'meal' : 'drink',
      nationality: recipeType === 'meals' ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: recipeType === 'drinks' ? recipe.strAlcoholic : '',
      name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
      image: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
    };

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const isRecipeFavorited = favoriteRecipes.some(({ id }) => id === recipeId);
      if (!isRecipeFavorited) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...favoriteRecipes, recipeToFavorite]),
        );
        setIsFavorite(true);
        return;
      }
      const favoritesWithoutRecipe = favoriteRecipes
        .filter(({ id }) => id !== recipeId);
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(favoritesWithoutRecipe),
      );
      setIsFavorite(false);
      return;
    }
    setIsFavorite(true);
    localStorage.setItem('favoriteRecipes', JSON.stringify([recipeToFavorite]));
  };

  const handleIsFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let isRecipeFavorited = false;
    if (favoriteRecipes) {
      isRecipeFavorited = favoriteRecipes.some(({ id }) => id === recipeId);
    }
    setIsFavorite(isRecipeFavorited);
  };

  const handleFinishRecipe = () => {
    const id = recipeType === 'meals' ? recipe.idMeal : recipe.idDrink;

    const doneRecipesInLS = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const isRecipeInLS = doneRecipesInLS.some((currRecipe) => currRecipe.id === id);
    if (isRecipeInLS) history.push('/done-recipes');

    const doneRecipe = {
      id,
      type: recipeType === 'meals' ? 'meal' : 'drink',
      nationality: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipeType === 'meals' ? recipe.strMeal : recipe.strDrink,
      image: recipeType === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb,
      doneDate: new Date(),
      tags: recipe.strTags ? recipe.strTags.split(',') : [],
    };

    doneRecipesInLS.push(doneRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesInLS));
    history.push('/done-recipes');
  };
  useEffect(() => {
    fetchRecipe();
  }, []);

  useEffect(() => {
    if (recipe) {
      handleIsInProgressRecipe();
      handleIngredients();
      fetchRecomendations();
      handleIsFavorite();
    }
  }, [recipe]);

  const values = useMemo(() => ({
    recipe,
    ingredients,
    isInProgressRecipe,
    isSharedRecipe,
    isFavorite,
    recomendations,
    handleShareRecipe,
    handleFavoriteRecipe,
    handleFinishRecipe,
  }), [
    recipe,
    ingredients,
    isInProgressRecipe,
    isSharedRecipe,
    isFavorite,
    recomendations,
  ]);

  return (
    <CurrRecipeContext.Provider value={ values }>
      {children}
    </CurrRecipeContext.Provider>
  );
}

CurrRecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CurrRecipeProvider;
