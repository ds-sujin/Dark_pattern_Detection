import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { validateEmail, validatePassword } from '../utils/validation';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 클라이언트 측 유효성 검사
    if (!validateEmail(id)) {
      alert('유효한 이메일을 입력해주세요.');
      return;
    }

    if (!validatePassword(password)) {
      alert('비밀번호는 8자 이상이며 문자와 숫자를 포함해야 합니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert('로그인 성공!');
        sessionStorage.setItem('user', JSON.stringify(data.user)); // 또는 localStorage.setItem(...)
        navigate('/main');
      } else {
        alert('로그인 실패: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류로 로그인에 실패했습니다.');
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
          <p>
            계정이 아직 없으신가요? <a href="/register">회원가입 하기</a>
          </p>
        </div>
        <img
          src="/loginimage.png"
          alt="AI 이미지"
          className="login-image"
        />
      </div>
    </>
  );
};

export default LoginPage;
