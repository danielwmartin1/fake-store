import React, { useState } from 'react';
import './App.css';

// Fake product data
const products = [
  { id: 1, name: 'Laptop', price: 999, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Phone', price: 699, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Headphones', price: 199, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Camera', price: 499, image: 'https://via.placeholder.com/150' },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  return (
    <div className="App">
      <header>
        <h1>Fake Store</h1>
      </header>
      <main>
        <section className="products">
          <h2>Products</h2>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
        <section className="cart">
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price}
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
