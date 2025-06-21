// backend/MicroServices/Menu/models/menuModel.js
import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        },
    ],
    price: {
        type: Number,
        required: true,
    },
});

const Menu = mongoose.model("menu", menuSchema);
export default Menu; // Corrected export to use 'Menu'