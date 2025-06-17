const express = require("express");
const router = express.Router();
const { suggestSentences } = require("../controllers/suggestController");

router.post("/", suggestSentences); // POST /suggest

module.exports = router;
