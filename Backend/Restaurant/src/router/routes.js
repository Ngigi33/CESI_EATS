// backend/MicroServices/Restaurant/routes/restaurantRoute.js

import express from "express"; // Utiliser 'import'
const router = express.Router();
// Importer toutes les exportations nommées du contrôleur
import * as restaurantController from "../controllers/restaurantController.js"; // Utiliser 'import * as' et s'assurer que le chemin est correct

// Obtenir tous les restaurants
router.get("/", restaurantController.getAllRestaurants);

// Obtenir un restaurant par ID
router.get("/:id", restaurantController.getRestaurantById);

// Obtenir un restaurant par ID Owner
router.get("/owner/:ownerId", restaurantController.getRestaurantsByOwner);

// Créer un nouveau restaurant
router.post("/", restaurantController.createRestaurant);

// Mettre à jour un restaurant
router.patch("/:id", restaurantController.updateRestaurant);

// Supprimer un restaurant
router.delete("/:id", restaurantController.deleteRestaurant);

export default router; // Exporter le routeur comme une exportation par défaut