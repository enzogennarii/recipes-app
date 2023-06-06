/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import { RecipeContext } from '../context';
import DrinkCard from '../components/DrinkCard';

function Drinks() {
  const title = 'Drinks';
  const { setPageName, recipes } = useContext(RecipeContext);
  useEffect(() => setPageName(title), []);
  return (
    <section className="page-drinks">
      <Header title={ title } />
      {
        recipes.map((drink, i) => (
          <DrinkCard key={ drink.idDrink } recipe={ drink } index={ i } />
        ))
      }
    </section>
  );
}

export default Drinks;
