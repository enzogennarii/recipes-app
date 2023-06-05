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
    <section className="page-login">
      <h1>Login</h1>

      <Input
        id="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
        placeholder="Email"
        type="email"
        value={ email }
      />

      <Input
        id="password-input"
        onChange={ ({ target }) => setPassword(target.value) }
        placeholder="Password"
        type="password"
        value={ password }
      />

      <Button
        disabled={ !isLoginValid }
        id="login-submit-btn"
        onClick={ handleLogin }
        text="Login"
      />
    </section>
  );
}

export default Login;
