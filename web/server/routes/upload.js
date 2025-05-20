const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const vision = require('@google-cloud/vision');
const { uploadToDrive } = require('../drive/googleDrive');
const Image = require('../db/image');

const upload = multer({ dest: 'uploads/' });
const client = new vision.ImageAnnotatorClient();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { user_id, user_name, url } = req.body;
    let finalUrl = '';
    let textResult = '';

    // 1. 이미지 파일 업로드
    if (req.file) {
      const file = req.file;
      finalUrl = await uploadToDrive(file.path, file.originalname);

      // 2. OCR 처리
      const [result] = await client.textDetection(file.path);
      textResult = result.fullTextAnnotation?.text || '텍스트 없음';

      fs.unlinkSync(file.path); // 로컬 파일 삭제
    } 
    else if (url) {
      finalUrl = url;
    } 
    else {
      return res.status(400).json({ error: 'Image file or URL is required' });
    }

    // 3. DB 저장
    const newImage = new Image({
      url: finalUrl,
      user_id,
      user_name,
      text: textResult,
    });

    await newImage.save();

    res.status(200).json({ message: 'Upload + OCR 성공', url: finalUrl, text: textResult });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload or OCR failed' });
  }
});

module.exports = router;
