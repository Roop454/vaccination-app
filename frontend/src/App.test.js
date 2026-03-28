import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './context/ThemeContext';

jest.mock('./pages/Home', () => () => <div>Home Page</div>);
jest.mock('./pages/Dashboard', () => () => <div>Dashboard Page</div>);
jest.mock('./pages/AddUser', () => () => <div>Add User Page</div>);
jest.mock('./pages/Login', () => () => <div>Login Page</div>);
jest.mock('./pages/Register', () => () => <div>Register Page</div>);

import App from './App';

test('renders home route content', () => {
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
  expect(screen.getByText(/home page/i)).toBeInTheDocument();
});
