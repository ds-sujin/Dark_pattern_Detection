// components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        DARKPATTERN DETECTION
      </div>
      <div className="navbar-links">
        <button onClick={() => navigate('/analyze')}>다크패턴 분석하기</button>
        <button onClick={() => navigate('/info')}>다크패턴 알아보기</button>
        <button onClick={() => navigate('/news')}>관련 뉴스</button>
        <button onClick={() => navigate('/history')}>나의 분석기록</button>
      </div>
      <div className="navbar-auth">
        {user ? (
          <>
            <span className="user-name">{user.name}</span>
            <button onClick={handleLogout} className="logout-btn">로그아웃</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>로그인/회원가입</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
