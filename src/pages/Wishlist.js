import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishlist, clearWishlist } from '../store/slices/wishlistSlice';
import { addToCart } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/formatters';
import './Wishlist.css';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      dispatch(clearWishlist());
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p className="wishlist-count">{wishlistItems.length} items</p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="wishlist-content">
          <div className="wishlist-items">
            {wishlistItems.map((item) => (
              <div key={item.id} className="wishlist-item">
                <Link to={`/product/${item.id}`} className="wishlist-item-image">
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="wishlist-item-details">
                  <Link to={`/product/${item.id}`} className="wishlist-item-name">
                    {item.name}
                  </Link>
                  <p className="wishlist-item-category">{item.category}</p>
                  <p className="wishlist-item-description">{item.description}</p>
                  <div className="wishlist-item-rating">
                    <span className="rating-stars">★ {item.rating}</span>
                  </div>
                </div>

                <div className="wishlist-item-price">
                  <p className="price">{formatPrice(item.price)}</p>
                </div>

                <div className="wishlist-item-actions">
                  <button
                    className="btn btn-add-to-cart"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-remove"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    aria-label="Remove from wishlist"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="wishlist-summary">
            <h2>Wishlist Summary</h2>
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{wishlistItems.length}</span>
            </div>
            <div className="summary-row">
              <span>Total Value:</span>
              <span className="total-value">{formatPrice(totalValue)}</span>
            </div>
            <div className="summary-actions">
              <button
                className="btn btn-primary"
                onClick={() => window.location.href = '/'}
              >
                Continue Shopping
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleClearWishlist}
              >
                Clear Wishlist
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">♡</div>
          <h2>Your wishlist is empty</h2>
          <p>Start adding products to your wishlist to save them for later!</p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
