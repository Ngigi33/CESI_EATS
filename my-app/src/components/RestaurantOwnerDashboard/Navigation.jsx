import React from 'react';
import { Bell } from 'lucide-react';

const Navigation = ({ ownerInfo, notifications }) => {
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="navbar-logo">CESI EATS</div>
          <div className="navbar-subtitle">Owner Dashboard</div> {/* Changed to English */}
        </div>
        <div className="navbar-right">
          <div className="notification-icon-container">
            <Bell className="notification-icon" />
            {unreadNotificationsCount > 0 && (
              <span className="notification-badge">
                {unreadNotificationsCount}
              </span>
            )}
          </div>
          <div className="user-info">
            <img
              src={ownerInfo.avatar}
              alt="Avatar"
              className="user-avatar"
            />
            <span className="user-name">{ownerInfo.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;