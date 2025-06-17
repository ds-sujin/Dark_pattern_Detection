const express = require('express');
const router = express.Router();
const { connectPredicateCollection } = require('../db/predicate');

router.post('/', async (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    return res.status(400).json({ message: 'filename이 필요합니다.' });
  }

  try {
    const collection = await connectPredicateCollection();
    const results = await collection.find({ filename }).toArray();

    const formatted = results.map(item => ({
      text: item.text,
      type: item.type,
      predicate: item.predicate,
      confidence: Math.round((item.confidence || 0) * 100), // 0~1 → %
      bbox: JSON.parse(item.bbox), // 문자열 → 객체
      prob: extractProb(item.top1_predicate),
      laws: item.laws || []
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error('predict_detail API 오류:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// top1_predicate에서 확률 수치 추출하는 함수
function extractProb(str) {
  if (!str) return null;
  const match = str.match(/\(([\d.]+)\)$/); // "(0.735499978...)" 꼴
  return match ? Math.round(parseFloat(match[1]) * 100) : null;
}

module.exports = router;