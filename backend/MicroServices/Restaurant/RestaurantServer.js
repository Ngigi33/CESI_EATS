// backend/MicroServices/Restaurant/restaurantServer.js

//import 'dotenv/config'; // Pour charger les variables d'environnement (PORT, etc.)
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db2.js'; // Chemin correct vers votre db.mjs globale
import restaurantRouter from './routes/RestaurantRoute.js'; // Importer le routeur restaurant
// import swaggerUi from 'swagger-ui-express';
//import swaggerSpecs from'./swagger.js'; // Corrected path to db.js
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';

const app = express();
// Choisissez un port différent pour chaque microservice. Ex: 4004 pour Restaurant
const port = process.env.PORT || 4002;

// Middleware
app.use(express.json()); // Pour analyser les corps de requête JSON
app.use(cors());         // Pour activer le Cross-Origin Resource Sharing

// Connexion à la base de données
connectDB();
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
app.use('/api-docs/restaurant', swaggerui.serve, swaggerui.setup(specs));
// API Endpoints for Restaurant Service
app.use('/restaurants', restaurantRouter); // Toutes les requêtes commençant par /restaurants seront gérées par restaurantRouter

// Route par défaut pour le service Restaurant (pour test simple)
app.get('/', (req, res) => {
    res.send("Restaurant Service API is running");
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Restaurant Service running on http://localhost:${port}`);
});