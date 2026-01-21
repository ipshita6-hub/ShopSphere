import React, { useState } from 'react';
import './Input.css';

const Input = ({
  type = 'text',
  value = '',
  onChange = null,
  placeholder = '',
  label = '',
  error = '',
  disabled = false,
  required = false,
  icon = null,
  size = 'medium',
  variant = 'default',
  maxLength = null,
  onFocus = null,
  onBlur = null,
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const inputClasses = `
    input-field
    input-${size}
    input-${variant}
    ${error ? 'input-error' : ''}
    ${isFocused ? 'input-focused' : ''}
    ${disabled ? 'input-disabled' : ''}
    ${className}
  `.trim();

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-container">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? 'input-error-message' : undefined}
        />
        {maxLength && (
          <span className="input-counter">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {error && (
        <span id="input-error-message" className="input-error-message">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
