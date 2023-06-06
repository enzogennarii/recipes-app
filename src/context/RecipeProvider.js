import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { RecipeContext } from '.';
import useFetch from '../hooks/useFetch';

function RecipeProvider({ children }) {
  const [searchOption, setSearchOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState(null);

  const { isLoading, errorMessage, fetchData } = useFetch();

  const handleSearchRecipe = useCallback(async () => {
    if (searchOption === 'Ingredient') {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
      const data = await fetchData(URL);
      setRecipes(data);
      return;
    }

    if (searchOption === 'Name') {
      const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
      const data = await fetchData(URL);
      setRecipes(data);
      return;
    }

    if (searchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`;
    const data = await fetchData(URL);
    setRecipes(data);
  }, [searchOption, searchText, fetchData]);

  const values = useMemo(() => ({
    handleSearchRecipe,
    recipes,
    setSearchOption,
    searchText,
    setSearchText,
    isLoading,
    errorMessage,
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
