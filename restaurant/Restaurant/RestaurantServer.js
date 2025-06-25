// backend/MicroServices/Restaurant/restaurantServer.js

//import 'dotenv/config'; // Pour charger les variables d'environnement (PORT, etc.)
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db2.js'; // Chemin correct vers votre db.mjs globale
import restaurantRouter from './routes/RestaurantRoute.js'; // Importer le routeur restaurant

const app = express();
// Choisissez un port différent pour chaque microservice. Ex: 4004 pour Restaurant
const port = process.env.PORT || 4004;

// Middleware
app.use(express.json()); // Pour analyser les corps de requête JSON
app.use(cors());         // Pour activer le Cross-Origin Resource Sharing

// Connexion à la base de données
connectDB();

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