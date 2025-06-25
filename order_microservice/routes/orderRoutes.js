import express from 'express';
import {
    createOrder,
    verifyOrder,
    updateOrderStatus,
    getOrderById,
    getOrdersByUser
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/create', createOrder);
router.post('/verify', verifyOrder);
router.patch('/status', updateOrderStatus);
router.get('/:id', getOrderById);
router.post('/userOrders', getOrdersByUser);

// router.post('/', authMiddleware, createOrder);
// router.patch('/:id/status', authMiddleware, updateOrderStatus);
// router.get('/:id', authMiddleware, getOrderById);
// router.get('/user/:userId', authMiddleware, getOrdersByUser);

export default router;





