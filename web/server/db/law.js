
const mongoose = require('mongoose');

const lawSchema = new mongoose.Schema({
  title: String,
  url: String,
  definition: String,
  excerpt: String
});

module.exports = mongoose.model('Law', lawSchema);
