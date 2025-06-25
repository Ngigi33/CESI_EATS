import express from 'express';
import {
    createOrder,
    verifyOrder,
    updateOrderStatus,
    //getOrderById,
    getOrdersByUser,
    listOrders,
    updateDriverStatus,
    deleteOrder
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/create', authMiddleware, createOrder);
router.post('/verify', verifyOrder);
router.patch('/status', authMiddleware, updateOrderStatus);
//router.get('/:id', getOrderById);
router.post('/userOrders', authMiddleware, getOrdersByUser);
router.get('/list', listOrders)
router.patch('/driver_status', updateDriverStatus)
router.delete('/:id', deleteOrder)

// router.post('/', authMiddleware, createOrder);
// router.patch('/:id/status', authMiddleware, updateOrderStatus);
// router.get('/:id', authMiddleware, getOrderById);
// router.get('/user/:userId', authMiddleware, getOrdersByUser);

export default router;





