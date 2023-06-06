import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import UserProvider from '../../context/UserProvider';
import RecipeProvider from '../../context/RecipeProvider';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      <UserProvider>
        <RecipeProvider>
          { component }
        </RecipeProvider>
      </UserProvider>
    </Router>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}
