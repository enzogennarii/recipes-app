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

function App() {
  return (
    <section className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals/:idMeal" component={ RecipeDetails } />
        <Route exact path="/drinks/:idDrink" component={ RecipeDetails } />
        {/* <Route path="/meals/:id-da-receita/in-progress" component={} />
        <Route path="/drinks/:id-da-receita/in-progress" component={} /> */}
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </section>
  );
}

export default App;
