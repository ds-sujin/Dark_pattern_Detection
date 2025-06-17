// server/routes/law.js
const express = require('express');
const router = express.Router();
const Law = require('../db/law.js');

// POST /law
router.post('/', async (req, res) => {
  const { title } = req.body;

  try {
    const law = await Law.findOne({ title });

    if (!law) {
      return res.status(404).json({ error: 'Law not found' });
    }

    res.json(law);
  } catch (err) {
    console.error('Error querying MongoDB:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
