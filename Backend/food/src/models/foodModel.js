//import mongoose from "mongoose";
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Importer la fonction uuidv4 pour générer des IDs uniques

const foodSchema = new mongoose.Schema({
     uuid: {
        type: String,
        required: true,
        unique: true,
        default : uuidv4
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    restaurantsid: {
      type: String,
      ref: "Restaurant",
    },
    menuId: {
        type: String,
        ref: "RestaurantMenu",
        required: true
    }
}, { timestamps: true });

const foodModel = mongoose.models.food || mongoose.model('Food', foodSchema);

const restaurantMenuschema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default : uuidv4
    },
    restaurantId: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }
}, { timestamps: true });
const restaurantMenu = mongoose.models.restaurantMenu || mongoose.model('RestaurantMenu', restaurantMenuschema);
module.exports = {
    foodModel,
    restaurantMenu
};