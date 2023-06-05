import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { userContext } from '.';

function UserProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');

  const value = useMemo(() => ({
    userEmail,
    setUserEmail,
  }), [
    userEmail,
  ]);

  return (
    <userContext.Provider value={ value }>
      {children}
    </userContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
