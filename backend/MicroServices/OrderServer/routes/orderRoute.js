// backend/MicroServices/OrderServer/routes/orderRoute.js

import express from 'express';
const router = express.Router();
// Use import * as for named exports from the controller
import * as orderController from '../controllers/orderController.js'; // Ensure orderController.js uses 'export const'

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - restaurantId
 *         - address
 *         - created
 *         - status
 *         - accepted
 *         - price
 *         - menus
 *         - articles
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the order
 *         restaurantId:
 *           type: string
 *           description: ID of the restaurant
 *         address:
 *           type: string
 *           description: Delivery address
 *         created:
 *           type: string
 *           format: date-time
 *           description: Date when the order was created
 *         status:
 *           type: string
 *           description: Current status of the order (e.g., pending, completed)
 *         accepted:
 *           type: boolean
 *           description: Whether the order has been accepted
 *         price:
 *           type: number
 *           description: Total price of the order
 *         menus:
 *           type: array
 *           items:
 *             type: string
 *           description: List of menu IDs
 *         articles:
 *           type: array
 *           items:
 *             type: string
 *           description: List of article IDs
 */

router.get('/', orderController.getAllOrders);


/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Retrieve a single order by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 */

router.get('/:id', orderController.getOrderById);

/**
 * @swagger
 * /order/create:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid input
 */

router.post('/create', orderController.createOrder);
/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Update an existing order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */

router.put('/:id', orderController.updateOrder);
/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */

router.delete('/:id', orderController.deleteOrder);

export default router; // Crucial: Export the router as a default export