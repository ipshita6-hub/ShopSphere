import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          ShopSphere
        </Link>
        <nav className="nav">
          <Link to="/">Products</Link>
          <Link to="/cart" className="cart-link">
            Cart ({cartCount})
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
