// MyOrders.jsx

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
      return restaurant;
    } catch (error) {
      console.error(`Error fetching restaurant ${restaurantId}:`, error);
      return { name: 'Unknown Restaurant', image: '' };
    }
  };

  // Function to process raw order data
  const processOrders = async (ordersData) => {
    const processedOrders = await Promise.all(
      ordersData.map(async (order) => {
        let restaurantName = 'Loading...';
        let restaurantImage = '';

        if (order.restaurantId) {
          try {
            const restaurant = await fetchRestaurantDetails(order.restaurantId);
            restaurantName = restaurant.name || 'Unknown Name';
            restaurantImage = restaurant.image || '';
          } catch (error) {
            console.error(
              `Could not fetch restaurant for order ${order._id}:`,
              error
            );
            restaurantName = 'Restaurant not found';
            restaurantImage = '';
          }
        } else {
          restaurantName = 'No restaurant';
          restaurantImage = '';
        }

        const formattedDateTime = formatDate(order.created);
        const displayDate = formattedDateTime.date;
        const displayTime = formattedDateTime.time;

        const { status, statusClass } = mapOrderStatus(
          order.status,
          order.accepted
        );

        const total = order.price ? `${order.price.toFixed(2)} €` : 'N/A';

        // --- IMPORTANT CHANGE HERE ---
        // Ensure you're taking items from the 'article' array, not 'menus'
        const orderItems = order.article || []; // Use 'order.article'
        // If order.article might contain full article objects (like your JSON example),
        // then orderItems is ready to be used by OrderItem.jsx.
        // If it still only contains IDs, you'd need further population logic here
        // or on the backend as discussed in the previous response.
        // But given your JSON, it looks like it's already populated!
        // --- END OF IMPORTANT CHANGE ---

        return {
          id: order._id,
          restaurantId: order.restaurantId,
          restaurant: restaurantName,
          restaurantImage: restaurantImage,
          date: displayDate,
          time: displayTime,
          total: total,
          status: status,
          statusClass: statusClass,
          items: orderItems, // Pass the correctly processed items
          deliveryTime: '30-45 min',
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
      console.error('Error fetching orders:', err);
      setError('Unable to load orders. Please try again.');
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
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await orderService.updateOrder(orderId, { status: 'cancelled', accepted: false });
        alert('Order Cancelled.');
        fetchOrders(); // Refresh the list
      } catch (err) {
        console.error('Error canceling order:', err);
        alert('Failed to cancel the order.');
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
      order.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="my-orders-container">
        <div className="loading-state">
          <p>Loading orders...</p>
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
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-orders-container">
      <div className="page-header">
        <h1 className="page-title">My Orders</h1>
        <button onClick={handleRefresh} className="refresh-button">
          Refresh
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
            <p>No orders found.</p>
            {orders.length === 0 && (
              <p>You haven't placed any orders yet.</p>
            )}
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
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