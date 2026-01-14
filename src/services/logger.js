/**
 * Logger service for application logging
 */

const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Format log message with timestamp and level
 */
const formatMessage = (level, message, data) => {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}]`;
  return data ? `${prefix} ${message}`, data : `${prefix} ${message}`;
};

/**
 * Logger service
 */
const logger = {
  debug: (message, data) => {
    if (isDevelopment) {
      console.log(formatMessage(LOG_LEVELS.DEBUG, message, data), data);
    }
  },

  info: (message, data) => {
    console.info(formatMessage(LOG_LEVELS.INFO, message, data), data);
  },

  warn: (message, data) => {
    console.warn(formatMessage(LOG_LEVELS.WARN, message, data), data);
  },

  error: (message, error) => {
    console.error(formatMessage(LOG_LEVELS.ERROR, message, error), error);
  },

  group: (label) => {
    if (isDevelopment) {
      console.group(label);
    }
  },

  groupEnd: () => {
    if (isDevelopment) {
      console.groupEnd();
    }
  },

  table: (data) => {
    if (isDevelopment) {
      console.table(data);
    }
  },

  time: (label) => {
    if (isDevelopment) {
      console.time(label);
    }
  },

  timeEnd: (label) => {
    if (isDevelopment) {
      console.timeEnd(label);
    }
  },
};

export default logger;
