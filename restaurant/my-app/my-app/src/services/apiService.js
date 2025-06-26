import axios from 'axios'
axios.defaults.baseURL = "/"

// Configuration des URLs des microservices
// const API_CONFIG = {
//   ORDER_SERVICE: 'http://localhost:4003',
//   MENU_SERVICE: 'http://localhost:4002',
//   RESTAURANT_SERVICE: 'http://localhost:4004',
//   ARTICLE_SERVICE: 'http://localhost:4005' // URL pour le service Articles
// };

// Configuration axios par défaut
axios.defaults.timeout = 10000; // 10 secondes
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Intercepteurs pour gérer les erreurs globalement
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erreur API:', error);
    return Promise.reject(error);
  }
);


// Service pour les commandes
export const orderService = {
  getAllOrders: async () => {
    try {
      const response = await axios.get(`/api/orders`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des commandes');
    }
  },
  getOrderById: async (orderId) => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de la commande');
    }
  },
  createOrder: async (orderData) => {
    try {
      const response = await axios.post(`/api/orders`, orderData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la création de la commande');
    }
  },
  updateOrder: async (orderId, updateData) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de la commande');
    }
  },
  deleteOrder: async (orderId) => {
    try {
      const response = await axios.delete(`/api/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la suppression de la commande');
    }
  },
};

// Service pour les restaurants
export const restaurantService = {
  getAllRestaurants: async () => {
    try {
      const response = await axios.get(`/api/restaurants`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des restaurants');
    }
  },
  getRestaurantById: async (restaurantId) => {
    try {
      const response = await axios.get(`/api/restaurants/${restaurantId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération du restaurant ${restaurantId}`);
    }
  },
  getRestaurantsByOwner: async (ownerId) => {
    try {
      const response = await axios.get(`/api/restaurants/owner/${ownerId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des restaurants de l'owner ${ownerId}`);
    }
  },
  createRestaurant: async (restaurantData) => {
    try {
      const response = await axios.post(`/api/restaurants`, restaurantData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la création du restaurant');
    }
  },
  updateRestaurant: async (restaurantId, updateData) => {
    try {
      const response = await axios.patch(`/api/restaurants/${restaurantId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour du restaurant');
    }
  },
  deleteRestaurant: async (restaurantId) => {
    try {
      const response = await axios.delete(`/api/restaurants/${restaurantId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la suppression du restaurant');
    }
  },
};

// Service pour les articles (NOUVEAU)
export const articleService = {
  getAllArticles: async () => {
    try {
      const response = await axios.get(`/api/articles`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des articles');
    }
  },
  getArticleById: async (articleId) => {
    try {
      const response = await axios.get(`/api/articles/${articleId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'article ${articleId}`);
    }
  },
  getArticlesByRestaurant: async (restaurantId) => {
    try {
      const response = await axios.get(`/api/articles/restaurant/${restaurantId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des articles du restaurant ${restaurantId}`);
    }
  },
  createArticle: async (articleData) => {
    try {
      const response = await axios.post(`/api/articles`, articleData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la création de l\'article');
    }
  },
  updateArticle: async (articleId, updateData) => {
    try {
      const response = await axios.patch(`/api/articles/${articleId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de l\'article');
    }
  },
  deleteArticle: async (articleId) => {
    try {
      const response = await axios.delete(`/api/articles/${articleId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la suppression de l\'article');
    }
  }
};

// Service pour les menus

export const menuService = {
  getAllMenus: async () => {
    try {
      const response = await axios.get(`${API_CONFIG.MENU_SERVICE}/menus`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des menus');
    }
  },
  getMenuById: async (menuId) => {
    try {
      const response = await axios.get(`${API_CONFIG.MENU_SERVICE}/menus/${menuId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération du menu');
    }
  },
  getMenusByRestaurant: async (restaurantId) => {
    try {
      const response = await axios.get(`${API_CONFIG.MENU_SERVICE}/menus/restaurant/${restaurantId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des menus du restaurant ${restaurantId}`);
    }
  }
}; 

// Fonction utilitaire pour mapper les statuts de commande

export const mapOrderStatus = (dbStatus, accepted) => {
  switch (dbStatus) {
    case 'pending':
      return { status: 'En attente', statusClass: 'pending' };
    case 'accepted':
      return { status: 'Acceptée', statusClass: 'confirmed' };
    case 'preparing':
      return { status: 'En préparation', statusClass: 'preparing' };
    case 'ready':
      return { status: 'Prête', statusClass: 'ready' };
    case 'delivered':
      return { status: 'Livrée', statusClass: 'delivered' };
    case 'cancelled':
      return { status: 'Annulée', statusClass: 'cancelled' };
    default:
      if (accepted === false) {
        return { status: 'Refusée', statusClass: 'cancelled' };
      }
      return { status: 'En attente', statusClass: 'pending' };
  }
}; 

// Fonction utilitaire pour formater les dates
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString('fr-FR'),
    time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  };
}; 

export default axios