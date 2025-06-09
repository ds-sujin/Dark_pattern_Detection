import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AnalyzeResultPage.css';
import Navbar from '../components/Navbar';

const AnalyzeResultPage = () => {
  const location = useLocation();
  const sampleImage = location.state?.image || '/sample_darkpattern.png';
  const fileName = location.state?.fileName || '';
  const ocrText = location.state?.ocrText || '';

  const isSample2 = fileName === 'sample_darkpattern2.png';

  const [activeTab, setActiveTab] = useState('분석률');

  const result = isSample2
    ? {
        overall: 85,
        types: [
          { label: 'Sneaking', value: 40, level: '보통' },
          { label: 'Urgency', value: 66, level: '보통' },
          { label: 'Misdirection', value: 89, level: '높음' },
          { label: 'Social Proof', value: 20, level: '낮음' },
          { label: 'Scarcity', value: 50, level: '보통' },
          { label: 'Obstruction', value: 62, level: '보통' },
          { label: 'Forced Action', value: 87, level: '높음' },
        ],
        elements: [
          {
            type: '텍스트',
            content: '2개월 무료 이용권 받고 유지하기',
            category: 'Forced Action',
            level: '위험',
            score: 87,
            law: [
              '전자상거래 등에서의 소비자보호에 관한 법률 제17조: 청약 철회 및 해지 용이성 보장',
              '공정거래위원회 고시 「전자상거래 등에서의 소비자보호 지침」 제8조: 부당한 거래유도 금지',
            ],
          },
          {
            type: '버튼',
            content: '무료 이용권 받고 유지하기',
            category: 'Misdirection',
            level: '위험',
            score: 89,
            law: [
              '표시·광고의 공정화에 관한 법률 제3조: 소비자를 속이거나 기만하는 표시·광고 금지',
              '소비자기본법 제4조: 소비자의 알 권리 및 자율 선택권 보장',
            ],
          },
          {
            type: '텍스트',
            content: '이용 중에도 해지 가능',
            category: 'Obstruction',
            level: '보통',
            score: 62,
            law: [
              '전자상거래법 제21조: 계약 해지 제한은 부당행위에 해당할 수 있음',
              '소비자기본법 제6조: 계약 해지 관련 고지 및 절차 명시 의무',
            ],
          },
        ],
        news: [
          {
            title: '정기결제 유도하는 UI에 공정위 제재',
            summary: '취소보다 유지 버튼을 강조해 소비자 선택을 왜곡한 사례 제재',
            url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148902313',
          },
          {
            title: '무료 이용권 종료 후 자동결제, 공정위 과징금 부과',
            summary: '소비자가 명확히 인지하지 못한 자동결제 유도에 대한 제재',
            url: 'https://www.ftc.go.kr/www/cop/bbs/selectBoardArticle.do?key=1053&bbsId=BBSMSTR_000000002461&nttId=88991',
          },
          {
            title: '다크패턴 방지 위해 해지 UI 규제 강화된다',
            summary: '해지 버튼 숨기거나 흐릿하게 표시한 사례 중심으로 감시 예정',
            url: 'https://cucs.or.kr/?p=15006',
          },
        ],
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
              '전자상거래법 제21조: 소비자 기만 금지',
              '표시·광고의 공정화에 관한 법률 제3조: 기만적 광고 금지',
            ],
          },
          {
            type: '버튼',
            content: '이벤트 종료까지 남은 시간: 03시간 09분 04초',
            category: 'Scarcity',
            level: '위험',
            score: 92,
            law: [
              '전자상거래법 제21조: 시간에 대한 인지왜곡 금지',
              '소비자기본법 제4조: 알권리 침해 금지',
            ],
          },
        ],
        news: [
          {
            title: '“오늘만 할인” 문구로 소비자 유도, 과태료 부과',
            summary: '소비자를 급하게 유도하는 문구 사용에 대해 공정위가 과징금 부과',
            url: 'https://www.korea.kr/news/policyNewsView.do?newsId=148902313',
          },
          {
            title: '“한정 수량” 허위 표시, 온라인몰 제재',
            summary: '수량 제한 허위로 표시한 온라인 쇼핑몰 다수 적발',
            url: 'https://www.ftc.go.kr/news/online_deceptive_cases',
          },
          {
            title: '공정위, 다크패턴 감시 시스템 강화 계획 발표',
            summary: '다크패턴 방지를 위한 소비자 감시 체계 확대 예정',
            url: 'https://www.consumer.go.kr/news/press',
          },
        ],
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
        {['분석률', '탐지된 요소', '관련 뉴스'].map((tab) => (
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
        </div>

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
  );
};

export default AnalyzeResultPage;
