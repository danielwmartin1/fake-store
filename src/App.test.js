import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

const addItemToCart = () => {
  const addButton = screen.getAllByText(/Add to Cart/i)[0];
  fireEvent.click(addButton);
};

const removeItemFromCart = () => {
  const removeButton = screen.getByText(/Remove/i);
  fireEvent.click(removeButton);
};

test('renders products and cart', () => {
  render(<App />);
  const productsHeader = screen.getByText(/Products/i);
  const cartHeader = screen.getAllByText(/Cart/i).find(el => el.tagName === 'H2');
  expect(productsHeader).toBeInTheDocument();
  expect(cartHeader).toBeInTheDocument();
});

test('adds item to cart', () => {
  render(<App />);
  addItemToCart();
  const cartItem = screen.getByText(/Quantity: 1/i);
  expect(cartItem).toBeInTheDocument();
});

test('removes item from cart', async () => {
  render(<App />);
  addItemToCart();
  removeItemFromCart();

  await waitFor(() => {
    const cartItem = screen.queryByText((content, element) => content.match(/Quantity:\s*1/i) && element.tagName === 'H4');
    expect(cartItem).not.toBeInTheDocument();
  }, { timeout: 3000 });
});

test('decreases item quantity in cart', async () => {
  render(<App />);
  addItemToCart();
  addItemToCart(); // Add the same item twice
  const cartItem = screen.getByText((content, element) => content.match(/Quantity:\s*2/i) && element.tagName === 'H4');
  expect(cartItem).toBeInTheDocument();

  removeItemFromCart();

  await waitFor(() => {
    const updatedCartItem = screen.getByText((content, element) => content.match(/Quantity:\s*1/i) && element.tagName === 'H4');
    expect(updatedCartItem).toBeInTheDocument();
  }, { timeout: 3000 });
});

test('removes item from cart when quantity is 1', async () => {
  render(<App />);
  addItemToCart();
  const cartItem = screen.getByText(/Quantity: 1/i);
  expect(cartItem).toBeInTheDocument();

  removeItemFromCart();

  await waitFor(() => {
    const removedCartItem = screen.queryByText((content, element) => content.match(/Quantity:\s*1/i) && element.tagName === 'H4');
    expect(removedCartItem).not.toBeInTheDocument();
  }, { timeout: 3000 });
});