// db/patterntype.js
const mongoose = require('mongoose');

const PatternTypeSchema = new mongoose.Schema({
  title: String,
  definition: String
});

module.exports = mongoose.model('PatternType', PatternTypeSchema, 'type');

