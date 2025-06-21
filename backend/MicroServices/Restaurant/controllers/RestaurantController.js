/// backend/MicroServices/Restaurant/controllers/restaurantController.js

import Restaurant from "../models/RestaurantModel.js"; // Utiliser 'import' et s'assurer que le chemin est correct

// Get all restaurant
export const getAllRestaurants = async (req, res) => { // Utiliser 'export const'
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get specific restaurant by ID
export const getRestaurantById = async (req, res) => { // Utiliser 'export const'
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all restaurants of a particular owner
export const getRestaurantsByOwner = async (req, res) => { // Utiliser 'export const'
  const owner = req.params.ownerId;
  try {
    const restaurants = await Restaurant.find({ owner });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a restaurant
export const createRestaurant = async (req, res) => { // Utiliser 'export const'
  try {
    const restaurant = new Restaurant(req.body);
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
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a restaurant
export const deleteRestaurant = async (req, res) => { // Utiliser 'export const'
  try {
    const restaurant = await Restaurant.findByIdAndRemove(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};