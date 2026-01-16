/**
 * Error handling utilities for ShopSphere
 * Provides centralized error logging and user-friendly error messages
 */

const ERROR_TYPES = {
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  INVALID_QUANTITY: 'INVALID_QUANTITY',
  CHECKOUT_FAILED: 'CHECKOUT_FAILED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
};

const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: 'Product not found. Please check the product ID.',
  INVALID_QUANTITY: 'Invalid quantity. Please enter a valid number.',
  CHECKOUT_FAILED: 'Checkout failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please fill in all required fields correctly.',
};

/**
 * Log error with context
 * @param {string} type - Error type
 * @param {string} message - Error message
 * @param {object} context - Additional context
 */
export const logError = (type, message, context = {}) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    type,
    message,
    context,
  };
  console.error('[ShopSphere Error]', errorLog);
};

/**
 * Get user-friendly error message
 * @param {string} type - Error type
 * @returns {string} User-friendly message
 */
export const getUserErrorMessage = (type) => {
  return ERROR_MESSAGES[type] || 'An unexpected error occurred. Please try again.';
};

export { ERROR_TYPES, ERROR_MESSAGES };
