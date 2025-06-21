// backend/MicroServices/Article/routes/articleRoute.js

import express from "express"; // Utiliser 'import'
const router = express.Router();
// Importer toutes les exportations nommées du contrôleur
import * as articleController from "../controllers/articleController.js"; // Utiliser 'import * as' et le bon chemin

// Route pour créer un nouvel article
router.post("/", articleController.createArticle);

// Route pour obtenir tous les articles
router.get("/", articleController.getAllArticles);

// Obtenir tous les articles d'un restaurant spécifique
router.get(
  "/restaurant/:restaurantId",
  articleController.getAllArticlesFromRestaurant
);

// Route pour obtenir un article par son ID
router.get("/:id", articleController.getArticleById);

// Route pour mettre à jour un article
router.put("/:id", articleController.updateArticleById);

// Route pour supprimer un article
router.delete("/:id", articleController.deleteArticleById);

export default router; // Exporter le routeur comme une exportation par défaut