/**
 * Date manipulation utilities for ShopSphere
 * Provides common date operations and calculations
 */

/**
 * Get current date
 * @returns {Date} Current date
 */
export const getCurrentDate = () => {
  return new Date();
};

/**
 * Add days to date
 * @param {Date} date - Base date
 * @param {number} days - Days to add
 * @returns {Date} New date
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Subtract days from date
 * @param {Date} date - Base date
 * @param {number} days - Days to subtract
 * @returns {Date} New date
 */
export const subtractDays = (date, days) => {
  return addDays(date, -days);
};

/**
 * Get difference between two dates in days
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} Difference in days
 */
export const getDaysDifference = (date1, date2) => {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((date2 - date1) / msPerDay);
};

/**
 * Check if date is today
 * @param {Date} date - Date to check
 * @returns {boolean} True if today
 */
export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if date is in the past
 * @param {Date} date - Date to check
 * @returns {boolean} True if in past
 */
export const isPast = (date) => {
  return date < new Date();
};

/**
 * Check if date is in the future
 * @param {Date} date - Date to check
 * @returns {boolean} True if in future
 */
export const isFuture = (date) => {
  return date > new Date();
};

/**
 * Get start of day
 * @param {Date} date - Date
 * @returns {Date} Start of day (00:00:00)
 */
export const getStartOfDay = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Get end of day
 * @param {Date} date - Date
 * @returns {Date} End of day (23:59:59)
 */
export const getEndOfDay = (date) => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

/**
 * Get day name
 * @param {Date} date - Date
 * @returns {string} Day name
 */
export const getDayName = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

/**
 * Get month name
 * @param {Date} date - Date
 * @returns {string} Month name
 */
export const getMonthName = (date) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[date.getMonth()];
};

/**
 * Check if year is leap year
 * @param {number} year - Year to check
 * @returns {boolean} True if leap year
 */
export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
