import React, { useState } from 'react';
import './Rating.css';

const Rating = ({ 
  value = 0, 
  onChange = null, 
  readOnly = false, 
  size = 'medium',
  count = 5,
  showLabel = true
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (index) => {
    if (!readOnly && onChange) {
      onChange(index + 1);
    }
  };

  const handleMouseEnter = (index) => {
    if (!readOnly) {
      setHoverValue(index + 1);
    }
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const displayValue = hoverValue || value;

  return (
    <div className={`rating rating-${size} ${readOnly ? 'read-only' : ''}`}>
      <div className="rating-stars">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`rating-star ${index < displayValue ? 'filled' : ''}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
            aria-label={`Rate ${index + 1} out of ${count}`}
            type="button"
          >
            ★
          </button>
        ))}
      </div>
      {showLabel && (
        <span className="rating-label">
          {displayValue > 0 ? `${displayValue}/${count}` : 'Rate this'}
        </span>
      )}
    </div>
  );
};

export default Rating;
