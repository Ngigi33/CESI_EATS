// OrderItem.jsx
import React from 'react';
// Note: MyOrders.css est importé dans le composant parent MyOrders.jsx
// donc les classes seront disponibles ici aussi.

const OrderItem = ({ item }) => {
  return (
    <div className="order-item">
      <span className="item-quantity">{item.quantity}x</span>
      <span className="item-name">{item.name}</span>
      <span className="item-price">{item.price}</span>
    </div>
  );
};

export default OrderItem;