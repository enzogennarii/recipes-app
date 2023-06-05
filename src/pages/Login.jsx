import React, { useCallback, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginValid, setIsLoginValid] = useState(false);
  const history = useHistory();

  const handleValidation = useCallback(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|com\.br|net)$/;
    const isEmailValid = emailRegex.test(email);
    const minCharPassword = 6;
    const isPasswordValid = password.length > minCharPassword;

    setIsLoginValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  const handleLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <section>
      Login
      <Input
        type="email"
        id="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
        value={ email }
      />

      <Input
        type="password"
        onChange={ ({ target }) => setPassword(target.value) }
        id="password-input"
        value={ password }
      />

      <Button
        id="login-submit-btn"
        disabled={ !isLoginValid }
        text="Logar"
        onClick={ handleLogin }
      />
    </section>
  );
}

export default Login;
