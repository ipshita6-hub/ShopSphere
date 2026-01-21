import React from 'react';
import './Badge.css';

const Badge = ({ 
  label, 
  variant = 'default', 
  size = 'medium',
  icon = null,
  onClick = null,
  className = ''
}) => {
  const classes = `badge badge-${variant} badge-${size} ${className}`;

  const content = (
    <>
      {icon && <span className="badge-icon">{icon}</span>}
      <span className="badge-label">{label}</span>
    </>
  );

  if (onClick) {
    return (
      <button className={classes} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <span className={classes}>{content}</span>;
};

export default Badge;
