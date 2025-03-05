const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// 미들웨어 추가
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// ✅ 기본 라우트 추가 (루트 경로 요청 시 메시지 반환)
app.get("/", (req, res) => {
  res.json({ message: "🎉 Welcome to the Dark Pattern Detection API!" });
});

module.exports = app;