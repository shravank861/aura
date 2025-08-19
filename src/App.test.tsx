import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders editor layout', () => {
  render(<App />);
  expect(screen.getByText('Blocks')).toBeInTheDocument();
  expect(screen.getByText('Properties')).toBeInTheDocument();
});
