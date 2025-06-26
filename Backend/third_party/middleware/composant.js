const mongoose = require('mongoose');
const ComponentSchema = new mongoose.Schema({
  name: String,
  description: String,
  fileUrl: String, // lien vers le fichier ou chemin local
});
module.exports = mongoose.model('Component', ComponentSchema);
