import React, { useState, useEffect } from 'react';
import { Package, MapPin, Check, X, Clock, Navigation, Phone, Star, TrendingUp } from 'lucide-react';
import './DeliveryDashboard.css';
import axios from 'axios';
import { toast } from "react-toastify"

const DeliveryDashboard = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [deliveries, setDeliveries] = useState({
    available: [],
    active: [],
    completed: []
  });
  const [stats, setStats] = useState({
    todayEarnings: 0,
    deliveriesCompleted: 0,
    averageRating: 5,
    totalDistance: 0
  });

  // const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {

    try {
      const response = await axios.get("api/orders/list");
      if (response.data.success) {
        const allOrders = response.data.data;
        const categorized = {
          available: [],
          active: [],
          completed: []
        };
        console.log(response.data);
        allOrders.forEach(order => {
          const delivery = {
            id: order._id,
            restaurant:order.restaurantName,//"N/A", // Or fetch restaurant name if available
            customer: order.userId,
            address: `${order.address?.street || "Unknown Address"}`,
            distance: "N/A", // Could be calculated or mocked
            payment: `${order.amount.toFixed(2)}€`,
            time: "N/A", // Estimate or remove
            items: order.items?.length || 0,
            driverstatus: order.driverstatus
          };

          if (order.driverstatus === "Pending") {
            categorized.available.push(delivery);
          } else if (order.driverstatus === "Accepted" || order.driverstatus === "Picked_Up") {
            categorized.active.push(delivery);
          }
          else if (order.driverstatus === "Delivered") {
            categorized.completed.push({
              ...delivery,
              completedAt: new Date(order.date).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
              }),
              rating: 5
            });
          }



        });
        setDeliveries(categorized);
      }
      else {
        toast.error("Failed to fetch orders");
      }

    }
    catch (error) {
      toast.error("API error: " + error.message);
    }

  };


  useEffect(() => {
    fetchAllOrders();

  }, [])



  const acceptDelivery = async (deliveryId) => {
    const delivery = deliveries.available.find(d => d.id === deliveryId);
    if (delivery) {
      const success = await updateDriverStatus(deliveryId, 'Accepted');
      if (success) {
        setDeliveries(prev => ({
          ...prev,
          available: prev.available.filter(d => d.id !== deliveryId),
          active: [...prev.active, { ...delivery, status: 'accepted' }]
        }));
      }
    }
  };


  const rejectDelivery = (deliveryId) => {
    setDeliveries(prev => ({
      ...prev,
      available: prev.available.filter(d => d.id !== deliveryId)
    }));
  };
  const updateDeliveryStatus = async (deliveryId, status) => {
    const success = await updateDriverStatus(deliveryId, status === 'picked_up' ? 'Picked_Up' : status);
    if (success) {
      setDeliveries(prev => ({
        ...prev,
        active: prev.active.map(d =>
          d.id === deliveryId ? { ...d, status } : d
        )
      }));
    }
  };


  const completeDelivery = async (deliveryId) => {
    const delivery = deliveries.active.find(d => d.id === deliveryId);
    if (delivery) {
      const success = await updateDriverStatus(deliveryId, 'Delivered');
      if (success) {
        setDeliveries(prev => ({
          ...prev,
          active: prev.active.filter(d => d.id !== deliveryId),
          completed: [...prev.completed, {
            ...delivery,
            rating: 5,
            completedAt: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
          }]
        }));
        setStats(prev => ({
          ...prev,
          todayEarnings: prev.todayEarnings + parseFloat(delivery.payment.replace('€', '')),
          deliveriesCompleted: prev.deliveriesCompleted + 1
        }));
      }
    }
  };


  const updateDriverStatus = async (orderID, status) => {
    try {
      const response = await axios.patch('api/orders/driver_status', {
        orderID,
        driverstatus: status
      });

      if (response.data.success) {
        toast.success("Status updated");
        return true;
      } else {
        toast.error("Failed to update status");
        return false;
      }
    } catch (error) {
      toast.error("Error updating status: " + error.message);
      return false;
    }
  };


  const DeliveryCard = ({ delivery, type }) => (
    <div className="delivery-card">
      <div className="delivery-card-header">
        <div className="delivery-info">
          <h3>{delivery.restaurant}</h3>
          <p>Customer: {delivery.customer}</p>
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
              {delivery.items} items
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
                Picked Up
              </button>
            )}
            {delivery.status === 'picked_up' && (
              <button
                onClick={() => completeDelivery(delivery.id)}
                className="action-button action-button-green"
              >
                Delivered
              </button>
            )}
          </div>
        )}

        {type === 'completed' && (
          <span className="delivery-completed-time">Delivered at {delivery.completedAt}</span>
        )}
      </div>
    </div>
  );


  return (
    <div className="dashboard-container">
      <div className="page-content-wrapper">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-wrapper stat-icon-green">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Today's Earnings</p>
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
                <p className="stat-label">Deliveries</p>
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
                <p className="stat-label">Avg. Rating</p>
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
                Available ({deliveries.available.length})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
              >
                Ongoing ({deliveries.active.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
              >
                Completed ({deliveries.completed.length})
              </button>
            </nav>
          </div>

          <div className="tab-content-area">
            {activeTab === 'available' && (
              <div>
                <h2 className="tab-section-title">Available Deliveries</h2>
                {deliveries.available.length === 0 ? (
                  <p className="no-deliveries-message">No deliveries available at the moment</p>
                ) : (
                  deliveries.available.map(delivery => (
                    <DeliveryCard key={delivery.id} delivery={delivery} type="available" />
                  ))
                )}
              </div>
            )}

            {activeTab === 'active' && (
              <div>
                <h2 className="tab-section-title">Ongoing Deliveries</h2>
                {deliveries.active.length === 0 ? (
                  <p className="no-deliveries-message">No ongoing deliveries</p>
                ) : (
                  deliveries.active.map(delivery => (
                    <DeliveryCard key={delivery.id} delivery={delivery} type="active" />
                  ))
                )}
              </div>
            )}

            {activeTab === 'completed' && (
              <div>
                <h2 className="tab-section-title">Completed Deliveries</h2>
                {deliveries.completed.length === 0 ? (
                  <p className="no-deliveries-message">No deliveries completed today</p>
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


}




export default DeliveryDashboard;
