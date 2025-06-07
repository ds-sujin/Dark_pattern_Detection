const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  level: Number,
  question: String,
  answer: [String],           // 보기형, 배열로
  real_answer: String,        // 실제 정답
  hint: String,
  picture: String,            // Google Drive URL (선택)
  explanation: String,
}, {
  versionKey: false
});

module.exports = mongoose.model('Quiz', quizSchema, 'quiz');
