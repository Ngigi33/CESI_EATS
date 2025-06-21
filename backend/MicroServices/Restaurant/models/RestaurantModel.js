// backend/MicroServices/Restaurant/models/restaurantModel.js

import mongoose from "mongoose"; // Utiliser 'import'

const restaurantSchema = new mongoose.Schema({
  userId: Number,
  owner: Number, // Assuming 'owner' refers to a user ID
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: String,
  image: String,
  opening: String,
  closing: String,
  tags: Array,
  description: String,
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article", // Assurez-vous que le modèle Article existe et est bien importé là où il est nécessaire
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant; // Exporter le modèle comme une exportation par défaut