
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadToDrive } = require('../drive/googleDrive');
const NewsImage = require('../db/news_image');

const upload = multer({ dest: 'news_uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { user_id, user_name, url } = req.body;
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

    const newImage = new NewsImage({
      url: finalUrl,
      user_id,
      user_name,
    });

    await newImage.save();

    res.status(200).json({ message: 'Upload successful', url: finalUrl });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;