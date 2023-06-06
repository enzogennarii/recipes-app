import React, { useContext } from 'react';
import { RecipeContext } from '../context';
import FilterRecipes from './FilterRecipes';
import RecipeCard from './RecipeCard';

function Recipes() {
  const { recipes } = useContext(RecipeContext);
  return (
    <div>
      <FilterRecipes />
      {
        recipes.map((recipe, i) => (
          <RecipeCard key={ Math.random() } recipe={ recipe } index={ i } />
        ))
      }
    </div>
  );
}

export default Recipes;
