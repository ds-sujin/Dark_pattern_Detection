
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const { uploadToDrive } = require('../drive/googleDrive');
const Quiz = require('../db/quiz');

const upload = multer({ dest: 'quiz_uploads/' });

// POST: 퀴즈 등록
// localhost:5000/quiz
router.post('/', upload.single('picture'), async (req, res) => {
  try {
    const { level, question, answer, real_answer, hint, explanation, url } = req.body;
    let pictureUrl = '';

    // 1. 파일 업로드 케이스
    if (req.file) {
      const file = req.file;
      pictureUrl = await uploadToDrive(file.path, file.originalname);
      fs.unlinkSync(file.path); // 로컬 파일 삭제
    }

    // 2. URL 직접 입력 케이스
    else if (url) {
      pictureUrl = url;
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
      picture: pictureUrl,  // URL or '' (빈값)
      explanation
    });

    await newQuiz.save();

    res.status(200).json({ message: 'Quiz saved successfully', data: newQuiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save quiz' });
  }
});

// GET: 레벨별 퀴즈 조회
// 전체 조회: GET http://localhost:5000/quiz
// 레벨별 조회: GET http://localhost:5000/quiz?level=1
// GET: 퀴즈 조회 (레벨별 랜덤 1개씩)
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

    // level 순으로 정렬 (1~5)
    quizList.sort((a, b) => a.level - b.level);

    res.status(200).json({ success: true, data: quizList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});


module.exports = router;
