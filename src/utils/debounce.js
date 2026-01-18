/**
 * Debounce and throttle utilities for ShopSphere
 * Provides performance optimization for frequent function calls
 */

/**
 * Debounce function - delays execution until after specified time
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * Throttle function - limits execution to once per specified time
 * @param {function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {function} Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  
  return function throttled(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * Debounce with immediate execution option
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {boolean} immediate - Execute immediately
 * @returns {function} Debounced function
 */
export const debounceImmediate = (func, delay = 300, immediate = false) => {
  let timeoutId;
  
  return function debounced(...args) {
    const callNow = immediate && !timeoutId;
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, delay);
    
    if (callNow) {
      func.apply(this, args);
    }
  };
};

/**
 * Throttle with trailing option
 * @param {function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @param {boolean} trailing - Execute on trailing edge
 * @returns {function} Throttled function
 */
export const throttleTrailing = (func, limit = 300, trailing = true) => {
  let inThrottle;
  let lastFunc;
  
  return function throttled(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
        if (trailing && lastFunc) {
          func.apply(this, lastFunc);
          lastFunc = null;
        }
      }, limit);
    } else if (trailing) {
      lastFunc = args;
    }
  };
};

/**
 * Once - execute function only once
 * @param {function} func - Function to execute once
 * @returns {function} Function that executes only once
 */
export const once = (func) => {
  let called = false;
  let result;
  
  return function onceWrapper(...args) {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  };
};

/**
 * Memoize function results
 * @param {function} func - Function to memoize
 * @returns {function} Memoized function
 */
export const memoize = (func) => {
  const cache = new Map();
  
  return function memoized(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

/**
 * Retry function with exponential backoff
 * @param {function} func - Function to retry
 * @param {number} maxAttempts - Maximum attempts
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise} Promise that resolves when function succeeds
 */
export const retryWithBackoff = async (func, maxAttempts = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await func();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        const backoffDelay = delay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
    }
  }
  
  throw lastError;
};
