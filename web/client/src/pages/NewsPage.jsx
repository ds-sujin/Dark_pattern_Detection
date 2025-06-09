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

      // 👉 여기서 예시 데이터로 대체
      setNewsList([
        {
          _id: '1',
          title: '“화면 나갔어요”…구독 해지 왜 이렇게 어려울까?',
          date: '2025-04-25',
          img: '/minjin.png',
          summary: '구독 해지가 너무 어려운 UI 디자인이 논란이 되고 있습니다.',
          company: '연합뉴스',
          newsurl: 'https://example.com/news1'
        },
        {
          _id: '2',
          title: '소비자 낚는 온라인 다크패턴…처벌도 강화된다 2줄인 경우 이렇게 표현됩니다. 2줄까지가 최대 길이 입니다.',
          date: '2025-04-24',
          img: '/minjin.png',
          summary: '다크패턴을 이용한 온라인 소비자 기만에 대해 법적 규제가 강화됩니다.',
          company: '디지털타임스',
          newsurl: 'https://example.com/news2'
        },
        {
          _id: '3',
          title: '국내 쇼핑몰, 유도 결제 디자인 사용으로 논란',
          date: '2025-04-23',
          img: '/minjin.png',
          summary: '버튼 색상·위치로 소비자를 혼동시키는 인터페이스가 문제되고 있습니다.',
          company: '서울경제',
          newsurl: 'https://example.com/news3'
        },
        {
          _id: '4',
          title: 'Emailmovers, 사용자의 동의 없이 이메일 판매',
          date: '2025-04-20',
          img: '',
          summary: '영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.',
          company: 'ICO',
          newsurl: 'https://example.com/news4'
        },
        {
          _id: '5',
          title: 'Emailmovers, 사용자의 동의 없이 이메일 판매',
          date: '2025-04-20',
          img: '',
          summary: '영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.',
          company: 'ICO',
          newsurl: 'https://example.com/news4'
        },
        {
          _id: '6',
          title: 'Emailmovers, 사용자의 동의 없이 이메일 판매',
          date: '2025-04-20',
          img: '',
          summary: '영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.영국 ICO 조사 결과, Emailmovers가 사용자 동의 없이 개인 정보를 판매한 정황이 드러났습니다.',
          company: 'ICO',
          newsurl: 'https://example.com/news4'
        }
      ]);
    });
}, []);

  const filteredNews = newsList.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNews = [...filteredNews].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="page-container">
      <Navbar></Navbar>   
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

      <div className="news-card-grid">
        {sortedNews.slice(0, 3).map(news => (
          <div className="news-card" key={news._id}>
            <img src={news.img} alt={news.title} />
            <div className="news-card-content">
              <p className="news-company">{news.company}</p>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-date">{new Date(news.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="news-list">
      {sortedNews.slice(3).map(news => (
        <a
          className="news-list-item"
          key={news._id}
          href={news.newsurl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }} // 기본 스타일 유지
        >
          <p className="news-company">{news.company}</p>
          <h4 className="news-title">{news.title}</h4>
          <p className="news-summary">{news.summary}</p>
          <p className="news-date">{new Date(news.date).toLocaleDateString()}</p>
        </a>
      ))}
      </div>
      
    </div>
    <Footer></Footer>
  </div>

  );
}

export default NewsPage;