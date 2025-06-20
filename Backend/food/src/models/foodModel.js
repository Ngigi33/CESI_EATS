//import mongoose from "mongoose";
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Importer la fonction uuidv4 pour générer des IDs uniques

const foodSchema = new mongoose.Schema({
     idFood: {
        type: Number,
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
    restaurants: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    }
}, { timestamps: true });

const foodModel = mongoose.models.food || mongoose.model('Food', foodSchema);
module.exports = foodModel;