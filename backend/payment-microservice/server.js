import express from 'express';
import mongoose from 'mongoose';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';

import paymentRoutes from './src/routes';

dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());
app.use('/api/payments', paymentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5002, () => console.log('Payment service running on port 5002'));
  })
  .catch(err => console.error(err));
