import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const filename = location.state?.fileName;

        if (!filename) {
          alert('파일 이름이 없습니다.');
          return;
        }

        // ✅ 백엔드에 filename 보내기
        const response = await fetch('http://localhost:5005/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename }),
        });

        if (!response.ok) throw new Error('서버 오류');

        const result = await response.json();
        console.log('✅ 예측 결과 도착:', result);

        // ✅ 응답이 오면 페이지 이동만
        navigate('/analyze/result');
      } catch (error) {
        console.error('❌ 예측 실패:', error);
        alert('예측 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [navigate, location.state]);

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
        </div>
      </div>
    </>
  );
}

export default LandingPage;