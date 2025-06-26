// backend/MicroServices/Restaurant/routes/restaurantRoute.js

import express from "express"; // Utiliser 'import'
const router = express.Router();
// Importer toutes les exportations nommées du contrôleur
import * as restaurantController from "../controllers/RestaurantController.js"; // Utiliser 'import * as' et s'assurer que le chemin est correct

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - status
 *         - image
 *         - opening
 *         - closing
 *         - tags
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Name of the restaurant
 *         address:
 *           type: string
 *           description: Address of the restaurant
 *         status:
 *           type: string
 *           description: Status (e.g., open, closed)
 *         image:
 *           type: string
 *           description: Image URL
 *         opening:
 *           type: string
 *           description: Opening hour (HH:mm)
 *         closing:
 *           type: string
 *           description: Closing hour (HH:mm)
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: List of tags for the restaurant
 *         description:
 *           type: string
 *           description: Description of the restaurant
 */

/**
 * @swagger
 * /Restaurant:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurant]
 *     responses:
 *       200:
 *         description: A list of all restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */

// Obtenir tous les restaurants
router.get("/", restaurantController.getAllRestaurants);


/**
 * @swagger
 * /Restaurant/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Restaurant ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found
 */


// Obtenir un restaurant par ID
router.get("/:id", restaurantController.getRestaurantById);


/**
 * @swagger
 * /Restaurant/owner/{ownerId}:
 *   get:
 *     summary: Get restaurants by owner ID
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: ownerId
 *         required: true
 *         description: ID of the owner
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of restaurants owned by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: No restaurant found for the owner
 */

// Obtenir un restaurant par ID Owner
router.get("/owner/:ownerId", restaurantController.getRestaurantsByOwner);


/**
 * @swagger
 * /Restaurant/create:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       400:
 *         description: Invalid input
 */

// Créer un nouveau restaurant 
router.post("/create", restaurantController.createRestaurant);

/**
 * @swagger
 * /Restaurant/{id}:
 *   delete:
 *     summary: Delete a restaurant by ID
 *     tags: [Restaurant]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Restaurant ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 */


// Supprimer un restaurant
router.delete("/:id", restaurantController.deleteRestaurant);

export default router; // Exporter le routeur comme une exportation par défaut