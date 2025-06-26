// backend/MicroServices/Menu/routes/menuRoute.js
import express from "express";
import * as menuController from "../controllers/menuController.js"; // Corrected import path and filename

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       required:
 *         - restaurantId
 *         - name
 *         - category
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID of the menu
 *         restaurantId:
 *           type: string
 *           description: ID of the associated restaurant
 *         name:
 *           type: string
 *           description: Name of the menu
 *         description:
 *           type: string
 *           description: Description of the menu
 *         category:
 *           type: string
 *           description: Menu category
 *         articles:
 *           type: array
 *           items:
 *             type: string
 *           description: List of articles in the menu
 *         price:
 *           type: number
 *           description: Price of the menu
 *       example:
 *         restaurantId: "6859bab946b06892e618e4a9"
 *         name: "Quick Lunch"
 *         description: "Perfect for a quick meal"
 *         category: "Lunch"
 *         articles: ["Burger", "Fries", "Soda"]
 *         price: 9.99
 */

/**
 * @swagger
 * /menus:
 *   get:
 *     summary: Retrieve all menus
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: List of menus
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Menu'
 */
router.get("/", menuController.getAllMenus);

/**
 * @swagger
 * /menus/{id}:
 *   get:
 *     summary: Get a menu by ID
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu ID
 *     responses:
 *       200:
 *         description: Menu found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu not found
 */
router.get("/:id", menuController.getMenuById);

/**
 * @swagger
 * /menus/create:
 *   post:
 *     summary: Create a new menu
 *     tags: [Menus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       201:
 *         description: Menu successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/create", menuController.createMenu);

/**
 * @swagger
 * /menus/{id}:
 *   put:
 *     summary: Update an existing menu
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu not found
 */
router.put("/:id", menuController.updateMenu);

/**
 * @swagger
 * /menus/{id}:
 *   delete:
 *     summary: Delete a menu by ID
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu ID to delete
 *     responses:
 *       204:
 *         description: Menu deleted successfully (No Content)
 *       404:
 *         description: Menu not found
 */
router.delete("/:id", menuController.deleteMenu);



export default router;