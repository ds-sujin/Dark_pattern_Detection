// src/pages/NewsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsPage.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    axios.get('/news')
      .then((res) => {
        console.log('뉴스 응답:', res.data);
        if (res.data.success) {
          setNewsList(res.data.data);
        }
      })
      .catch((err) => {
        console.error('뉴스 불러오기 실패:', err);
      });
  }, []);

  // Google Drive 이미지 URL 변환 함수
  // function getImageUrl(driveUrl) {
  //   if (!driveUrl) return ''; // 혹시 빈 문자열일 경우 대비

  //   // 1) Google Drive URL에서 파일 ID 추출
  //   const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  //   const match = driveUrl.match(regex);

  //   if (match && match[1]) {
  //     const fileId = match[1];
  //     // 2) 이미지 src에 embed 형태로 반환
  //     return `https://drive.google.com/uc?export=view&id=${fileId}`;
  //   }

  //   // 3) 혹시 다른 형태이거나 일반 URL이면 그대로 반환
  //   return driveUrl;
  // }

  // 필터링
  const filteredNews = newsList.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 정렬
  const sortedNews = [...filteredNews].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="page-container">
      <Navbar />
      <div className="news-header-video">
        <video
          className="news-header-video-bg"
          src="/darkpattern_news_banner2.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="news-header-overlay" />
        <div className="news-header-text">
          <h1>관련 뉴스</h1>
          <p>국내, 해외의 다크패턴 관련 뉴스를 빠르게 보여드립니다.</p>
        </div>
      </div>

      <div className="news-container">
        <div className="news-toolbar">
          <p>총 {newsList.length.toLocaleString()}개</p>
          <div className="news-toolbar-right">
            <input
              type="text"
              placeholder="뉴스명을 검색하세요."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 상단 3개 카드 형태 */}
        <div className="news-card-grid">
          {sortedNews.slice(0, 3).map((news, index) => (
            <a
              className="news-card"
              key={news._id}
              href={news.newsurl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src={`/darknews${index + 1}.jpg`} 
                alt={news.title}
              />
              <div className="news-card-content">
                <p className="news-company">{news.company}</p>
                <h3 className="news-title">{news.title}</h3>
                <p className="news-date">
                  {new Date(news.date).toLocaleDateString()}
                </p>
              </div>
            </a>
          ))}
        </div>
        {/* 하단 뉴스 리스트 */}
        <div className="news-list">
          {sortedNews.slice(3).map(news => (
            <a
              className="news-list-item"
              key={news._id}
              href={news.newsurl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <p className="news-company">{news.company}</p>
              <h4 className="news-title">{news.title}</h4>
              <p className="news-summary">{news.summary}</p>
              <p className="news-date">
                {new Date(news.date).toLocaleDateString()}
              </p>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewsPage;
