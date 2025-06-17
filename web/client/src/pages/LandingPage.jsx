import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="loading-page">
        <div className="loading-box">
          <img
            src="../main/dig_logo.png"
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

          {/* ✅ 결과 보기 버튼 */}
          <button
            className="result-button"
            onClick={() => navigate('/analyze/result')}
          >
            결과 보기 →
          </button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
