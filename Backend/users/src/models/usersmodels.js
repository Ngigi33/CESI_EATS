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
    }
 });

const userModel = mongoose.models.user || mongoose.model("User", userSchema);
module.exports = userModel;
