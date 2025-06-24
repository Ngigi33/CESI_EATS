// backend/MicroServices/OrderServer/routes/orderRoute.js

import express from 'express';
const router = express.Router();
// Use import * as for named exports from the controller
import * as orderController from '../controllers/orderController.js'; // Ensure orderController.js uses 'export const'

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

export default router; // Crucial: Export the router as a default export