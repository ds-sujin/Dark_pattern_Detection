const mongoose = require('mongoose');

const ClickLogSchema = new mongoose.Schema({
  button: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

module.exports = mongoose.model('ClickLog', ClickLogSchema);