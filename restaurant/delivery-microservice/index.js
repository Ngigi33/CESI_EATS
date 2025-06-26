import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import deliveryRoutes from './routes/deliveryRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/deliveries', deliveryRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Delivery service running on port ${PORT}`);
});
