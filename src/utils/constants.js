/**
 * Application constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Footwear',
  'Sports',
  'Accessories',
  'Clothing',
];

// Price Range
export const PRICE_RANGE = {
  MIN: 0,
  MAX: 300,
};

// Sort Options
export const SORT_OPTIONS = {
  ASC: 'asc',
  DESC: 'desc',
};

// Cart Actions
export const CART_ACTIONS = {
  ADD: 'ADD_TO_CART',
  REMOVE: 'REMOVE_FROM_CART',
  UPDATE: 'UPDATE_QUANTITY',
  CLEAR: 'CLEAR_CART',
};

// Filter Actions
export const FILTER_ACTIONS = {
  SET_CATEGORY: 'SET_CATEGORY',
  SET_PRICE_RANGE: 'SET_PRICE_RANGE',
  SET_SORT: 'SET_SORT',
  RESET: 'RESET_FILTERS',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_ZIP_CODE: 'Please enter a valid zip code.',
  REQUIRED_FIELD: 'This field is required.',
  PRODUCT_NOT_FOUND: 'Product not found.',
  CHECKOUT_FAILED: 'Checkout failed. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  ITEM_ADDED: 'Item added to cart successfully.',
  ITEM_REMOVED: 'Item removed from cart.',
  ORDER_PLACED: 'Order placed successfully!',
  FILTERS_RESET: 'Filters have been reset.',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'shopsphere_cart',
  FILTERS: 'shopsphere_filters',
  USER: 'shopsphere_user',
  TOKEN: 'shopsphere_token',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

// Debounce Delays
export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  FILTER: 500,
  RESIZE: 250,
};

// Animation Durations (ms)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Regex Patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  PHONE: /^\d{10}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
};

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCT_DETAIL: '/product/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_WISHLIST: false,
  ENABLE_REVIEWS: false,
  ENABLE_RECOMMENDATIONS: false,
  ENABLE_ANALYTICS: true,
};
