import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login'; 
import appStore from '../../utils/appstore';

describe('Login Component', () => {
  test('renders Sign In form', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  test('allows user to input email and password', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

    expect(screen.getByPlaceholderText(/Email/i).value).toBe('test@example.com');
    expect(screen.getByPlaceholderText(/Password/i).value).toBe('password123');
  });

  test('shows error message on invalid input', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'short' } });
    
    fireEvent.click(screen.getByText(/Sign In/i));
    
    expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
  });

  test('toggles between Sign In and Sign Up', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText(/New User\? Sign up now\./i));
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Already registered\? Sign in now\./i));
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});
