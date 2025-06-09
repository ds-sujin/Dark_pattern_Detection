import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AnalyzeResultPage.css';
import Navbar from '../components/Navbar';

const AnalyzeResultPage = () => {
  const location = useLocation();
  const sampleImage = location.state?.image || '/sample_darkpattern.png';
  const ocrText = location.state?.ocrText || '';
  const isSecondSample = location.state?.isSecondSample || false;

  const [activeTab, setActiveTab] = useState('분석률');

  // 결과 분기 처리
  const result = isSecondSample
    ? {
        overall: 87,
        types: [
          { label: 'Sneaking', value: 85, level: '높음' },
          { label: 'Urgency', value: 80, level: '높음' },
          { label: 'Misdirection', value: 60, level: '보통' },
          { label: 'Social Proof', value: 45, level: '보통' },
          { label: 'Scarcity', value: 75, level: '높음' },
          { label: 'Obstruction', value: 20, level: '낮음' },
          { label: 'Forced Action', value: 30, level: '낮음' },
        ],
        elements: [
          {
            type: '텍스트',
            content: '2개월 무료 이용권 받고 유지하기',
            category: 'Urgency',
            level: '위험',
            score: 85,
            law: [
              '무료 혜택 유도로 인해 소비자의 자율적 선택을 방해할 수 있습니다.',
              '무료 이후 자동 결제가 이루어지는 경우 명확한 고지가 필요합니다.',
            ],
          },
          {
            type: '버튼',
            content: '포기하고 해지 계속하기',
            category: 'Forced Action',
            level: '주의',
            score: 60,
            law: ['해지를 어렵게 만들거나 복잡하게 유도하는 설계는 다크패턴으로 간주될 수 있습니다.'],
          },
        ],
        news: Array(2).fill({
          title: '다크패턴, “무료”의 진실은?',
          summary: '무료 체험 후 자동 결제되는 서비스를 명확히 안내하지 않아 논란이 되고 있습니다...',
          url: 'https://www.deceptive.design/',
        }),
      }
    : {
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
              '법령을 위반할 가능성이 있습니다. 특정 내용(공정거래법 등)에 대한 정보가 명확하지 않습니다.',
              '허위과장된 정보로 소비자를 유도할 우려가 있습니다.',
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
            src={sampleImage}
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

          <div className="ocr-box">
            <h3>OCR 추출 결과</h3>
            <textarea
              className="ocr-textarea"
              value={ocrText}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeResultPage;
