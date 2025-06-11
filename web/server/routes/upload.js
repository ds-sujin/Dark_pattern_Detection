
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { createWorker } = require('tesseract.js');
const Image = require('../db/image'); // Mongoose 모델
const Tesseract = require('tesseract.js');


// 업로드 설정
const upload = multer({ dest: 'uploads/' });

// OCR 처리 라우터
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { user_id, user_name, url } = req.body;

    let finalUrl = '';
    let textResult = '';

    if (req.file) {
      const file = req.file;
      const imagePath = file.path;
      console.log('[업로드] 파일 수신:', file.originalname);

      // Tesseract OCR 처리
      try {
        const {
          data: { text }
        } = await Tesseract.recognize(imagePath, 'kor', {
          logger: (m) => console.log('[OCR 진행 상태]', m),
        });
      
        textResult = text.trim() || '텍스트 없음';
        console.log('[OCR 결과]:', textResult.substring(0, 100) + '...');
      } catch (ocrErr) {
        console.error('[OCR 오류]', ocrErr);
        textResult = 'OCR 실패';
      } finally {
        fs.unlinkSync(imagePath); // OCR 후 임시 파일 삭제
      }
     

      finalUrl = `local:${file.filename}`; // 로컬 경로 표시용

    } else if (url) {
      finalUrl = url;
      textResult = '[URL 등록 - OCR 생략]';
    } else {
      return res.status(400).json({ success: false, error: '이미지 파일 또는 URL이 필요합니다.' });
    }

    // MongoDB 저장
    const newImage = new Image({
      url: finalUrl,
      user_id,
      user_name,
      text: textResult,
      uploaded_at: new Date()
    });

    await newImage.save();
    console.log('[MongoDB 저장 완료]');

    res.status(200).json({
      success: true,
      message: 'Upload + OCR 성공',
      url: finalUrl,
      text: textResult
    });

  } catch (err) {
    console.error('[업로드 오류]', err);
    res.status(500).json({ success: false, error: '서버 오류 또는 OCR 실패' });
  }
});

module.exports = router;
