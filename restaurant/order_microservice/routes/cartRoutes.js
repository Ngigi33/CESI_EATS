import express from 'express';
import { addToCart, removeFromCart, getCart} from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

// cartRouter.post("/add", addToCart);
// cartRouter.post("/remove", removeFromCart);
// cartRouter.post("/get", getCart);

// cartRouter.post("/createTestUser", createTestUser);

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
