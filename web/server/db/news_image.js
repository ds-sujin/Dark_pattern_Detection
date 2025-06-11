
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  user_id: String,
  user_name: String,
}, {
  versionKey: false // __v 필드 아예 생성하지 않음
});

module.exports = mongoose.model('NewsImage', imageSchema, 'news_image');