import React, { useState, useEffect } from 'react';
import { Package, MapPin, Check, X, Clock, Navigation, Phone, Star, TrendingUp } from 'lucide-react';
import './DeliveryDashboard.css'; // <--- IMPORT YOUR NEW CSS FILE HERE

const DeliveryDashboard = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [deliveries, setDeliveries] = useState({
    available: [
      {
        id: 1,
        restaurant: 'Pizza Palace',
        customer: 'Jean Dupont',
        address: '123 Rue de la Paix, Paris',
        distance: '2.5 km',
        payment: '15.50€',
        time: '30 min',
        items: 3
      },
      {
        id: 2,
        restaurant: 'Burger King',
        customer: 'Marie Martin',
        address: '456 Avenue des Champs, Paris',
        distance: '1.8 km',
        payment: '22.30€',
        time: '25 min',
        items: 2
      }
    ],
    active: [
      {
        id: 3,
        restaurant: 'Sushi Tokyo',
        customer: 'Pierre Moreau',
        address: '789 Boulevard Saint-Germain, Paris',
        distance: '3.2 km',
        payment: '45.00€',
        status: 'picked_up',
        estimatedTime: '15 min'
      }
    ],
    completed: [
      {
        id: 4,
        restaurant: 'McDonald\'s',
        customer: 'Sophie Leroy',
        address: '321 Rue de Rivoli, Paris',
        payment: '18.90€',
        rating: 5,
        completedAt: '14:30'
      }
    ]
  });
  const [stats, setStats] = useState({
    todayEarnings: 125.50,
    deliveriesCompleted: 8,
    averageRating: 4.8,
    totalDistance: 45.2
  });

  const acceptDelivery = (deliveryId) => {
    const delivery = deliveries.available.find(d => d.id === deliveryId);
    if (delivery) {
      setDeliveries(prev => ({
        ...prev,
        available: prev.available.filter(d => d.id !== deliveryId),
        active: [...prev.active, { ...delivery, status: 'accepted' }]
      }));
    }
  };

  const rejectDelivery = (deliveryId) => {
    setDeliveries(prev => ({
      ...prev,
      available: prev.available.filter(d => d.id !== deliveryId)
    }));
  };

  const updateDeliveryStatus = (deliveryId, status) => {
    setDeliveries(prev => ({
      ...prev,
      active: prev.active.map(d =>
        d.id === deliveryId ? { ...d, status } : d
      )
    }));
  };

  const completeDelivery = (deliveryId) => {
    const delivery = deliveries.active.find(d => d.id === deliveryId);
    if (delivery) {
      setDeliveries(prev => ({
        ...prev,
        active: prev.active.filter(d => d.id !== deliveryId),
        completed: [...prev.completed, {
          ...delivery,
          rating: 5,
          completedAt: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        }]
      }));
      setStats(prev => ({
        ...prev,
        todayEarnings: prev.todayEarnings + parseFloat(delivery.payment.replace('€', '')),
        deliveriesCompleted: prev.deliveriesCompleted + 1
      }));
    }
  };

  const DeliveryCard = ({ delivery, type }) => (
    <div className="delivery-card">
      <div className="delivery-card-header">
        <div className="delivery-info">
          <h3>{delivery.restaurant}</h3>
          <p>Client: {delivery.customer}</p>
        </div>
        <div className="delivery-payment">
          <span>{delivery.payment}</span>
          {type === 'completed' && (
            <div className="delivery-rating">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{delivery.rating}</span>
            </div>
          )}
        </div>
      </div>

      <div className="delivery-address">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{delivery.address}</span>
      </div>

      <div className="delivery-details-actions">
        <div className="delivery-meta">
          {delivery.distance && (
            <span>
              <Navigation className="w-4 h-4 mr-1" />
              {delivery.distance}
            </span>
          )}
          {delivery.time && (
            <span>
              <Clock className="w-4 h-4 mr-1" />
              {delivery.time}
            </span>
          )}
          {delivery.items && (
            <span>
              <Package className="w-4 h-4 mr-1" />
              {delivery.items} articles
            </span>
          )}
        </div>

        {type === 'available' && (
          <div className="action-buttons">
            <button
              onClick={() => rejectDelivery(delivery.id)}
              className="action-button action-button-red"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={() => acceptDelivery(delivery.id)}
              className="action-button action-button-green"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        )}

        {type === 'active' && (
          <div className="action-buttons">
            {delivery.status === 'accepted' && (
              <button
                onClick={() => updateDeliveryStatus(delivery.id, 'picked_up')}
                className="action-button action-button-blue"
              >
                Récupéré
              </button>
            )}
            {delivery.status === 'picked_up' && (
              <button
                onClick={() => completeDelivery(delivery.id)}
                className="action-button action-button-green"
              >
                Livré
              </button>
            )}
          </div>
        )}

        {type === 'completed' && (
          <span className="delivery-completed-time">Livré à {delivery.completedAt}</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-inner">
          <div className="header-content">
            <div className="header-title-section">
              <h1>CESI EATS</h1>
              <span className="header-subtitle">Livreur</span>
            </div>
            <div className="header-user-info">
              <div className="user-earnings">
                <p>Aujourd'hui</p>
                <p>{stats.todayEarnings}€</p>
              </div>
              <div className="user-avatar">
                DL
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="page-content-wrapper">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-wrapper stat-icon-green">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Gains du jour</p>
                <p className="stat-value">{stats.todayEarnings}€</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-wrapper stat-icon-blue">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Livraisons</p>
                <p className="stat-value">{stats.deliveriesCompleted}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-wrapper stat-icon-yellow">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Note moyenne</p>
                <p className="stat-value">{stats.averageRating}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-wrapper stat-icon-purple">
                <Navigation className="w-6 h-6 text-purple-600" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Distance</p>
                <p className="stat-value">{stats.totalDistance} km</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs-nav-wrapper">
            <nav className="tabs-nav">
              <button
                onClick={() => setActiveTab('available')}
                className={`tab-button ${activeTab === 'available' ? 'active' : ''}`}
              >
                Disponibles ({deliveries.available.length})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
              >
                En cours ({deliveries.active.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
              >
                Terminées ({deliveries.completed.length})
              </button>
            </nav>
          </div>

          <div className="tab-content-area">
            {activeTab === 'available' && (
              <div>
                <h2 className="tab-section-title">Livraisons disponibles</h2>
                {deliveries.available.length === 0 ? (
                  <p className="no-deliveries-message">Aucune livraison disponible pour le moment</p>
                ) : (
                  deliveries.available.map(delivery => (
                    <DeliveryCard key={delivery.id} delivery={delivery} type="available" />
                  ))
                )}
              </div>
            )}

            {activeTab === 'active' && (
              <div>
                <h2 className="tab-section-title">Livraisons en cours</h2>
                {deliveries.active.length === 0 ? (
                  <p className="no-deliveries-message">Aucune livraison en cours</p>
                ) : (
                  deliveries.active.map(delivery => (
                    <DeliveryCard key={delivery.id} delivery={delivery} type="active" />
                  ))
                )}
              </div>
            )}

            {activeTab === 'completed' && (
              <div>
                <h2 className="tab-section-title">Livraisons terminées</h2>
                {deliveries.completed.length === 0 ? (
                  <p className="no-deliveries-message">Aucune livraison terminée aujourd'hui</p>
                ) : (
                  deliveries.completed.map(delivery => (
                    <DeliveryCard key={delivery.id} delivery={delivery} type="completed" />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;