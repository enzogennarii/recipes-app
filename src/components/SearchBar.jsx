import React, { useContext } from 'react';

import { RecipeContext } from '../context';

import Input from './Input';
import Button from './Button';

function SearchBar() {
  const {
    handleSearchRecipe,
    searchText,
    setSearchOption,
    setSearchText,
  } = useContext(RecipeContext);

  return (
    <div>
      <Input
        id="search-input"
        name="searchText"
        onChange={ ({ target: { value } }) => setSearchText(value) }
        placeholder="Search"
        value={ searchText }
      />

      <label htmlFor="ingredient-search-radio">
        <Input
          id="ingredient-search-radio"
          name="searchOption"
          onChange={ ({ target: { value } }) => setSearchOption(value) }
          type="radio"
          value="Ingredient"
        />
        Ingredient
      </label>

      <label htmlFor="name-search-radio">
        <Input
          id="name-search-radio"
          name="searchOption"
          onChange={ ({ target: { value } }) => setSearchOption(value) }
          type="radio"
          value="Name"
        />
        Name
      </label>

      <label htmlFor="first-letter-search-radio">
        <Input
          id="first-letter-search-radio"
          name="searchOption"
          onChange={ ({ target: { value } }) => setSearchOption(value) }
          type="radio"
          value="First letter"
        />
        First letter
      </label>

      <Button
        id="exec-search-btn"
        onClick={ handleSearchRecipe }
        text="Pesquisar"
      />
    </div>
  );
}

export default SearchBar;
