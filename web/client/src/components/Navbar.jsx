import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // 스타일 분리

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">DARKPATTERN DETECTION</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/analyze">다크패턴 분석하기</Link></li>
        <li><Link to="/notice">공지사항</Link></li>
        <li><Link to="/mypage">마이페이지</Link></li>
      </ul>
      <div className="navbar-login">
        <Link to="/login" className="login-btn">로그인/회원가입</Link>
      </div>
    </nav>
  );
};

export default Navbar;