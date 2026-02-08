import React, { useState } from 'react';
import './SalesDepartment.css';

const SalesDepartment = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Smith', email: 'john@email.com', status: 'active', orders: 15 },
    { id: 2, name: 'Mary Johnson', email: 'mary@email.com', status: 'active', orders: 8 },
    { id: 3, name: 'Peter Wilson', email: 'peter@email.com', status: 'suspended', orders: 3 },
  ]);

  const [dashboardData] = useState({
    ordersInProgress: 127,
    ordersApproved: 89,
    deliveriesInProgress: 45,
    deliveriesCompleted: 234,
    totalRevenue: 15420.50
  });

  const handleCustomerAction = (customerId, action) => {
    setCustomers(prev =>
      prev
        .map(customer => {
          if (customer.id === customerId) {
            switch (action) {
              case 'suspend': return { ...customer, status: 'suspended' };
              case 'activate': return { ...customer, status: 'active' };
              case 'delete': return null;
              default: return customer;
            }
          }
          return customer;
        })
        .filter(Boolean)
    );
  };

  const renderDashboard = () => (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        <div className="dashboard-card orders">
          <h3>Orders</h3>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{dashboardData.ordersInProgress}</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{dashboardData.ordersApproved}</span>
              <span className="stat-label">Approved</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card deliveries">
          <h3>Deliveries</h3>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{dashboardData.deliveriesInProgress}</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{dashboardData.deliveriesCompleted}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card revenue">
          <h3>Revenue</h3>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">€{dashboardData.totalRevenue.toFixed(2)}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card process-monitor">
          <h3>Process Monitoring</h3>
          <div className="process-list">
            <div className="process-item">
              <span className="process-step">Order Placement</span>
              <span className="process-count">23</span>
            </div>
            <div className="process-item">
              <span className="process-step">Order Approval</span>
              <span className="process-count">15</span>
            </div>
            <div className="process-item">
              <span className="process-step">Delivery Approval</span>
              <span className="process-count">12</span>
            </div>
            <div className="process-item">
              <span className="process-step">Delivery Payment</span>
              <span className="process-count">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerManagement = () => (
    <div className="customer-management">
      <div className="section-header">
        <h2>Customer Account Management</h2>
        <input 
          type="text" 
          placeholder="Search customer..." 
          className="search-input"
        />
      </div>
      
      <div className="customer-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className={customer.status}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>
                  <span className={`status-badge ${customer.status}`}>
                    {customer.status === 'active' ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td>{customer.orders}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-edit"
                      onClick={() => console.log('Edit', customer.id)}
                    >
                      Edit
                    </button>
                    {customer.status === 'active' ? (
                      <button 
                        className="btn-suspend"
                        onClick={() => handleCustomerAction(customer.id, 'suspend')}
                      >
                        Suspend
                      </button>
                    ) : (
                      <button 
                        className="btn-activate"
                        onClick={() => handleCustomerAction(customer.id, 'activate')}
                      >
                        Activate
                      </button>
                    )}
                    <button 
                      className="btn-delete"
                      onClick={() => handleCustomerAction(customer.id, 'delete')}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="sales-department">
      <nav className="navigation">
        <button 
          className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-button ${activeTab === 'customers' ? 'active' : ''}`}
          onClick={() => setActiveTab('customers')}
        >
          Customer Management
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'customers' && renderCustomerManagement()}
      </main>
    </div>
  );
};

export default SalesDepartment;
