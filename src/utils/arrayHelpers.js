/**
 * Array manipulation utilities for ShopSphere
 * Provides common array operations and transformations
 */

/**
 * Remove item from array by index
 * @param {array} array - Source array
 * @param {number} index - Index to remove
 * @returns {array} New array without item
 */
export const removeByIndex = (array, index) => {
  return array.filter((_, i) => i !== index);
};

/**
 * Remove item from array by property value
 * @param {array} array - Source array
 * @param {string} property - Property name
 * @param {*} value - Property value to match
 * @returns {array} New array without matching items
 */
export const removeByProperty = (array, property, value) => {
  return array.filter(item => item[property] !== value);
};

/**
 * Find item in array by property value
 * @param {array} array - Source array
 * @param {string} property - Property name
 * @param {*} value - Property value to match
 * @returns {*} Found item or undefined
 */
export const findByProperty = (array, property, value) => {
  return array.find(item => item[property] === value);
};

/**
 * Update item in array by index
 * @param {array} array - Source array
 * @param {number} index - Index to update
 * @param {object} updates - Properties to update
 * @returns {array} New array with updated item
 */
export const updateByIndex = (array, index, updates) => {
  return array.map((item, i) => (i === index ? { ...item, ...updates } : item));
};

/**
 * Update item in array by property value
 * @param {array} array - Source array
 * @param {string} property - Property name
 * @param {*} value - Property value to match
 * @param {object} updates - Properties to update
 * @returns {array} New array with updated item
 */
export const updateByProperty = (array, property, value, updates) => {
  return array.map(item =>
    item[property] === value ? { ...item, ...updates } : item
  );
};

/**
 * Group array items by property
 * @param {array} array - Source array
 * @param {string} property - Property to group by
 * @returns {object} Grouped object
 */
export const groupByProperty = (array, property) => {
  return array.reduce((groups, item) => {
    const key = item[property];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
};

/**
 * Sort array by property
 * @param {array} array - Source array
 * @param {string} property - Property to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {array} Sorted array
 */
export const sortByProperty = (array, property, order = 'asc') => {
  const sorted = [...array].sort((a, b) => {
    if (a[property] < b[property]) return order === 'asc' ? -1 : 1;
    if (a[property] > b[property]) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
};

/**
 * Get unique values from array
 * @param {array} array - Source array
 * @returns {array} Array with unique values
 */
export const getUnique = (array) => {
  return [...new Set(array)];
};

/**
 * Get unique items by property
 * @param {array} array - Source array
 * @param {string} property - Property to check uniqueness
 * @returns {array} Array with unique items
 */
export const getUniqueByProperty = (array, property) => {
  const seen = new Set();
  return array.filter(item => {
    const value = item[property];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

/**
 * Flatten nested array
 * @param {array} array - Nested array
 * @param {number} depth - Depth to flatten
 * @returns {array} Flattened array
 */
export const flattenArray = (array, depth = 1) => {
  return array.flat(depth);
};

/**
 * Chunk array into smaller arrays
 * @param {array} array - Source array
 * @param {number} size - Chunk size
 * @returns {array} Array of chunks
 */
export const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
