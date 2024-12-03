import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

// Fake product data
const products = [
  { id: 1, name: 'Laptop', originally: 1499, price: 999, image: 'https://m.media-amazon.com/images/I/61XtQfb-sRL.__AC_SX300_SY300_QL70_FMwebp_.jpg' },
  { id: 2, name: 'Phone', originally: 899, price: 699, image: 'https://t-mobile.scene7.com/is/image/Tmusprod/Apple-iPhone-15-Plus-Pink-frontimage' },
  { id: 3, name: 'Headphones', originally: 349, price: 199, image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1687660671363' },
  { id: 4, name: 'Camera', originally: 699, price: 499, image: 'https://i5.walmartimages.com/seo/Canon-EOS-R100-Mirrorless-Camera-24-1-MP-APS-C-4K-29-97-fps-2-5x-optical-zoom-RF-S-18-45mm-F4-5-6-3-IS-STM-lens-Wi-Fi-Bluetooth-black_401378df-14d3-43ee-90ab-e88fe87d2369.8d0f39a684e202d05c2fc0c9d1abd73a.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF' },
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
    <Header />
      <main>
        <section className="products">
          <h2>Products</h2>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product">
                <img className="image" src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p style={{fontStyle: 'italic'}}>Originally: ${product.originally}</p>
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
      <Footer />
    </div>
  );
}

export default App;
