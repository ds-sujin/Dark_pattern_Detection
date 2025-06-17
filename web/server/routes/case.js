// server/routes/case.js
const express = require('express');
const router = express.Router();
const { connectCaseCollection } = require('../db/case');

router.post('/', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: '법률 제목(title)을 입력해주세요.' });
  }

  try {
    const collection = await connectCaseCollection();

    const results = await collection.find({
      'Related laws': { $elemMatch: { $regex: title, $options: 'i' } }
    }).project({
      title: 1,
      Excerpt: 1,         // ✅ 추가
      Outcome: 1, 
      url: 1,
      _id: 0
    }).toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error('case 검색 오류:', error);
    res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
});

module.exports = router;