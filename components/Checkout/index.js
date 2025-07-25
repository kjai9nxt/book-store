import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header";
import "./index.css";

const Checkout = () => {
  const history = useHistory();
  
  // Combine form fields into a single state object
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    paymentMethod: "credit"
  });
  
  // Separate state for cart items
  const [cartItems, setCartItems] = useState([
    {
      id: "9781484206485",
      title: "Practical MongoDB",
      price: "$32.04",
      quantity: 1
    },
    {
      id: "9781617291609",
      title: "MongoDB in Action, 2nd Edition",
      price: "$32.10",
      quantity: 2
    }
  ]);
  
  // Destructure form fields for easier access
  const { 
    firstName, lastName, email, address, city, 
    state, postalCode, country, paymentMethod 
  } = formData;

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    // In a real app, process the order here
    alert("Order placed successfully!");
    // Redirect to home page or order confirmation
    history.push("/");
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0).toFixed(2);
  };
  
  const total = calculateTotal();

  return (
    <>
      <Header />
      <div className="checkout-container">
        <h1 className="checkout-heading">Checkout</h1>
        
        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h2 className="section-title">Shipping Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="state">State/Province</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h2 className="section-title">Payment Method</h2>
              
              <div className="payment-options">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="credit"
                    name="paymentMethod"
                    value="credit"
                    checked={paymentMethod === "credit"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="credit">Credit Card</label>
                </div>
                
                <div className="payment-option">
                  <input
                    type="radio"
                    id="debit"
                    name="paymentMethod"
                    value="debit"
                    checked={paymentMethod === "debit"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="debit">Debit Card</label>
                </div>
                
                <div className="payment-option">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
              
              <div className="payment-details">
                {/* Display appropriate payment form based on selected method */}
                {(paymentMethod === "credit" || paymentMethod === "debit") && (
                  <>
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="xxxx xxxx xxxx xxxx"
                        required
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expDate">Expiration Date</label>
                        <input
                          type="text"
                          id="expDate"
                          name="expDate"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {paymentMethod === "paypal" && (
                  <div className="paypal-info">
                    <p>You will be redirected to PayPal to complete your payment.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="checkout-actions">
              <Link to="/cart" className="back-to-cart">
                Back to Cart
              </Link>
              <button type="submit" className="place-order-btn">
                Place Order
              </button>
            </div>
          </form>
          
          <div className="order-summary">
            <h2 className="section-title">Order Summary</h2>
            
            <div className="summary-items">
              {cartItems.map(item => {
                const price = parseFloat(item.price.replace("$", ""));
                const itemTotal = (price * item.quantity).toFixed(2);
                
                return (
                  <div key={item.id} className="summary-item">
                    <div className="item-info">
                      <span className="item-quantity">{item.quantity}x</span>
                      <span className="item-name">{item.title}</span>
                    </div>
                    <span className="item-price">${itemTotal}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="summary-totals">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;