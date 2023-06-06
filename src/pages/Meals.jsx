/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import { RecipeContext } from '../context';
import MealCard from '../components/MealCard';

function Meals() {
  const title = 'Meals';
  const { setPageName, recipes } = useContext(RecipeContext);
  useEffect(() => setPageName(title), []);
  return (
    <section className="page-meals">
      <Header title={ title } />
      {
        recipes.map((meal, i) => (
          <MealCard key={ meal.idMeal } recipe={ meal } index={ i } />
        ))
      }
    </section>
  );
}

export default Meals;
