const express = require('express');
const router = express.Router();
const { connectLawCollection } = require('../db/law');

router.post('/', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: '법률명(title)을 입력해주세요.' });
  }

  try {
    const collection = await connectLawCollection();

    const result = await collection.findOne(
      { title: { $regex: title, $options: 'i' } },
      { projection: { title: 1, url: 1, definition: 1, _id: 0 } }
    );

    if (!result) {
      return res.status(404).json({ message: '해당 법률을 찾을 수 없습니다.' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('law 검색 오류:', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

router.get('/', async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ message: '법률명(title)을 입력해주세요.' });
  }

  try {
    const collection = await connectLawCollection();

    const result = await collection.findOne(
      { title: { $regex: title, $options: 'i' } },
      { projection: { title: 1, url: 1, definition: 1, _id: 0 } }
    );

    if (!result) {
      return res.status(404).json({ message: '해당 법률을 찾을 수 없습니다.' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('law 검색 오류 (GET):', err);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;  