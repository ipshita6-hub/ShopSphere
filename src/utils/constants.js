/**
 * Application constants for ShopSphere
 * Centralized configuration and constant values
 */

export const APP_CONFIG = {
  APP_NAME: 'ShopSphere',
  VERSION: '1.0.0',
  TAX_RATE: 0.08,
  CURRENCY: 'USD',
};

export const PRODUCT_CATEGORIES = [
  'All',
  'Electronics',
  'Footwear',
  'Sports',
  'Accessories',
  'Clothing',
];

export const PRICE_RANGE = {
  MIN: 0,
  MAX: 300,
  STEP: 10,
};

export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export const QUANTITY_LIMITS = {
  MIN: 1,
  MAX: 999,
};

export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  MAX_PAGES: 10,
};

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCT_DETAIL: '/api/products/:id',
  CHECKOUT: '/api/checkout',
  ORDERS: '/api/orders',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const MESSAGES = {
  PRODUCT_ADDED: 'Product added to cart successfully',
  PRODUCT_REMOVED: 'Product removed from cart',
  CHECKOUT_SUCCESS: 'Order placed successfully',
  CHECKOUT_ERROR: 'Checkout failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please fill in all required fields.',
};

export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};
