const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Quiz = require('../db/quiz');

// uploads 디렉토리 존재하지 않으면 생성
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// multer 설정: uploads 폴더에 저장
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

// POST: 퀴즈 등록
// POST http://localhost:5000/quiz
router.post('/', upload.single('picture'), async (req, res) => {
  try {
    const { level, question, answer, real_answer, hint, explanation } = req.body;
    let pictureUrl = '';

    if (req.file) {
      // 예: /uploads/picture-12345678.png
      pictureUrl = `/uploads/${req.file.filename}`;
    }

    // answer는 배열로 받도록 파싱
    const answerArray = Array.isArray(answer)
      ? answer
      : (typeof answer === 'string' ? answer.split(',').map(item => item.trim()) : []);

    const newQuiz = new Quiz({
      level,
      question,
      answer: answerArray,
      real_answer,
      hint,
      picture: pictureUrl,
      explanation
    });

    await newQuiz.save();

    res.status(200).json({ message: 'Quiz saved successfully', data: newQuiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save quiz' });
  }
});

// GET: 퀴즈 조회
// GET http://localhost:5000/quiz or /quiz?level=1
router.get('/', async (req, res) => {
  try {
    const levels = [1, 2, 3, 4, 5];
    const quizList = [];

    for (const level of levels) {
      const quizzes = await Quiz.find({ level });
      if (quizzes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quizzes.length);
        quizList.push(quizzes[randomIndex]);
      }
    }

    quizList.sort((a, b) => a.level - b.level);
    res.status(200).json({ success: true, data: quizList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

module.exports = router;
