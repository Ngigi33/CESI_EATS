const bcrypt = require('bcrypt');
const userModel = require('../models/usersmodels');

module.exports = (req, res, next) => {
    try {
        const toke = req.headers['authorization']
        const token = toke && toke.split(' ')[1]; // Extraire le token du format "Bearer token"
        if (!token) {
            return res.status(401).json({ message: 'Accès non autorisé' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    
            next();
    
    } catch (error) {
        return res.status(500).json({ message: 'Erreur lors de l\'authentification', error: error.message });
    }
};
