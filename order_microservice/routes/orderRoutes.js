import express from 'express';
import {
    createOrder,
    updateOrderStatus,
    getOrderById,
    getOrdersByUser
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.patch('/:id/status', authMiddleware, updateOrderStatus);
router.get('/:id', authMiddleware, getOrderById);
router.get('/user/:userId', authMiddleware, getOrdersByUser);

export default router;




// // order-service/routes/orderRoutes.js
// const express = require('express');
// const router = express.Router();
// const orderController = require('../controllers/orderController');



// router.post('/', orderController.createOrder);
// router.patch('/:id/status', orderController.updateOrderStatus);
// router.get('/:id', orderController.getOrderById);
// router.get('/user/:userId', orderController.getOrdersByUser);



// module.exports = router;
