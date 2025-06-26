// backend/MicroServices/OrderServer/orderServer.js

import 'dotenv/config'; // ES Module way to load dotenv
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db1.js' // Ensure db.js was renamed to db.mjs
import orderRouter from './routes/orderRoute.js'; // Ensure orderRoute.js uses 'export default'
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';


const app = express();
app.use(express.json());
app.use(cors());
const port = 4005
connectDB(); // Call the connectDB function
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "article api",
            version: "1.0.0"
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./routes/*.js'], // Chemin vers les fichiers contenant les commentaires Swagger
};

const specs = swaggerjsdoc(options);
app.use('/api-docs/order', swaggerui.serve, swaggerui.setup(specs));

app.use('/orders', orderRouter);

app.listen(process.env.PORT || 4002, () => {
  console.log(`Order Service running on http://localhost:${process.env.PORT || 4002}`);
});