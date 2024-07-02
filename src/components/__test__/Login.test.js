import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import appStore from '../../utils/appstore';
import Login from '../Login';
import "@testing-library/jest-dom";

describe('Login Component test cases', () => {
  test('should render login form', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getAllByText('Sign In').length).toBeGreaterThan(0);
  });

  test('should toggle to sign up form', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('New User? Sign up now.'));

    expect(screen.getAllByText('Sign Up').length).toBeGreaterThan(0);
    expect(screen.getByText('Already registered? Sign in now.')).toBeInTheDocument();
  });
});
