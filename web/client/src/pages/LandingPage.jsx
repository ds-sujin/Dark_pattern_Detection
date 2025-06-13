import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    <div className="loading-overlay">
      <div className="loading-modal">
        <div className="spinner" />
        <p>이미지를 분석하고 있어요...<br />잠시만 기다려주세요!</p>
      </div>
    </div>
  );
}

export default LandingPage;
