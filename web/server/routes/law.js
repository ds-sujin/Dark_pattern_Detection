const express = require('express');
const router = express.Router();
const { connectLawCollection } = require('../db/law');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

router.post('/', async (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    return res.status(400).json({ message: 'filename을 입력해주세요.' });
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const predicateCol = db.collection('predicate');
    const lawCol = db.collection('law');

    const rawData = await predicateCol.find({ filename }).toArray();

    // 각 laws 항목을 title → 객체로 대체
    const enriched = await Promise.all(rawData.map(async (item) => {
      const detailedLaws = await Promise.all(
        (item.laws || []).map(async (title) => {
          const law = await lawCol.findOne(
            { title: { $regex: title, $options: 'i' } },
            { projection: { _id: 0, title: 1, url: 1, definition: 1 } }
          );
          return law || { title }; // 못 찾으면 title만 반환
        })
      );

      return {
        text: item.text,
        type: item.type,
        predicate: item.predicate,
        confidence: Math.round(item.confidence * 100),
        bbox: JSON.parse(item.bbox),
        prob: Math.round((parseFloat(item.top1_predicate?.match(/\(([^)]+)\)/)?.[1] || 0)) * 100),
        laws: detailedLaws
      };
    }));

    res.status(200).json(enriched);
  } catch (err) {
    console.error('/predict_detail 오류:', err);
    res.status(500).json({ message: '서버 오류 발생' });
  }
});

module.exports = router;