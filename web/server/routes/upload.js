const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const Tesseract = require('tesseract.js');
const Image = require('../db/image');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { user_id, user_name, url, saveToDB } = req.body;
    let finalUrl = '';
    let textResult = '';

    if (req.file) {
      const file = req.file;
      const imagePath = file.path;

      try {
        const {
          data: { text }
        } = await Tesseract.recognize(imagePath, 'kor', {
          logger: m => console.log('[OCR 진행 상태]', m),
        });

        textResult = text.trim() || '텍스트 없음';
        console.log('[OCR 결과]:', textResult.substring(0, 100) + '...');
      } catch (ocrErr) {
        console.error('[OCR 오류]', ocrErr);
        textResult = 'OCR 실패';
      } finally {
        fs.unlinkSync(imagePath);
      }

      finalUrl = `local:${file.filename}`;
    } else if (url) {
      finalUrl = url;
      textResult = '[URL 등록 - OCR 생략]';
    } else {
      return res.status(400).json({ success: false, error: '이미지 또는 URL이 필요합니다.' });
    }

    if (saveToDB === 'true') {
      const doc = {
        url: finalUrl,
        user_id,
        user_name,
        text: textResult,
        uploaded_at: new Date()
      };

      console.log('[MongoDB 저장 시도]', doc);

      const newImage = new Image(doc);
      await newImage.save()
        .then(() => console.log('[MongoDB 저장 완료]'))
        .catch((err) => console.error('[MongoDB 저장 실패]', err));
    } else {
      console.log('[MongoDB 저장 생략] saveToDB 플래그 없음');
    }

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
