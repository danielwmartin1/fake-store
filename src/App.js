import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
// import Cookies from 'js-cookie'; // You need to install js-cookie library

// Fake product data
const products = [
  { id: 1, name: 'Laptop', originally: 1499.99, price: 999.99, image: 'https://m.media-amazon.com/images/I/61XtQfb-sRL.__AC_SX300_SY300_QL70_FMwebp_.jpg', link: 'https://www.microsoft.com/en-us/store/configure/surface-laptop-7th-edition/8tq2hq5xxkj9/kqfl?OCID=AIDcmm6mu07qw1_seo_omc_goo&source=googleshopping' },
  { id: 2, name: 'Phone', originally: 899.99, price: 699.99, image: 'https://t-mobile.scene7.com/is/image/Tmusprod/Apple-iPhone-15-Plus-Pink-frontimage', link: 'https://www.apple.com/shop/buy-iphone/iphone-15-pro' },
  { id: 3, name: 'Headphones', originally: 349.99, price: 249.99, image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1687660671363', link: 'https://www.beatsbydre.com/headphones/studio-pro-wireless/MQTP3/black' },
  { id: 4, name: 'Camera', originally: 4499.99, price: 3799.99, image: 'https://i5.walmartimages.com/seo/Canon-EOS-R100-Mirrorless-Camera-24-1-MP-APS-C-4K-29-97-fps-2-5x-optical-zoom-RF-S-18-45mm-F4-5-6-3-IS-STM-lens-Wi-Fi-Bluetooth-black_401378df-14d3-43ee-90ab-e88fe87d2369.8d0f39a684e202d05c2fc0c9d1abd73a.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF', link: 'https://www.usa.canon.com/shop/p/eos-r5-rf24-105mm-f4-l-is-usm-kit?color=Black&type=New' },
];

const calculateDiscount = (originally, price) => (originally - price).toFixed(2);

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Load cart state from localStorage when the app initializes
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  
  const setItemCount = (id) => {
    const newQuantity = prompt("Enter new quantity: ");
    if (newQuantity !== null && Number.isInteger(Number(newQuantity)) && Number(newQuantity) > 0) {
      setCart((prevCart) => {
        return prevCart.map((item) =>
          item.product.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
        );
      });
    } else {
      alert("Please enter a valid whole number greater than 0.");
    }
  };

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

  // Save cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      <Header />
      <main>
        <section className="products">
          <div className="headerContainer"><h2 className="productsHeader">Products</h2></div>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product">
                <a className="product-link" href={product.link} target="_blank" rel="noopener noreferrer">
                  <h3 className="product-name">{product.name}</h3>
                  <img className="product-image" src={product.image} alt={product.name} />
                  <p className="link original">Originally: ${product.originally.toFixed(2)}</p>
                  <p className="link discount">Discount: ${calculateDiscount(product.originally, product.price)}</p>
                  <p className="link price">Price: ${product.price.toFixed(2)}</p>
                </a>
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
              <button className="edit-button" onClick={() => setItemCount(item.product.id)}>Edit Quantity</button>
              <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
            </div>
            ))}
          </div>
          <section className='cartTotal'>
            <div className="cart-summary">
              <div className="summary-item">
                <h3>Total Items: </h3>
                <p>{getCartTotal()}</p>
              </div>
              <div className="summary-item">
                <h3 className="summary-header">Subtotal: </h3>
                <p className="summary">${cart.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}</p>
              </div>
              <div className="summary-item">
                <h3 className="summary-header">Tax: </h3>
                <p className="summary">${(cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) * 0.07).toFixed(2)}</p>
              </div>
              {cart.length > 0 && (
                <div className="summary-item">
                <h3 className="summary-header">Shipping: </h3>
                <p className="summary">${(cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) <= 0 || cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) > 999.99 ? '0.00' : '5.00')}</p>
                </div>
              )}
              <div className="summary-item">
                <h3 className="summary-header">Grand Total: </h3>
                <p className="summary">${(cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) * 1.07 + (cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) <= 0 || cart.reduce((total, item) => total + (item.product.price * item.quantity), 0) > 999.99 ? 0 : 5)).toFixed(2)}</p>
                </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
