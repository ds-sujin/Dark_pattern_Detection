
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  user_id: String,
  user_name: String,
  text: String,
  uploaded_at: { type: Date, default: Date.now }
}, {
  versionKey: false
});

module.exports = mongoose.model('Image', imageSchema, 'image');
