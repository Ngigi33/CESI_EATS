const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

router.post('/', deliveryController.createDelivery);
router.patch('/:id/status', deliveryController.updateStatus);
router.patch('/:id/confirm', deliveryController.confirmDelivery);
router.get('/order/:orderId', deliveryController.getByOrder);

module.exports = router;
