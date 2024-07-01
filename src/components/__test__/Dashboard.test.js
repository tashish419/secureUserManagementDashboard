import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import appStore from '../../utils/appstore'; 
import Dashboard from '../Dashboard'; 
import { signOut } from 'firebase/auth';
import { addUser } from '../../utils/userSlice';

jest.mock('firebase/auth', () => ({
  signOut: jest.fn(),
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    appStore.dispatch(addUser({ email: 'test@example.com' }));
  });

  test('renders Dashboard component', () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Welcome, test@example.com')).toBeInTheDocument();
  });

  test('signs out the user', () => {
    render(
      <Provider store={appStore}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Sign Out'));
    expect(signOut).toHaveBeenCalled();
    expect(appStore.getState().user).toBe(null);
  });
});