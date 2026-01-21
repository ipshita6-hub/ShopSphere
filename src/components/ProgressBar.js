import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  variant = 'primary',
  size = 'medium',
  showLabel = true,
  animated = true,
  striped = false
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`progress-container progress-${size}`}>
      <div className={`progress-bar-wrapper ${animated ? 'animated' : ''}`}>
        <div
          className={`progress-bar progress-${variant} ${striped ? 'striped' : ''}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <span className="progress-label">{Math.round(percentage)}%</span>
      )}
    </div>
  );
};

export default ProgressBar;
