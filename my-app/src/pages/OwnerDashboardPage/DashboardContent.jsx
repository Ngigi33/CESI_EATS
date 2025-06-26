import React from 'react';
import { PlusCircle, Edit } from 'lucide-react'; // Import PlusCircle and Edit icons

const DashboardContent = ({
  activeTab,
  orders,
  articles,
  menus,
  handleValidateOrder,
  onAddArticleClick,
  onAddMenuClick,
  onEditArticleClick, // New prop for editing article
  handleDeleteArticle,
  onEditMenuClick,    // New prop for editing menu
  handleDeleteMenu,
}) => {
  return (
    <main className="main-content">
      {/* New Orders Tab */}
      {activeTab === 'new_orders' && (
        <div className="tab-section">
          <h2 className="tab-section-title">New Orders ({orders.new_orders.length})</h2>
          <div className="orders-list">
            {orders.new_orders.length === 0 ? (
              <p className="no-orders-message">No new orders at the moment.</p>
            ) : (
              orders.new_orders.map(order => (
                <div key={order._id} className="order-card">
                  <h3>Order #{order.deliveryNumber || order._id.slice(-6)}</h3>
                  <p>Restaurant ID: {order.restaurantId}</p>
                  <p>Customer Address: {order.address}</p>
                  <p>Price: {order.price}€</p>
                  <p>Status: <span className="status-pending">{order.status}</span></p>
                  <div className="order-actions">
                    <button className="status-button" onClick={() => handleValidateOrder(order._id)}>Validate Order</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* In Progress Orders Tab */}
      {activeTab === 'in_progress_orders' && (
        <div className="tab-section">
          <h2 className="tab-section-title">Orders In Progress ({orders.in_progress_orders.length})</h2>
          <div className="orders-list">
            {orders.in_progress_orders.length === 0 ? (
              <p className="no-orders-message">No orders currently in progress.</p>
            ) : (
              orders.in_progress_orders.map(order => (
                <div key={order._id} className="order-card">
                  <h3>Order #{order.deliveryNumber || order._id.slice(-6)}</h3>
                  <p>Restaurant ID: {order.restaurantId}</p>
                  <p>Customer Address: {order.address}</p>
                  <p>Price: {order.price}€</p>
                  <p>Status: <span className="status-in-progress">{order.status}</span></p>
                  {/* Add more actions for in-progress orders if needed */}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Completed Orders Tab */}
      {activeTab === 'completed_orders' && (
        <div className="tab-section">
          <h2 className="tab-section-title">Completed Orders ({orders.completed_orders.length})</h2>
          <div className="orders-list">
            {orders.completed_orders.length === 0 ? (
              <p className="no-orders-message">No completed orders yet.</p>
            ) : (
              orders.completed_orders.map(order => (
                <div key={order._id} className="order-card">
                  <h3>Order #{order.deliveryNumber || order._id.slice(-6)}</h3>
                  <p>Restaurant ID: {order.restaurantId}</p>
                  <p>Customer Address: {order.address}</p>
                  <p>Price: {order.price}€</p>
                  <p>Status: <span className="status-completed">{order.status}</span></p>
                  {/* No actions needed for completed orders usually */}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Article Management Tab */}
      {activeTab === 'articles' && (
        <div className="tab-section">
          <div className="tab-section-header">
            <h2>Article Management</h2>
            <button className="add-button" onClick={onAddArticleClick}>
              <PlusCircle size={20} /> Add New Article
            </button>
          </div>
          <div className="items-grid">
            {articles.length === 0 ? (
              <p className="no-items-message">No articles found for this restaurant.</p>
            ) : (
              articles.map(article => (
                <div key={article._id} className="item-card">
                  <img src={article.image} alt={article.name} className="item-image" />
                  <h3>{article.name}</h3>
                  <p>{article.description}</p>
                  <p className="item-price">{article.price}€</p>
                  <div className="item-actions">
                    <button className="edit-button" onClick={() => onEditArticleClick(article)}> {/* Edit button */}
                        <Edit size={16} /> Edit
                    </button>
                    <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Menu Management Tab */}
      {activeTab === 'menus' && (
        <div className="tab-section">
          <div className="tab-section-header">
            <h2>Menu Management</h2>
            <button className="add-button" onClick={onAddMenuClick}>
              <PlusCircle size={20} /> Add New Menu
            </button>
          </div>
          <div className="items-grid">
            {menus.length === 0 ? (
              <p className="no-items-message">No menus found for this restaurant.</p>
            ) : (
              menus.map(menu => (
                <div key={menu._id} className="item-card">
                  {/* Assuming menu might have an image or use a placeholder */}
                  <img src={menu.image || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Menu'} alt={menu.name} className="item-image" />
                  <h3>{menu.name}</h3>
                  <p>{menu.description}</p>
                  <p>Category: {menu.category}</p>
                  <p className="item-price">{menu.price}€</p>
                  <div className="item-actions">
                    <button className="edit-button" onClick={() => onEditMenuClick(menu)}> {/* Edit button */}
                        <Edit size={16} /> Edit
                    </button>
                    <button onClick={() => handleDeleteMenu(menu._id)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default DashboardContent;