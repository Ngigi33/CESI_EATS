const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 📌 Route d'inscription
router.post('/signup', authController.signup);

// 📌 Route de connexion
router.post('/login', authController.login);

// 📌 Récupération du compte connecté (API Key ou Token)
router.get('/me', authController.getProfile);

// 📌 Mise à jour des informations de compte
router.put('/update/:id', authController.updateDeveloper);

// 📌 Suppression du compte
router.delete('/delete/:id', authController.deleteDeveloper);

module.exports = router;
