
const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://simoguidjou:TGjXc7LHZrVK7bfz@cluster0.lhpoivi.mongodb.net/CESI_EATS', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connexion à MongoDB Atlas réussie');
  } catch (err) {
    console.error('Erreur de connexion MongoDB :', err.message);
    
  }
};
