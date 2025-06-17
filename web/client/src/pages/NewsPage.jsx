import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../components/Navbar.css"; // 수정된 경로


const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
    window.location.reload(); // 로그아웃 후 상태 반영을 위해 새로고침
  };

  return (
    <nav className="navbar">
      {/* 왼쪽 로고 */}
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

      {/* 오른쪽 로그인/회원정보 영역 */}
      <div className="navbar-login">
        {user ? (
          <>
            <span
              style={{
                marginRight: '1rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                lineHeight: '1',
              }}
            >
              {user.name}님
            </span>
            <button
              onClick={handleLogout}
              className="login-btn"
              style={{ backgroundColor: '#999' }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">로그인/회원가입</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
