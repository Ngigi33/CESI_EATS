// backend/MicroServices/OrderServer/orderServer.js

import 'dotenv/config'; // ES Module way to load dotenv
import express from 'express';
import { connectDB } from './config/db1.js' // Ensure db.js was renamed to db.mjs
import orderRouter from './routes/orderRoute.js'; // Ensure orderRoute.js uses 'export default'

const app = express();
app.use(express.json());

connectDB(); // Call the connectDB function

app.use('/orders', orderRouter);

app.listen(process.env.PORT || 4003, () => {
  console.log(`Order Service running on http://localhost:${process.env.PORT || 4003}`);
});