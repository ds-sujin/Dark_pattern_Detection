// AnalyzeResultPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';

const AnalyzeResultPage = ({ sampleImage, analysisData }) => {
  const defaultImage = '/sample_darkpattern.png';

  // 예시 데이터 (샘플 이미지를 기준으로 하드코딩된 분석 결과)
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-center mb-4">분석이 완료되었습니다!</h1>
        <p className="text-center text-gray-600 mb-6">아래에서 분석 결과를 확인해보세요.</p>

        <div className="text-center mb-10">
          <button
            onClick={() => window.location.href = '/analyze'}
            className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-700"
          >
            다른 이미지 분석하기
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <img
            src={sampleImage || defaultImage}
            alt="업로드된 이미지"
            className="w-96 border rounded shadow"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">전체 다크패턴 탐지율</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-red-500 h-4 rounded-full text-right pr-2 text-white text-xs"
              style={{ width: `${result.overall}%` }}
            >
              {result.overall}%
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">유형별 다크패턴 탐지율</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {result.types.map((t) => (
              <div key={t.label} className="bg-white p-4 rounded shadow text-center">
                <p className="font-semibold">{t.label}</p>
                <p className="text-gray-700">{t.level}</p>
                <p className="text-xl font-bold">{t.value}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">탐지된 다크패턴 요소</h2>
          {result.elements.map((el, i) => (
            <div key={i} className="bg-white p-4 mb-4 rounded shadow">
              <div className="flex justify-between">
                <p className="font-bold">{el.type}</p>
                <p className="text-sm text-red-500">{el.level} 위험도 · {el.score}%</p>
              </div>
              <p className="mt-2">{el.content}</p>
              <p className="text-sm text-gray-600 mt-1">유형: {el.category}</p>
              <div className="text-sm mt-2 space-y-1">
                {el.law.map((line, idx) => (
                  <p key={idx}>• {line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">다크패턴 관련 뉴스</h2>
          {result.news.map((n, i) => (
            <div key={i} className="bg-white p-4 mb-4 rounded shadow">
              <a href={n.url} target="_blank" rel="noreferrer" className="text-blue-600 font-medium">
                {n.title}
              </a>
              <p className="text-sm text-gray-700">{n.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyzeResultPage;
