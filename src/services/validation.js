/**
 * Validation service for form and data validation
 */

import { REGEX_PATTERNS, ERROR_MESSAGES } from '../utils/constants';

/**
 * Validate email
 */
export const validateEmail = (email) => {
  if (!email) {
    return { valid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  if (!REGEX_PATTERNS.EMAIL.test(email)) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
  }
  return { valid: true };
};

/**
 * Validate zip code
 */
export const validateZipCode = (zipCode) => {
  if (!zipCode) {
    return { valid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  if (!REGEX_PATTERNS.ZIP_CODE.test(zipCode)) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_ZIP_CODE };
  }
  return { valid: true };
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true };
};

/**
 * Validate minimum length
 */
export const validateMinLength = (value, minLength, fieldName = 'Field') => {
  if (value.length < minLength) {
    return {
      valid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    };
  }
  return { valid: true };
};

/**
 * Validate maximum length
 */
export const validateMaxLength = (value, maxLength, fieldName = 'Field') => {
  if (value.length > maxLength) {
    return {
      valid: false,
      error: `${fieldName} must not exceed ${maxLength} characters`,
    };
  }
  return { valid: true };
};

/**
 * Validate number range
 */
export const validateNumberRange = (value, min, max, fieldName = 'Value') => {
  const num = Number(value);
  if (isNaN(num)) {
    return { valid: false, error: `${fieldName} must be a number` };
  }
  if (num < min || num > max) {
    return {
      valid: false,
      error: `${fieldName} must be between ${min} and ${max}`,
    };
  }
  return { valid: true };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { valid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  if (!REGEX_PATTERNS.PHONE.test(phone.replace(/\D/g, ''))) {
    return { valid: false, error: 'Please enter a valid phone number' };
  }
  return { valid: true };
};

/**
 * Validate URL
 */
export const validateURL = (url) => {
  if (!url) {
    return { valid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  if (!REGEX_PATTERNS.URL.test(url)) {
    return { valid: false, error: 'Please enter a valid URL' };
  }
  return { valid: true };
};

/**
 * Validate form data
 */
export const validateFormData = (data, schema) => {
  const errors = {};

  Object.keys(schema).forEach((field) => {
    const rules = schema[field];
    const value = data[field];

    if (rules.required) {
      const result = validateRequired(value, rules.label || field);
      if (!result.valid) {
        errors[field] = result.error;
        return;
      }
    }

    if (rules.type === 'email') {
      const result = validateEmail(value);
      if (!result.valid) {
        errors[field] = result.error;
      }
    }

    if (rules.type === 'phone') {
      const result = validatePhone(value);
      if (!result.valid) {
        errors[field] = result.error;
      }
    }

    if (rules.minLength) {
      const result = validateMinLength(value, rules.minLength, rules.label || field);
      if (!result.valid) {
        errors[field] = result.error;
      }
    }

    if (rules.maxLength) {
      const result = validateMaxLength(value, rules.maxLength, rules.label || field);
      if (!result.valid) {
        errors[field] = result.error;
      }
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
