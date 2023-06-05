import React, { useContext } from 'react';
import Input from './Input';
import Button from './Button';
import { RecipeContext } from '../context';

function SearchBar() {
  const {
    setSearchOption,
    searchText,
    setSearchText,
    handleSearchRecipe,
  } = useContext(RecipeContext);

  return (
    <div>
      <Input
        id="search-input"
        name="searchText"
        value={ searchText }
        onChange={ ({ target: { value } }) => setSearchText(value) }
      />
      <label htmlFor="ingredient-search-radio">
        <Input
          id="ingredient-search-radio"
          type="radio"
          name="searchOption"
          value="Ingredient"
          onChange={ ({ target: { value } }) => setSearchOption(value) }
        />
        Ingredient
      </label>
      <label htmlFor="name-search-radio">
        <Input
          id="name-search-radio"
          type="radio"
          name="searchOption"
          value="Name"
          onChange={ ({ target: { value } }) => setSearchOption(value) }
        />
        Name
      </label>
      <label htmlFor="first-letter-search-radio">
        <Input
          id="first-letter-search-radio"
          type="radio"
          name="searchOption"
          value="First letter"
          onChange={ ({ target: { value } }) => setSearchOption(value) }
        />
        First letter
      </label>
      <Button id="exec-search-btn" text="Pesquisar" onClick={ handleSearchRecipe } />
    </div>
  );
}

export default SearchBar;
