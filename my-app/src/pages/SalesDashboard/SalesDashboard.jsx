import React, { useState, useEffect } from 'react';

const SalesDepartment = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // States for backend data
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [articles, setArticles] = useState([]);
  const [customers, setCustomers] = useState([]); // This will be generated from orders initially

  // States for dashboard statistics
  const [dashboardStats, setDashboardStats] = useState({
    ordersInProgress: 0,
    ordersApproved: 0,
    deliveriesInProgress: 0,
    deliveriesCompleted: 0,
    totalRevenue: 0,
    processSteps: {
      orderPlacement: 0,
      orderApproval: 0,
      deliveryApproval: 0,
      deliveryPayment: 0
    }
  });

  // Base URLs for microservices
  const API_URLS = {
    orders: 'http://localhost:4003/orders',
    restaurants: 'http://localhost:4004/restaurants',
    articles: 'http://localhost:4005/articles'
    // You might add a customers service here if you have one:
    // customers: 'http://localhost:400X/customers',
  };

  /**
   * Utility function for making API requests.
   * Handles common headers and error checking.
   */
  const apiRequest = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      if (!response.ok) {
        // Attempt to read error message from response if available
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  };

  /**
   * Loads all necessary data from microservices.
   * Includes error handling for individual service unavailability.
   */
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Load orders
      try {
        const ordersData = await apiRequest(API_URLS.orders);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (err) {
        console.warn('Orders service unavailable or returned invalid data:', err);
        setOrders([]);
      }

      // Load restaurants
      try {
        const restaurantsData = await apiRequest(API_URLS.restaurants);
        setRestaurants(Array.isArray(restaurantsData) ? restaurantsData : []);
      } catch (err) {
        console.warn('Restaurants service unavailable or returned invalid data:', err);
        setRestaurants([]);
      }

      // Load articles
      try {
        const articlesResponse = await apiRequest(API_URLS.articles);
        // Backend might return { articles: [...] } or just [...]
        const articlesData = articlesResponse.articles || articlesResponse || [];
        setArticles(Array.isArray(articlesData) ? articlesData : []);
      } catch (err) {
        console.warn('Articles service unavailable or returned invalid data:', err);
        setArticles([]);
      }

      // Generate fictitious customer data based on orders, AFTER orders are loaded
      // In a real app, you'd fetch actual customer data from a customer microservice
      // try {
      //   const customersData = await apiRequest(API_URLS.customers);
      //   setCustomers(Array.isArray(customersData) ? customersData : []);
      // } catch (err) {
      //   console.warn('Customers service unavailable:', err);
      //   setCustomers([]);
      // }
      // For now, generating from orders:
      generateCustomersFromOrders();

    } catch (loadError) {
      setError('An error occurred while loading data. Please try again.');
      console.error('Overall Load data error:', loadError);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Calculates and updates dashboard statistics based on current orders data.
   */
  const calculateDashboardStats = () => {
    const stats = {
      ordersInProgress: orders.filter(order => ['pending', 'processing', 'shipping'].includes(order.status)).length,
      ordersApproved: orders.filter(order => ['approved', 'completed', 'delivered'].includes(order.status)).length,
      deliveriesInProgress: orders.filter(order => ['shipping'].includes(order.status)).length,
      deliveriesCompleted: orders.filter(order => ['delivered', 'completed'].includes(order.status)).length,
      totalRevenue: orders.reduce((sum, order) => sum + (order.total || order.amount || 0), 0),
      processSteps: {
        orderPlacement: orders.filter(order => order.status === 'pending').length,
        orderApproval: orders.filter(order => order.status === 'processing').length,
        deliveryApproval: orders.filter(order => order.status === 'approved').length, // Assuming 'approved' means delivery approved
        deliveryPayment: orders.filter(order => order.status === 'completed').length // Assuming 'completed' means payment received
      }
    };
    setDashboardStats(stats);
  };

  /**
   * Generates a list of unique customers based on the fetched orders.
   * This is a fallback/demonstration; ideally, customer data comes from a dedicated service.
   */
  const generateCustomersFromOrders = () => {
    const uniqueCustomers = new Map();

    orders.forEach((order, index) => {
      const customerId = order.userId || order.customerId || `guest_${index + 1}`;
      if (!uniqueCustomers.has(customerId)) {
        uniqueCustomers.set(customerId, {
          id: customerId,
          name: order.customerName || `Customer ${index + 1}`,
          email: order.customerEmail || `customer${index + 1}@email.com`,
          status: Math.random() > 0.8 ? 'suspended' : 'active', // Fictitious status
          orders: 1
        });
      } else {
        const customer = uniqueCustomers.get(customerId);
        customer.orders += 1;
      }
    });

    // Add some default customers if no orders were loaded
    if (uniqueCustomers.size === 0 && customers.length === 0) { // Only add defaults if no customers exist yet
      const defaultCustomers = [
        { id: 'cust_001', name: 'Alice Smith', email: 'alice.smith@example.com', status: 'active', orders: 5 },
        { id: 'cust_002', name: 'Bob Johnson', email: 'bob.j@example.com', status: 'active', orders: 3 },
        { id: 'cust_003', name: 'Charlie Brown', email: 'charlie.b@example.com', status: 'suspended', orders: 1 }
      ];
      setCustomers(defaultCustomers);
    } else if (uniqueCustomers.size > 0) {
      setCustomers(Array.from(uniqueCustomers.values()));
    }
  };

  /**
   * Handles actions (suspend, activate, delete) on customer accounts.
   * This is currently client-side state update; real implementation needs API calls.
   */
  const handleCustomerAction = async (customerId, action) => {
    try {
      if (action === 'delete') {
        if (!window.confirm(`Are you sure you want to delete customer ${customerId}?`)) {
          return; // User cancelled
        }
        setCustomers(prev => prev.filter(customer => customer.id !== customerId));
        // await apiRequest(`${API_URLS.customers}/${customerId}`, { method: 'DELETE' });
        console.log(`Customer ${customerId} deleted (client-side only).`);
      } else {
        const newStatus = action === 'suspend' ? 'suspended' : 'active';
        setCustomers(prev =>
          prev.map(customer =>
            customer.id === customerId ? { ...customer, status: newStatus } : customer
          )
        );
        // await apiRequest(`${API_URLS.customers}/${customerId}/status`, {
        //   method: 'PUT',
        //   body: JSON.stringify({ status: newStatus })
        // });
        console.log(`Customer ${customerId} status changed to ${newStatus} (client-side only).`);
      }
    } catch (actionError) {
      setError(`Error performing action on customer ${customerId}: ${actionError.message}`);
      console.error('Customer action error:', actionError);
    }
  };

  /**
   * Creates a new order via API.
   */
  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      const newOrder = await apiRequest(API_URLS.orders, {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
      setOrders(prev => [...prev, newOrder]); // Add new order to state
      console.log('Order created:', newOrder);
      return newOrder;
    } catch (createError) {
      setError(`Error creating order: ${createError.message}`);
      console.error('Error creating order:', createError);
      throw createError; // Re-throw to allow calling component to handle
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates an existing order via API.
   */
  const updateOrder = async (orderId, updateData) => {
    try {
      setLoading(true);
      const updatedOrder = await apiRequest(`${API_URLS.orders}/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
      });
      // Update the specific order in the state
      setOrders(prev => prev.map(order => order._id === orderId ? updatedOrder : order));
      console.log('Order updated:', updatedOrder);
      return updatedOrder;
    } catch (updateError) {
      setError(`Error updating order ${orderId}: ${updateError.message}`);
      console.error('Error updating order:', updateError);
      throw updateError; // Re-throw to allow calling component to handle
    } finally {
      setLoading(false);
    }
  };

  // --- Effects ---
  useEffect(() => {
    loadData(); // Load initial data when the component mounts
  }, []);

  useEffect(() => {
    // Recalculate dashboard stats and regenerate customer list whenever orders change
    calculateDashboardStats();
    generateCustomersFromOrders();
  }, [orders]); // Depend on 'orders' state

  // --- Render Functions for Tabs ---

  const renderDashboard = () => (
    <div className="dashboard-container">
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading data...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadData} className="retry-button">Retry</button>
        </div>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-card orders">
          <h3>Orders</h3>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{dashboardStats.ordersInProgress}</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{dashboardStats.ordersApproved}</span>
              <span className="stat-label">Approved</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card deliveries">
          <h3>Deliveries</h3>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{dashboardStats.deliveriesInProgress}</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{dashboardStats.deliveriesCompleted}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card revenue">
          <h3>Total Sales</h3>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">€{dashboardStats.totalRevenue.toFixed(2)}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card process-monitor">
          <h3>Process Monitoring</h3>
          <div className="process-list">
            <div className="process-item">
              <span className="process-step">Order Placement</span>
              <span className="process-count">{dashboardStats.processSteps.orderPlacement}</span>
            </div>
            <div className="process-item">
              <span className="process-step">Order Approval</span>
              <span className="process-count">{dashboardStats.processSteps.orderApproval}</span>
            </div>
            <div className="process-item">
              <span className="process-step">Delivery Approval</span>
              <span className="process-count">{dashboardStats.processSteps.deliveryApproval}</span>
            </div>
            <div className="process-item">
              <span className="process-step">Delivery Payment</span>
              <span className="process-count">{dashboardStats.processSteps.deliveryPayment}</span>
            </div>
          </div>
        </div>

        {/* Restaurants Card */}
        <div className="dashboard-card restaurants-overview">
          <h3>Partner Restaurants</h3>
          <div className="restaurants-stats">
            <div className="stat-item">
              <span className="stat-number">{restaurants.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{restaurants.filter(r => r.status === 'open').length}</span>
              <span className="stat-label">Open</span>
            </div>
          </div>
          <div className="restaurants-list">
            {restaurants.slice(0, 3).map(restaurant => (
              <div key={restaurant._id} className="restaurant-item">
                <span className="restaurant-name">{restaurant.name}</span>
                <span className={`restaurant-status ${restaurant.status === 'open' ? 'open' : 'closed'}`}>
                  {restaurant.status === 'open' ? 'Open' : 'Closed'}
                </span>
              </div>
            ))}
            {restaurants.length > 3 && (
              <p style={{textAlign: 'center', fontSize: '0.875rem', color: '#718096'}}>
                And {restaurants.length - 3} more...
              </p>
            )}
          </div>
        </div>

        {/* Popular Articles Card */}
        <div className="dashboard-card popular-articles">
          <h3>Popular Articles</h3>
          <div className="articles-list">
            {articles.slice(0, 5).map(article => (
              <div key={article._id} className="article-item">
                <span className="article-name">{article.name}</span>
                <span className="article-price">€{article.price}</span>
              </div>
            ))}
            {articles.length === 0 && <p style={{textAlign: 'center', color: '#718096'}}>No articles found.</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerManagement = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{
          margin: 0,
          color: '#2d3748',
          fontSize: '1.5rem',
          fontWeight: '700'
        }}>Customer Account Management</h2>
        <input
          type="text"
          placeholder="Search for a customer..."
          style={{
            padding: '0.75rem 1rem',
            border: '2px solid #e2e8f0',
            borderRadius: '25px',
            outline: 'none',
            fontSize: '1rem',
            minWidth: '250px'
          }}
        />
      </div>

      <div style={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(135deg, #ff6b35, #f7931e)' }}>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>ID</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>Name</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>Email</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>Orders</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map(customer => (
                <tr key={customer.id} style={{
                  opacity: customer.status === 'suspended' ? 0.7 : 1,
                  background: customer.status === 'suspended' ? 'rgba(255, 71, 87, 0.05)' : 'transparent'
                }}>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>{customer.id}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>{customer.name}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>{customer.email}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      background: customer.status === 'active' ? 'rgba(247, 147, 30, 0.2)' : 'rgba(255, 71, 87, 0.2)',
                      color: customer.status === 'active' ? '#e67e22' : '#e53e3e'
                    }}>
                      {customer.status === 'active' ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>{customer.orders}</td>
                  <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        style={{
                          padding: '0.5rem 1rem',
                          border: 'none',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          background: 'rgba(255, 107, 53, 0.2)',
                          color: '#ff6b35'
                        }}
                        onClick={() => console.log('Edit customer', customer.id)}
                      >
                        Edit
                      </button>
                      {customer.status === 'active' ? (
                        <button
                          style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            background: 'rgba(237, 137, 54, 0.2)',
                            color: '#dd6b20'
                          }}
                          onClick={() => handleCustomerAction(customer.id, 'suspend')}
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            background: 'rgba(247, 147, 30, 0.2)',
                            color: '#f7931e'
                          }}
                          onClick={() => handleCustomerAction(customer.id, 'activate')}
                        >
                          Activate
                        </button>
                      )}
                      <button
                        style={{
                          padding: '0.5rem 1rem',
                          border: 'none',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          background: 'rgba(245, 101, 101, 0.2)',
                          color: '#e53e3e'
                        }}
                        onClick={() => handleCustomerAction(customer.id, 'delete')}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '1rem', textAlign: 'center', color: '#718096' }}>
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrdersManagement = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <h2 style={{
          margin: 0,
          color: '#2d3748',
          fontSize: '1.5rem',
          fontWeight: '700'
        }}>Order Management</h2>
        <input
          type="text"
          placeholder="Search for an order..."
          style={{
            padding: '0.75rem 1rem',
            border: '2px solid #e2e8f0',
            borderRadius: '25px',
            outline: 'none',
            fontSize: '1rem',
            minWidth: '250px'
          }}
        />
      </div>

      <div style={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
          <thead>
            <tr style={{ background: 'linear-gradient(135deg, #ff6b35, #f7931e)' }}>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>ID</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>Customer</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>Restaurant</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>Total</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>Date</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: 'white', fontWeight: '700' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => {
                const customer = customers.find(c => c.id === (order.userId || order.customerId));
                const restaurant = restaurants.find(r => r._id === order.restaurantId);
                const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A';

                return (
                  <tr key={order._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem' }}>{order._id ? order._id.substring(0, 8) + '...' : 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{customer ? customer.name : 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>{restaurant ? restaurant.name : 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>€{(order.total || order.amount || 0).toFixed(2)}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        background: order.status === 'completed' ? 'rgba(34, 197, 94, 0.2)' :
                                    order.status === 'pending' ? 'rgba(247, 147, 30, 0.2)' :
                                    order.status === 'cancelled' ? 'rgba(239, 68, 68, 0.2)' :
                                    'rgba(100, 116, 139, 0.2)',
                        color: order.status === 'completed' ? '#16a34a' :
                               order.status === 'pending' ? '#e67e22' :
                               order.status === 'cancelled' ? '#dc2626' :
                               '#4b5563'
                      }}>
                        {order.status || 'unknown'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>{orderDate}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <button
                          style={{
                            padding: '0.5rem 1rem',
                            border: 'none',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            background: 'rgba(255, 107, 53, 0.2)',
                            color: '#ff6b35'
                          }}
                          onClick={() => console.log('View Order Details:', order._id)}
                        >
                          Details
                        </button>
                        {order.status === 'pending' && (
                          <button
                            style={{
                              padding: '0.5rem 1rem',
                              border: 'none',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              background: 'rgba(237, 137, 54, 0.2)',
                              color: '#dd6b20'
                            }}
                            onClick={() => updateOrder(order._id, { status: 'approved' })}
                          >
                            Approve
                          </button>
                        )}
                        {order.status !== 'completed' && order.status !== 'cancelled' && (
                          <button
                            style={{
                              padding: '0.5rem 1rem',
                              border: 'none',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              background: 'rgba(245, 101, 101, 0.2)',
                              color: '#e53e3e'
                            }}
                            onClick={() => updateOrder(order._id, { status: 'cancelled' })}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: '1rem', textAlign: 'center', color: '#718096' }}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '25px',
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            color: 'white',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)'
          }}
          onClick={() => createOrder({
            customerId: customers[0]?.id || `new_customer_${Date.now()}`,
            restaurantId: restaurants[0]?._id || `new_restaurant_${Date.now()}`,
            items: articles.length > 0 ? [{ articleId: articles[0]._id, quantity: 1, price: articles[0].price }] : [{ articleId: 'default_item_id', quantity: 1, price: 5.00 }],
            total: articles.length > 0 ? articles[0].price : 5.00,
            status: 'pending',
            customerName: customers[0]?.name || 'New Customer',
            customerEmail: customers[0]?.email || `newcustomer${Date.now()}@example.com`,
          })}
        >
          Create New Order (Example)
        </button>
      </div>
    </div>
  );

  // --- Main Component Render ---
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#2d3748'
    }}>
      {/* Navigation */}
      <nav style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '0.5rem 2rem',
        display: 'flex',
        gap: '1rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <button
          style={{
            padding: '0.5rem 1.2rem',
            border: 'none',
            borderRadius: '25px',
            background: activeTab === 'dashboard' ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'transparent',
            color: activeTab === 'dashboard' ? 'white' : '#4a5568',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: activeTab === 'dashboard' ? 'translateY(-2px)' : 'none',
            boxShadow: activeTab === 'dashboard' ? '0 8px 25px rgba(255, 107, 53, 0.3)' : 'none',
            outline: 'none',
          }}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          style={{
            padding: '0.5rem 1.2rem',
            border: 'none',
            borderRadius: '25px',
            background: activeTab === 'customers' ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'transparent',
            color: activeTab === 'customers' ? 'white' : '#4a5568',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: activeTab === 'customers' ? 'translateY(-2px)' : 'none',
            boxShadow: activeTab === 'customers' ? '0 8px 25px rgba(255, 107, 53, 0.3)' : 'none',
            outline: 'none',
          }}
          onClick={() => setActiveTab('customers')}
        >
          Customer Management
        </button>
        <button
          style={{
            padding: '0.5rem 1.2rem',
            border: 'none',
            borderRadius: '25px',
            background: activeTab === 'orders' ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'transparent',
            color: activeTab === 'orders' ? 'white' : '#4a5568',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: activeTab === 'orders' ? 'translateY(-2px)' : 'none',
            boxShadow: activeTab === 'orders' ? '0 8px 25px rgba(255, 107, 53, 0.3)' : 'none',
            outline: 'none',
          }}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        {/* Placeholder for Notifications (Bell Icon) */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '1.5rem',
              color: '#4a5568',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.5rem',
              borderRadius: '50%',
              background: 'transparent',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 107, 53, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            onClick={() => alert('Notifications coming soon!')} // Placeholder for notification display
          >
            🔔
            {/* Example notification badge - you'd manage count with state */}
            {false && ( // Set to true to see the badge
              <span style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: '#e53e3e',
                color: 'white',
                borderRadius: '50%',
                padding: '0.2rem 0.5rem',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                lineHeight: '1',
              }}>
                3
              </span>
            )}
          </span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main style={{ padding: '2rem' }}>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'customers' && renderCustomerManagement()}
        {activeTab === 'orders' && renderOrdersManagement()}
      </main>

      {/* --- Embedded Styles for the Component --- */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .loading-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          margin-bottom: 2rem;
          color: #4a5568;
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #ff6b35;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .error-message {
          background: rgba(255, 71, 87, 0.1);
          border: 1px solid rgba(255, 71, 87, 0.3);
          color: #e53e3e;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          text-align: center;
          font-weight: 600;
        }
        .retry-button {
          background: #ff6b35;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 0.5rem;
          font-weight: 600;
          transition: background 0.2s ease;
        }
        .retry-button:hover {
          background: #e65c2a;
        }
        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .dashboard-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .dashboard-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        .dashboard-card h3 {
          margin: 0 0 1.5rem 0;
          color: #2d3748;
          font-size: 1.25rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .stats {
          display: flex;
          justify-content: space-around;
          gap: 1rem;
        }
        .stat-item {
          text-align: center;
          flex: 1;
        }
        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          color: #ff6b35;
          margin-bottom: 0.5rem;
        }
        .stat-label {
          display: block;
          color: #718096;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .process-monitor {
          grid-column: span 2; /* Occupies two columns on larger screens */
        }
        .process-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .process-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(255, 107, 53, 0.1);
          border-radius: 12px;
          border-left: 4px solid #ff6b35;
        }
        .process-step {
          font-weight: 600;
          color: #2d3748;
        }
        .process-count {
          background: #ff6b35;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          min-width: 40px;
          text-align: center;
        }
        .restaurants-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 1rem;
        }
        .restaurants-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .restaurant-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background: rgba(255, 107, 53, 0.05);
          border-radius: 8px;
        }
        .restaurant-name {
          font-weight: 600;
          color: #2d3748;
        }
        .restaurant-status {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: bold;
        }
        .restaurant-status.open {
          background: rgba(34, 197, 94, 0.2);
          color: #16a34a;
        }
        .restaurant-status.closed {
          background: rgba(239, 68, 68, 0.2);
          color: #dc2626;
        }
        .articles-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .article-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          background: rgba(255, 107, 53, 0.05);
          border-radius: 8px;
        }
        .article-name {
          font-weight: 600;
          color: #2d3748;
        }
        .article-price {
          color: #ff6b35;
          font-weight: bold;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .process-monitor {
            grid-column: span 1;
          }
          .stats {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SalesDepartment;