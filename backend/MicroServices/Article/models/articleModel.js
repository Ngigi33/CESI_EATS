// backend/MicroServices/ArticleServer/models/articleModel.js

import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true }, // 'type' pour la catégorie du plat
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant', // Assurez-vous que 'Restaurant' correspond au nom de votre modèle Restaurant
    required: true,
  },
  isAvailable: { type: Boolean, default: true },
});

const Article = mongoose.model('Article', articleSchema);
export default Article;