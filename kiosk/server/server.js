require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logRouter = require('./routes/log');


const app = express();
const PORT = 2000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/log', logRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB 연결 성공'))
  .catch(err => console.error('❌ MongoDB 연결 실패:', err));

// 테스트용 라우터
app.get('/', (req, res) => {
  res.send('🚀 키오스크 백엔드 작동 중!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});