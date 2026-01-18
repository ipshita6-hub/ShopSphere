/**
 * URL and query parameter utilities for ShopSphere
 * Provides URL manipulation and query string handling
 */

/**
 * Parse query string to object
 * @param {string} queryString - Query string (with or without ?)
 * @returns {object} Parsed query parameters
 */
export const parseQueryString = (queryString) => {
  const params = {};
  const query = queryString.replace(/^\?/, '');
  
  if (!query) return params;
  
  query.split('&').forEach(param => {
    const [key, value] = param.split('=');
    if (key) {
      params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
    }
  });
  
  return params;
};

/**
 * Convert object to query string
 * @param {object} params - Parameters object
 * @returns {string} Query string
 */
export const objectToQueryString = (params) => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

/**
 * Get query parameter value
 * @param {string} param - Parameter name
 * @param {string} url - URL (defaults to current location)
 * @returns {string|null} Parameter value or null
 */
export const getQueryParam = (param, url = window.location.href) => {
  const params = parseQueryString(new URL(url).search);
  return params[param] || null;
};

/**
 * Add or update query parameter
 * @param {string} url - URL
 * @param {string} param - Parameter name
 * @param {string} value - Parameter value
 * @returns {string} Updated URL
 */
export const addQueryParam = (url, param, value) => {
  const urlObj = new URL(url);
  urlObj.searchParams.set(param, value);
  return urlObj.toString();
};

/**
 * Remove query parameter
 * @param {string} url - URL
 * @param {string} param - Parameter name
 * @returns {string} Updated URL
 */
export const removeQueryParam = (url, param) => {
  const urlObj = new URL(url);
  urlObj.searchParams.delete(param);
  return urlObj.toString();
};

/**
 * Get base URL
 * @param {string} url - URL
 * @returns {string} Base URL
 */
export const getBaseUrl = (url) => {
  const urlObj = new URL(url);
  return `${urlObj.protocol}//${urlObj.host}`;
};

/**
 * Get path from URL
 * @param {string} url - URL
 * @returns {string} Path
 */
export const getPath = (url) => {
  return new URL(url).pathname;
};

/**
 * Get hostname from URL
 * @param {string} url - URL
 * @returns {string} Hostname
 */
export const getHostname = (url) => {
  return new URL(url).hostname;
};

/**
 * Check if URL is valid
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Encode URL component
 * @param {string} str - String to encode
 * @returns {string} Encoded string
 */
export const encodeUrl = (str) => {
  return encodeURIComponent(str);
};

/**
 * Decode URL component
 * @param {string} str - String to decode
 * @returns {string} Decoded string
 */
export const decodeUrl = (str) => {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

/**
 * Build URL with parameters
 * @param {string} baseUrl - Base URL
 * @param {object} params - Parameters object
 * @returns {string} Complete URL
 */
export const buildUrl = (baseUrl, params = {}) => {
  const queryString = objectToQueryString(params);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
