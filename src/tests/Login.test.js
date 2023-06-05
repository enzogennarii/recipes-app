import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouter } from './helpers/renderWithRouter';

import App from '../App';

describe('Testes da página de Login', () => {
  it('Testa se os elementos são renderizados corretamente na tela', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
  });

  it('Testa se o botão de login só está ativado quando o formulário é preenchido corretamente', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');

    expect(btnLogin).toBeDisabled();
    userEvent.type(emailInput, 'email.invalido');
    expect(btnLogin).toBeDisabled();
    userEvent.type(passwordInput, '123456');
    expect(btnLogin).toBeDisabled();
    userEvent.clear(passwordInput);
    userEvent.type(passwordInput, '1234567');
    expect(btnLogin).toBeDisabled();
    userEvent.clear(emailInput);
    userEvent.type(emailInput, 'email.valido@teste.com');
    expect(btnLogin).not.toBeDisabled();
  });
});
