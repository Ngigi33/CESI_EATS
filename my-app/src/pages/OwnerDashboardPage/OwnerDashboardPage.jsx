import React, { useState, useEffect } from 'react';
// Importez le fichier CSS avec le chemin relatif correct
import './RestaurantOwnerDashboard.css'; // <-- Modifiez cette ligne

// Import sub-components from their respective folders
import Navigation from '../../components/RestaurantOwnerDashboard/Navigation';
import Sidebar from '../../components/RestaurantOwnerDashboard/Sidebar';
import DashboardContent from '../../components/RestaurantOwnerDashboard/DashboardContent';
import AccountContent from '../../components/RestaurantOwnerDashboard/AccountContent';
import RestaurantsContent from '../../components/RestaurantOwnerDashboard/RestaurantsContent';
import ArticlesContent from '../../components/RestaurantOwnerDashboard/ArticlesContent';
import OrdersContent from '../../components/RestaurantOwnerDashboard/OrdersContent';
import NotificationPanel from '../../components/RestaurantOwnerDashboard/NotificationPanel';
import Modal from '../../components/RestaurantOwnerDashboard/Modal';

const OwnerDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [restaurants, setRestaurants] = useState([]);
  const [articles, setArticles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentItem, setCurrentItem] = useState(null);

  // Simulated owner data
  const ownerInfo = {
    id: 1,
    name: "Pierre Dubois",
    email: "pierre@cesieats.com",
    phone: "+33 6 12 34 56 78",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  // Mock data initialization (can be replaced with API calls)
  useEffect(() => {
    // Simulate API calls to microservices
    setRestaurants([
      {
        id: 1,
        name: "Le Petit Bistro",
        address: "123 Rue de la Paix, Lyon",
        status: "open",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
        opening: "09:00",
        closing: "22:00",
        tags: ["french", "bistro", "traditional"],
        description: "Traditional French cuisine"
      }
    ]);
    setArticles([
      {
        id: 1,
        restaurantId: 1,
        name: "Coq au Vin",
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=200&h=150&fit=crop",
        description: "Traditional French dish",
        price: 18.50,
        type: "main_course"
      },
      {
        id: 2,
        restaurantId: 1,
        name: "Tarte Tatin",
        image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=200&h=150&fit=crop",
        description: "Caramelized apple tart dessert",
        price: 8.50,
        type: "dessert"
      }
    ]);
    setMenus([
      {
        id: 1,
        restaurantId: 1,
        name: "Chef's Menu",
        description: "Our selection of signature dishes",
        category: "full_menu",
        articles: [1, 2],
        price: 25.00
      }
    ]);
    setOrders([
      {
        id: 1,
        userId: 101,
        deliveryNumber: 2024001,
        restaurantId: 1,
        address: "456 Avenue Victor Hugo, Lyon",
        created: new Date().toISOString(),
        status: "pending",
        accepted: null,
        price: 25.00,
        menus: [1],
        articles: []
      },
      {
        id: 2,
        userId: 102,
        deliveryNumber: 2024002,
        restaurantId: 1,
        address: "789 Rue de la République, Lyon",
        created: new Date(Date.now() - 3600000).toISOString(),
        status: "accepted",
        accepted: true,
        price: 18.50,
        menus: [],
        articles: [1]
      }
    ]);
    setNotifications([
      {
        id: 1,
        type: "order",
        message: "New order #2024001", // Changed to English
        time: "5 minutes ago", // Changed to English
        read: false
      },
      {
        id: 2,
        type: "delivery",
        message: "Delivery #2024002 completed", // Changed to English
        time: "1 hour ago", // Changed to English
        read: true
      }
    ]);
  }, []);

  const openModal = (type, item = null) => {
    setModalType(type);
    setCurrentItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentItem(null);
    setModalType('');
  };

  const handleOrderAction = (orderId, action) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: action, accepted: action === 'accepted' }
        : order
    ));
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.price, 0),
    avgOrderValue: orders.length > 0 ? (orders.reduce((sum, order) => sum + order.price, 0) / orders.length).toFixed(2) : 0
  };

  // Content rendering based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent stats={stats} orders={orders} />;
      case 'account':
        return <AccountContent ownerInfo={ownerInfo} openModal={openModal} />;
      case 'restaurants':
        return <RestaurantsContent restaurants={restaurants} openModal={openModal} />;
      case 'articles':
        return <ArticlesContent articles={articles} openModal={openModal} />;
      case 'orders':
        return <OrdersContent orders={orders} handleOrderAction={handleOrderAction} />;
      case 'menus':
        return (
          <div className="under-development">
            <h2 className="under-development-title">Menu Management</h2> {/* Changed to English */}
            <p className="under-development-message">This menu management feature will be available soon.</p> {/* Changed to English */}
          </div>
        );
      default:
        return (
          <div className="under-development">
            <h2 className="under-development-title">Section Under Development</h2> {/* Changed to English */}
            <p className="under-development-message">This feature will be available soon.</p> {/* Changed to English */}
          </div>
        );
    }
  };

  // Determine modal title and content based on modalType
  const getModalContent = () => {
    switch (modalType) {
      case 'account':
        return {
          title: "Edit My Account", // Changed to English
          content: (
            <div>
              {/* Form to edit ownerInfo */}
              <p>Account modification form (Owner Info: {currentItem?.name})</p> {/* Changed to English */}
              {/* Add form fields here */}
            </div>
          )
        };
      case 'restaurant':
        return {
          title: currentItem ? "Edit Restaurant" : "Add Restaurant", // Changed to English
          content: (
            <div>
              {/* Form to add/edit restaurant */}
              <p>Form to {currentItem ? `edit ${currentItem.name}` : "add a restaurant"}</p> {/* Changed to English */}
              {/* Add form fields here */}
            </div>
          )
        };
      case 'article':
        return {
          title: currentItem ? "Edit Article" : "Add Article", // Changed to English
          content: (
            <div>
              {/* Form to add/edit article */}
              <p>Form to {currentItem ? `edit ${currentItem.name}` : "add an article"}</p> {/* Changed to English */}
              {/* Add form fields here */}
            </div>
          )
        };
      default:
        return { title: "", content: null };
    }
  };

  const { title: modalTitle, content: modalChildren } = getModalContent();

  return (
    <div className="dashboard-container">
      <Navigation ownerInfo={ownerInfo} notifications={notifications} />
      <div className="main-layout">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>

      <NotificationPanel notifications={notifications} />

      <Modal show={showModal} onClose={closeModal} title={modalTitle}>
        {modalChildren}
      </Modal>
    </div>
  );
};

export default OwnerDashboardPage;