const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = process.env.DB_NAME;
const collectionName = 'predicate';

router.post('/', async (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    return res.status(400).json({ message: 'filename을 입력해주세요.' });
  }

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const results = await collection.find({ filename }).toArray();

    const mappedResults = results.map(item => {
      // ✅ predicate 잘라내기
      const predicateRaw = item.predicate || '';
      const predicate = predicateRaw.split('(')[0];

      // ✅ top1_predicate에서 확률 추출
      let prob = 0;
      const match = item.top1_predicate?.match(/\(([\d.]+)\)/);
      if (match) {
        prob = Math.round(parseFloat(match[1]) * 100);  // 예: 0.519 → 52
      }

      // ✅ confidence 퍼센트로 변환
      const confidence = item.confidence ? Math.round(item.confidence * 100) : 0;

      // ✅ bbox 파싱
      let bbox = {};
      try {
        bbox = JSON.parse(item.bbox);
      } catch (e) {
        console.warn(`bbox 파싱 실패: ${item.bbox}`);
      }

      return {
        text: item.text,
        type: item.type,
        predicate,
        confidence,
        bbox,
        prob
      };
    });

    res.status(200).json(mappedResults);
  } catch (err) {
    console.error('predict_detail 검색 오류:', err);
    res.status(500).json({ message: '서버 오류 발생' });
  }
});

module.exports = router;