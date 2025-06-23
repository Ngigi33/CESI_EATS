import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
//import foodRouter from "./routes/foodRoute.js"
// server.js - Backend API for CESI Eats (Consolidated for demonstration)

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000; // Use port 4000 for the backend

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS for all origins (for development)

// MongoDB Connection
connectDB();

mongoose.connect(MONGODB_URI)
  .then(() => console.log('🔌 MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- Mongoose Schemas ---

// Minimal User Schema for demonstration (you'll integrate with your actual auth system)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});
const User = mongoose.model('User', userSchema);

const restaurantSchema = new mongoose.Schema({
  userId: Number,
  owner: Number,
  name: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, default: 'open' },
  image: String,
  opening: String,
  closing: String,
  tags: [String],
  description: String,
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
});

const articleSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true },
  image: String,
  description: String,
  price: { type: Number, required: true },
  type: { type: String, required: true } // This will be your category (burger, pizza, etc.)
});

const menuSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  userId: Number,
  deliveryNumber: Number,
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  address: String,
  created: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
  accepted: { type: Boolean, default: null },
  price: { type: Number, required: true },
  menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
});

// NEW: Cart Schema
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  articles: [{
    articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    quantity: { type: Number, default: 1 }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const Article = mongoose.model('Article', articleSchema);
const Menu = mongoose.model('Menu', menuSchema);
const Order = mongoose.model('Order', orderSchema);
const Cart = mongoose.model('Cart', cartSchema); // NEW: Cart Model

// --- API Routes ---

// Get all restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.json({ success: false, message: "Error fetching restaurants" });
  }
});

// Get articles (food items) with optional category and restaurantId filters
app.get('/api/articles', async (req, res) => {
  try {
    const { category, restaurantId } = req.query;
    let filter = {};

    if (category && category !== 'All') {
      filter.type = category; // Assuming 'type' field in Article is used for categories
    }
    if (restaurantId) {
      filter.restaurantId = restaurantId;
    }

    const articles = await Article.find(filter).populate('restaurantId', 'name'); // Populate to get restaurant name
    res.json({ success: true, data: articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.json({ success: false, message: "Error fetching articles" });
  }
});

// Get unique article categories (for ExploreMenu)
app.get('/api/article-categories', async (req, res) => {
  try {
    const categories = await Article.distinct('type');
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching article categories:", error);
    res.json({ success: false, message: "Error fetching article categories" });
  }
});

// --- NEW: Cart API Routes ---

// Helper function to calculate total price (optional, but good practice)
async function calculateCartTotalPrice(cart) {
  let totalPrice = 0;
  for (const item of cart.articles) {
    const article = await Article.findById(item.articleId);
    if (article) {
      totalPrice += article.price * item.quantity;
    }
  }
  return totalPrice;
}

// 1. Add item to cart or update quantity
app.post('/api/cart/add', async (req, res) => {
  const { userId, articleId, quantity } = req.body; // Expect userId, articleId, quantity

  if (!userId || !articleId || !quantity || quantity <= 0) {
    return res.json({ success: false, message: "Missing required fields or invalid quantity" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists for the user, create a new one
      cart = new Cart({ userId, articles: [] });
    }

    const existingArticleIndex = cart.articles.findIndex(
      item => item.articleId.equals(articleId)
    );

    if (existingArticleIndex > -1) {
      // If article already in cart, update quantity
      cart.articles[existingArticleIndex].quantity += quantity;
    } else {
      // If article not in cart, add new entry
      cart.articles.push({ articleId, quantity });
    }

    await cart.save();
    res.json({ success: true, message: "Article added to cart", cartId: cart._id });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.json({ success: false, message: "Error adding to cart" });
  }
});

// 2. Remove item from cart or decrease quantity
app.post('/api/cart/remove', async (req, res) => {
  const { userId, articleId, quantity } = req.body; // Expect userId, articleId, optional quantity to remove

  if (!userId || !articleId) {
    return res.json({ success: false, message: "Missing required fields" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ success: false, message: "Cart not found for this user" });
    }

    const existingArticleIndex = cart.articles.findIndex(
      item => item.articleId.equals(articleId)
    );

    if (existingArticleIndex === -1) {
      return res.json({ success: false, message: "Article not found in cart" });
    }

    if (quantity && quantity > 0) {
      // Decrease quantity
      cart.articles[existingArticleIndex].quantity -= quantity;
      if (cart.articles[existingArticleIndex].quantity <= 0) {
        // Remove article if quantity drops to 0 or less
        cart.articles.splice(existingArticleIndex, 1);
      }
    } else {
      // If no quantity specified, remove the entire article entry
      cart.articles.splice(existingArticleIndex, 1);
    }

    await cart.save();
    res.json({ success: true, message: "Article removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.json({ success: false, message: "Error removing from cart" });
  }
});

// 3. Get user's cart (with populated article details)
app.get('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId })
      .populate({
        path: 'articles.articleId',
        select: 'name price image description type restaurantId', // Select fields you need from Article
        populate: {
          path: 'restaurantId', // Populate restaurant details within each article
          select: 'name address' // Select fields you need from Restaurant
        }
      });

    if (!cart) {
      // If no cart found, return an empty cart structure
      return res.json({ success: true, data: { userId, articles: [], totalPrice: 0 } });
    }

    // Calculate total price for the cart
    const totalPrice = await calculateCartTotalPrice(cart);

    res.json({ success: true, data: { ...cart.toObject(), totalPrice } });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.json({ success: false, message: "Error fetching cart" });
  }
});

// 4. Clear user's cart
app.post('/api/cart/clear', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.json({ success: false, message: "User ID is required" });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ success: false, message: "Cart not found for this user" });
    }

    cart.articles = []; // Clear the articles array
    await cart.save();
    res.json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.json({ success: false, message: "Error clearing cart" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


