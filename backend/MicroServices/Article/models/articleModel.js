// backend/MicroServices/Menu/models/menuModel.js
// backend/MicroServices/Article/models/articleModel.js

import mongoose from "mongoose"; // Utiliser 'import'

const articleSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant", // Assurez-vous que le modèle Restaurant existe
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  price: {
    type: Number,
    required: true,
  },
  type: { // Ex: "plat", "boisson", "dessert"
    type: String,
    required: true,
  },
});

const Article = mongoose.model("Article", articleSchema);
export default Article; // Exporter le modèle comme une exportation par défaut