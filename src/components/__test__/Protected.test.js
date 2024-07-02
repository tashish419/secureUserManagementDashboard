import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import appStore from '../../utils/appstore';
import { addUser, removeUser } from '../../utils/userSlice';
import "@testing-library/jest-dom";

const MockDashboard = () => <div>Protected Dashboard</div>;
const MockLogin = () => <div>Login Page</div>;

describe('ProtectedRoute Component', () => {
  test('should redirect to login if user is not authenticated', () => {
    appStore.dispatch(removeUser());

    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/" element={<MockLogin />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MockDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('should render protected component if user is authenticated', () => {
    appStore.dispatch(addUser({ email: 'test@example.com' }));

    render(
      <Provider store={appStore}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/" element={<MockLogin />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MockDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Protected Dashboard')).toBeInTheDocument();
  });
});
