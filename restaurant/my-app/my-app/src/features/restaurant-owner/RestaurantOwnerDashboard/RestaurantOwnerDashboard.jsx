import React, { useState, useEffect } from 'react';
import {
  User, Store, Menu, ShoppingBag, Truck, History, BarChart3,CirclePlus,
  UserPlus, Edit
} from 'lucide-react';

import './RestaurantOwnerDashboard.css';
import Navbar from '../../../components/Navbar/Navbar';
//import Add from '../../../pages/Add/Add';
import List from '../../../pages/List/List';

const RestaurantOwnerDashboard = ({ setShowLogin }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [restaurants, setRestaurants] = useState([]);
  const [articles, setArticles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);

  const ownerInfo = {
    id: 1,
    name: "Pierre Dubois",
    email: "pierre@cesieats.com",
    phone: "+33 6 12 34 56 78",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  useEffect(() => {
    setRestaurants([
      {
        id: 1,
        name: "Le Petit Bistro",
        address: "123 Rue de la Paix, Lyon",
        status: "open",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
        opening: "09:00",
        closing: "22:00",
        tags: ["French", "bistro", "traditional"],
        description: "Traditional French cuisine"
      }
    ]);
    setArticles([
      {
        id: 1,
        restaurantId: 1,
        name: "Coq au Vin",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=200&h=150&fit=crop",
        description: "Traditional French dish",
        price: 18.5,
        type: "main"
      },
      {
        id: 2,
        restaurantId: 1,
        name: "Tarte Tatin",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=200&h=150&fit=crop",
        description: "Caramelized apple dessert",
        price: 8.5,
        type: "dessert"
      }
    ]);
    setMenus([
      {
        id: 1,
        restaurantId: 1,
        name: "Chef's Menu",
        description: "Our selection of signature dishes",
        category: "full-menu",
        articles: [1, 2],
        price: 25.0
      }
    ]);
    setOrders([
      {
        id: 1,
        userId: 101,
        deliveryNumber: 2024001,
        restaurantId: 1,
        address: "456 Avenue Victor Hugo, Lyon",
        created: new Date().toISOString(),
        status: "pending",
        accepted: null,
        price: 25.0,
        menus: [1],
        articles: []
      },
      {
        id: 2,
        userId: 102,
        deliveryNumber: 2024002,
        restaurantId: 1,
        address: "789 Rue de la République, Lyon",
        created: new Date(Date.now() - 3600000).toISOString(),
        status: "accepted",
        accepted: true,
        price: 18.5,
        menus: [],
        articles: [1]
      }
    ]);
  }, []);

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.price, 0),
    avgOrderValue:
      orders.length > 0
        ? (orders.reduce((sum, order) => sum + order.price, 0) / orders.length).toFixed(2)
        : 0
  };

  const Sidebar = () => (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'addItems', label: 'Add items', icon: CirclePlus },
          { id: 'listItems', label: 'List Items', icon: Menu },
          { id: 'orders', label: 'Orders', icon: ShoppingBag },
          { id: 'history', label: 'History', icon: History },
          { id: 'statistics', label: 'Statistics', icon: BarChart3 },
          { id: 'referral', label: 'Referrals', icon: UserPlus }
        ].map(item => {
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

  const DashboardContent = () => (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="stats-cards-grid">
        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">Total Orders</p>
            <p className="stat-card-value">{stats.totalOrders}</p>
          </div>
          <ShoppingBag className="stat-card-icon blue" />
        </div>
        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">Pending</p>
            <p className="stat-card-value orange">{stats.pendingOrders}</p>
          </div>
          {/* Removed Bell icon since notifications are removed */}
          <BarChart3 className="stat-card-icon orange" />
        </div>
        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">Revenue</p>
            <p className="stat-card-value green">{stats.totalRevenue.toFixed(2)}€</p>
          </div>
          <BarChart3 className="stat-card-icon green" />
        </div>
        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">Average Order</p>
            <p className="stat-card-value purple">{stats.avgOrderValue}€</p>
          </div>
          <Truck className="stat-card-icon purple" />
        </div>
      </div>

      <div className="recent-orders-card">
        <h2 className="recent-orders-title">Recent Orders</h2>
        <div className="recent-orders-list">
          {orders.slice(0, 3).map(order => (
            <div key={order.id} className="recent-order-item">
              <div>
                <p className="recent-order-number">Order #{order.deliveryNumber}</p>
                <p className="recent-order-address">{order.address}</p>
                <p className="recent-order-time">{new Date(order.created).toLocaleString()}</p>
              </div>
              <div className="recent-order-status-price">
                <span className={`order-status-badge ${
                  order.status === 'pending' ? 'status-pending' :
                  order.status === 'accepted' ? 'status-accepted' : 'status-default'
                }`}>
                  {order.status === 'pending' ? 'Pending' :
                   order.status === 'accepted' ? 'Accepted' : order.status}
                </span>
                <span className="recent-order-price">{order.price}€</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
     

  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'addItems': return <Add />;
      case 'listItems': return <List/>;

      default:
        return (
          <div className="under-development">
            <h2 className="under-development-title">Section in development</h2>
            <p className="under-development-message">This feature will be available soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-layout">
        <Sidebar />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
      {/* Removed notifications panel */}
    </div>
  );
};

export default RestaurantOwnerDashboard;
