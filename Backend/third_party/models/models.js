const mongoose = require('mongoose');
const DeveloperSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  apiKey: { type: String },
});
module.exports = mongoose.model('Developer', DeveloperSchema);
const express = require('express');
const router = express.Router();