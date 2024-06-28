import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store';
import Header from './Header';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { addUser } from '../../utils/userSlice';
import appStore from '../../utils/appstore';


jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

jest.mock('../utils/firebase', () => ({
  auth: {
    currentUser: { uid: '123', email: 'test@example.com' },
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders header with navigation buttons', () => {
    render(
      <Provider store={appStore}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });

  test('renders Sign Out button when user is logged in', () => {
    store.dispatch(addUser({ uid: '123', email: 'test@example.com' }));

    render(
      <Provider store={appStore}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });

  test('calls signOut function and navigates to error page on sign out failure', async () => {
    signOut.mockRejectedValue(new Error('Sign out error'));
    store.dispatch(addUser({ uid: '123', email: 'test@example.com' }));

    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

    render(
      <Provider store={appStore}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Sign Out/i));

    expect(signOut).toHaveBeenCalled();
    await screen.findByText(/Home/i); 
    expect(navigate).toHaveBeenCalledWith('/error');
  });

  test('dispatches removeUser and navigates to home page when user is signed out', () => {
    const unsubscribe = jest.fn();
    auth.currentUser = null;

    jest.spyOn(require('firebase/auth'), 'onAuthStateChanged').mockImplementation((auth, callback) => {
      callback(null);
      return unsubscribe;
    });

    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

    render(
      <Provider store={appStore}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(store.getState().user).toBe(null); 
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
