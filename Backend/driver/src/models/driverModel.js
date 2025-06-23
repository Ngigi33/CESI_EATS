const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Importer la fonction

// uuidv4 pour générer des IDs uniques

const driverSchema = new mongoose.Schema({
    uuid: {         
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const driverModel = mongoose.models.driver || mongoose.model('driver', driverSchema);
module.exports = driverModel;