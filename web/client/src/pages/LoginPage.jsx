// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import './LoginPage.css'; // 별도 스타일링 파일
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // 위치에 맞게 조정


const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    });
    const data = await response.json();

    if (data.success) {
      sessionStorage.setItem('user', data.user);
      navigate('/main'); // 메인 페이지로 이동
    } else {
      alert('로그인 실패: ' + data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <h2>DARKPATTERN DETECTION</h2>
          <h3>AI를 이용한 다크패턴 탐지 서비스</h3>
          <p>로그인 및 회원가입 후 이용 가능합니다.</p>
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
          <p>계정이 아직 없으신가요? <a href="/register">회원가입 하기</a></p>
        </div>
        <img src="/loginimage.png" alt="AI 이미지" className="login-image" />
      </div>
    </>
  );
};

export default LoginPage;