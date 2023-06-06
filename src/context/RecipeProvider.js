import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { RecipeContext } from '.';
import useFetch from '../hooks/useFetch';

function RecipeProvider({ children }) {
  const { isLoading, errorMessage, fetchData } = useFetch();
  const history = useHistory();

  const [searchOption, setSearchOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [pageName, setPageName] = useState('');

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
    const maxArrayLength = 12;
    if (data.meals.length > maxArrayLength) {
      const splicedRecipes = data.meals.splice(0, maxArrayLength);
      setRecipes(splicedRecipes);
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
    const maxArrayLength = 12;
    if (data.drinks.length > maxArrayLength) {
      const splicedRecipes = data.drinks.splice(0, maxArrayLength);
      setRecipes(splicedRecipes);
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

  const values = useMemo(() => ({
    isLoading,
    errorMessage,
    handleSearchRecipe,
    recipes,
    setSearchOption,
    searchText,
    setSearchText,
    setPageName,
  }), [
    handleSearchRecipe,
    recipes,
    searchText,
    isLoading,
    errorMessage,
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
