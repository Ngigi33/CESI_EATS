import React, { useState, useEffect } from 'react';
import './MyOrders.css';
import FilterSearchSection from './FilterSearchSection';
import OrderCard from './OrderCard';
import {
  orderService,
  restaurantService,
  mapOrderStatus,
  formatDate, // Ensure formatDate is imported
} from '../../services/apiService';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeOrder, setActiveOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch restaurant details
  const fetchRestaurantDetails = async (restaurantId) => {
    try {
      const restaurant = await restaurantService.getRestaurantById(restaurantId);
      // Assuming getRestaurantById returns an object with a 'name' property directly
      return restaurant;
    } catch (error) {
      console.error(`Erreur lors de la récupération du restaurant ${restaurantId}:`, error);
      // Return a fallback object to prevent errors in subsequent processing
      return { name: 'Restaurant Inconnu', image: '' }; // Added image fallback
    }
  };

  // Function to process raw order data
  const processOrders = async (ordersData) => {
    const processedOrders = await Promise.all(
      ordersData.map(async (order) => {
        let restaurantName = 'Chargement...'; // Default
        let restaurantImage = '';

        // Fetch restaurant details
        if (order.restaurantId) {
          try {
            const restaurant = await fetchRestaurantDetails(order.restaurantId);
            restaurantName = restaurant.name || 'Nom Inconnu';
            restaurantImage = restaurant.image || ''; // Fallback if no image
          } catch (error) {
            console.error(
              `Could not fetch restaurant for order ${order._id}:`,
              error
            );
            restaurantName = 'Restaurant non trouvé'; // Fallback if fetch fails
            restaurantImage = ''; // Ensure image is also reset on error
          }
        } else {
          restaurantName = 'Pas de restaurant';
          restaurantImage = '';
        }

        // Format date and time
        const formattedDateTime = formatDate(order.created); // Calls formatDate, returns { date: string, time: string }
        
        // Extract the date and time strings from the object
        const displayDate = formattedDateTime.date;
        const displayTime = formattedDateTime.time;

        // Map order status
        const { status, statusClass } = mapOrderStatus(
          order.status,
          order.accepted
        );

        // Calculate total price if needed, or use existing price
        const total = order.price ? `${order.price.toFixed(2)} €` : 'N/A';

        return {
          id: order._id,
          restaurantId: order.restaurantId,
          restaurant: restaurantName,
          restaurantImage: restaurantImage, // Pass restaurant image if needed in OrderCard
          // Pass the formatted date and time strings directly
          date: displayDate, // Now this is a string like "22/06/2025"
          time: displayTime, // Now this is a string like "14:02"
          total: total,
          status: status,
          statusClass: statusClass,
          items: order.menus || [], // Assuming 'menus' array holds item details
          deliveryTime: '30-45 min', // Example static value, consider making this dynamic if possible
          deliveryAddress: order.address,
          accepted: order.accepted,
        };
      })
    );
    return processedOrders;
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getAllOrders();
      const processed = await processOrders(data);
      setOrders(processed);
    } catch (err) {
      console.error('Erreur lors de la récupération des commandes:', err);
      setError('Impossible de charger les commandes. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleToggleActiveOrder = (id) => {
    setActiveOrder(activeOrder === id ? null : id);
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cette commande ?')) {
      try {
        await orderService.updateOrder(orderId, { status: 'cancelled', accepted: false });
        alert('Commande annulée avec succès.');
        fetchOrders(); // Refresh the list
      } catch (err) {
        console.error('Erreur lors de l\'annulation de la commande:', err);
        alert('Échec de l\'annulation de la commande.');
      }
    }
  };

  const handleRefresh = () => {
    fetchOrders();
    setFilterStatus('all');
    setSearchTerm('');
    setActiveOrder(null);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.statusClass === filterStatus;
    const matchesSearch = searchTerm === '' ||
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()); // Search by last 4 chars of ID if displayed

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="my-orders-container">
        <div className="loading-state">
          <p>Chargement des commandes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-orders-container">
        <div className="error-state">
          <div className="error-message-box">
            <p>{error}</p>
            <button onClick={handleRefresh} className="retry-button">
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      <div className="page-header">
        <h1 className="page-title">Mes Commandes</h1>
        <button onClick={handleRefresh} className="refresh-button">
          Actualiser
        </button>
      </div>

      <FilterSearchSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>Aucune commande trouvée.</p>
            {/* Specific message if no orders loaded at all (not just filtered) */}
            {orders.length === 0 && (
              <p>Vous n'avez pas encore passé de commande.</p>
            )}
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id} // Use the processed order ID
              order={order}
              isActive={activeOrder === order.id}
              onToggleActive={handleToggleActiveOrder}
              onCancelOrder={handleCancelOrder}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;