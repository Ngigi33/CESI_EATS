import React from 'react';
import {
  User, Store, Menu, ShoppingBag, Truck, History,
  BarChart3, UserPlus
} from 'lucide-react';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 }, // Changed to English
  { id: 'account', label: 'My Account', icon: User }, // Changed to English
  { id: 'restaurants', label: 'My Restaurants', icon: Store }, // Changed to English
  { id: 'articles', label: 'Articles', icon: Menu },
  { id: 'menus', label: 'Menus', icon: Menu },
  { id: 'orders', label: 'Orders', icon: ShoppingBag }, // Changed to English
  { id: 'deliveries', label: 'Deliveries', icon: Truck }, // Changed to English
  { id: 'history', label: 'History', icon: History }, // Changed to English
  { id: 'statistics', label: 'Statistics', icon: BarChart3 }, // Changed to English
  { id: 'referral', label: 'Referral', icon: UserPlus }, // Changed to English
];

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {sidebarItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
            >
              <Icon className="sidebar-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;