import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Package,
  Search,
  Filter,
  Eye,
  Ban,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import './SalesDashboard.css';

const SalesDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  
  const [stats, setStats] = useState({
    totalRevenue: 45250.75,
    totalOrders: 1247,
    activeUsers: 3426,
    averageOrderValue: 36.30,
    pendingOrders: 23,
    completedOrders: 1224,
    cancelledOrders: 45,
    deliveryRate: 98.2
  });

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '06 12 34 56 78',
      status: 'active',
      totalOrders: 45,
      totalSpent: 1250.50,
      joinDate: '2024-01-15',
      lastOrder: '2024-06-19'
    },
    {
      id: 2,
      name: 'Marie Martin',
      email: 'marie.martin@email.com',
      phone: '06 98 76 54 32',
      status: 'suspended',
      totalOrders: 23,
      totalSpent: 680.25,
      joinDate: '2024-02-20',
      lastOrder: '2024-06-10'
    },
    {
      id: 3,
      name: 'Pierre Moreau',
      email: 'pierre.moreau@email.com',
      phone: '06 11 22 33 44',
      status: 'active',
      totalOrders: 67,
      totalSpent: 2150.80,
      joinDate: '2023-12-05',
      lastOrder: '2024-06-20'
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: '#ORD-001',
      customer: 'Jean Dupont',
      restaurant: 'Pizza Palace',
      amount: 28.50,
      status: 'pending',
      orderTime: '14:30',
      items: 3,
      paymentStatus: 'paid'
    },
    {
      id: '#ORD-002',
      customer: 'Marie Martin',
      restaurant: 'Burger King',
      amount: 45.20,
      status: 'preparing',
      orderTime: '14:25',
      items: 2,
      paymentStatus: 'paid'
    },
    {
      id: '#ORD-003',
      customer: 'Pierre Moreau',
      restaurant: 'Sushi Tokyo',
      amount: 67.80,
      status: 'delivered',
      orderTime: '13:45',
      items: 4,
      paymentStatus: 'paid'
    }
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return 'status-badge active';
      case 'suspended': return 'status-badge suspended';
      case 'pending': return 'status-badge pending';
      case 'preparing': return 'status-badge preparing';
      case 'delivered': return 'status-badge delivered';
      case 'cancelled': return 'status-badge cancelled';
      default: return 'status-badge';
    }
  };

  const suspendCustomer = (customerId) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId 
          ? { ...customer, status: customer.status === 'active' ? 'suspended' : 'active' }
          : customer
      )
    );
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const OverviewTab = () => (
    <div className="content-space">
      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-content">
            <div className="metric-icon green">
              <DollarSign />
            </div>
            <div className="metric-details">
              <p className="metric-label">Chiffre d'affaires</p>
              <p className="metric-value">{stats.totalRevenue.toLocaleString()}€</p>
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-content">
            <div className="metric-icon blue">
              <Package />
            </div>
            <div className="metric-details">
              <p className="metric-label">Commandes totales</p>
              <p className="metric-value">{stats.totalOrders.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-content">
            <div className="metric-icon purple">
              <Users />
            </div>
            <div className="metric-details">
              <p className="metric-label">Utilisateurs actifs</p>
              <p className="metric-value">{stats.activeUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-content">
            <div className="metric-icon orange">
              <TrendingUp />
            </div>
            <div className="metric-details">
              <p className="metric-label">Panier moyen</p>
              <p className="metric-value">{stats.averageOrderValue}€</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Order Monitoring */}
      <div className="order-monitoring">
        <div className="order-header">
          <h2>Suivi des commandes en temps réel</h2>
        </div>
        <div className="order-content">
          <div className="order-stats">
            <div className="order-stat">
              <div className="order-stat-value yellow">{stats.pendingOrders}</div>
              <div className="order-stat-label">En attente</div>
            </div>
            <div className="order-stat">
              <div className="order-stat-value green">{stats.completedOrders}</div>
              <div className="order-stat-label">Terminées</div>
            </div>
            <div className="order-stat">
              <div className="order-stat-value red">{stats.cancelledOrders}</div>
              <div className="order-stat-label">Annulées</div>
            </div>
          </div>
          
          <div className="order-list">
            {orders.map(order => (
              <div key={order.id} className="order-item">
                <div className="order-left">
                  <span className="order-id">{order.id}</span>
                  <span className="order-customer">{order.customer}</span>
                  <span className="order-restaurant">{order.restaurant}</span>
                </div>
                <div className="order-right">
                  <span className="order-amount">{order.amount}€</span>
                  <span className={getStatusClass(order.status)}>
                    {order.status}
                  </span>
                  <span className="order-time">{order.orderTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CustomersTab = () => (
    <div className="content-space">
      <div className="customer-management">
        <div className="customer-header">
          <div className="customer-header-content">
            <h2>Gestion des clients</h2>
            <div className="customer-controls">
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="filter-button">
                <Filter />
                Filtrer
              </button>
            </div>
          </div>
        </div>
        
        <div className="table-container">
          <table className="customer-table">
            <thead className="table-header">
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Statut</th>
                <th>Commandes</th>
                <th>Total dépensé</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="table-row">
                  <td className="table-cell">
                    <div>
                      <div className="customer-name">{customer.name}</div>
                      <div className="customer-join-date">Inscrit le {customer.joinDate}</div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="customer-email">{customer.email}</div>
                    <div className="customer-phone">{customer.phone}</div>
                  </td>
                  <td className="table-cell">
                    <span className={getStatusClass(customer.status)}>
                      {customer.status === 'active' ? 'Actif' : 'Suspendu'}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="customer-orders">{customer.totalOrders}</span>
                  </td>
                  <td className="table-cell">
                    <span className="customer-spent">{customer.totalSpent}€</span>
                  </td>
                  <td className="table-cell">
                    <div className="action-buttons">
                      <button className="action-button view">
                        <Eye />
                      </button>
                      <button className="action-button edit">
                        <Edit />
                      </button>
                      <button 
                        onClick={() => suspendCustomer(customer.id)}
                        className={`action-button ${customer.status === 'active' ? 'suspend' : 'activate'}`}
                      >
                        <Ban />
                      </button>
                      <button className="action-button delete">
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="content-space">
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Évolution du chiffre d'affaires</h3>
          <div className="chart-placeholder">
            <div>
              <BarChart3 />
              <p>Graphique des revenus</p>
            </div>
          </div>
        </div>
        
        <div className="analytics-card">
          <h3>Répartition des commandes</h3>
          <div className="chart-placeholder">
            <div>
              <PieChart />
              <p>Graphique en secteurs</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="performance-metrics">
        <h3>Métriques de performance</h3>
        <div className="performance-grid">
          <div className="performance-item green">
            <div className="performance-value green">{stats.deliveryRate}%</div>
            <div className="performance-label">Taux de livraison</div>
          </div>
          <div className="performance-item blue">
            <div className="performance-value blue">{stats.averageOrderValue}€</div>
            <div className="performance-label">Panier moyen</div>
          </div>
          <div className="performance-item purple">
            <div className="performance-value purple">{((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)}%</div>
            <div className="performance-label">Taux de satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-title">
              <h1>CESI EATS</h1>
              <span className="header-subtitle">Département des Ventes</span>            
              </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="tabs">
        <button
          className={activeTab === 'overview' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('overview')}
        >
          Vue d'ensemble
        </button>
        <button
          className={activeTab === 'customers' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('customers')}
        >
          Clients
        </button>
        <button
          className={activeTab === 'analytics' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('analytics')}
        >
          Statistiques
        </button>
      </div>

      {/* Tab Content */}
      <main className="main-content">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'customers' && <CustomersTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
      </main>
    </div>
  );
};

export default SalesDashboard;
