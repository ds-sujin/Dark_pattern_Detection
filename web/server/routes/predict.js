const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.post('/', async (req, res) => {
  try {
    const { filename } = req.body;

    if (!filename) {
      return res.status(400).json({ success: false, message: 'filename이 필요합니다.' });
    }

    const imagePath = path.join(__dirname, '..', 'input_image', filename);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ success: false, message: '이미지 파일이 존재하지 않습니다.' });
    }

    res.status(200).json({ success: true, message: '예측 요청 수신 완료', filename });
  } catch (error) {
    console.error('[predict 라우터 오류]', error);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});

module.exports = router;
