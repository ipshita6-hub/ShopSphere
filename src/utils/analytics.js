/**
 * Analytics and tracking utilities for ShopSphere
 * Provides event tracking and user behavior analytics
 */

const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  PRODUCT_VIEW: 'product_view',
  PRODUCT_CLICK: 'product_click',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  ADD_TO_WISHLIST: 'add_to_wishlist',
  REMOVE_FROM_WISHLIST: 'remove_from_wishlist',
  CHECKOUT_START: 'checkout_start',
  CHECKOUT_COMPLETE: 'checkout_complete',
  SEARCH: 'search',
  FILTER_APPLIED: 'filter_applied',
  REVIEW_SUBMITTED: 'review_submitted',
  COMPARISON_ADDED: 'comparison_added',
};

/**
 * Track analytics event
 * @param {string} eventName - Event name
 * @param {object} eventData - Event data
 */
export const trackEvent = (eventName, eventData = {}) => {
  const event = {
    name: eventName,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    ...eventData,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', event);
  }

  // Send to analytics service (e.g., Google Analytics, Mixpanel)
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }

  // Store in local analytics
  storeAnalyticsEvent(event);
};

/**
 * Track page view
 * @param {string} pageName - Page name
 * @param {object} additionalData - Additional data
 */
export const trackPageView = (pageName, additionalData = {}) => {
  trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
    page: pageName,
    ...additionalData,
  });
};

/**
 * Track product view
 * @param {object} product - Product object
 */
export const trackProductView = (product) => {
  trackEvent(ANALYTICS_EVENTS.PRODUCT_VIEW, {
    productId: product.id,
    productName: product.name,
    productPrice: product.price,
    productCategory: product.category,
  });
};

/**
 * Track add to cart
 * @param {object} product - Product object
 * @param {number} quantity - Quantity added
 */
export const trackAddToCart = (product, quantity = 1) => {
  trackEvent(ANALYTICS_EVENTS.ADD_TO_CART, {
    productId: product.id,
    productName: product.name,
    productPrice: product.price,
    quantity,
    totalValue: product.price * quantity,
  });
};

/**
 * Track checkout completion
 * @param {object} orderData - Order data
 */
export const trackCheckoutComplete = (orderData) => {
  trackEvent(ANALYTICS_EVENTS.CHECKOUT_COMPLETE, {
    orderId: orderData.id,
    totalAmount: orderData.total,
    itemCount: orderData.items.length,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track search
 * @param {string} searchTerm - Search term
 * @param {number} resultsCount - Number of results
 */
export const trackSearch = (searchTerm, resultsCount) => {
  trackEvent(ANALYTICS_EVENTS.SEARCH, {
    searchTerm,
    resultsCount,
  });
};

/**
 * Track filter applied
 * @param {object} filters - Applied filters
 */
export const trackFilterApplied = (filters) => {
  trackEvent(ANALYTICS_EVENTS.FILTER_APPLIED, {
    filters: JSON.stringify(filters),
  });
};

/**
 * Store analytics event locally
 * @param {object} event - Event object
 */
const storeAnalyticsEvent = (event) => {
  try {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push(event);
    // Keep only last 100 events
    if (events.length > 100) {
      events.shift();
    }
    localStorage.setItem('analytics_events', JSON.stringify(events));
  } catch (error) {
    console.error('Error storing analytics event:', error);
  }
};

/**
 * Get stored analytics events
 * @returns {array} Array of stored events
 */
export const getAnalyticsEvents = () => {
  try {
    return JSON.parse(localStorage.getItem('analytics_events') || '[]');
  } catch (error) {
    console.error('Error retrieving analytics events:', error);
    return [];
  }
};

/**
 * Clear stored analytics events
 */
export const clearAnalyticsEvents = () => {
  try {
    localStorage.removeItem('analytics_events');
  } catch (error) {
    console.error('Error clearing analytics events:', error);
  }
};

/**
 * Get analytics summary
 * @returns {object} Analytics summary
 */
export const getAnalyticsSummary = () => {
  const events = getAnalyticsEvents();
  const summary = {
    totalEvents: events.length,
    eventsByType: {},
    timeRange: {
      start: events.length > 0 ? events[0].timestamp : null,
      end: events.length > 0 ? events[events.length - 1].timestamp : null,
    },
  };

  events.forEach((event) => {
    summary.eventsByType[event.name] = (summary.eventsByType[event.name] || 0) + 1;
  });

  return summary;
};

export { ANALYTICS_EVENTS };
