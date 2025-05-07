const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const DB_PATH = './login_backend/db.json';

// JSON 파일 로드
function loadDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ Users: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

// 사용자 저장
function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// 아이디 중복 확인
app.post('/check-id', (req, res) => {
  const { id } = req.body;
  const db = loadDB();
  const exists = db.Users.some(user => user.id === id);
  res.json({ duplicate: exists });
});

// 회원가입
app.post('/signup', (req, res) => {
  const { name, id, password } = req.body;
  const db = loadDB();

  if (db.Users.some(user => user.id === id)) {
    return res.status(400).json({ message: '중복된 아이디입니다.' });
  }

  db.Users.push({ name, id, password });
  saveDB(db);
  res.json({ message: '회원가입 성공' });
});

// 로그인
app.post('/login', (req, res) => {
  const { id, password } = req.body;
  const db = loadDB();

  const user = db.Users.find(user => user.id === id);

  if (!user) return res.status(404).json({ message: '해당 아이디로 가입된 이력이 없습니다.' });
  if (user.password !== password) return res.status(400).json({ message: '비밀번호를 다시 입력해주세요.' });

  res.json({ message: `${user.name}님 환영합니다!` });
});

app.listen(port, () => {
  console.log(`Node.js 백엔드가 http://localhost:${port} 에서 실행 중`);
});
