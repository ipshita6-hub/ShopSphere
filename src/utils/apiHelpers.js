/**
 * API request utilities for ShopSphere
 * Provides helper functions for API calls and error handling
 */

/**
 * Make GET request
 * @param {string} url - API endpoint
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const apiGet = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    return handleApiResponse(response);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Make POST request
 * @param {string} url - API endpoint
 * @param {object} data - Request body
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const apiPost = async (url, data = {}, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    return handleApiResponse(response);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Make PUT request
 * @param {string} url - API endpoint
 * @param {object} data - Request body
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const apiPut = async (url, data = {}, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    });
    return handleApiResponse(response);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Make DELETE request
 * @param {string} url - API endpoint
 * @param {object} options - Request options
 * @returns {Promise} Response data
 */
export const apiDelete = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    return handleApiResponse(response);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Handle API response
 * @param {Response} response - Fetch response
 * @returns {Promise} Parsed response data
 */
const handleApiResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || 'API Error');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  
  return data;
};

/**
 * Handle API error
 * @param {Error} error - Error object
 * @returns {Error} Formatted error
 */
const handleApiError = (error) => {
  const apiError = new Error(error.message || 'Network Error');
  apiError.originalError = error;
  return apiError;
};

/**
 * Create API request with timeout
 * @param {string} url - API endpoint
 * @param {object} options - Request options
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise} Response data
 */
export const apiWithTimeout = async (url, options = {}, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return handleApiResponse(response);
  } catch (error) {
    clearTimeout(timeoutId);
    throw handleApiError(error);
  }
};

/**
 * Batch API requests
 * @param {array} requests - Array of request configs
 * @returns {Promise} Array of responses
 */
export const apiBatch = async (requests) => {
  return Promise.all(
    requests.map(req => {
      const { method = 'GET', url, data, options } = req;
      
      switch (method.toUpperCase()) {
        case 'POST':
          return apiPost(url, data, options);
        case 'PUT':
          return apiPut(url, data, options);
        case 'DELETE':
          return apiDelete(url, options);
        default:
          return apiGet(url, options);
      }
    })
  );
};
