import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

import './App.css';

function App() {
  return (
    <section className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        {/* <Route path="/meals/:id-da-receita" component={} />
        <Route path="/drinks/:id-da-receita" component={} />
        <Route path="/meals/:id-da-receita/in-progress" component={} />
        <Route path="/drinks/:id-da-receita/in-progress" component={} /> */}
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </section>
  );
}

export default App;
