import express from "express"
import authMiddleware from"../middleware/auth.js"
import { userOrders } from "../../controllers/orderController.js"

const orderRouter = express.Router();
orderRouter.post("/usersorders",authMiddleware,placeOrder,userOrders);

export  default orderRouter;