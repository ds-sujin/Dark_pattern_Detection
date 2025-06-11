import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // 스타일 분리

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* 왼쪽 로고 영역 */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.svg" alt="로고" className="gnb-logo-svg" />
        </Link>
      </div>

      {/* 가운데 메뉴 */}
      <ul className="navbar-menu">
        <li><Link to="/analyze">다크패턴 분석하기</Link></li>
        <li><Link to="/learn">다크패턴 알아보기</Link></li>
        <li><Link to="/news">관련 뉴스</Link></li>
        <li><Link to="/quiz">다크패턴 퀴즈</Link></li>
      </ul>
      <div className="navbar-login">
        <Link to="/login" className="login-btn">로그인/회원가입</Link>
      </div>
    </nav>
  );
};

export default Navbar;