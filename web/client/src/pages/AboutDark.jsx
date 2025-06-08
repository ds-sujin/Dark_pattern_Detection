// src/pages/AboutDark.jsx
import React, { useState } from 'react';
import './AboutDark.css';

const darkPatterns = {
  intro: {
    title: '다크패턴이란?',
    description: '다크패턴이란, 웹사이트나 앱에서 사용자가 원하지 않는 행동을 하도록 유도하거나, 놀라운 선택을 하도록 유도하는 디자인을 말합니다.',
  },
  Sneaking: {
    title: 'Sneaking',
    subtitle: '몰래 끼워넣기',
    description: '사용자 몰래 제품이나 서비스를 추가하거나 알리지 않고 정보를 수집하는 패턴입니다.',
  },
  Urgency: {
    title: 'Urgency',
    subtitle: '긴급성 부여',
    description: '시간 제한 또는 재고 부족 등을 강조하여 사용자가 서둘러 결정하게 만듭니다.',
  },
  Misdirection: {
    title: 'Misdirection',
    subtitle: '주의 분산',
    description: '중요하지 않은 정보로 주의를 돌려 사용자가 핵심 정보에 집중하지 못하게 만듭니다.',
  },
  SocialProof: {
    title: 'Social Proof',
    subtitle: '사회적 증거',
    description: '다른 사용자의 행동을 강조하여, 같은 행동을 하게끔 유도합니다.',
  },
  Scarcity: {
    title: 'Scarcity',
    subtitle: '인위적 희소성',
    description: '남은 수량이 얼마 안 된다는 메시지로 구매를 유도합니다.',
  },
  Obstruction: {
    title: 'Obstruction',
    subtitle: '방해하기',
    description: '회원 탈퇴, 구독 해지 등을 어렵게 만들어 이탈을 방해합니다.',
  },
  ForcedAction: {
    title: 'Forced Action',
    subtitle: '강제 동의',
    description: '추가적인 동의, 등록, 행동을 강요하지 않으면 서비스를 이용할 수 없게 합니다.',
  },
};

function AboutDark() {
  const [selected, setSelected] = useState('intro');

  return (
    <div className="about-container">
      <aside className="about-sidebar">
        <h4>다크패턴 유형</h4>
        <ul>
          {Object.keys(darkPatterns).map((key) => (
            <li
              key={key}
              className={selected === key ? 'active' : ''}
              onClick={() => setSelected(key)}
            >
              {key === 'intro' ? '다크패턴이란?' : darkPatterns[key].title}
            </li>
          ))}
        </ul>
        <div className="about-quiz-link">퀴즈 풀기</div>
      </aside>

      <section className="about-content">
        <div className="about-description-box">
          <h2>{darkPatterns[selected].title}</h2>
          <p>{darkPatterns[selected].description}</p>
        </div>

        {selected === 'intro' ? (
          <>
            <h3>다크패턴 유형</h3>
            <p>다크패턴 관련 선행 연구들을 바탕으로 아래 7가지 유형으로 분류하였습니다.</p>
            <div className="about-card-grid">
              {Object.entries(darkPatterns).slice(1).map(([key, val]) => (
                <div className="about-card" key={key} onClick={() => setSelected(key)}>
                  <div className="card-title">{val.title}</div>
                  <div className="card-subtitle">{val.subtitle}</div>
                </div>
              ))}
            </div>

            <div className="about-research-section">
              <span>📘 다크패턴 관련 선행 연구가 궁금하다면?</span>
              <ul>
                <li>
                  <strong>Unveiling the Tricks:</strong> UIST '23, San Francisco, USA
                </li>
                <li>
                  <strong>UI Dark Patterns and Where to Find Them:</strong> CHI '20, Honolulu, HI, USA
                </li>
              </ul>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}

export default AboutDark;