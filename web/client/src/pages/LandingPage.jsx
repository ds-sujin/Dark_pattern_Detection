import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { image, fileName, isSample, ocrText, isSecondSample } = location.state || {};

  return (
    <>
      <Navbar />
      <div className="loading-page">
        <div className="loading-box">
          {/* ✅ 이미지 미리보기 */}
          {image && (
            <img
              src={image}
              alt="업로드 이미지 미리보기"
              className="uploaded-preview"
              style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', marginBottom: '1rem' }}
            />
          )}

          <img
            src="/main/dig_logo.png"
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
            onClick={() =>
              navigate('/analyze/result', {
                state: {
                  image,
                  fileName,
                  isSample,
                  ocrText,
                  isSecondSample,
                },
              })
            }
          >
            결과 보기 →
          </button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
