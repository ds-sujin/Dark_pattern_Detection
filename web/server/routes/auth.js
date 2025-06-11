
const express = require('express');
const router = express.Router();

// 실제 세션을 사용하지 않지만, 클라이언트 상태 초기화를 위한 형식
router.post('/logout', (req, res) => {
  res.clearCookie('connect.sid'); // 세션 쿠키 지우기 (선택)
  res.status(200).json({ success: true, message: '로그아웃 완료' });
});

module.exports = router;
