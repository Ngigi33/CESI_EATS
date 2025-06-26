import express from 'express';
import { updateDriverStatus_in_order } from '../controllers/deliveryController.js';
const router = express.Router();

router.patch('/driver_status', updateDriverStatus_in_order);

export default router;

