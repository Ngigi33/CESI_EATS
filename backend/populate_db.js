// backend/populate_db.js

import 'dotenv/config';
import mongoose from 'mongoose';
import { food_list_for_db } from './data/foodDataForDb.js';

// Connexions aux deux bases
// Assurez-vous que l'URL de votre base de données est correcte ici
const DB_URI = process.env.MONGODB_URI || "mongodb+srv://ezzoubair123:ezzoubair123@cluster0.d75x2k6.mongodb.net";

const restaurantConn = await mongoose.createConnection(DB_URI, {
  dbName: 'Restaurant',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const articleConn = await mongoose.createConnection(DB_URI, {
  dbName: 'Article',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schéma Restaurant
const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  status: String,
  image: String,
  opening: String,
  closing: String,
  tags: [String],
  description: String,
});
const Restaurant = restaurantConn.model('Restaurant', restaurantSchema);

// Schéma Article - AVEC TOUS LES CHAMPS NÉCESSAIRES (ajout de 'category' et 'restaurantName')
const articleSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, // Stocke juste le nom du fichier (ex: food_1.png)
  type: String, // Gardé pour compatibilité, mais 'category' est plus précis
  category: String, // Ajouté pour mapper directement aux catégories de foodDataForDb
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  restaurantName: String, // Ajouté pour faciliter l'affichage côté client
  isAvailable: { type: Boolean, default: true },
});
const Article = articleConn.model('Article', articleSchema);

// Données des restaurants à insérer (utilisant les URLs servies par le backend Restaurant)
// Assurez-vous que le PORT RESTAURANT_SERVICE_PORT est correct dans votre .env (par défaut 4004)
const RESTAURANT_SERVICE_BASE_URL = `http://localhost:${process.env.RESTAURANT_SERVICE_PORT || 4004}`;

const restaurantData = [
  {
    name: 'La Bella Italia',
    address: '123 Rue de la Paix, Lyon',
    status: 'open',
    image: `${RESTAURANT_SERVICE_BASE_URL}/images/restaurants/restaurant_default.png`,
    opening: '09:00',
    closing: '22:00',
    tags: ['Italian', 'Pizza', 'Pasta'],
    description: 'Restaurant italien authentique',
  },
  {
    name: 'Green Garden',
    address: '45 Avenue des Fleurs, Lyon',
    status: 'open',
    image: `${RESTAURANT_SERVICE_BASE_URL}/images/restaurants/restaurant_default.png`,
    opening: '10:00',
    closing: '21:00',
    tags: ['Salad', 'Healthy', 'Vegetarian'],
    description: 'Cuisine saine et végétarienne',
  },
  {
    name: 'Sweet Treats',
    address: 'Rue du Sucre, Lyon',
    status: 'open',
    image: `${RESTAURANT_SERVICE_BASE_URL}/images/restaurants/restaurant_default.png`,
    opening: '11:00',
    closing: '20:00',
    tags: ['Dessert', 'Cake', 'Ice Cream'],
    description: 'Le paradis des desserts',
  },
  {
    name: 'Quick Bites',
    address: '88 Boulevard de la Faim, Lyon',
    status: 'open',
    image: `${RESTAURANT_SERVICE_BASE_URL}/images/restaurants/restaurant_default.png`,
    opening: '08:00',
    closing: '23:00',
    tags: ['Fast Food', 'Sandwich', 'Snack'],
    description: 'Pour une pause rapide et gourmande',
  },
  {
    name: 'Asia Express',
    address: '5 Rue des Baguettes, Lyon',
    status: 'open',
    image: `${RESTAURANT_SERVICE_BASE_URL}/images/restaurants/restaurant_default.png`,
    opening: '11:30',
    closing: '22:30',
    tags: ['Asian', 'Noodles', 'Wok'],
    description: 'Voyage culinaire en Asie',
  },
];


const populateDb = async () => {
  try {
    console.log('--- Démarrage de l\'initialisation de la base de données ---');

    // Nettoyer les collections existantes
    await Restaurant.deleteMany({});
    await Article.deleteMany({});
    console.log('Collections Restaurant et Article nettoyées.');

    // Insérer les restaurants
    console.log('Insertion des restaurants...');
    const insertedRestaurants = await Restaurant.insertMany(restaurantData);
    console.log(`${insertedRestaurants.length} restaurants insérés.`);

    // Créer un mapping pour associer les articles aux restaurants par nom
    const restaurantIdMap = {};
    insertedRestaurants.forEach(r => {
      restaurantIdMap[r.name] = r._id;
    });

    const articlesToInsert = [];
    food_list_for_db.forEach(item => {
      let restaurantId;
      let restaurantName;

      // Logique de dispatch des articles aux restaurants basée sur la catégorie
      switch (item.category) {
        case 'Salad':
          restaurantId = restaurantIdMap['Green Garden'];
          restaurantName = 'Green Garden';
          break;
        case 'Rolls':
          restaurantId = restaurantIdMap['La Bella Italia']; // Ou un autre restaurant si pertinent
          restaurantName = 'La Bella Italia';
          break;
        case 'Deserts':
          restaurantId = restaurantIdMap['Sweet Treats'];
          restaurantName = 'Sweet Treats';
          break;
        case 'Sandwich':
          restaurantId = restaurantIdMap['Quick Bites'];
          restaurantName = 'Quick Bites';
          break;
        case 'Cake':
          restaurantId = restaurantIdMap['Sweet Treats'];
          restaurantName = 'Sweet Treats';
          break;
        case 'Pure Veg':
          restaurantId = restaurantIdMap['Green Garden'];
          restaurantName = 'Green Garden';
          break;
        case 'Pasta':
          restaurantId = restaurantIdMap['La Bella Italia'];
          restaurantName = 'La Bella Italia';
          break;
        case 'Noodles':
          restaurantId = restaurantIdMap['Asia Express'];
          restaurantName = 'Asia Express';
          break;
        default:
          console.warn(`Catégorie inconnue '${item.category}' pour l'article '${item.name}'. Assignation au premier restaurant.`);
          restaurantId = insertedRestaurants[0]._id;
          restaurantName = insertedRestaurants[0].name;
          break;
      }

      if (!restaurantId) {
        console.error(`Erreur critique: Aucun restaurant n'a pu être assigné à l'article '${item.name}'.`);
        return;
      }

      // --- MODIFICATION ICI ---
      // 'item.image' contient déjà le nom du fichier (ex: "food_1.png")
      const imageFilename = item.image; 

      articlesToInsert.push({
        name: item.name,
        description: item.description,
        price: item.price,
        image: imageFilename, // IMPORTANT: Stocker seulement le nom du fichier
        type: item.category, // Utiliser 'category' comme type pour la flexibilité
        category: item.category,
        restaurantId: restaurantId,
        restaurantName: restaurantName, // IMPORTANT: S'assurer que c'est bien défini
        isAvailable: true,
      });
    });

    console.log('Insertion des articles...');
    let totalInsertedArticles = 0;
    for (const article of articlesToInsert) {
      await new Article(article).save();
      totalInsertedArticles++;
    }

    console.log(`${totalInsertedArticles} articles insérés.`);
    
    // Vérification des données insérées
    console.log('--- Vérification des données des articles insérés (3 premiers) ---');
    const sampleArticles = await Article.find({}).limit(3);
    sampleArticles.forEach(article => {
      console.log(`Article: ${article.name}, Restaurant: ${article.restaurantName}, Image (nom de fichier): ${article.image}`);
    });
    
    console.log('--- Initialisation de la base de données terminée avec succès ! ---');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    await restaurantConn.close();
    await articleConn.close();
    console.log('Connexions MongoDB fermées.');
  }
};

populateDb();