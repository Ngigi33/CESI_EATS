const foodModel = require("../models/foodModel.js");

//import fs from 'fs';

exports.addFood = async (req, res) => {
    try {
        const { name, description, price, category, restaurants } = req.body;
        const image = `${req.file.filename}`;
        const { uuid } = req.params;

        if (!name || !description || !price || !category || !image || !uuid) {
            return res.status(400).json({ message: "All fields are required", name, description, price, category, image, restaurants });
        }

        const newFood = new foodModel({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            category : req.body.category,
            imageUrl : image,
            restaurants: uuid // Assuming restaurants is an ObjectId or similar
        });

        await newFood.save();
        res.status(201).json({ message: "Food item added successfully", food: newFood });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ message: "Internal server error TGjXc7LHZrVK7bfz" });
    }
};

exports.getAllFoods = async (req, res) => {
    try {
        const foods = await foodModel.find();
        res.status(200).json(foods);
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getFoodById = async (req, res) => {
    try {
        const food = await foodModel.findOne({ uuid: req.params.uuid });
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
       //res.json(food);
        res.status(200).send({
            success: true,
            food,
    });
    } catch (error) {
        console.error("Error fetching food by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateFood = async (req, res) => {
    try {
        const { uuid } = req.params;
        const updatedData = req.body;

        const food = await foodModel.findOneAndUpdate({ uuid }, updatedData, { new: true });
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.json({ message: "Food item updated successfully", food });
    } catch (error) {
        console.error("Error updating food:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteFood = async (req, res) => {
    try {
        const { idFood } = req.params;

        const food = await foodModel.findOneAndDelete({ idFood });
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.json({ message: "Food item deleted successfully" });
    } catch (error) {
        console.error("Error deleting food:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getFoodByName = async (req, res) => {
    try {
        const { name } = req.params;
        const food = await foodModel.findOne({ name });
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.json(food);
    } catch (error) {
        console.error("Error fetching food by name:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getFoodByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const foods = await foodModel.find({ category });
        if (foods.length === 0) {
            return res.status(404).json({ message: "No food items found in this category" });
        }
        res.json(foods);
    } catch (error) {
        console.error("Error fetching food by category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getFoodByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        const foods = await foodModel.find({
            price: { $gte: minPrice, $lte: maxPrice }
        });
        if (foods.length === 0) {
            return res.status(404).json({ message: "No food items found in this price range" });
        }
        res.json(foods);
    } catch (error) {
        console.error("Error fetching food by price range:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getFoodByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const foods = await foodModel.find({ restaurants: restaurantId });
        if (foods.length === 0) {
            return res.status(404).json({ message: "No food items found for this restaurant" });
        }
        res.json(foods);
    } catch (error) {
        console.error("Error fetching food by restaurant:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

