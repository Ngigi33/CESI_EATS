import React, { useState, useEffect } from 'react';
import './ThirdPartyDeveloper.css'; // Importez votre fichier CSS ici

const ThirdPartyDeveloper = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [developer, setDeveloper] = useState({
    id: 'DEV-001',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    company: 'TechSolutions',
    apiKey: 'dk_test_51NpZQwSI6Z9V8z9V8z9V8z9V8',
    status: 'active',
    registeredDate: '15/03/2023'
  });

  const [components, setComponents] = useState([
    { id: 'CMP-001', name: 'Authentification API', version: '2.1.0', downloads: 345, status: 'available' },
    { id: 'CMP-002', name: 'Payment Gateway', version: '1.5.2', downloads: 289, status: 'available' },
    { id: 'CMP-003', name: 'Delivery Tracker', version: '3.0.1', downloads: 521, status: 'available' },
    { id: 'CMP-004', name: 'Restaurant Menu API', version: '2.3.4', downloads: 412, status: 'available' },
    { id: 'CMP-005', name: 'User Management', version: '1.2.0', downloads: 198, status: 'available' }
  ]);

  const [apiUsage, setApiUsage] = useState([
    { date: '14/06/2025', endpoint: '/api/v1/orders', count: 234, status: 'successful' },
    { date: '14/06/2025', endpoint: '/api/v1/menu', count: 156, status: 'successful' },
    { date: '13/06/2025', endpoint: '/api/v1/users', count: 89, status: 'successful' },
    { date: '12/06/2025', endpoint: '/api/v1/payments', count: 45, status: 'successful' },
    { date: '11/06/2025', endpoint: '/api/v1/authentication', count: 321, status: 'successful' }
  ]);

  // Supprimez l'objet 'styles' d'ici
  // const styles = { ... };

  return (
    <div className="developer-container">
      <div className="developer-header">
        <h1 className="developer-title">CESI EATS - Portail Développeur</h1>
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
          Mon compte
        </button>
        <button
          className={activeTab === 'apiUsage' ? 'developer-tab-button active' : 'developer-tab-button'}
          onClick={() => setActiveTab('apiUsage')}
        >
          Utilisation API
        </button>
        <button
          className={activeTab === 'components' ? 'developer-tab-button active' : 'developer-tab-button'}
          onClick={() => setActiveTab('components')}
        >
          Composants disponibles
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
            <h2 className="section-title">Informations du compte</h2>
            <div className="account-info">
              <div className="info-row">
                <span className="info-label">ID:</span>
                <span className="info-value">{developer.id}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Nom:</span>
                <span className="info-value">{developer.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{developer.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Société:</span>
                <span className="info-value">{developer.company}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Clé API:</span>
                <div className="api-key-container">
                  <span className="api-key">{developer.apiKey}</span>
                  <button className="copy-button">Copier</button>
                </div>
              </div>
              <div className="info-row">
                <span className="info-label">Statut:</span>
                <span className="status-badge">{developer.status}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Date d'inscription:</span>
                <span className="info-value">{developer.registeredDate}</span>
              </div>
            </div>

            <div className="account-actions">
              <button className="action-button">Modifier le compte</button>
              <button className="action-button">Régénérer la clé API</button>
              <button className="action-button delete">Supprimer le compte</button>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div>
            <h2 className="section-title">Composants disponibles</h2>
            <p className="section-description">
              Intégrez ces composants dans vos applications pour utiliser les services de CESI EATS.
            </p>

            <div className="search-container">
              <input
                type="text"
                placeholder="Rechercher un composant..."
                className="search-input"
              />
              <button className="search-button">Rechercher</button>
            </div>

            <div className="components-grid">
              {components.map(component => (
                <div key={component.id} className="component-card">
                  <div className="component-header">
                    <h3 className="component-name">{component.name}</h3>
                    <span className="component-version">v{component.version}</span>
                  </div>
                  <p className="component-downloads">{component.downloads} téléchargements</p>
                  <div className="component-actions">
                    <button className="download-button">Télécharger</button>
                    <button className="docs-button">Documentation</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'apiUsage' && (
          <div>
            <h2 className="section-title">Utilisation de l'API</h2>
            <div className="api-usage-stats">
              <div className="stat-card">
                <h3 className="stat-value">1,845</h3>
                <p className="stat-label">Appels API ce mois</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-value">99.8%</h3>
                <p className="stat-label">Taux de réussite</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-value">120ms</h3>
                <p className="stat-label">Temps de réponse moyen</p>
              </div>
            </div>

            <h3 className="table-title">Historique récent</h3>
            <table className="api-usage-table">
              <thead>
                <tr>
                  <th className="table-header">Date</th>
                  <th className="table-header">Endpoint</th>
                  <th className="table-header">Nombre d'appels</th>
                  <th className="table-header">Statut</th>
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
            <h2 className="section-title">Documentation technique</h2>
            <p className="doc-intro">
              La plateforme CESI EATS offre une architecture hybride entre une architecture orientée services,
              un bus de services d'entreprise et une architecture microservices. Elle fournit une liaison de
              données sécurisée et asynchrone, orientée message.
            </p>

            <div className="doc-section">
              <h3 className="doc-section-title">Point de terminaison (Endpoint)</h3>
              <ul className="doc-list">
                <li>Liaison sécurisée et interopérable pour systèmes hétérogènes</li>
                <li>Vérification de l'authenticité des applications (token app)</li>
                <li>Communication asynchrone par échange de messages</li>
              </ul>
            </div>

            <div className="doc-section">
              <h3 className="doc-section-title">Couche de services</h3>
              <ul className="doc-list">
                <li>Exposition de tous les services offerts par la plateforme</li>
                <li>Documentation technique détaillée pour les développeurs</li>
              </ul>
            </div>

            <div className="doc-section">
              <h3 className="doc-section-title">Middleware local</h3>
              <p className="doc-text">
                {/* Ensemble d'APIs responsables du traitement local des messages provenant de la plateforme
                (plateforme -> application), ou du prétraitement du message envoyé à la plateforme
                (application -> plateforme), et/ou des services locaux non offerts par la plateforme
                (car spécifiques à l'application). */}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThirdPartyDeveloper;