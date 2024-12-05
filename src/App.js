import React, { useState } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

// Fake product data
const products = [
  { id: 1, name: 'Laptop', originally: 1499.99, price: 999.99, image: 'https://m.media-amazon.com/images/I/61XtQfb-sRL.__AC_SX300_SY300_QL70_FMwebp_.jpg' },
  { id: 2, name: 'Phone', originally: 899.99, price: 699.99, image: 'https://t-mobile.scene7.com/is/image/Tmusprod/Apple-iPhone-15-Plus-Pink-frontimage' },
  { id: 3, name: 'Headphones', originally: 349.99, price: 199.99, image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1687660671363' },
  { id: 4, name: 'Camera', originally: 699.99, price: 499.99, image: 'https://i5.walmartimages.com/seo/Canon-EOS-R100-Mirrorless-Camera-24-1-MP-APS-C-4K-29-97-fps-2-5x-optical-zoom-RF-S-18-45mm-F4-5-6-3-IS-STM-lens-Wi-Fi-Bluetooth-black_401378df-14d3-43ee-90ab-e88fe87d2369.8d0f39a684e202d05c2fc0c9d1abd73a.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF' },
];

const calculateDiscount = (originally, price) => (originally - price).toFixed(2);

function App() {
  const [cart, setCart] = useState([]);
  
  const setItemCount = (id, quantity) => {
    const newQuantity = prompt("Enter new quantity: ");
    if (newQuantity !== null) {
      setCart((prevCart) => {
        return prevCart.map((item) =>
          item.product.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
        );
      });
    }
  }

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.product.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.product.id === id);
      if (existingProduct.quantity === 1) {
        return prevCart.filter((item) => item.product.id !== id);
      } else {
        return prevCart.map((item) =>
          item.product.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const getCartTotal = () => cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <Header />
      <main>
        <section className="products">
          <div className="headerContainer"><h2 className="productsHeader">Products</h2></div>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product">
                <img className="image" src={product.image} alt={product.name} />
                <h2 className="productName">{product.name}</h2>
                <p className="original">Originally: ${product.originally.toFixed(2)}</p>
                <p className="discount">Discount: ${calculateDiscount(product.originally, product.price)}</p>
                <p className="price">Price: ${product.price.toFixed(2)}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
        <section className="cart">
          <div className='headerContainer'><h2 className="cartHeader">Cart</h2></div>
          <div className="cart-list">
            {cart.map((item) => (
            <div key={item.product.id} className="cart-item">
              <h3 className="itemName">{item.product.name}</h3>
              <h4 className="itemQuantity">Quantity: {item.quantity}</h4>
              <h4 className='itemPrice'>Price: ${(item.product.price * item.quantity).toFixed(2)}</h4>
              <button onClick = {() => setItemCount(item.product.id, item.quantity)}>Edit Quantity</button>
              <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
            </div>
            ))}
          </div>
          <h3>Total Items: {getCartTotal()}</h3>
          <h3>Subtotal: ${cart.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}</h3>
          <h3>Tax: ${(cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) * 0.07).toFixed(2)}</h3>
          <h3>Shipping: $5.00</h3>
          <h3>Total: ${(cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) * 1.07).toFixed(2)}</h3>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
