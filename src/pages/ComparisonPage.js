import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromComparison, clearComparison } from '../store/slices/comparisonSlice';
import { formatPrice } from '../utils/formatters';
import './ComparisonPage.css';

const ComparisonPage = () => {
  const dispatch = useDispatch();
  const comparisonItems = useSelector((state) => state.comparison.items);

  const handleRemoveFromComparison = (productId) => {
    dispatch(removeFromComparison(productId));
  };

  const handleClearComparison = () => {
    if (window.confirm('Clear all products from comparison?')) {
      dispatch(clearComparison());
    }
  };

  if (comparisonItems.length === 0) {
    return (
      <div className="comparison-page">
        <div className="empty-comparison">
          <h1>Product Comparison</h1>
          <p>No products selected for comparison</p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="comparison-page">
      <div className="comparison-header">
        <h1>Product Comparison</h1>
        <button className="btn btn-secondary" onClick={handleClearComparison}>
          Clear All
        </button>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Specification</th>
              {comparisonItems.map((product) => (
                <th key={product.id} className="product-column">
                  <div className="product-header">
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <button
                      className="btn-remove-small"
                      onClick={() => handleRemoveFromComparison(product.id)}
                      aria-label="Remove from comparison"
                    >
                      ✕
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="spec-label">Price</td>
              {comparisonItems.map((product) => (
                <td key={product.id} className="spec-value">
                  <span className="price">{formatPrice(product.price)}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="spec-label">Category</td>
              {comparisonItems.map((product) => (
                <td key={product.id} className="spec-value">
                  {product.category}
                </td>
              ))}
            </tr>
            <tr>
              <td className="spec-label">Rating</td>
              {comparisonItems.map((product) => (
                <td key={product.id} className="spec-value">
                  <span className="rating">★ {product.rating}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="spec-label">Description</td>
              {comparisonItems.map((product) => (
                <td key={product.id} className="spec-value">
                  {product.description}
                </td>
              ))}
            </tr>
            <tr>
              <td className="spec-label">Action</td>
              {comparisonItems.map((product) => (
                <td key={product.id} className="spec-value">
                  <Link to={`/product/${product.id}`} className="btn btn-view">
                    View Details
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="comparison-footer">
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ComparisonPage;
