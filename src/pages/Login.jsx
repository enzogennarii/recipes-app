import React, { useState } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section>
      Login
      <Input
        type="email"
        id="email-input"
        onChange={ ({ target: { value } }) => setEmail(value) }
        value={ email }
      />

      <Input
        type="password"
        onChange={ ({ target: { value } }) => setPassword(value) }
        id="password-input"
        value={ password }
      />

      <Button
        id="login-submit-btn"
        text="Logar"
        onClick={ () => {} }
      />
    </section>
  );
}

export default Login;
