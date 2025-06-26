import React, { useState, useEffect } from 'react';
import { FileText, ShoppingBag, Building2, Menu, ExternalLink, Zap, Globe, RefreshCw } from 'lucide-react';
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


const ApiDocsViewer = () => {
  const [activeUrl, setActiveUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const apiEndpoints = [
    {
      name: 'Orders',
      url: 'http://localhost:4002/api-docs/order',
      icon: <ShoppingBag className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
      description: 'Gestion des commandes et paiements'
    },
    {
      name: 'Restaurant',
      url: 'http://localhost:4002/api-docs/restaurant',
      icon: <Building2 className="w-5 h-5" />,
      color: 'from-emerald-500 to-emerald-600',
      hoverColor: 'from-emerald-600 to-emerald-700',
      description: 'Informations des restaurants'
    },
    {
      name: 'Menu',
      url: 'http://localhost:4002/api-docs/menu',
      icon: <Menu className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'from-purple-600 to-purple-700',
      description: 'Cartes et menus disponibles'
    },
    {
      name: 'Article',
      url: 'http://localhost:4002/api-docs/article',
      icon: <Package className="w-5 h-5" />,
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'from-orange-600 to-orange-700',
      description: 'Articles et produits'
    }
  ];

  const handleLoadPage = (url) => {
    setIsLoading(true);
    setLoadError(false);
    setActiveUrl(url);
    
    // Simuler un délai de chargement réaliste
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError(true);
  };

  const refreshPage = () => {
    if (activeUrl) {
      handleLoadPage(activeUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header avec effet glassmorphism */}
      <div className="backdrop-blur-md bg-white/80 shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Documentation API
                </h1>
                <p className="text-gray-600 mt-1">Interface moderne pour explorer vos APIs</p>
              </div>
            </div>
            
            {activeUrl && (
              <button
                onClick={refreshPage}
                className="flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white/90 rounded-lg shadow-md transition-all duration-200 border border-gray-200/50"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm font-medium">Actualiser</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Cards avec animations */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Sélectionnez une documentation</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {apiEndpoints.map((endpoint, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <button
                  onClick={() => handleLoadPage(endpoint.url)}
                  className={`w-full h-full bg-gradient-to-br ${endpoint.color} hover:${endpoint.hoverColor} text-white p-6 transition-all duration-300 group-hover:scale-105`}
                >
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        {endpoint.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{endpoint.name}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {endpoint.description}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                      <ExternalLink className="w-4 h-4" />
                      <span>Ouvrir la documentation</span>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Zone de contenu principal */}
        {activeUrl ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/50 w-full">
            {/* Barre d'informations */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200/50 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Documentation active</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    En ligne
                  </span>
                </div>
              </div>
            </div>

            {/* Zone iframe avec loading amélioré */}
            <div className="relative" style={{ height: '90vh' }}>
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center z-20">
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-blue-400 animate-pulse"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Chargement de la documentation
                    </h3>
                    <p className="text-gray-600">Préparation de l'interface...</p>
                  </div>
                </div>
              )}

              {loadError ? (
                <div className="h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ExternalLink className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Impossible de charger la documentation
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Vérifiez que le serveur est en marche sur le port 4002
                    </p>
                    <button
                      onClick={refreshPage}
                      className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                    >
                      Réessayer
                    </button>
                  </div>
                </div>
              ) : (
                <iframe style={{ height: 'calc(100vh - 200px)' }}
                  src={activeUrl}
                  className="w-full h-full border-0"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  title="Documentation API"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              )}
            </div>
            
            {/* Footer de l'iframe */}
            <div className="bg-gray-50/80 backdrop-blur-sm px-6 py-3 border-t border-gray-200/50 flex-shrink-0">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="text-sm text-gray-600 truncate flex-1 min-w-0">
                  <span className="font-medium">URL :</span> 
                  <span className="ml-2 font-mono text-xs bg-gray-200 px-2 py-1 rounded">
                    {activeUrl}
                  </span>
                </p>
                <a
                  href={activeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Ouvrir dans un nouvel onglet</span>
                  <span className="sm:hidden">Nouvel onglet</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Placeholder état initial amélioré */
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-16 text-center border border-white/50">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Prêt à explorer vos APIs
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Sélectionnez une documentation dans les cartes ci-dessus pour commencer. 
                Chaque section offre une interface interactive complète.
              </p>
              
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>4 endpoints disponibles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Documentation interactive</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer moderne */}
      <footer className="bg-white/70 backdrop-blur-sm border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              <span className="font-medium">API Documentation Viewer</span> - Interface moderne pour vos documentations
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Version 2.0</span>
              <span>•</span>
              <span>Optimisé pour l'expérience utilisateur</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export { ApiDocsViewer };

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
          <ApiDocsViewer />
        )}
      </main>
    </div>
  );
};

export default Support;