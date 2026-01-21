import React from 'react';
import './Button.css';

const Button = ({
  children,
  onClick = null,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ariaLabel = null,
  ...props
}) => {
  const buttonClasses = `
    btn
    btn-${variant}
    btn-${size}
    ${disabled ? 'btn-disabled' : ''}
    ${loading ? 'btn-loading' : ''}
    ${fullWidth ? 'btn-full-width' : ''}
    ${className}
  `.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      {loading ? <span className="btn-spinner" /> : null}
      {!loading && <span className="btn-text">{children}</span>}
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </>
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
