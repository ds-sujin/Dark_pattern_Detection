
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  date: Date,
  img: String,
  summary: String,
  company: String,
  newsurl : String
}, {
  versionKey: false // __v 필드 아예 생성하지 않음
});

module.exports = mongoose.model('News', newsSchema, 'news');
