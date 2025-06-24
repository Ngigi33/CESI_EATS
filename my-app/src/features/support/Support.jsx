import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Database, 
  Activity, 
  Download, 
  Route, 
  Server, 
  Bell, 
  Plus, 
  Trash2, 
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Package
} from 'lucide-react';
import './Support.css';

const Support = () => {
  const [activeTab, setActiveTab] = useState('components');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'warning', message: 'High CPU usage detected on server-03', time: '2 min ago' },
    { id: 2, type: 'success', message: 'New microservice deployed successfully', time: '5 min ago' },
    { id: 3, type: 'info', message: 'Component downloaded 15 times today', time: '10 min ago' }
  ]);

  const [components, setComponents] = useState([
    { id: 1, name: 'Payment API', version: '2.1.4', downloads: 1250, status: 'active' },
    { id: 2, name: 'User Authentication', version: '1.8.2', downloads: 890, status: 'active' },
    { id: 3, name: 'Order Management', version: '3.0.1', downloads: 2100, status: 'active' },
    { id: 4, name: 'Notification Service', version: '1.5.0', downloads: 567, status: 'maintenance' }
  ]);

  const [servers, setServers] = useState([
    { id: 1, name: 'API Gateway', cpu: 45, memory: 62, status: 'healthy', uptime: '99.9%' },
    { id: 2, name: 'Database Server', cpu: 78, memory: 85, status: 'warning', uptime: '99.5%' },
    { id: 3, name: 'Cache Server', cpu: 32, memory: 48, status: 'healthy', uptime: '100%' },
    { id: 4, name: 'File Storage', cpu: 21, memory: 35, status: 'healthy', uptime: '99.8%' }
  ]);

  const [routes, setRoutes] = useState([
    { id: 1, path: '/api/orders', method: 'POST', latency: '45ms', requests: 1250 },
    { id: 2, path: '/api/users', method: 'GET', latency: '23ms', requests: 2100 },
    { id: 3, path: '/api/restaurants', method: 'GET', latency: '67ms', requests: 890 },
    { id: 4, path: '/api/deliveries', method: 'PUT', latency: '89ms', requests: 567 }
  ]);

  const [connectionLogs, setConnectionLogs] = useState([
    { id: 1, user: 'restaurant_owner_123', ip: '192.168.1.100', timestamp: '2024-06-23 14:30:15', status: 'success' },
    { id: 2, user: 'end_user_456', ip: '10.0.0.50', timestamp: '2024-06-23 14:28:42', status: 'success' },
    { id: 3, user: 'delivery_driver_789', ip: '172.16.0.25', timestamp: '2024-06-23 14:25:33', status: 'failed' },
    { id: 4, user: 'developer_321', ip: '203.0.113.45', timestamp: '2024-06-23 14:22:18', status: 'success' }
  ]);

  const addComponent = () => {
    const newComponent = {
      id: components.length + 1,
      name: 'New Component',
      version: '1.0.0',
      downloads: 0,
      status: 'active'
    };
    setComponents([...components, newComponent]);
  };

  const deleteComponent = (id) => {
    setComponents(components.filter(comp => comp.id !== id));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'healthy': case 'active': case 'success': return 'status-success';
      case 'warning': case 'maintenance': return 'status-warning';
      case 'failed': case 'error': return 'status-error';
      default: return 'status-info';
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="support-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>CESI EATS - Technical Assistance Dashboard</h1>
          <div className="notifications-wrapper">
            <div className="notification-bell">
              <Bell size={24} />
              {notifications.length > 0 && (
                <span className="notification-count">{notifications.length}</span>
              )}
            </div>
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                  <button onClick={clearNotifications} className="clear-btn">Clear All</button>
                )}
              </div>
              {notifications.length === 0 ? (
                <div className="no-notifications">No new notifications</div>
              ) : (
                notifications.map(notif => (
                  <div key={notif.id} className={`notification-item ${notif.type}`}>
                    <div className="notification-content">
                      <p>{notif.message}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-nav">
        <button 
          className={activeTab === 'components' ? 'active' : ''} 
          onClick={() => setActiveTab('components')}
        >
          <Package size={20} />
          Components
        </button>
        <button 
          className={activeTab === 'performance' ? 'active' : ''} 
          onClick={() => setActiveTab('performance')}
        >
          <Activity size={20} />
          Performance
        </button>
        <button 
          className={activeTab === 'logs' ? 'active' : ''} 
          onClick={() => setActiveTab('logs')}
        >
          <Database size={20} />
          Connection Logs
        </button>
        <button 
          className={activeTab === 'routes' ? 'active' : ''} 
          onClick={() => setActiveTab('routes')}
        >
          <Route size={20} />
          Route Management
        </button>
        <button 
          className={activeTab === 'deployment' ? 'active' : ''} 
          onClick={() => setActiveTab('deployment')}
        >
          <Server size={20} />
          Deployment
        </button>
      </div>

      <main className="dashboard-content">
        {activeTab === 'components' && (
          <div className="tab-content">
            <div className="section-header">
              <h2>Reusable Components Management</h2>
              <button className="add-btn" onClick={addComponent}>
                <Plus size={20} />
                Add Component
              </button>
            </div>
            <div className="components-grid">
              {components.map(component => (
                <div key={component.id} className="component-card">
                  <div className="component-header">
                    <h3>{component.name}</h3>
                    <span className={`status-badge ${getStatusColor(component.status)}`}>
                      {component.status}
                    </span>
                  </div>
                  <div className="component-details">
                    <p>Version: {component.version}</p>
                    <p>Downloads: {component.downloads}</p>
                  </div>
                  <div className="component-actions">
                    <button className="view-btn">
                      <Eye size={16} />
                    </button>
                    <button className="delete-btn" onClick={() => deleteComponent(component.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="tab-content">
            <h2>Server Performance Statistics</h2>
            <div className="performance-grid">
              {servers.map(server => (
                <div key={server.id} className="performance-card">
                  <div className="server-header">
                    <h3>{server.name}</h3>
                    <span className={`status-badge ${getStatusColor(server.status)}`}>
                      {server.status}
                    </span>
                  </div>
                  <div className="metrics">
                    <div className="metric">
                      <label>CPU Usage</label>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${server.cpu}%`, backgroundColor: server.cpu > 70 ? '#ff6b35' : '#4CAF50'}}
                        ></div>
                      </div>
                      <span>{server.cpu}%</span>
                    </div>
                    <div className="metric">
                      <label>Memory Usage</label>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${server.memory}%`, backgroundColor: server.memory > 80 ? '#ff6b35' : '#4CAF50'}}
                        ></div>
                      </div>
                      <span>{server.memory}%</span>
                    </div>
                    <div className="uptime">
                      <label>Uptime: {server.uptime}</label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="tab-content">
            <h2>Connection Logs</h2>
            <div className="logs-table">
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>IP Address</th>
                    <th>Timestamp</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {connectionLogs.map(log => (
                    <tr key={log.id}>
                      <td>{log.user}</td>
                      <td>{log.ip}</td>
                      <td>{log.timestamp}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'routes' && (
          <div className="tab-content">
            <h2>Route Orchestration</h2>
            <div className="routes-table">
              <table>
                <thead>
                  <tr>
                    <th>Route Path</th>
                    <th>Method</th>
                    <th>Average Latency</th>
                    <th>Requests/Hour</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map(route => (
                    <tr key={route.id}>
                      <td><code>{route.path}</code></td>
                      <td><span className="method-badge">{route.method}</span></td>
                      <td>{route.latency}</td>
                      <td>{route.requests}</td>
                      <td>
                        <button className="edit-btn">
                          <Settings size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'deployment' && (
          <div className="tab-content">
            <h2>Service Deployment</h2>
            <div className="deployment-section">
              <div className="deployment-card">
                <h3>Deploy New Service</h3>
                <div className="deployment-form">
                  <div className="form-group">
                    <label>Service Name</label>
                    <input type="text" placeholder="Enter service name" />
                  </div>
                  <div className="form-group">
                    <label>Docker Image</label>
                    <input type="text" placeholder="registry/image:tag" />
                  </div>
                  <div className="form-group">
                    <label>Environment</label>
                    <select>
                      <option>Production</option>
                      <option>Staging</option>
                      <option>Development</option>
                    </select>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="deploy-btn">
                      Deploy Service
                    </button>
                  </div>
                </div>
              </div>
              <div className="deployment-status">
                <h3>Recent Deployments</h3>
                <div className="deployment-history">
                  <div className="deployment-item">
                    <CheckCircle className="status-icon success" size={20} />
                    <div className="deployment-info">
                      <p>Payment Service v2.1.4</p>
                      <span>Deployed 2 hours ago</span>
                    </div>
                  </div>
                  <div className="deployment-item">
                    <Clock className="status-icon pending" size={20} />
                    <div className="deployment-info">
                      <p>Notification Service v1.5.1</p>
                      <span>Deploying...</span>
                    </div>
                  </div>
                  <div className="deployment-item">
                    <CheckCircle className="status-icon success" size={20} />
                    <div className="deployment-info">
                      <p>User Auth Service v1.8.3</p>
                      <span>Deployed 1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Support;