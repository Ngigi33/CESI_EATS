const jwt = require('jsonwebtoken');
const userModel = require('../models/foodModels');

exports.middlewarefood = async (req, res) => {
    const requise = ['Restaurant', 'Admin', 'user']; 
    const permission = ['1', '2', '3']; 

    try {
        const tok = req.headers['authorization']

        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }
        const token = tok && tok.split(' ')[1]; // Extraire le token du format "Bearer token"

          jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);

        if (!requise.includes(decoded.role)) {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        //  return res.status(200).json({ message: "Authenticated", user: decoded.OwnerId });
        next();
        }
        );
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'authentification', error: error.message });
    }
};

authorization = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide' });
        }
        req.user = decoded; // Stocker les informations de l'utilisateur dans la requête
        if (!req.user.permissions.includes('1')) {
            return res.status(403).json({ message: 'Accès interdit' });
        }

        next();
    });
}