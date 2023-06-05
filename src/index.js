import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserProvider from './context/UserProvider';
import RecipeProvider from './context/RecipeProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <UserProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </UserProvider>
    </BrowserRouter>,
  );

serviceWorker.unregister();
