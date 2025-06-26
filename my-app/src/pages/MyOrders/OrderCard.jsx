// OrderCard.jsx
import React from 'react';
import OrderItem from './OrderItem';

const OrderCard = ({ order, isActive, onToggleActive, onCancelOrder }) => {
  const statusClassName = `order-status status-${order.statusClass || 'default'}`;

  return (
    <div className="order-card">
      <div
        className="order-header"
        onClick={() => onToggleActive(order.id)}
      >
        <div className="order-info">
          <div className="order-id">Order #{order.id.substring(order.id.length - 4)}</div> {/* Affiche les 4 derniers caractères */}
          <div className="order-restaurant">{order.restaurant}</div>
        </div>
        <div className="order-details">
          {/* Affiche la date et l'heure séparément */}
          <div className="order-date">
            {order.date} à {order.time}
          </div>
          <div className="order-price">{order.total}</div>
          <div className={statusClassName}>{order.status}</div>
        </div>
      </div>

      {isActive && (
        <div className="order-expanded">
          <div className="order-items">
            <h4 className="items-title">Ordered Items:</h4>
            {order.items && order.items.length > 0 ? (
              order.items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))
            ) : (
              <p>Aucun article.</p>
            )}
          </div>

          <div className="order-actions">
            <div className="delivery-info">
              <span className="delivery-label">Delivery Time:</span>
              <span className="delivery-time">{order.deliveryTime}</span>
            </div>

            {(order.statusClass === 'pending' || order.statusClass === 'preparing') && (
              <button
                className="cancel-button"
                onClick={() => onCancelOrder(order.id)}
              >
                Cancel Order
              </button>
            )}

            {order.statusClass === 'delivered' && (
              <button className="reorder-button">
                Make Other Order
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;