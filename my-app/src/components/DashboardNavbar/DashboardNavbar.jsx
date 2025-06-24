import React from 'react';
import { Bell, User, Settings, LogOut } from 'lucide-react';
import './DashboardNavbar.css';

const DashboardNavbar = ({ 
  userType, 
  userInfo, 
  notifications = [], 
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogoutClick 
}) => {
  
  const getUserTypeLabel = (type) => {
    const labels = {
      'restaurant': 'Dashboard Propriétaire',
      'delivery': 'Dashboard Livreur',
      'sales': 'Dashboard Commercial',
      'support': 'Dashboard Support',
      'dev': 'Dashboard Développeur'
    };
    return labels[type] || 'Dashboard';
  };

  const getUserTypeColor = (type) => {
    const colors = {
      'restaurant': '#f97316', // orange
      'delivery': '#22c55e',   // green
      'sales': '#3b82f6',      // blue
      'support': '#8b5cf6',    // purple
      'dev': '#ef4444'         // red
    };
    return colors[type] || '#f97316';
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="dashboard-navbar">
      <div className="dashboard-navbar-content">
        <div className="dashboard-navbar-left">
          <div 
            className="dashboard-navbar-logo"
            style={{ color: getUserTypeColor(userType) }}
          >
            CESI EATS
          </div>
          <div className="dashboard-navbar-subtitle">
            {getUserTypeLabel(userType)}
          </div>
        </div>
        
        <div className="dashboard-navbar-right">
          {/* Notifications */}
          <div className="notification-icon-container">
            <Bell 
              className="notification-icon" 
              onClick={onNotificationClick}
            />
            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount}
              </span>
            )}
          </div>

          {/* User Menu */}
          <div className="user-menu">
            <div className="user-info" onClick={onProfileClick}>
              <img
                src={userInfo.avatar}
                alt="Avatar"
                className="user-avatar"
              />
              <span className="user-name">{userInfo.name}</span>
            </div>
            
            {/* Dropdown Menu */}
            <div className="user-dropdown">
              <button 
                className="dropdown-item"
                onClick={onProfileClick}
              >
                <User className="dropdown-icon" />
                <span>Mon profil</span>
              </button>
              <button 
                className="dropdown-item"
                onClick={onSettingsClick}
              >
                <Settings className="dropdown-icon" />
                <span>Paramètres</span>
              </button>
              <hr className="dropdown-divider" />
              <button 
                className="dropdown-item logout"
                onClick={onLogoutClick}
              >
                <LogOut className="dropdown-icon" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;