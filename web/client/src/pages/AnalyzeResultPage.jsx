// AnalyzeResultPage.jsx
import React, { useState } from 'react';
import './AnalyzeResultPage.css';
import Navbar from '../components/Navbar';

const AnalyzeResultPage = ({ sampleImage }) => {
  const defaultImage = '/sample_darkpattern.png';
  const [activeTab, setActiveTab] = useState('분석률');

  const result = {
    overall: 92,
    types: [
      { label: 'Sneaking', value: 92, level: '높음' },
      { label: 'Urgency', value: 88, level: '높음' },
      { label: 'Misdirection', value: 48, level: '보통' },
      { label: 'Social Proof', value: 22, level: '낮음' },
      { label: 'Scarcity', value: 52, level: '보통' },
      { label: 'Obstruction', value: 14, level: '낮음' },
      { label: 'Forced Action', value: 35, level: '낮음' },
    ],
    elements: [
      {
        type: '텍스트',
        content: '"오늘 280명이 주문했어요"',
        category: 'Sneaking',
        level: '위험',
        score: 91,
        law: [
          '법령을 위반할 가능성이 있습니다. 특정 내용(공정거래법 등)에 대한 내용정보식별이 어렵고, 허위과장된 정보로 소비자를 유도할 우려가 있습니다.',
          '숨겨진 비용, 조건, 정책 등을 투명하게 공개하고, 접근하기 쉬워야 개선됩니다.',
        ],
      },
      {
        type: '버튼',
        content: '이벤트 종료까지 남은 시간: 03시간 09분 04초',
        category: 'Scarcity',
        level: '위험',
        score: 92,
        law: ['해당 텍스트는 시간에 대한 인지왜곡을 일으킬 수 있습니다.'],
      },
    ],
    news: Array(3).fill({
      title: 'ICO & Emailmovers Limited',
      summary:
        '개인정보 불법유통 문제로 형사처벌이 구체적이지 않으며, 제3자 수사자료 확보에 현실적 한계가 있습니다...',
      url: 'https://www.deceptive.design/',
    }),
  };

  return (
    <div className="result-container">
      <Navbar />
      <div className="result-header">
        <h1>분석이 완료되었습니다!</h1>
        <p>아래에서 분석 결과를 확인해보세요.</p>
        <button onClick={() => window.location.href = '/analyze'}>
          다른 이미지 분석하기
        </button>
      </div>

      <div className="result-tabs">
        {['분석률', '탐지된 요소', '관련 뉴스'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="result-grid">
        <div className="result-image-section">
          <img
            src={sampleImage || defaultImage}
            alt="업로드된 이미지"
            style={{ width: '100%', borderRadius: '1rem' }}
          />
        </div>

        <div className="result-content-section">
          {activeTab === '분석률' && (
            <>
              <div className="result-card">
                <h2>전체 다크패턴 탐지율</h2>
                <div className="result-bar">
                  <div className="result-bar-fill" style={{ width: `${result.overall}%` }}></div>
                </div>
              </div>
              <div className="result-card">
                <h2>유형별 다크패턴 탐지율</h2>
                {result.types.map((t, i) => (
                  <div key={i} className="result-tags">
                    <span>{t.label}</span>
                    <span>{t.level}</span>
                    <span>{t.value}%</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === '탐지된 요소' && (
            <div className="result-card">
              <h2>탐지된 다크패턴 요소</h2>
              {result.elements.map((el, i) => (
                <div key={i} style={{ marginBottom: '1rem' }}>
                  <div className="result-tags">
                    <span>{el.type}</span>
                    <span>{el.level} 위험도 · {el.score}%</span>
                  </div>
                  <p>{el.content}</p>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>유형: {el.category}</p>
                  {el.law.map((line, idx) => (
                    <p key={idx} style={{ fontSize: '0.85rem' }}>• {line}</p>
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeTab === '관련 뉴스' && (
            <div className="result-news">
              <h2>다크패턴 관련 뉴스</h2>
              {result.news.map((n, i) => (
                <div key={i} style={{ marginBottom: '1.25rem' }}>
                  <a href={n.url} target="_blank" rel="noreferrer">{n.title}</a>
                  <p>{n.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzeResultPage;
