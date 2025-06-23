import React from 'react';
import { Bell, X } from 'lucide-react';

const NotificationPanel = ({ notifications }) => {
  return (
    <div className="notifications-panel">
      {notifications.filter(n => !n.read).slice(0, 3).map(notification => (
        <div key={notification.id} className="notification-card">
          <div className="notification-content">
            <Bell className="notification-card-icon" />
            <div className="notification-text">
              <p className="notification-message">{notification.message}</p>
              <p className="notification-time">{notification.time}</p>
            </div>
            <button className="notification-close-btn">
              <X className="close-icon" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPanel;