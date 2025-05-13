import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RegisterCompletePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <h2>환영합니다!</h2>
        <p>로그인을 통해 다양한 서비스를 이용하세요.</p>
        <button onClick={() => navigate('/login')} style={{ marginRight: '1rem' }}>
          로그인하러가기
        </button>
        <button onClick={() => navigate('/')}>메인화면으로 가기</button>
      </div>
    </>
  );
};

export default RegisterCompletePage;
