import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AnalyzePage.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import { useNavigate, Link } from 'react-router-dom';
// components-gnb

  function AnalyzePage() { 
  return (
    <div className="page-container">
      <Navbar></Navbar>   
       <div className="news-header-video">
        <video
          className="news-header-video-bg"
          src="/analyze/darkpattern_analyze_banner1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="news-header-overlay" />
        <div className="news-header-text">
          <h1>AI를 이용한 다크패턴 분석 서비스</h1>
          <p>이미지 파일을 통해서 분석을 해드립니다.</p>
        </div>
      </div> 
    <div className="analyze-container">
    </div>
    <Footer></Footer>
  </div>

  );
}

export default AnalyzePage;