import React, { useState } from 'react';
// import copy from 'clipboard-copy';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import DoneRecipesFilter from '../components/DoneRecipesFilter';
// import shareIcon from '../images/shareIcon.svg';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  // const [isSharedRecipe, setIsSharedRecipe] = useState(false);

  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  // const handleShareRecipe = (type, id) => {
  //   const path = `http://localhost:3000/${type}s/${id}`;
  //   copy(path);
  //   setIsSharedRecipe(true);
  // };

  return (
    <section className="page-done-recipes">
      <Header title="Done Recipes" />
      <DoneRecipesFilter
        setFilteredRecipes={ setFilteredRecipes }
      />
      <DoneRecipesCard recipes={ filteredRecipes } />
    </section>
  );
}

export default DoneRecipes;
