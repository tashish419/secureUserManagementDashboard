import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import appStore from '../../utils/appstore';
import Login from '../Login';

describe('Login Component', () => {
  test('renders login form', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getAllByText('Sign In').length).toBeGreaterThan(0);
  });

  test('toggles to sign up form', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText('New User? Sign up now.'));

    expect(screen.getAllByText('Sign Up').length).toBeGreaterThan(0);
    expect(screen.getByText('Already registered? Sign in now.')).toBeInTheDocument();
  });
});
