const express = require('express');
const router = express.Router();
const ClickLog = require('../models/ClickLog');

// POST /log
router.post('/', async (req, res) => {
  const { button, timestamp } = req.body;

  try {
    const log = new ClickLog({
      button,
      timestamp: timestamp ? new Date(timestamp) : undefined
    });
    await log.save();
    res.status(200).json({ message: '✅ 로그 저장 완료' });
  } catch (error) {
    console.error('❌ 로그 저장 실패:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;