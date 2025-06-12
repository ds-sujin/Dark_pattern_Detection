// predict.js : 파일명을 받아 존재 여부만 확인하는 임시 버전 구현
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.post('/', async (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) return res.status(400).json({ error: 'filename 누락' });

    const imagePath = path.join(__dirname, '..', 'input_image', filename);
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: '이미지 파일을 찾을 수 없습니다.' });
    }

    // 모델 적용 및 MongoDB 저장은 추후 수진이가 연결 예정
    res.status(200).json({ success: true, message: '파일명 확인 완료', filename });

  } catch (err) {
    console.error('파일명 전달 오류:', err);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;