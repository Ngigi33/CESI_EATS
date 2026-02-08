import React, { useState, useEffect } from 'react';
import './ThirdPartyDeveloper.css'; // Import your CSS file here

const ThirdPartyDeveloper = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [developer, setDeveloper] = useState({
    id: 'DEV-001',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    company: 'TechSolutions',
    apiKey: 'dk_test_51NpZQwSI6Z9V8z9V8z9V8z9V8',
    status: 'active',
    registeredDate: '03/15/2023'
  });

  const [components, setComponents] = useState([
    { id: 'CMP-001', name: 'Authentication API', version: '2.1.0', downloads: 345, status: 'available' },
    { id: 'CMP-002', name: 'Payment Gateway', version: '1.5.2', downloads: 289, status: 'available' },
    { id: 'CMP-003', name: 'Delivery Tracker', version: '3.0.1', downloads: 521, status: 'available' },
    { id: 'CMP-004', name: 'Restaurant Menu API', version: '2.3.4', downloads: 412, status: 'available' },
    { id: 'CMP-005', name: 'User Management', version: '1.2.0', downloads: 198, status: 'available' }
  ]);

  const [apiUsage, setApiUsage] = useState([
    { date: '06/14/2025', endpoint: '/api/v1/orders', count: 234, status: 'successful' },
    { date: '06/14/2025', endpoint: '/api/v1/menu', count: 156, status: 'successful' },
    { date: '06/13/2025', endpoint: '/api/v1/users', count: 89, status: 'successful' },
    { date: '06/12/2025', endpoint: '/api/v1/payments', count: 45, status: 'successful' },
    { date: '06/11/2025', endpoint: '/api/v1/authentication', count: 321, status: 'successful' }
  ]);

  return (
    <div className="developer-container">
      <div className="developer-header">
        <h1 className="developer-title">CESI EATS - Developer Portal</h1>
        <div className="developer-info">
          <div className="developer-avatar">
            {developer.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="developer-name">{developer.name}</p>
            <p className="developer-company">{developer.company}</p>
          </div>
        </div>
      </div>

      <div className="developer-tabs">
        <button
          className={activeTab === 'account' ? 'developer-tab-button active' : 'developer-tab-button'}
          onClick={() => setActiveTab('account')}
        >
          My Account
        </button>
        <button
          className={activeTab === 'apiUsage' ? 'developer-tab-button active' : 'developer-tab-button'}
          onClick={() => setActiveTab('apiUsage')}
        >
          API Usage
        </button>
        <button
          className={activeTab === 'components' ? 'developer-tab-button active' : 'developer-tab-button'}
          onClick={() => setActiveTab('components')}
        >
          Available Components
        </button>
        <button
          className={activeTab === 'documentation' ? 'developer-tab-button active' : 'developer-tab-button'}
          onClick={() => setActiveTab('documentation')}
        >
          Documentation
        </button>
      </div>

      <div className="developer-content">
        {activeTab === 'account' && (
          <div>
            <h2 className="section-title">Account Information</h2>
            <div className="account-info">
              <div className="info-row">
                <span className="info-label">ID:</span>
                <span className="info-value">{developer.id}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Name:</span>
                <span className="info-value">{developer.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{developer.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Company:</span>
                <span className="info-value">{developer.company}</span>
              </div>
              <div className="info-row">
                <span className="info-label">API Key:</span>
                <div className="api-key-container">
                  <span className="api-key">{developer.apiKey}</span>
                  <button className="copy-button">Copy</button>
                </div>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span className="status-badge">{developer.status}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Registration Date:</span>
                <span className="info-value">{developer.registeredDate}</span>
              </div>
            </div>

            <div className="account-actions">
              <button className="action-button">Edit Account</button>
              <button className="action-button">Regenerate API Key</button>
              <button className="action-button delete">Delete Account</button>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div>
            <h2 className="section-title">Available Components</h2>
            <p className="section-description">
              Integrate these components into your applications to use CESI EATS services.
            </p>

            <div className="search-container">
              <input
                type="text"
                placeholder="Search for a component..."
                className="search-input"
              />
              <button className="search-button">Search</button>
            </div>

            <div className="components-grid">
              {components.map(component => (
                <div key={component.id} className="component-card">
                  <div className="component-header">
                    <h3 className="component-name">{component.name}</h3>
                    <span className="component-version">v{component.version}</span>
                  </div>
                  <p className="component-downloads">{component.downloads} downloads</p>
                  <div className="component-actions">
                    <button className="download-button">Download</button>
                    <button className="docs-button">Documentation</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'apiUsage' && (
          <div>
            <h2 className="section-title">API Usage</h2>
            <div className="api-usage-stats">
              <div className="stat-card">
                <h3 className="stat-value">1,845</h3>
                <p className="stat-label">API Calls This Month</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-value">99.8%</h3>
                <p className="stat-label">Success Rate</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-value">120ms</h3>
                <p className="stat-label">Average Response Time</p>
              </div>
            </div>

            <h3 className="table-title">Recent History</h3>
            <table className="api-usage-table">
              <thead>
                <tr>
                  <th className="table-header">Date</th>
                  <th className="table-header">Endpoint</th>
                  <th className="table-header">Call Count</th>
                  <th className="table-header">Status</th>
                </tr>
              </thead>
              <tbody>
                {apiUsage.map((entry, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                    <td className="table-cell">{entry.date}</td>
                    <td className="table-cell">{entry.endpoint}</td>
                    <td className="table-cell">{entry.count}</td>
                    <td className="table-cell">
                      <span className="status-badge-success">{entry.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'documentation' && (
          <div>
            <h2 className="section-title">Technical Documentation</h2>
            <p className="doc-intro">
              The CESI EATS platform offers a hybrid architecture combining service-oriented architecture,
              enterprise service bus, and microservices. It provides secure, asynchronous, message-based data communication.
            </p>

            <div className="doc-section">
              <h3 className="doc-section-title">Endpoint</h3>
              <ul className="doc-list">
                <li>Secure and interoperable binding for heterogeneous systems</li>
                <li>Application authenticity verification (app token)</li>
                <li>Asynchronous communication via message exchange</li>
              </ul>
            </div>

            <div className="doc-section">
              <h3 className="doc-section-title">Service Layer</h3>
              <ul className="doc-list">
                <li>Exposure of all services offered by the platform</li>
                <li>Detailed technical documentation for developers</li>
              </ul>
            </div>

            <div className="doc-section">
              <h3 className="doc-section-title">Local Middleware</h3>
              <p className="doc-text">
                {/* Set of APIs responsible for local message processing from the platform (platform → application),
                pre-processing of messages sent to the platform (application → platform), and/or local services
                not provided by the platform (because they are specific to the application). */}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThirdPartyDeveloper;
