const restaurantModel = require('../models/restaurantModel');
/// backend/MicroServices/restaurantModel/controllers/restaurantController.js

// Utiliser 'import' et s'assurer que le chemin est correct

// Get all restaurant
export const getAllRestaurants = async (req, res) => { // Utiliser 'export const'
  try {
    const restaurants = await restaurantModel.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get specific restaurant by ID
// Dans backend/MicroServices/restaurantModel/controllers/restaurantController.js
export const getRestaurantById = async (req, res) => {
  try {
    console.log("Recherche du restaurant avec l'ID:", req.params.id); // Ajouté
    const restaurant = await restaurantModel.findById(req.params.id);
    if (!restaurant) {
      console.log("restaurantModel non trouvé pour l'ID:", req.params.id); // Ajouté
      return res.status(404).json({ error: "restaurant not found" });
    }
    console.log("restaurantModel trouvé:", restaurant); // Ajouté
    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Erreur lors de la récupération du restaurant par ID:", error); // Ajouté
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all restaurants of a particular owner
export const getRestaurantsByOwner = async (req, res) => { // Utiliser 'export const'
  const owner = req.params.ownerId;
  try {
    const restaurants = await restaurantModel.find({ owner });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a restaurant
export const createRestaurant = async (req, res) => { // Utiliser 'export const'
  try {
    const restaurant = new restaurantModel(req.body);
    const validationError = restaurant.validateSync();
    if (validationError) {
      const errors = Object.keys(validationError.errors).map(
        (key) => validationError.errors[key].message
      );
      return res.status(400).json({ errors });
    }
    const savedRestaurant = await restaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Edit a restaurant
export const updateRestaurant = async (req, res) => { // Utiliser 'export const'
  try {
    const restaurant = await restaurantModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!restaurant) {
      return res.status(404).json({ error: "restaurantModel not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => { // Utiliser 'export const'
  try {
    const restaurant = await restaurantModel.findByIdAndRemove(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "restaurantModel not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};