/**
 * String manipulation utilities for ShopSphere
 * Provides common string operations and transformations
 */

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Convert string to title case
 * @param {string} str - String to convert
 * @returns {string} Title case string
 */
export const toTitleCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Convert string to kebab case
 * @param {string} str - String to convert
 * @returns {string} Kebab case string
 */
export const toKebabCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
};

/**
 * Convert string to snake case
 * @param {string} str - String to convert
 * @returns {string} Snake case string
 */
export const toSnakeCase = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^\w_]/g, '');
};

/**
 * Remove extra whitespace from string
 * @param {string} str - String to clean
 * @returns {string} Cleaned string
 */
export const removeExtraSpaces = (str) => {
  if (!str) return '';
  return str.trim().replace(/\s+/g, ' ');
};

/**
 * Reverse string
 * @param {string} str - String to reverse
 * @returns {string} Reversed string
 */
export const reverseString = (str) => {
  if (!str) return '';
  return str.split('').reverse().join('');
};

/**
 * Check if string is palindrome
 * @param {string} str - String to check
 * @returns {boolean} True if palindrome
 */
export const isPalindrome = (str) => {
  if (!str) return false;
  const cleaned = str.toLowerCase().replace(/[^\w]/g, '');
  return cleaned === reverseString(cleaned);
};

/**
 * Repeat string n times
 * @param {string} str - String to repeat
 * @param {number} times - Number of times to repeat
 * @returns {string} Repeated string
 */
export const repeatString = (str, times) => {
  if (!str || times < 1) return '';
  return str.repeat(times);
};

/**
 * Pad string to specified length
 * @param {string} str - String to pad
 * @param {number} length - Target length
 * @param {string} char - Character to pad with
 * @returns {string} Padded string
 */
export const padString = (str, length, char = ' ') => {
  if (!str) return '';
  const padding = Math.max(0, length - str.length);
  return str + char.repeat(padding);
};

/**
 * Extract numbers from string
 * @param {string} str - String to extract from
 * @returns {string} Numbers only
 */
export const extractNumbers = (str) => {
  if (!str) return '';
  return str.replace(/\D/g, '');
};

/**
 * Check if string contains only letters
 * @param {string} str - String to check
 * @returns {boolean} True if only letters
 */
export const isAlpha = (str) => {
  if (!str) return false;
  return /^[a-zA-Z]+$/.test(str);
};

/**
 * Check if string contains only alphanumeric characters
 * @param {string} str - String to check
 * @returns {boolean} True if alphanumeric
 */
export const isAlphaNumeric = (str) => {
  if (!str) return false;
  return /^[a-zA-Z0-9]+$/.test(str);
};
