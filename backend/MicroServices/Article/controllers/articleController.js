// backend/MicroServices/Article/controllers/articleController.js

import Article from "../models/articleModel.js"; // Utiliser 'import' et le bon chemin

// Opération de création d'un nouvel article
export const createArticle = async (req, res) => { // Utiliser 'export const'
  try {
    const { restaurantId, name, image, description, price, type } = req.body;

    const newArticle = new Article({
      restaurantId,
      name,
      image,
      description,
      price,
      type,
    });

    console.log(newArticle);
    const savedArticle = await newArticle.save();

    res.status(201).json({
      message: "Nouvel article créé avec succès",
      article: savedArticle,
    });
  } catch (error) {
    console.error("Error creating article:", error); // Pour un meilleur débogage
    res.status(500).json({ error: "Erreur lors de la création de l'article" });
  }
};

// Opération de lecture de tous les articles
export const getAllArticles = async (req, res) => { // Utiliser 'export const'
  try {
    const articles = await Article.find().select(
      "name image description price"
    );

    res.status(200).json({ articles });
  } catch (error) {
    console.error("Error getting all articles:", error); // Pour un meilleur débogage
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des articles" });
  }
};

// Récupérer tous les articles d'un restaurant spécifique
export const getAllArticlesFromRestaurant = async (req, res) => { // Utiliser 'export const'
  try {
    const restaurantId = req.params.restaurantId;

    const articles = await Article.find({ restaurantId });

    res.status(200).json(articles);
  } catch (error) {
    console.error("Error getting articles by restaurant:", error); // Pour un meilleur débogage
    res.status(500).json({ error: "Internal server error" });
  }
};

// Opération de lecture d'un article par son identifiant
export const getArticleById = async (req, res) => { // Utiliser 'export const'
  try {
    const { id } = req.params;

    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.status(200).json({ article });
  } catch (error) {
    console.error("Error getting article by ID:", error); // Pour un meilleur débogage
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'article" });
  }
};

// Opération de mise à jour d'un article par son identifiant
export const updateArticleById = async (req, res) => { // Utiliser 'export const'
  try {
    const { id } = req.params;
    const { name, image, description, price, type } = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        name,
        image,
        description,
        price,
        type,
      },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.status(200).json({
      message: "Article mis à jour avec succès",
      article: updatedArticle,
    });
  } catch (error) {
    console.error("Error updating article:", error); // Pour un meilleur débogage
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'article" });
  }
};

// Opération de suppression d'un article par son identifiant
export const deleteArticleById = async (req, res) => { // Utiliser 'export const'
  try {
    const { id } = req.params;

    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.status(200).json({ message: "Article supprimé avec succès" });
  } catch (error) {
    console.error("Error deleting article:", error); // Pour un meilleur débogage
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'article" });
  }
};