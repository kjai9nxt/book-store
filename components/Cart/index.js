import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const Cart = () => {
  // Convert state to useState hook
  const [cartItems, setCartItems] = useState([
    {
      id: "9781484206485",
      title: "Practical MongoDB",
      subtitle: "Architecting, Developing, and Administering MongoDB",
      price: "$32.04",
      image: "https://itbook.store/img/books/9781484206485.png",
      quantity: 1
    },
    {
      id: "9781617291609",
      title: "MongoDB in Action, 2nd Edition",
      subtitle: "Covers MongoDB version 3.0",
      price: "$32.10",
      image: "https://itbook.store/img/books/9781617291609.png",
      quantity: 2
    }
  ]);

  const removeItem = id => {
    setCartItems(prevCartItems => 
      prevCartItems.filter(item => item.id !== id)
    );
  };

  const increaseQuantity = id => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = id => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };

  // Calculate total
  const total = calculateTotal();

  return (
    <>
      <Header />
      <div className="cart-container">
        <h1 className="cart-heading">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/books" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items-container">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => {
                    const itemPrice = parseFloat(item.price.replace("$", ""));
                    const itemTotal = (itemPrice * item.quantity).toFixed(2);
                    
                    return (
                      <tr key={item.id} className="cart-item">
                        <td className="item-details">
                          <img src={item.image} alt={item.title} className="cart-item-image" />
                          <div className="item-info">
                            <h3>{item.title}</h3>
                            <p>{item.subtitle}</p>
                          </div>
                        </td>
                        <td className="item-price">{item.price}</td>
                        <td className="item-quantity">
                          <div className="quantity-controls">
                            <button 
                              className="quantity-btn" 
                              onClick={() => decreaseQuantity(item.id)}
                              disabled={item.quantity === 1}
                            >
                              -
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button 
                              className="quantity-btn" 
                              onClick={() => increaseQuantity(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="item-total">${itemTotal}</td>
                        <td className="item-action">
                          <button 
                            className="remove-btn" 
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${total}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${total}</span>
              </div>
              
              <div className="cart-actions">
                <Link to="/books" className="continue-shopping">
                  Continue Shopping
                </Link>
                <Link to="/checkout" className="checkout-btn">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;