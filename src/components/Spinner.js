import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'medium', color = 'primary', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="spinner-fullscreen">
        <div className={`spinner spinner-${size} spinner-${color}`} role="status" aria-label="Loading">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`spinner spinner-${size} spinner-${color}`} role="status" aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
