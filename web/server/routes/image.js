const mongoose = require('mongoose');

// 기존 'Image' 모델이 존재하면 삭제 (중복 등록 방지)
delete mongoose.connection.models['ImageOCR'];

const imageSchema = new mongoose.Schema({
  url: String,
  user_id: String,
  user_name: String,
  text: String,
  uploaded_at: { type: Date, default: Date.now }
}, {
  versionKey: false
});

// 모델 이름 'ImageOCR', 컬렉션 이름 'image_ocr'
// module.exports = mongoose.model('ImageOCR', imageSchema, 'image_ocr');
module.exports = mongoose.model('Image', imageSchema, 'image');
