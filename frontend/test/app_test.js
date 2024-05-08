
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  test('renders login page when user is not logged in', () => {
    window.localStorage.removeItem('loggedIn');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const loginPage = screen.getByText(/Sign In/i);
    expect(loginPage).toBeInTheDocument();
  });

  test('renders sign-up page when user is not logged in and navigates to sign-up route', () => {
    window.localStorage.removeItem('loggedIn');
    render(
      <BrowserRouter initialEntries={['/sign-up']}>
        <App />
      </BrowserRouter>
    );
    const signUpPage = screen.getByText(/Sign Up/i);
    expect(signUpPage).toBeInTheDocument();
  });

  test('renders admin home page when user is logged in', () => {
    window.localStorage.setItem('loggedIn', 'true');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const adminHomePage = screen.getByText(/Admin Home/i);
    expect(adminHomePage).toBeInTheDocument();
  });
});
