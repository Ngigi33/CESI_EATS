const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); 

const userSchema = new mongoose.Schema({
    uuid: {       
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    role: {
    type: String,
    enum: ['END_USER', 'RESTAURANT_OWNER', 'DELIVERY_DRIVER', 'THIRD_PARTY_DEV', 'SALES_DEPT', 'TECH_SUPPORT'],
    default: 'END_USER'
    },
    status: {
    type: String,
    enum: ['active', 'suspended', 'pending'],
    default: 'active'
    },
    permissions : {
    type: [String],
    enum: ['1', '2','3', '4', '5', '6'],
    default: ['1'], // Default permission users
    required: true
    }
 });

const userModel = mongoose.models.user || mongoose.model("User", userSchema);
module.exports = userModel;
