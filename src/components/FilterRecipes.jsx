import React, { useContext } from 'react';
import { RecipeContext } from '../context';
import Button from './Button';

function FilterRecipes() {
  const { categories,
    filterByCategory,
    fetchInitialRecipes } = useContext(RecipeContext);

  return (
    <div>
      {
        categories.map((category) => (
          <button
            key={ category }
            name={ category }
            data-testid={ `${category}-category-filter` }
            onClick={ filterByCategory }
          >
            {category}
          </button>
        ))
      }

      <Button
        id="All-category-filter"
        onClick={ fetchInitialRecipes }
        text="All"
      />
    </div>
  );
}

export default FilterRecipes;
