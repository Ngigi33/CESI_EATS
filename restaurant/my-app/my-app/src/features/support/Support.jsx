import React, { useState } from 'react';
import { 
  Settings, 
  Database, 
  Activity, 
  Route, 
  Server, 
  Package,
  Code,
  Clock
} from 'lucide-react';
import './Support.css';

const Support = () => {
  const [activeTab, setActiveTab] = useState('components');

  const tabContent = {
    components: {
      title: 'Components Management',
      subtitle: 'Reusable components library and management system'
    },
    performance: {
      title: 'Performance Monitoring',
      subtitle: 'Real-time server performance and health monitoring'
    },
    logs: {
      title: 'Connection Logs',
      subtitle: 'User connection tracking and audit logs'
    },
    routes: {
      title: 'Route Management',
      subtitle: 'API route orchestration and configuration'
    },
    deployment: {
      title: 'Service Deployment',
      subtitle: 'Automated deployment and service management'
    }
  };

  return (
    <div className="support-dashboard">
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
          Logs
        </button>
        <button 
          className={activeTab === 'routes' ? 'active' : ''} 
          onClick={() => setActiveTab('routes')}
        >
          <Route size={20} />
          Routes
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
        <div className="tab-content">
          <div className="tab-title">
            <h1>{tabContent[activeTab].title}</h1>
            <p className="tab-subtitle">{tabContent[activeTab].subtitle}</p>
          </div>
          
          <div className="under-development">
            <Code size={80} className="under-development-icon" />
            <h2>Under Development</h2>
            <p>This feature is currently being developed by our team.</p>
            <p>We're working hard to bring you the best experience possible.</p>
            <div className="coming-soon">
              <Clock size={16} style={{ marginRight: '0.5rem' }} />
              Coming Soon
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;