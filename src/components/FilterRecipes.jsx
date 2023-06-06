import React, { useContext } from 'react';
import { RecipeContext } from '../context';

function FilterRecipes() {
  const { categories } = useContext(RecipeContext);
  return (
    <div>
      {
        categories.map((category) => (
          <button
            key={ category }
            data-testid={ `${category}-category-filter` }
          >
            {category}
          </button>
        ))
      }
    </div>
  );
}

export default FilterRecipes;
