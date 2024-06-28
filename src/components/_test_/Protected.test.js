import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute'; 
import { addUser, removeUser } from '../../utils/userSlice';
import appStore from '../../utils/appstore';

describe('ProtectedRoute Component', () => {
  test('renders children when user is authenticated', () => {
    const store = appStore; 

    store.dispatch(addUser({ uid: '123', email: 'test@example.com' }));

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <h1>Protected Page</h1>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Protected Page/i)).toBeInTheDocument();
  });

  test('redirects to home page when user is not authenticated', () => {
    const store = appStore; 

    store.dispatch(removeUser());

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/protected']}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <h1>Protected Page</h1>
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Protected Page/i)).toBeNull();
    expect(window.location.pathname).toBe('/');
  });
});
