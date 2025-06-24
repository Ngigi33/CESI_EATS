// OrderCard.jsx
import React from 'react';
import OrderItem from './OrderItem'; // Import the OrderItem sub-component

const OrderCard = ({ order, isActive, onToggleActive, onCancelOrder }) => {
  // Determine the combined status class name
  const statusClassName = `order-status status-${order.statusClass || 'default'}`;

  return (
    <div className="order-card">
      <div
        className="order-header"
        onClick={() => onToggleActive(order.id)} // Uses the prop to toggle expansion
      >
        <div className="order-info">
          <div className="order-id">{order.id}</div>
          <div className="order-restaurant">{order.restaurant}</div>
        </div>
        <div className="order-details">
          <div className="order-date">{order.date}</div>
          <div className="order-price">{order.total}</div>
          <div className={statusClassName}>
            {order.status}
          </div>
        </div>
      </div>

      {isActive && ( // Displays details if the card is active
        <div className="order-expanded">
          <div className="order-items">
            <h4 className="items-title">Ordered Items:</h4>
            {order.items.map((item, index) => (
              <OrderItem key={index} item={item} /> // Renders OrderItem for each item
            ))}
          </div>

          <div className="order-actions">
            <div className="delivery-info">
              <span className="delivery-label">Delivery:</span>
              <span className="delivery-time">{order.deliveryTime}</span>
            </div>

            {(order.statusClass === 'pending' || order.statusClass === 'preparing') && (
              <button
                className="cancel-button"
                onClick={() => onCancelOrder(order.id)} // Uses the prop to cancel
              >
                Cancel Order
              </button>
            )}

            {order.statusClass === 'delivered' && (
              <button className="reorder-button">
                Reorder
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;