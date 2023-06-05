import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <section className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </section>
  );
}

export default App;
