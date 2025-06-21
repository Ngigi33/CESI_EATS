// backend/MicroServices/Article/articleServer.js

import 'dotenv/config'; // Pour charger les variables d'environnement (PORT, etc.)
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db3.js'; // Chemin correct vers votre db.mjs globale
import articleRouter from './routes/articleRoute.js'; // Importer le routeur article

const app = express();
// Choisissez un port différent pour chaque microservice. Ex: 4005 pour Article
const port = process.env.PORT || 4005;

// Middleware
app.use(express.json()); // Pour analyser les corps de requête JSON
app.use(cors());         // Pour activer le Cross-Origin Resource Sharing

// Connexion à la base de données
connectDB();

// API Endpoints for Article Service
app.use('/articles', articleRouter); // Toutes les requêtes commençant par /articles seront gérées par articleRouter

// Route par défaut pour le service Article (pour test simple)
app.get('/', (req, res) => {
    res.send("Article Service API is running");
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Article Service running on http://localhost:${port}`);
});