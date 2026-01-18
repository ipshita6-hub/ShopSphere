/**
 * Object manipulation utilities for ShopSphere
 * Provides common object operations and transformations
 */

/**
 * Deep clone an object
 * @param {object} obj - Object to clone
 * @returns {object} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (obj instanceof Object) {
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }
};

/**
 * Merge objects
 * @param {object} target - Target object
 * @param {object} source - Source object
 * @returns {object} Merged object
 */
export const mergeObjects = (target, source) => {
  return { ...target, ...source };
};

/**
 * Deep merge objects
 * @param {object} target - Target object
 * @param {object} source - Source object
 * @returns {object} Deep merged object
 */
export const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
};

/**
 * Get object keys
 * @param {object} obj - Object
 * @returns {array} Array of keys
 */
export const getKeys = (obj) => {
  return Object.keys(obj);
};

/**
 * Get object values
 * @param {object} obj - Object
 * @returns {array} Array of values
 */
export const getValues = (obj) => {
  return Object.values(obj);
};

/**
 * Get object entries
 * @param {object} obj - Object
 * @returns {array} Array of [key, value] pairs
 */
export const getEntries = (obj) => {
  return Object.entries(obj);
};

/**
 * Check if object has property
 * @param {object} obj - Object
 * @param {string} property - Property name
 * @returns {boolean} True if has property
 */
export const hasProperty = (obj, property) => {
  return obj.hasOwnProperty(property);
};

/**
 * Pick specific properties from object
 * @param {object} obj - Object
 * @param {array} keys - Keys to pick
 * @returns {object} New object with picked properties
 */
export const pickProperties = (obj, keys) => {
  const result = {};
  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * Omit specific properties from object
 * @param {object} obj - Object
 * @param {array} keys - Keys to omit
 * @returns {object} New object without omitted properties
 */
export const omitProperties = (obj, keys) => {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
};

/**
 * Invert object keys and values
 * @param {object} obj - Object
 * @returns {object} Inverted object
 */
export const invertObject = (obj) => {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[obj[key]] = key;
    }
  }
  return result;
};

/**
 * Check if object is empty
 * @param {object} obj - Object
 * @returns {boolean} True if empty
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Get object size (number of properties)
 * @param {object} obj - Object
 * @returns {number} Number of properties
 */
export const getSize = (obj) => {
  return Object.keys(obj).length;
};

/**
 * Transform object values
 * @param {object} obj - Object
 * @param {function} transformer - Transformation function
 * @returns {object} Transformed object
 */
export const transformValues = (obj, transformer) => {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = transformer(obj[key], key);
    }
  }
  return result;
};
