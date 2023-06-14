import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipesFilter from '../components/DoneRecipesFilter';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const getDoneRecipesFromLS = () => {
    const doneRecipesFromLS = (
      JSON.parse(localStorage.getItem('doneRecipes')) || []
    );
    setDoneRecipes(doneRecipesFromLS);
    setFilteredRecipes(doneRecipesFromLS);
  };

  useEffect(getDoneRecipesFromLS, []);

  return (
    <section className="page-done-recipes">
      <Header title="Done Recipes" />
      <DoneRecipesFilter
        setFilteredRecipes={ setFilteredRecipes }
        doneRecipes={ doneRecipes }
      />
      {
        filteredRecipes.map((recipe, i) => (
          <DoneRecipeCard key={ Math.random() } recipe={ recipe } index={ i } />
        ))
      }
    </section>
  );
}

export default DoneRecipes;
