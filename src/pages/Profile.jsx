import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Button from '../components/Button';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  const redirectTo = (endpoint) => {
    history.push(endpoint);
  };

  const userLogout = () => {
    localStorage.clear();
    redirectTo('/');
  };

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    setUserEmail(userLocalStorage.email);
  }, []);

  return (
    <section className="page-profile">
      <Header title="Profile" />
      <p data-testid="profile-email">{ userEmail }</p>

      <Button
        id="profile-done-btn"
        onClick={ () => redirectTo('/done-recipes') }
        text="Done Recipes"
      />

      <Button
        id="profile-favorite-btn"
        onClick={ () => redirectTo('/favorite-recipes') }
        text="Favorite Recipes"
      />

      <Button
        id="profile-logout-btn"
        onClick={ userLogout }
        text="Logout"
      />
    </section>
  );
}

export default Profile;
