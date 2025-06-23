import React from 'react';
import { ShoppingBag, Bell, BarChart3, Truck } from 'lucide-react';

const DashboardContent = ({ stats, orders }) => {
  return (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Dashboard</h1> {/* Changed to English */}

      {/* Stats Cards */}
      <div className="stats-cards-grid">
        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">Total Orders</p> {/* Changed to English */}
            <p className="stat-card-value">{stats.totalOrders}</p>
          </div>
          <ShoppingBag className="stat-card-icon blue" />
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">Pending</p> {/* Changed to English */}
            <p className="stat-card-value orange">{stats.pendingOrders}</p>
          </div>
          <Bell className="stat-card-icon orange" />
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">Revenue</p> {/* Changed to English */}
            <p className="stat-card-value green">{stats.totalRevenue.toFixed(2)}€</p>
          </div>
          <BarChart3 className="stat-card-icon green" />
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">Avg. Order Value</p> {/* Changed to English */}
            <p className="stat-card-value purple">{stats.avgOrderValue}€</p>
          </div>
          <Truck className="stat-card-icon purple" />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders-card">
        <div className="recent-orders-header">
          <h2 className="recent-orders-title">Recent Orders</h2> {/* Changed to English */}
        </div>
        <div className="recent-orders-body">
          <div className="recent-orders-list">
            {orders.slice(0, 3).map(order => (
              <div key={order.id} className="recent-order-item">
                <div>
                  <p className="recent-order-number">Order #{order.deliveryNumber}</p> {/* Changed to English */}
                  <p className="recent-order-address">{order.address}</p>
                  <p className="recent-order-time">{new Date(order.created).toLocaleString()}</p>
                </div>
                <div className="recent-order-status-price">
                  <span className={`order-status-badge ${
                    order.status === 'pending' ? 'status-pending' :
                    order.status === 'accepted' ? 'status-accepted' :
                    'status-default'
                  }`}>
                    {order.status === 'pending' ? 'Pending' : // Changed to English
                      order.status === 'accepted' ? 'Accepted' : order.status} {/* Changed to English */}
                  </span>
                  <span className="recent-order-price">{order.price}€</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;