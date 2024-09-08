import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders app routes', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
