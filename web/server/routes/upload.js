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

    // === [1] 이미지 파일 업로드 경로 ===
    if (req.file) {
      const file = req.file;

      // 1-1) 이미지 파일 Google Drive 업로드
      finalUrl = await uploadToDrive(file.path, file.originalname);

      // 1-2) OCR 처리 (Google Vision API)
      const [result] = await client.textDetection(file.path);
      textResult = result.fullTextAnnotation?.text || '텍스트 없음';

      // 1-3) 임시 파일 삭제
      fs.unlinkSync(file.path);
    }

    // === [2] URL 직접 입력 시 ===
    else if (url) {
      finalUrl = url;
      textResult = '[URL 등록 - OCR 생략]';  // OCR 하지 않음 (원하면 API로 받아도 됨)
    }

    // === [3] 아무것도 없을 경우 ===
    else {
      return res.status(400).json({ success: false, error: '이미지 파일 또는 URL이 필요합니다.' });
    }

    // === [4] MongoDB 저장 ===
    const newImage = new Image({
      url: finalUrl,
      user_id,
      user_name,
      text: textResult,
      uploaded_at: new Date()
    });

    await newImage.save();

    // === [5] 응답 반환 ===
    res.status(200).json({
      success: true,
      message: 'Upload + OCR 성공',
      url: finalUrl,
      text: textResult
    });

  } catch (err) {
    console.error('[업로드 오류]', err);
    res.status(500).json({ success: false, error: '업로드 또는 OCR 실패' });
  }
});

module.exports = router;
