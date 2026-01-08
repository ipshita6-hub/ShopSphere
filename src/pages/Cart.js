import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>

              <div className="cart-item-quantity">
                <label htmlFor={`qty-${item.id}`}>Qty:</label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value, 10))
                  }
                />
              </div>

              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="btn-remove"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn-primary btn-checkout"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
