// 최상단에 명시적으로 override 추가
require('dotenv').config({ override: true });

console.log('[강제 확인] process.env.DB_NAME ===', process.env.DB_NAME === 'web'); // true가 나와야 함

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const app = express();
console.log('[전체 환경 변수]', process.env);

// CORS 설정
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoClient로 Users 컬렉션 연결 (Atlas DB 사용)
const client = new MongoClient(process.env.MONGODB_URL);
let usersCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    usersCollection = db.collection('Users');
    console.log("MongoDB 연결 성공 (MongoClient)");
  } catch (err) {
    console.error("MongoDB 연결 실패:", err);
  }
}
connectDB();

// ✅ Mongoose로 이미지 업로드 관련 연결 (Atlas DB 사용)
mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.DB_NAME
}).then(() => {
  console.log('Mongoose 연결 성공');
}).catch(err => {
  console.error('Mongoose 연결 실패:', err);
});

// 라우터 등록
const authRoute = require('./routes/auth');
const uploadRoute = require('./routes/upload');
app.use('/api/auth', authRoute);
app.use('/upload', uploadRoute);

// 회원가입 API
app.post('/api/register', async (req, res) => {
  const { id, password, name } = req.body;

  try {
    const existingUser = await usersCollection.findOne({ id });
    if (existingUser) {
      return res.status(400).json({ success: false, message: '이미 존재하는 아이디입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id, password: hashedPassword, name };
    await usersCollection.insertOne(newUser);

    res.status(201).json({ success: true, message: '회원가입 성공' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});

// 로그인 API
app.post('/api/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    const user = await usersCollection.findOne({ id });
    if (!user) {
      return res.status(400).json({ success: false, message: '해당 아이디가 없습니다.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: '비밀번호가 틀렸습니다.' });
    }

    res.status(200).json({
      success: true,
      message: `${user.name}님 환영합니다!`,
      user: { id: user.id, name: user.name }
    });
  } catch (err) {
    console.error('로그인 오류:', err);
    res.status(500).json({ success: false, message: '로그인 중 오류 발생' });
  }
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
