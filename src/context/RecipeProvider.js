import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { RecipeContext } from '.';

function RecipeProvider({ children }) {
  const [searchOption, setSearchOption] = useState('');
  const [searchText, setSearchText] = useState('');
  const [recipes, setRecipes] = useState(null);

  const handleSearchRecipe = useCallback(async () => {
    if (searchOption === 'Ingredient') {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
      const response = await fetch(URL);
      const data = await response.json();
      setRecipes(data);
    }

    if (searchOption === 'Name') {
      const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
      const response = await fetch(URL);
      const data = await response.json();
      setRecipes(data);
    }

    if (searchOption === 'First letter') {
      if (searchText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`;
      const response = await fetch(URL);
      const data = await response.json();
      setRecipes(data);
    }
  }, [searchOption, searchText]);

  const values = useMemo(() => ({
    handleSearchRecipe,
    recipes,
    setSearchOption,
    searchText,
    setSearchText,
  }), [
    handleSearchRecipe,
    recipes,
    searchText,
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
