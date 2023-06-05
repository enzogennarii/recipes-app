import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { RecipeContext } from '.';

function RecipeProvider({ children }) {
  const [searchOption, setSearchOption] = useState('');
  const [searchText, setSearchText] = useState('');

  const handleSearchRecipe = useCallback(() => {
    switch (searchOption) {
    default:
    }
  }, [searchOption]);

  const values = useMemo(() => ({
    setSearchOption,
    searchText,
    setSearchText,
    handleSearchRecipe,
  }), [
    searchText,
    handleSearchRecipe,
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
