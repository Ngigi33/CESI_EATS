import React, { useState, useEffect } from 'react';
import { ChefHat, Utensils, BookText, ShoppingCart, TrendingUp, Clock, CheckCircle, PlusCircle } from 'lucide-react'; // Added PlusCircle icon
import DashboardContent from './DashboardContent';
import Modal from '../../components/Modal/Modal'; // Import the new Modal component
import './RestaurantOwnerDashboard.css';

// --- Placeholder for the Restaurant ID ---
const RESTAURANT_ID = '6859069c30267415c5aeeff7'; // Using the latest ID provided

const RestaurantOwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('new_orders');
  const [orders, setOrders] = useState({
    new_orders: [],
    in_progress_orders: [],
    completed_orders: []
  });
  const [articles, setArticles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modal visibility
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);

  // States for new article/menu form data
  const [newArticleData, setNewArticleData] = useState({ name: '', description: '', price: '', image: '', type: '' });
  const [newMenuData, setNewMenuData] = useState({ name: '', description: '', category: '', price: '' }); // Simplified articles for now

  // --- Fetch Data from Microservices ---
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);

        // --- Fetch Articles for the Restaurant ---
        const articlesRes = await fetch('http://localhost:4005/articles');
        if (!articlesRes.ok) throw new Error('Failed to fetch articles');
        const articlesData = await articlesRes.json();
        // Assuming articlesData.data is an array and each object has restaurantId
        const restaurantArticles = articlesData.data.filter(article => article.restaurantId === RESTAURANT_ID);
        setArticles(restaurantArticles);

        // --- Fetch Menus for the Restaurant ---
        const menusRes = await fetch('http://localhost:4002/api/menu');
        if (!menusRes.ok) throw new Error('Failed to fetch menus');
        const allMenusData = await menusRes.json();
        const restaurantMenus = allMenusData.filter(menu => menu.restaurantId === RESTAURANT_ID);
        setMenus(restaurantMenus);

        // --- Fetch Orders for the Restaurant ---
        const ordersRes = await fetch(`http://localhost:4003/orders`);
        if (!ordersRes.ok) throw new Error('Failed to fetch orders');
        const allOrdersData = await ordersRes.json();

        // Categorize orders based on status and filter by restaurantId on the frontend
        const restaurantOrders = allOrdersData.filter(order => order.restaurantId === RESTAURANT_ID);

        const newOrders = restaurantOrders.filter(order => order.status === 'pending');
        const inProgressOrders = restaurantOrders.filter(order => order.status === 'preparing' || order.status === 'out_for_delivery');
        const completedOrders = restaurantOrders.filter(order => order.status === 'completed');

        setOrders({
          new_orders: newOrders,
          in_progress_orders: inProgressOrders,
          completed_orders: completedOrders,
        });

      } catch (err) {
        setError("Error fetching dashboard data: " + err.message);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [RESTAURANT_ID]); // Added RESTAURANT_ID to dependency array

  // --- Order Management Functions ---
  const handleValidateOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:4003/orders/${orderId}`, {
        method: 'PUT', // Changed to PUT as per orderRoute.js
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'preparing' }) // Send the status in the body
      });
      if (!response.ok) throw new Error('Failed to validate order');
      alert(`Order ${orderId} validated and status set to 'preparing'.`);
      window.location.reload();
    } catch (err) {
      console.error("Error validating order:", err);
      alert("Error validating order: " + err.message);
    }
  };

  // --- Article (Item) Management Functions ---
  const createArticle = async (articleData) => { // Renamed to avoid confusion with handler
    try {
      const response = await fetch('http://localhost:4005/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...articleData, restaurantId: RESTAURANT_ID })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create article');
      }
      setShowAddArticleModal(false); // Close modal on success
      setNewArticleData({ name: '', description: '', price: '', image: '', type: '' }); // Clear form
      window.location.reload(); // Reload to show new item
    } catch (err) {
      console.error("Error creating article:", err);
      alert("Error creating article: " + err.message); // Keep alert for error
    }
  };

  const handleUpdateArticle = async (articleId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:4005/articles/${articleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) throw new Error('Failed to update article');
      alert('Article updated successfully!');
      window.location.reload();
    } catch (err) {
      console.error("Error updating article:", err);
      alert("Error updating article: " + err.message);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      const response = await fetch(`http://localhost:4005/articles/${articleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete article');
      alert('Article deleted successfully!');
      window.location.reload();
    } catch (err) {
      console.error("Error deleting article:", err);
      alert("Error deleting article: " + err.message);
    }
  };

  // --- Menu Management Functions ---
  const createMenu = async (menuData) => { // Renamed to avoid confusion with handler
    try {
      const response = await fetch('http://localhost:4002/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...menuData, restaurantId: RESTAURANT_ID })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create menu');
      }
      setShowAddMenuModal(false); // Close modal on success
      setNewMenuData({ name: '', description: '', category: '', price: '' }); // Clear form
      window.location.reload(); // Reload to show new item
    } catch (err) {
      console.error("Error creating menu:", err);
      alert("Error creating menu: " + err.message); // Keep alert for error
    }
  };

  const handleUpdateMenu = async (menuId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:4002/api/menu/${menuId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) throw new Error('Failed to update menu');
      alert('Menu updated successfully!');
      window.location.reload();
    } catch (err) {
      console.error("Error updating menu:", err);
      alert("Error updating menu: " + err.message);
    }
  };

  const handleDeleteMenu = async (menuId) => {
    if (!window.confirm("Are you sure you want to delete this menu?")) return;
    try {
      const response = await fetch(`http://localhost:4002/api/menu/${menuId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete menu');
      alert('Menu deleted successfully!');
      window.location.reload();
    } catch (err) {
      console.error("Error deleting menu:", err);
      alert("Error deleting menu: " + err.message);
    }
  };

  // Functions to open/close modals
  const openAddArticleModal = () => setShowAddArticleModal(true);
  const closeAddArticleModal = () => setShowAddArticleModal(false);
  const openAddMenuModal = () => setShowAddMenuModal(true);
  const closeAddMenuModal = () => setShowAddMenuModal(false);

  if (loading) {
    return <div className="loading-message">Loading restaurant dashboard data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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
                <p className="stat-label">New Orders</p>
                <p className="stat-value">{orders.new_orders.length}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-wrapper stat-icon-blue">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Total Articles</p>
                <p className="stat-value">{articles.length}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-wrapper stat-icon-yellow">
                <BookText className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Total Menus</p>
                <p className="stat-value">{menus.length}</p>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-wrapper stat-icon-purple">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="stat-details">
                <p className="stat-label">Orders In Progress</p>
                <p className="stat-value">{orders.in_progress_orders.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar and Main Content */}
        <div className="dashboard-content">
          <aside className="sidebar">
            <div className="profile-section">
              <img src="https://via.placeholder.com/80" alt="Restaurant Logo" className="avatar" />
              <h2>Pizza Palace</h2> {/* Placeholder for restaurant name */}
              <p>Status: <span className="status-online">Open</span></p> {/* Placeholder */}
            </div>
            <nav className="navigation-menu">
              <ul>
                <li className={activeTab === 'new_orders' ? 'active' : ''} onClick={() => setActiveTab('new_orders')}>
                  <ShoppingCart size={18} /> New Orders
                </li>
                <li className={activeTab === 'in_progress_orders' ? 'active' : ''} onClick={() => setActiveTab('in_progress_orders')}>
                  <Clock size={18} /> In Progress
                </li>
                <li className={activeTab === 'completed_orders' ? 'active' : ''} onClick={() => setActiveTab('completed_orders')}>
                  <CheckCircle size={18} /> Completed Orders
                </li>
                <li className={activeTab === 'articles' ? 'active' : ''} onClick={() => setActiveTab('articles')}>
                  <Utensils size={18} /> Article Management
                </li>
                <li className={activeTab === 'menus' ? 'active' : ''} onClick={() => setActiveTab('menus')}>
                  <BookText size={18} /> Menu Management
                </li>
                <li>
                  Settings
                </li>
                <li>
                  Help & Support
                </li>
                <li>
                  Logout
                </li>
              </ul>
            </nav>
          </aside>

          <DashboardContent
            activeTab={activeTab}
            orders={orders}
            articles={articles}
            menus={menus}
            handleValidateOrder={handleValidateOrder}
            // Pass functions to open modals
            onAddArticleClick={openAddArticleModal}
            onAddMenuClick={openAddMenuModal}
            handleUpdateArticle={handleUpdateArticle}
            handleDeleteArticle={handleDeleteArticle}
            handleUpdateMenu={handleUpdateMenu}
            handleDeleteMenu={handleDeleteMenu}
          />
        </div>
      </div>

      {/* Add New Article Modal */}
      <Modal isOpen={showAddArticleModal} onClose={closeAddArticleModal} title="Add New Article">
        <form onSubmit={(e) => {
          e.preventDefault();
          createArticle(newArticleData); // Call the creation function
        }}>
          <div className="form-group">
            <label htmlFor="articleName">Name:</label>
            <input
              id="articleName"
              type="text"
              value={newArticleData.name}
              onChange={(e) => setNewArticleData({ ...newArticleData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="articleDescription">Description:</label>
            <textarea
              id="articleDescription"
              value={newArticleData.description}
              onChange={(e) => setNewArticleData({ ...newArticleData, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="articlePrice">Price:</label>
            <input
              id="articlePrice"
              type="number"
              step="0.01"
              value={newArticleData.price}
              onChange={(e) => setNewArticleData({ ...newArticleData, price: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="articleImage">Image URL:</label>
            <input
              id="articleImage"
              type="text"
              value={newArticleData.image}
              onChange={(e) => setNewArticleData({ ...newArticleData, image: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="articleType">Type:</label>
            <input
              id="articleType"
              type="text"
              value={newArticleData.type}
              onChange={(e) => setNewArticleData({ ...newArticleData, type: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="modal-submit-button">Add Article</button>
        </form>
      </Modal>

      {/* Add New Menu Modal */}
      <Modal isOpen={showAddMenuModal} onClose={closeAddMenuModal} title="Add New Menu">
        <form onSubmit={(e) => {
          e.preventDefault();
          createMenu(newMenuData); // Call the creation function
        }}>
          <div className="form-group">
            <label htmlFor="menuName">Name:</label>
            <input
              id="menuName"
              type="text"
              value={newMenuData.name}
              onChange={(e) => setNewMenuData({ ...newMenuData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="menuDescription">Description:</label>
            <textarea
              id="menuDescription"
              value={newMenuData.description}
              onChange={(e) => setNewMenuData({ ...newMenuData, description: e.target.value })}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="menuCategory">Category:</label>
            <input
              id="menuCategory"
              type="text"
              value={newMenuData.category}
              onChange={(e) => setNewMenuData({ ...newMenuData, category: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="menuPrice">Price:</label>
            <input
              id="menuPrice"
              type="number"
              step="0.01"
              value={newMenuData.price}
              onChange={(e) => setNewMenuData({ ...newMenuData, price: parseFloat(e.target.value) })}
              required
            />
          </div>
          {/* Note: Adding articles to a menu would require a more complex selection UI (e.g., multi-select dropdown)
              For now, the 'articles' field is omitted from the input form for simplicity. */}
          <button type="submit" className="modal-submit-button">Add Menu</button>
        </form>
      </Modal>
    </div>
  );
};

export default RestaurantOwnerDashboard;