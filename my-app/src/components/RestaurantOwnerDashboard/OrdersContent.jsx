import React from 'react';
import { Check, X } from 'lucide-react';

const OrdersContent = ({ orders, handleOrderAction }) => {
  return (
    <div className="orders-content">
      <h1 className="content-title">Orders</h1> {/* Changed to English */}

      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <h3 className="order-number">Order #{order.deliveryNumber}</h3> {/* Changed to English */}
                <p className="order-timestamp">{new Date(order.created).toLocaleString()}</p>
              </div>
              <div className="order-status-price-container">
                <span className={`order-status-badge ${
                  order.status === 'pending' ? 'status-pending' :
                  order.status === 'accepted' ? 'status-accepted' :
                  'status-default'
                }`}>
                  {order.status === 'pending' ? 'Pending' : // Changed to English
                    order.status === 'accepted' ? 'Accepted' : order.status} {/* Changed to English */}
                </span>
                <span className="order-price">{order.price}€</span>
              </div>
            </div>

            <div className="order-details-actions">
              <div>
                <p className="order-detail-label">Delivery Address:</p> {/* Changed to English */}
                <p className="order-detail-value">{order.address}</p>
              </div>

              {order.status === 'pending' && (
                <div className="order-actions-buttons">
                  <button
                    onClick={() => handleOrderAction(order.id, 'accepted')}
                    className="btn btn-success"
                  >
                    <Check className="btn-icon" />
                    <span>Accept</span> {/* Changed to English */}
                  </button>
                  <button
                    onClick={() => handleOrderAction(order.id, 'rejected')}
                    className="btn btn-danger"
                  >
                    <X className="btn-icon" />
                    <span>Reject</span> {/* Changed to English */}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersContent;