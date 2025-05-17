require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadRoute = require('./routes/upload');

const client = new MongoClient(process.env.MONGODB_URL);
let usersCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    usersCollection = db.collection('Users');
    console.log("MongoDB 연결 성공");
  } catch (err) {
    console.error("MongoDB 연결 실패:", err);
  }
}
connectDB();


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

// 로그인 API (옵션)
app.post('/api/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    const user = await usersCollection.findOne({ id });
    if (!user) return res.status(400).json({ success: false, message: '해당 아이디가 없습니다.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ success: false, message: '비밀번호가 틀렸습니다.' });

    res.status(200).json({ success: true, message: `${user.name}님 환영합니다!` });
  } catch (err) {
    res.status(500).json({ success: false, message: '로그인 중 오류 발생' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));
