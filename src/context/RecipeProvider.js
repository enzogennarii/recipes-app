import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { RecipeContext } from '.';
import useFetch from '../hooks/useFetch';

function RecipeProvider({ children }) {
  const { isLoading, errorMessage, fetchData } = useFetch();
  const history = useHistory();

  const [searchOption, setSearchOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const [pageName, setPageName] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');

  const MAX_RECIPES_LENGTH = 12;
  const MAX_CATEGORIES_LENGTH = 5;

  const fetchInitialRecipes = useCallback(async () => {
    let data = [];

    if (pageName === 'Meals') {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetchData(URL);
      data = response.meals;
    }

    if (pageName === 'Drinks') {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetchData(URL);
      data = response.drinks;
    }

    if (data.length > MAX_RECIPES_LENGTH) {
      data = data.slice(0, MAX_RECIPES_LENGTH);
    }

    setCurrCategory('');
    setRecipes(data);
  }, [fetchData, pageName]);

  const fetchRecipeCategories = useCallback(async () => {
    let data = [];

    if (pageName === 'Meals') {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const response = await fetchData(URL);
      data = response.meals;
    }

    if (pageName === 'Drinks') {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetchData(URL);
      data = response.drinks;
    }

    data = data.slice(0, MAX_CATEGORIES_LENGTH);
    data = data.map((category) => category.strCategory);
    setCategories(data);
  }, [fetchData, pageName]);

  const handleSearchMeals = useCallback(async () => {
    let URL = '';

    if (searchOption === 'Ingredient') {
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
    }

    if (searchOption === 'Name') {
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    }

    if (searchOption === 'First letter') {
      if (searchText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`;
    }

    const data = await fetchData(URL);

    if (!data.meals) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }

    if (data.meals.length > MAX_RECIPES_LENGTH) {
      const slicedRecipes = data.meals.slice(0, MAX_RECIPES_LENGTH);
      setRecipes(slicedRecipes);
      return;
    }

    setRecipes(data.meals);
    if (data.meals.length === 1) {
      const mealId = data.meals[0].idMeal;
      history.push(`/meals/${mealId}`);
    }
  }, [fetchData, history, searchOption, searchText]);

  const handleSearchDrinks = useCallback(async () => {
    let URL = '';

    if (searchOption === 'Ingredient') {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`;
    }

    if (searchOption === 'Name') {
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
    }

    if (searchOption === 'First letter') {
      if (searchText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`;
    }

    const data = await fetchData(URL);

    if (!data.drinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      return;
    }

    if (data.drinks.length > MAX_RECIPES_LENGTH) {
      const slicedRecipes = data.drinks.slice(0, MAX_RECIPES_LENGTH);
      setRecipes(slicedRecipes);
      return;
    }

    setRecipes(data.drinks);

    if (data.drinks.length === 1) {
      const drinkId = data.drinks[0].idDrink;
      history.push(`/drinks/${drinkId}`);
    }
  }, [fetchData, history, searchOption, searchText]);

  const handleSearchRecipe = useCallback(async () => {
    if (pageName === 'Meals') {
      handleSearchMeals();
      return;
    }

    handleSearchDrinks();
  }, [handleSearchDrinks, handleSearchMeals, pageName]);

  const filterByCategory = useCallback(async ({ target: { name } }) => {
    let data = [];

    if (name === currCategory) {
      fetchInitialRecipes();
    } else {
      if (pageName === 'Meals') {
        const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
        const response = await fetchData(URL);
        data = response.meals;
      }

      if (pageName === 'Drinks') {
        const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
        const response = await fetchData(URL);
        data = response.drinks;
      }

      if (data.length > MAX_RECIPES_LENGTH) {
        data = data.slice(0, MAX_RECIPES_LENGTH);
      }
    }

    setCurrCategory(name);
    setRecipes(data);
  }, [fetchData, pageName, currCategory, fetchInitialRecipes]);

  useEffect(() => {
    if (pageName) {
      fetchInitialRecipes();
      fetchRecipeCategories();
    }
    console.log(categories);
  }, [pageName, fetchInitialRecipes, fetchRecipeCategories]);

  const values = useMemo(() => ({
    isLoading,
    errorMessage,
    handleSearchRecipe,
    recipes,
    setSearchOption,
    searchText,
    setSearchText,
    setPageName,
    categories,
    filterByCategory,
    fetchInitialRecipes,
  }), [
    handleSearchRecipe,
    recipes,
    searchText,
    isLoading,
    errorMessage,
    categories,
    filterByCategory,
    fetchInitialRecipes,
  ]);

  return (
    <RecipeContext.Provider value={ values }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
