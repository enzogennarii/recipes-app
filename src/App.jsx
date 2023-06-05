import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Meals from './pages/Meals';

import './App.css';

function App() {
  return (
    <section className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
      </Switch>
    </section>
  );
}

export default App;
