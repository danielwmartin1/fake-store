import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

test('renders products and cart', () => {
  render(<App />);
  const productsHeader = screen.getByText(/Products/i);
  const cartHeader = screen.getAllByText(/Cart/i).find(el => el.tagName === 'H2');
  expect(productsHeader).toBeInTheDocument();
  expect(cartHeader).toBeInTheDocument();
});

test('adds item to cart', () => {
  render(<App />);
  const addButton = screen.getAllByText(/Add to Cart/i)[0];
  fireEvent.click(addButton);
  const cartItem = screen.getByText(/Quantity: 1/i);
  expect(cartItem).toBeInTheDocument();
});

test('removes item from cart', async () => {
  render(<App />);
  const addButton = screen.getAllByText(/Add to Cart/i)[0];
  fireEvent.click(addButton);
  const removeButton = screen.getByText(/Remove/i);
  fireEvent.click(removeButton);

  // Debugging: Log the cart item before waiting
  console.log('Before waiting:', screen.queryByText(/Quantity: 1/i));

  await waitFor(() => {
    const cartItem = screen.queryByText(/Quantity: 1/i);
    expect(cartItem).not.toBeInTheDocument();
  }, { timeout: 3000 });

  // Debugging: Log the cart item after waiting
  console.log('After waiting:', screen.queryByText(/Quantity: 1/i));
});