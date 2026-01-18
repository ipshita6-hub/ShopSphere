/**
 * Number manipulation utilities for ShopSphere
 * Provides common number operations and calculations
 */

/**
 * Round number to specified decimal places
 * @param {number} num - Number to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded number
 */
export const roundTo = (num, decimals = 2) => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Check if number is even
 * @param {number} num - Number to check
 * @returns {boolean} True if even
 */
export const isEven = (num) => {
  return num % 2 === 0;
};

/**
 * Check if number is odd
 * @param {number} num - Number to check
 * @returns {boolean} True if odd
 */
export const isOdd = (num) => {
  return num % 2 !== 0;
};

/**
 * Check if number is prime
 * @param {number} num - Number to check
 * @returns {boolean} True if prime
 */
export const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

/**
 * Get absolute value
 * @param {number} num - Number
 * @returns {number} Absolute value
 */
export const getAbsolute = (num) => {
  return Math.abs(num);
};

/**
 * Clamp number between min and max
 * @param {number} num - Number to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped number
 */
export const clamp = (num, min, max) => {
  return Math.max(min, Math.min(max, num));
};

/**
 * Get percentage of a number
 * @param {number} num - Base number
 * @param {number} percent - Percentage
 * @returns {number} Percentage value
 */
export const getPercentage = (num, percent) => {
  return (num * percent) / 100;
};

/**
 * Calculate percentage increase
 * @param {number} original - Original value
 * @param {number} current - Current value
 * @returns {number} Percentage increase
 */
export const getPercentageIncrease = (original, current) => {
  if (original === 0) return 0;
  return ((current - original) / original) * 100;
};

/**
 * Calculate percentage decrease
 * @param {number} original - Original value
 * @param {number} current - Current value
 * @returns {number} Percentage decrease
 */
export const getPercentageDecrease = (original, current) => {
  return getPercentageIncrease(original, current);
};

/**
 * Get average of numbers
 * @param {array} numbers - Array of numbers
 * @returns {number} Average
 */
export const getAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

/**
 * Get sum of numbers
 * @param {array} numbers - Array of numbers
 * @returns {number} Sum
 */
export const getSum = (numbers) => {
  return numbers.reduce((sum, num) => sum + num, 0);
};

/**
 * Get min value from numbers
 * @param {array} numbers - Array of numbers
 * @returns {number} Minimum value
 */
export const getMin = (numbers) => {
  return Math.min(...numbers);
};

/**
 * Get max value from numbers
 * @param {array} numbers - Array of numbers
 * @returns {number} Maximum value
 */
export const getMax = (numbers) => {
  return Math.max(...numbers);
};

/**
 * Generate random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
