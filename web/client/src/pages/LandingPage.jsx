import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // ✅ 네비게이션 불러오기
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/analyze/result', { state: location.state });
    }, 10000); // 10초 후 이동

    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <>
      <Navbar /> {/* ✅ 네비게이션 삽입 */}
      <div className="loading-page">
        <div className="loading-box">
          <img
            src="../main/dig_logo.png" // 필요 시 수정
            alt="분석 아이콘"
            className="loading-icon"
          />
          <h2>분석 중입니다</h2>
          <p>
            이미지를 분석하고 있어요...
            <br />
            잠시만 기다려 주세요!
          </p>
          <div className="dot-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
