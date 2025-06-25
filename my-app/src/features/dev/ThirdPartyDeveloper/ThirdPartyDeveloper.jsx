import React, { useState } from 'react';
import { 
  User, 
  BarChart3, 
  Package, 
  FileText,
  Code,
  Clock
} from 'lucide-react';
import './ThirdPartyDeveloper.css';

const ThirdPartyDeveloper = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabContent = {
    account: {
      title: 'Account Management',
      subtitle: 'Manage your developer account and API credentials'
    },
    apiUsage: {
      title: 'API Usage Analytics',
      subtitle: 'Monitor your API calls, performance metrics and usage statistics'
    },
    components: {
      title: 'Component Library',
      subtitle: 'Browse and download available components for integration'
    },
    documentation: {
      title: 'Developer Documentation',
      subtitle: 'Technical guides, API references and integration tutorials'
    }
  };

  return (
    <div className="developer-container">
      <div className="developer-tabs">
        <button
          className={activeTab === 'account' ? 'developer-tab-button active' : 'developer-tab-button'}
          onClick={() => setActiveTab('account')}
        >
          <User size={20} style={{ marginRight: '0.5rem' }} />
          Account
        </button>
        <button
          className={activeTab === 'apiUsage' ? 'developer-tab-button active' : 'developer-tab-button'}
          onClick={() => setActiveTab('apiUsage')}
        >
          <BarChart3 size={20} style={{ marginRight: '0.5rem' }} />
          API Usage
        </button>
        <button
          className={activeTab === 'components' ? 'developer-tab-button active' : 'developer-tab-button'}
          onClick={() => setActiveTab('components')}
        >
          <Package size={20} style={{ marginRight: '0.5rem' }} />
          Components
        </button>
        <button
          className={activeTab === 'documentation' ? 'developer-tab-button active' : 'developer-tab-button'}
          onClick={() => setActiveTab('documentation')}
        >
          <FileText size={20} style={{ marginRight: '0.5rem' }} />
          Documentation
        </button>
      </div>

      <div className="developer-content">
        <div className="tab-title">
          <h1>{tabContent[activeTab].title}</h1>
          <p className="tab-subtitle">{tabContent[activeTab].subtitle}</p>
        </div>
        
        <div className="under-development">
          <Code size={80} className="under-development-icon" />
          <h2>Under Development</h2>
          <p>This feature is currently being developed by our team.</p>
          <p>We're working hard to bring you the best developer experience possible.</p>
          <div className="coming-soon">
            <Clock size={16} />
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyDeveloper;