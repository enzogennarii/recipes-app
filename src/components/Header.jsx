import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const hasSearch = ['Meals', 'Drinks'].includes(title);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>

      <Link to="/profile">
        <img src={ profileIcon } alt="Perfil" data-testid="profile-top-btn" />
      </Link>

      { hasSearch && (
        <button onClick={ () => setIsSearching((prevState) => !prevState) }>
          <img src={ searchIcon } alt="Procurar" data-testid="search-top-btn" />
        </button>
      ) }

      { isSearching && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
