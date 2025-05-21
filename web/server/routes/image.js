const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const mongoUrl = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');

    // MongoDB 연결
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const uploads = db.collection('uploads');

    // 저장
    await uploads.insertOne({
      filename: req.file.originalname,
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      extracted_text: text,
      uploaded_at: new Date(),
    });

    client.close();
    fs.unlinkSync(imagePath); // 업로드 파일 삭제

    res.json({ success: true, text });
  } catch (error) {
    console.error('[OCR 처리 오류]', error);
    res.status(500).json({ success: false, error: 'OCR 처리 실패' });
  }
});

module.exports = router;
