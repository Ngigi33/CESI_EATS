import React, { useState, useEffect } from 'react';
import {
  User,
  Store,
  Menu,
  ShoppingBag,
  Truck,
  History,
  BarChart3,
  UserPlus,
  Bell,
  Plus,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  Search,
  Filter,
  Settings
} from 'lucide-react';
import './RestaurantOwnerDashboard.css'; // Import the CSS file

const RestaurantOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [restaurants, setRestaurants] = useState([]);
  const [articles, setArticles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentItem, setCurrentItem] = useState(null);

  // Simulated owner data
  const ownerId = 1;
  const ownerInfo = {
    id: 1,
    name: "Pierre Dubois",
    email: "pierre@cesieats.com",
    phone: "+33 6 12 34 56 78",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock data initialization
  useEffect(() => {
    // Simulate API calls to microservices
    setRestaurants([
      {
        id: 1,
        name: "Le Petit Bistro",
        address: "123 Rue de la Paix, Lyon",
        status: "open",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
        opening: "09:00",
        closing: "22:00",
        tags: ["français", "bistro", "traditionnel"],
        description: "Cuisine française traditionnelle",
        articles: []
      }
    ]);
    setArticles([
      {
        id: 1,
        restaurantId: 1,
        name: "Coq au Vin",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=200&h=150&fit=crop",
        description: "Plat traditionnel français",
        price: 18.50,
        type: "plat"
      },
      {
        id: 2,
        restaurantId: 1,
        name: "Tarte Tatin",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=200&h=150&fit=crop",
        description: "Dessert aux pommes caramélisées",
        price: 8.50,
        type: "dessert"
      }
    ]);
    setMenus([
      {
        id: 1,
        restaurantId: 1,
        name: "Menu du Chef",
        description: "Notre sélection de plats signature",
        category: "menu-complet",
        articles: [1, 2],
        price: 25.00
      }
    ]);
    setOrders([
      {
        id: 1,
        userId: 101,
        deliveryNumber: 2024001,
        restaurantId: 1,
        address: "456 Avenue Victor Hugo, Lyon",
        created: new Date().toISOString(),
        status: "pending",
        accepted: null,
        price: 25.00,
        menus: [1],
        articles: []
      },
      {
        id: 2,
        userId: 102,
        deliveryNumber: 2024002,
        restaurantId: 1,
        address: "789 Rue de la République, Lyon",
        created: new Date(Date.now() - 3600000).toISOString(),
        status: "accepted",
        accepted: true,
        price: 18.50,
        menus: [],
        articles: [1]
      }
    ]);
    setNotifications([
      {
        id: 1,
        type: "order",
        message: "Nouvelle commande #2024001",
        time: "Il y a 5 minutes",
        read: false
      },
      {
        id: 2,
        type: "delivery",
        message: "Livraison #2024002 terminée",
        time: "Il y a 1 heure",
        read: true
      }
    ]);
  }, []);

  const openModal = (type, item = null) => {
    setModalType(type);
    setCurrentItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentItem(null);
    setModalType('');
  };

  const handleOrderAction = (orderId, action) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: action, accepted: action === 'accepted' }
        : order
    ));
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.price, 0),
    avgOrderValue: orders.length > 0 ? (orders.reduce((sum, order) => sum + order.price, 0) / orders.length).toFixed(2) : 0
  };

  const Navigation = () => (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="navbar-logo">CESI EATS</div>
          <div className="navbar-subtitle">Dashboard Propriétaire</div>
        </div>
        <div className="navbar-right">
          <div className="notification-icon-container">
            <Bell className="notification-icon" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="notification-badge">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </div>
          <div className="user-info">
            <img
              src={ownerInfo.avatar}
              alt="Avatar"
              className="user-avatar"
            />
            <span className="user-name">{ownerInfo.name}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {[
          { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
          { id: 'account', label: 'Mon compte', icon: User },
          { id: 'restaurants', label: 'Mes restaurants', icon: Store },
          { id: 'articles', label: 'Articles', icon: Menu },
          { id: 'menus', label: 'Menus', icon: Menu },
          { id: 'orders', label: 'Commandes', icon: ShoppingBag },
          { id: 'deliveries', label: 'Livraisons', icon: Truck },
          { id: 'history', label: 'Historique', icon: History },
          { id: 'statistics', label: 'Statistiques', icon: BarChart3 },
          { id: 'referral', label: 'Parrainage', icon: UserPlus },
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
            >
              <Icon className="sidebar-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  const DashboardContent = () => (
    <div className="dashboard-content">
      <h1 className="dashboard-title">Tableau de bord</h1>

      {/* Stats Cards */}
      <div className="stats-cards-grid">
        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">Commandes totales</p>
            <p className="stat-card-value">{stats.totalOrders}</p>
          </div>
          <ShoppingBag className="stat-card-icon blue" />
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">En attente</p>
            <p className="stat-card-value orange">{stats.pendingOrders}</p>
          </div>
          <Bell className="stat-card-icon orange" />
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">Chiffre d'affaires</p>
            <p className="stat-card-value green">{stats.totalRevenue.toFixed(2)}€</p>
          </div>
          <BarChart3 className="stat-card-icon green" />
        </div>

        <div className="stat-card">
          <div className="stat-card-content">
            <p className="stat-card-label">Panier moyen</p>
            <p className="stat-card-value purple">{stats.avgOrderValue}€</p>
          </div>
          <Truck className="stat-card-icon purple" />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders-card">
        <div className="recent-orders-header">
          <h2 className="recent-orders-title">Commandes récentes</h2>
        </div>
        <div className="recent-orders-body">
          <div className="recent-orders-list">
            {orders.slice(0, 3).map(order => (
              <div key={order.id} className="recent-order-item">
                <div>
                  <p className="recent-order-number">Commande #{order.deliveryNumber}</p>
                  <p className="recent-order-address">{order.address}</p>
                  <p className="recent-order-time">{new Date(order.created).toLocaleString()}</p>
                </div>
                <div className="recent-order-status-price">
                  <span className={`order-status-badge ${
                    order.status === 'pending' ? 'status-pending' :
                    order.status === 'accepted' ? 'status-accepted' :
                    'status-default'
                  }`}>
                    {order.status === 'pending' ? 'En attente' :
                      order.status === 'accepted' ? 'Acceptée' : order.status}
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

  const AccountContent = () => (
    <div className="account-content">
      <div className="content-header">
        <h1 className="content-title">Mon compte</h1>
        <button
          onClick={() => openModal('account')}
          className="btn btn-primary"
        >
          <Edit className="btn-icon" />
          <span>Modifier</span>
        </button>
      </div>

      <div className="account-card">
        <div className="account-info">
          <img
            src={ownerInfo.avatar}
            alt="Avatar"
            className="account-avatar"
          />
          <div className="account-details">
            <h2 className="account-name">{ownerInfo.name}</h2>
            <p className="account-email">{ownerInfo.email}</p>
            <p className="account-phone">{ownerInfo.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const RestaurantsContent = () => (
    <div className="restaurants-content">
      <div className="content-header">
        <h1 className="content-title">Mes restaurants</h1>
        <button
          onClick={() => openModal('restaurant')}
          className="btn btn-primary"
        >
          <Plus className="btn-icon" />
          <span>Ajouter un restaurant</span>
        </button>
      </div>

      <div className="restaurant-grid">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="restaurant-image"
            />
            <div className="restaurant-card-body">
              <div className="restaurant-card-header">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <span className={`restaurant-status ${
                  restaurant.status === 'open' ? 'status-open' : 'status-closed'
                }`}>
                  {restaurant.status === 'open' ? 'Ouvert' : 'Fermé'}
                </span>
              </div>
              <p className="restaurant-address">{restaurant.address}</p>
              <p className="restaurant-description">{restaurant.description}</p>
              <div className="restaurant-card-footer">
                <div className="restaurant-hours">
                  {restaurant.opening} - {restaurant.closing}
                </div>
                <div className="restaurant-actions">
                  <button
                    onClick={() => openModal('restaurant', restaurant)}
                    className="action-btn edit-btn"
                  >
                    <Edit className="btn-icon" />
                  </button>
                  <button className="action-btn view-btn">
                    <Eye className="btn-icon" />
                  </button>
                  <button className="action-btn delete-btn">
                    <Trash2 className="btn-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ArticlesContent = () => (
    <div className="articles-content">
      <div className="content-header">
        <h1 className="content-title">Articles</h1>
        <button
          onClick={() => openModal('article')}
          className="btn btn-primary"
        >
          <Plus className="btn-icon" />
          <span>Ajouter un article</span>
        </button>
      </div>

      <div className="table-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">Article</th>
                <th className="table-header-cell">Type</th>
                <th className="table-header-cell">Prix</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article.id} className="table-row">
                  <td className="table-cell">
                    <div className="article-info">
                      <img
                        src={article.image}
                        alt={article.name}
                        className="article-image"
                      />
                      <div>
                        <p className="article-name">{article.name}</p>
                        <p className="article-description">{article.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="article-type-badge">
                      {article.type}
                    </span>
                  </td>
                  <td className="table-cell article-price">{article.price}€</td>
                  <td className="table-cell">
                    <div className="table-actions">
                      <button
                        onClick={() => openModal('article', article)}
                        className="action-btn edit-btn"
                      >
                        <Edit className="btn-icon" />
                      </button>
                      <button className="action-btn view-btn">
                        <Eye className="btn-icon" />
                      </button>
                      <button className="action-btn delete-btn">
                        <Trash2 className="btn-icon" />
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

  const OrdersContent = () => (
    <div className="orders-content">
      <h1 className="content-title">Commandes</h1>

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h3 className="order-number">Commande #{order.deliveryNumber}</h3>
                <p className="order-timestamp">{new Date(order.created).toLocaleString()}</p>
              </div>
              <div className="order-status-price-container">
                <span className={`order-status-badge ${
                  order.status === 'pending' ? 'status-pending' :
                  order.status === 'accepted' ? 'status-accepted' :
                  'status-default'
                }`}>
                  {order.status === 'pending' ? 'En attente' :
                    order.status === 'accepted' ? 'Acceptée' : order.status}
                </span>
                <span className="order-price">{order.price}€</span>
              </div>
            </div>

            <div className="order-details-actions">
              <div>
                <p className="order-detail-label">Adresse de livraison:</p>
                <p className="order-detail-value">{order.address}</p>
              </div>

              {order.status === 'pending' && (
                <div className="order-actions-buttons">
                  <button
                    onClick={() => handleOrderAction(order.id, 'accepted')}
                    className="btn btn-success"
                  >
                    <Check className="btn-icon" />
                    <span>Accepter</span>
                  </button>
                  <button
                    onClick={() => handleOrderAction(order.id, 'rejected')}
                    className="btn btn-danger"
                  >
                    <X className="btn-icon" />
                    <span>Refuser</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'account': return <AccountContent />;
      case 'restaurants': return <RestaurantsContent />;
      case 'articles': return <ArticlesContent />;
      case 'orders': return <OrdersContent />;
      default:
        return (
          <div className="under-development">
            <h2 className="under-development-title">Section en développement</h2>
            <p className="under-development-message">Cette fonctionnalité sera bientôt disponible.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <Navigation />
      <div className="main-layout">
        <Sidebar />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="notifications-panel">
        {notifications.filter(n => !n.read).slice(0, 3).map(notification => (
          <div key={notification.id} className="notification-card">
            <div className="notification-content">
              <Bell className="notification-card-icon" />
              <div className="notification-text">
                <p className="notification-message">{notification.message}</p>
                <p className="notification-time">{notification.time}</p>
              </div>
              <button className="notification-close-btn">
                <X className="close-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantOwnerDashboard;