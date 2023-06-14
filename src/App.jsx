import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

import './App.css';
import RecipeDetails from './pages/RecipeDetails';
import CurrRecipeProvider from './context/CurrRecipeProvider';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <section className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
        <CurrRecipeProvider>
          <Route exact path="/meals/:idMeal" component={ RecipeDetails } />
          <Route exact path="/drinks/:idDrink" component={ RecipeDetails } />
          <Route path="/meals/:idMeal/in-progress" component={ RecipeInProgress } />
          <Route path="/drinks/:idDrink/in-progress" component={ RecipeInProgress } />
        </CurrRecipeProvider>
      </Switch>
    </section>
  );
}

export default App;
