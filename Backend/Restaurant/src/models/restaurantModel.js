const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Importer la fonction uuidv4 pour générer des IDs uniques
//const AutoIncrement = require('mongoose-sequence')(mongoose); // Importer mongoose-sequence pour l'auto-incrémentation

const restaurantSchema = new mongoose.Schema({
    IdRestaurant: {
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
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });
const restaurantModel = mongoose.models.restaurant || mongoose.model('Restaurant', restaurantSchema);
module.exports = restaurantModel;