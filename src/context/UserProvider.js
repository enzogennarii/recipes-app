import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { UserContext } from '.';

function UserProvider({ children }) {
  const [userEmail, setUserEmail] = useState('');

  const value = useMemo(() => ({
    userEmail,
    setUserEmail,
  }), [
    userEmail,
  ]);

  return (
    <UserContext.Provider value={ value }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
