const bcrypt = require('bcrypt');
const userModel = require('../models/usersmodels');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    try {
        const toke = req.headers.authorization;
        if(!toke){
            return res.status((500).json({message: 'pas de user'}))
        }
        const token = toke && toke.split(' ')[1]; // Extraire le token du format "Bearer token"
        if (!token) {
            return res.status(401).json({ message: 'Accès non autorisé' });
        }
        kay ='pas';
        const decoded = jwt.verify(token, kay);
        req.user = decoded;
    
            next();
    
    } catch (error) {
        const toke = req.headers.authorization;
         const token = toke && toke.split(' ')[1]
        return res.status(500).json({ message: 'Erreur lors de l\'authentification', error: error.message, toke, token });
    }
};
