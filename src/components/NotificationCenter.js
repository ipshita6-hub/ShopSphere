import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../store/slices/notificationSlice';
import './NotificationCenter.css';

const NotificationCenter = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.items);

  useEffect(() => {
    const timers = notifications.map((notification) => {
      if (notification.duration !== 0) {
        return setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.duration || 3000);
      }
      return null;
    });

    return () => {
      timers.forEach((timer) => {
        if (timer) clearTimeout(timer);
      });
    };
  }, [notifications, dispatch]);

  const handleClose = (id) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="notification-center">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          role="alert"
        >
          <div className="notification-content">
            <span className="notification-icon">
              {notification.type === 'success' && '✓'}
              {notification.type === 'error' && '✕'}
              {notification.type === 'warning' && '⚠'}
              {notification.type === 'info' && 'ℹ'}
            </span>
            <div className="notification-message">
              <p className="notification-title">{notification.title}</p>
              {notification.message && (
                <p className="notification-text">{notification.message}</p>
              )}
            </div>
          </div>
          <button
            className="notification-close"
            onClick={() => handleClose(notification.id)}
            aria-label="Close notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
