// backend/MenuService/menuServer.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js'; // Corrected path to db.js

// Import your menu routes
import menuRoutes from './routes/menuRoute.js';

// App Configuration
const app = express();
const port = 4002;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// API Endpoints for Menu Service
app.use("/api/menu", menuRoutes);

// Default route for the Menu Service (for basic testing)
app.get("/", (req, res) => {
    res.send("Menu Service API is running");
});

// Start the server
app.listen(port, () => {
    console.log(`Menu Service running on http://localhost:${port}`);
});