const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Importer la fonction uuidv4 pour générer des IDs uniques

const salesDepartSchema = new mongoose.Schema({
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

    department: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("SalesDepartment", salesDepartSchema);