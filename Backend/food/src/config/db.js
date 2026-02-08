
const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ezzoubair123:ezzoubair123@cluster0.d75x2k6.mongodb.net/food-del?', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connexion à MongoDB Atlas réussie');
  } catch (err) {
    console.error('Erreur de connexion MongoDB :', err.message);
    
  }
};
