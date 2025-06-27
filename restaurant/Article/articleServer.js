// backend/MicroServices/Article/articleServer.js

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db3.js';
import articleRouter from './routes/articleRoute.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 5007;

// CORS très permissif
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Servir les images depuis backend/public/images/food
const imagesPath = path.join(__dirname, './public/images/food');
console.log('Chemin des images:', imagesPath);

// Headers pour les images
app.use('/images/food', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

app.use('/images/food', express.static(imagesPath));

// Middleware JSON
app.use(express.json());

// Connexion BDD
connectDB();

// Routes
app.use('/articles', articleRouter);

// Route de test
app.get('/', (req, res) => {
    res.send("Article Service API is running");
});

// Test des images - VERSION CORRIGÉE
app.get('/test-images', (req, res) => {
    try {
        if (!fs.existsSync(imagesPath)) {
            return res.status(404).json({
                success: false,
                error: 'Dossier images non trouvé',
                path: imagesPath,
                currentDir: __dirname
            });
        }

        const files = fs.readdirSync(imagesPath);
        res.json({
            success: true,
            message: 'Images disponibles:',
            files: files,
            path: imagesPath,
            count: files.length,
            sampleUrls: files.slice(0, 3).map(file =>
                `${file}`
            )
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la lecture du dossier',
            path: imagesPath,
            message: error.message
        });
    }
});

// Route pour tester une image spécifique
app.get('/test-image/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(imagesPath, filename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({
            error: 'Image non trouvée',
            filename: filename,
            path: filePath
        });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Article Service running on http://localhost:${port}`);
    console.log(`Images path: ${imagesPath}`);

    // Vérifier si le dossier existe
    if (fs.existsSync(imagesPath)) {
        console.log('✅ Dossier images trouvé');
        try {
            const files = fs.readdirSync(imagesPath);
            console.log(`📁 ${files.length} fichiers trouvés`);
            if (files.length > 0) {
                console.log('Premier fichier:', files[0]);
                console.log('URL de test:', `http://localhost:${port}/api/images/food/${files[0]}`);
            }
        } catch (e) {
            console.log('❌ Erreur lecture dossier:', e.message);
        }
    } else {
        console.log('❌ Dossier images NON trouvé:', imagesPath);
        console.log('📂 Dossiers disponibles dans backend:');
        try {
            const backendPath = path.join(__dirname, '../../..');
            const dirs = fs.readdirSync(backendPath, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);
            console.log('Dossiers:', dirs);
        } catch (e) {
            console.log('Impossible de lister les dossiers');
        }
    }
});