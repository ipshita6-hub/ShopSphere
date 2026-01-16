/**
 * Validation utilities for ShopSphere
 * Provides form validation and data validation functions
 */

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
 * Validate zip code format (US format)
 * @param {string} zipCode - Zip code to validate
 * @returns {boolean} True if valid zip code
 */
export const isValidZipCode = (zipCode) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

/**
 * Validate checkout form data
 * @param {object} formData - Form data to validate
 * @returns {object} Validation result with isValid and errors
 */
export const validateCheckoutForm = (formData) => {
  const errors = {};

  if (!formData.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.address?.trim()) {
    errors.address = 'Address is required';
  }

  if (!formData.city?.trim()) {
    errors.city = 'City is required';
  }

  if (!formData.zipCode?.trim()) {
    errors.zipCode = 'Zip code is required';
  } else if (!isValidZipCode(formData.zipCode)) {
    errors.zipCode = 'Please enter a valid zip code (e.g., 12345 or 12345-6789)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate quantity input
 * @param {number} quantity - Quantity to validate
 * @param {number} min - Minimum allowed quantity
 * @param {number} max - Maximum allowed quantity
 * @returns {boolean} True if valid quantity
 */
export const isValidQuantity = (quantity, min = 1, max = 999) => {
  const num = parseInt(quantity, 10);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validate price range
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {boolean} True if valid price range
 */
export const isValidPriceRange = (min, max) => {
  return min >= 0 && max >= min;
};
