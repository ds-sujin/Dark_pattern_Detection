const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Image = require('../db/image');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'input_image');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });


// ✅ 2. OCR 없이 파일 저장 + DB 등록
router.post('/', upload.single('image'), async (req, res) => {
  console.log('[🔔 요청 도착] /upload');
  try {
    const { user_id, user_name } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, error: '이미지 파일이 필요합니다.' });
    }

    const savedPath = `web/input_image/${req.file.originalname}`;

    const newImage = new Image({
      url: savedPath,
      user_id,
      user_name,
      text: '[분석 전]',
      uploaded_at: new Date()
    });

    await newImage.save();
    console.log('[저장 완료]:', savedPath);

    res.status(200).json({
      success: true,
      message: '업로드 성공',
      fileName: req.file.originalname,
      path: savedPath
    });

  } catch (err) {
    console.error('[업로드 오류]', err);
    res.status(500).json({ success: false, error: '서버 오류' });
  }
});

module.exports = router;