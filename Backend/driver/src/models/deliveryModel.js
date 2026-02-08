const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Importer la fonction uuidv4 pour générer des IDs uniques

const deliverySchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    driverId:{
        type: String,
        required: true,
        unique: true
    },
    foodId : {
        type: String,
        required: true,
        unique: true
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    restaurantId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: false
    },
    })
    const deliveryModel = mongoose.models.delivery || mongoose.model('delivery', deliverySchema);
    module.exports = deliveryModel;