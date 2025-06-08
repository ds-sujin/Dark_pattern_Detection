const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadToDrive } = require('../drive/googleDrive');
const News = require('../db/news');

const upload = multer({ dest: 'news_uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, date, summary, company, url, newsurl } = req.body;
    let finalUrl = '';

    // 1. 파일 업로드 케이스
    if (req.file) {
      const file = req.file;
      finalUrl = await uploadToDrive(file.path, file.originalname);
      fs.unlinkSync(file.path); // 로컬 파일 삭제
    }

    // 2. URL 직접 입력 케이스
    else if (url) {
      finalUrl = url;
    }

    // 아무것도 없을 때
    else {
      return res.status(400).json({ error: 'Image file or URL is required' });
    }

    // News 데이터 저장
    const newNews = new News({
      title,
      date,   // yyyy-mm-dd
      img: finalUrl, // Google Drive URL
      summary,
      company,
      newsurl,
    });

    await newNews.save();

    res.status(200).json({ message: 'News saved successfully', data: newNews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save news' });
  }
});

// GET: 뉴스 목록 조회
// 전체 조회 : GET http://localhost:5000/news
// 특정 회사 뉴스 조회 http://localhost:5000/news?company=ExampleCompany
// 특정 제목 검색 http://localhost:5000/news?title=AI

router.get('/', async (req, res) => {
  try {
    const { company, title } = req.query;

    // 기본 조건 (전체 조회)
    let filter = {};

    // 필터링 옵션
    if (company) {
      filter.company = company;
    }

    if (title) {
      filter.title = { $regex: title, $options: 'i' };  // 대소문자 구분 없이 검색
    }

    const newsList = await News.find(filter).sort({ date: -1 }); // 최신순
    res.status(200).json({ success: true, data: newsList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
