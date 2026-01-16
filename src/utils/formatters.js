/**
 * Formatting and calculation utilities for ShopSphere
 * Provides currency formatting, date formatting, and price calculations
 */

/**
 * Format price as USD currency
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Calculate subtotal for cart items
 * @param {array} items - Cart items array
 * @returns {number} Subtotal amount
 */
export const calculateSubtotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Calculate tax amount (assuming 8% tax rate)
 * @param {number} subtotal - Subtotal amount
 * @param {number} taxRate - Tax rate as decimal (default 0.08 for 8%)
 * @returns {number} Tax amount
 */
export const calculateTax = (subtotal, taxRate = 0.08) => {
  return subtotal * taxRate;
};

/**
 * Calculate total with tax
 * @param {number} subtotal - Subtotal amount
 * @param {number} taxRate - Tax rate as decimal
 * @returns {number} Total amount including tax
 */
export const calculateTotal = (subtotal, taxRate = 0.08) => {
  return subtotal + calculateTax(subtotal, taxRate);
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Format date and time
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export const truncateText = (text, length = 50) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Format product rating
 * @param {number} rating - Rating value
 * @returns {string} Formatted rating string
 */
export const formatRating = (rating) => {
  return rating.toFixed(1);
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} discountedPrice - Discounted price
 * @returns {number} Discount percentage
 */
export const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
  if (originalPrice === 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};
