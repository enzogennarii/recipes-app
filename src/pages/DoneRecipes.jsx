import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipesFilter from '../components/DoneRecipesFilter';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const INITIAL_STATE = [{
    id: '',
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: [],
  }];
  const [doneRecipes, setDoneRecipes] = useState(INITIAL_STATE);
  const [filteredRecipes, setFilteredRecipes] = useState(INITIAL_STATE);

  const getDoneRecipesFromLS = () => {
    const doneRecipesFromLS = (
      JSON.parse(localStorage.getItem('doneRecipes')) || INITIAL_STATE
    );
    setDoneRecipes(doneRecipesFromLS);
    setFilteredRecipes(doneRecipesFromLS);
    console.log(doneRecipesFromLS);
  };

  useEffect(getDoneRecipesFromLS, []);

  return (
    <section className="page-done-recipes">
      <Header title="Done Recipes" />
      <h1>{doneRecipes[0].name}</h1>
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
