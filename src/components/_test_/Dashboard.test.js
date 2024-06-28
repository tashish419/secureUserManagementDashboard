import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import appStore from '../../utils/appstore'; 
import Dashboard from '../Dashboard'; 
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase'; 

jest.mock('firebase/auth', () => ({
  signOut: jest.fn(),
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    appStore.dispatch({
      type: 'user/addUser',
      payload: { email: 'test@example.com' },
    });
  });

  test('renders welcome message and sign out button', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Welcome, test@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });

  test('calls signOut on sign out button click', async () => {
    render(
      <Provider store={appStore}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Sign Out/i));

    expect(signOut).toHaveBeenCalledWith(auth);
    expect(appStore.getState().user).toBeNull();
  });
});
