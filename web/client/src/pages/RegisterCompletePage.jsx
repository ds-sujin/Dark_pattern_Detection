import React from 'react';
import './RegisterCompletePage.css';
import Navbar from '../components/Navbar';

const RegisterCompletePage = () => {
  return (
    <>
      <Navbar />
      <div className="complete-container">
        <img
          src="/images/fireworks.png"
          alt="축하 이미지"
          className="celebration-img"
        />
        <h2>🎉 회원가입을 환영합니다!</h2>
        <p>지금 바로 로그인하여 다크패턴 탐지 서비스를 이용해보세요.</p>
        <a href="/login" className="login-button">로그인하러 가기</a>
      </div>
    </>
  );
};

export default RegisterCompletePage;


