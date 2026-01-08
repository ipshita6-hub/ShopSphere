import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const products = useSelector((state) => state.products.items);
  const product = products.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return (
      <div className="error-page">
        <h1>Product Not Found</h1>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Products
      </button>

      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="detail-category">{product.category}</p>
          <p className="detail-rating">Rating: ★ {product.rating}</p>

          <p className="detail-description">{product.description}</p>

          <div className="detail-price">
            <span className="price">${product.price.toFixed(2)}</span>
          </div>

          <div className="detail-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>

            <button onClick={handleAddToCart} className="btn-primary">
              Add to Cart
            </button>
          </div>

          {addedToCart && (
            <div className="success-message">
              ✓ Added {quantity} item(s) to cart!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
