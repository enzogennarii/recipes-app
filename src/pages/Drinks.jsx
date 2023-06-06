/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import { RecipeContext } from '../context';

function Drinks() {
  const title = 'Drinks';
  const { setPageName } = useContext(RecipeContext);
  useEffect(() => setPageName(title), []);
  return (
    <section className="page-drinks">
      <Header title={ title } />
    </section>
  );
}

export default Drinks;
