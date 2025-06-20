// MyOrders.jsx
import React, { useState } from 'react';
import './MyOrders.css'; // Import your CSS file
import FilterSearchSection from './FilterSearchSection'; // Import the filter/search component
import OrderCard from './OrderCard'; // Import the order card component

const MyOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-00123',
      restaurant: 'Pizza Palace',
      date: '18/06/2025',
      total: '€28.50',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: '€14.50' },
        { name: 'Pepperoni Pizza', quantity: 1, price: '€14.00' }
      ],
      status: 'Delivered',
      statusClass: 'delivered',
      deliveryTime: '7:45 PM'
    },
    {
      id: 'ORD-00115',
      restaurant: 'Burger King',
      date: '15/06/2025',
      total: '€32.90',
      items: [
        { name: 'Whopper', quantity: 2, price: '€19.90' },
        { name: 'Fries', quantity: 2, price: '€7.00' },
        { name: 'Coca-Cola', quantity: 2, price: '€6.00' }
      ],
      status: 'Delivered',
      statusClass: 'delivered',
      deliveryTime: '8:30 PM'
    },
    {
      id: 'ORD-00129',
      restaurant: 'Sushi Tokyo',
      date: '20/06/2025',
      total: '€45.70',
      items: [
        { name: 'Sushi Assortment (18 pcs)', quantity: 1, price: '€32.50' },
        { name: 'Miso Soup', quantity: 2, price: '€7.00' },
        { name: 'Edamame', quantity: 1, price: '€6.20' }
      ],
      status: 'Preparing',
      statusClass: 'preparing',
      deliveryTime: 'Estimated 8:15 PM'
    },
    {
      id: 'ORD-00132',
      restaurant: 'Thai Spice',
      date: '20/06/2025',
      total: '€38.40',
      items: [
        { name: 'Pad Thai', quantity: 2, price: '€25.90' },
        { name: 'Spring Rolls', quantity: 1, price: '€7.50' },
        { name: 'Iced Tea', quantity: 2, price: '€5.00' }
      ],
      status: 'Pending',
      statusClass: 'pending',
      deliveryTime: 'Estimated 9:00 PM'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [activeOrder, setActiveOrder] = useState(null); // Managed here
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    // Filter by status
    if (filterStatus !== 'all' && order.statusClass !== filterStatus) {
      return false;
    }

    // Filter by search term
    const searchTermLower = searchTerm.toLowerCase();
    if (searchTerm && !(
      order.id.toLowerCase().includes(searchTermLower) ||
      order.restaurant.toLowerCase().includes(searchTermLower) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTermLower))
    )) {
      return false;
    }

    return true;
  });

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'Cancelled', statusClass: 'cancelled' }
        : order
    ));
    setActiveOrder(null); // Close the cancelled order
  };

  const handleToggleActiveOrder = (orderId) => {
    setActiveOrder(activeOrder === orderId ? null : orderId);
  };

  return (
    <div className="my-orders-container">
      <h1 className="page-title">My Orders</h1>

      <FilterSearchSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>No orders found</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              isActive={activeOrder === order.id} // Pass active state as prop
              onToggleActive={handleToggleActiveOrder} // Pass toggle function as prop
              onCancelOrder={handleCancelOrder} // Pass cancel function as prop
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;