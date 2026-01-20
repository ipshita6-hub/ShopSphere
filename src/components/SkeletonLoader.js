import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  if (type === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-image" />
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-text" />
              <div className="skeleton-line skeleton-text short" />
              <div className="skeleton-line skeleton-price" />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'product-detail') {
    return (
      <div className="skeleton-product-detail">
        <div className="skeleton-image-large" />
        <div className="skeleton-details">
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line skeleton-text" />
          <div className="skeleton-line skeleton-text" />
          <div className="skeleton-line skeleton-price" />
          <div className="skeleton-line skeleton-button" />
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="skeleton-list-item">
            <div className="skeleton-image-small" />
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-text short" />
            </div>
          </div>
        ))}
      </>
    );
  }

  return null;
};

export default SkeletonLoader;
