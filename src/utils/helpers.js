/**
 * Utility helper functions for ShopSphere
 */

/**
 * Format price to USD currency
 * @param {number} price - Price value
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} discountedPrice - Discounted price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, discountedPrice) => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate zip code format
 * @param {string} zipCode - Zip code to validate
 * @returns {boolean} True if valid zip code
 */
export const isValidZipCode = (zipCode) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Sort array of objects by property
 * @param {Array} array - Array to sort
 * @param {string} property - Property to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
export const sortByProperty = (array, property, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (order === 'asc') {
      return a[property] > b[property] ? 1 : -1;
    }
    return a[property] < b[property] ? 1 : -1;
  });
};

/**
 * Filter array by multiple criteria
 * @param {Array} array - Array to filter
 * @param {Object} criteria - Filter criteria
 * @returns {Array} Filtered array
 */
export const filterByMultipleCriteria = (array, criteria) => {
  return array.filter((item) => {
    return Object.keys(criteria).every((key) => {
      if (Array.isArray(criteria[key])) {
        return criteria[key].includes(item[key]);
      }
      return item[key] === criteria[key];
    });
  });
};

/**
 * Get unique values from array
 * @param {Array} array - Array to get unique values from
 * @returns {Array} Array with unique values
 */
export const getUniqueValues = (array) => {
  return [...new Set(array)];
};

/**
 * Group array by property
 * @param {Array} array - Array to group
 * @param {string} property - Property to group by
 * @returns {Object} Grouped object
 */
export const groupByProperty = (array, property) => {
  return array.reduce((grouped, item) => {
    const key = item[property];
    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
    return grouped;
  }, {});
};
