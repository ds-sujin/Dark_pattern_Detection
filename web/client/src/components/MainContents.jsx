// MainContents.jsx
import React, { useEffect } from 'react';
import './MainContents.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const contentItems = [
  {
    title: '다크패턴 유형 탐지',
    description: '업로드한 이미지로 다크패턴 탐지결과 전체 / 유형별 분석 제공\n해당 유형별 설명과 유사한 사례까지 함께 제공',
    image: '/main/contents1_1.svg',
  },
  {
    title: '탐지된 요소를 하나하나 분석',
    description: '업로드한 이미지에서 다크패턴에 탐지된 요소의\n위험도별 / 개선점 분석까지 제공',
    image: '/main/contents1_2.svg',
  }
];

const audienceItems = [
    {
      tag: '소비자',
      title: '구매하시거나 구독할 때\n다크패턴에\n 더 이상 속지 마세요!',
      description: '이미지나 URL로 쉽게 분석하고\n일상 속 다크패턴에서 보호받으세요.',
      image: '/main/iconConsumer.svg',
      bgColor: '#FFF6F6',
      tagColor: '#DC3535'
    },
    {
      tag: '개발자',
      title: '웹/앱 개발하면서\n다크패턴인지\n헷갈리신다면?',
      description: '유형별 다크패턴 탐지와\n관련 법률 및 법령 위반 여부도 확인해보세요!',
      image: '/main/iconDeveloper.svg',
      bgColor: '#F1F8FE',
      tagColor: '#0089FF'
    },
    {
      tag: 'UXUI 디자이너',
      title: '수많은 다크패턴을\n일일이 확인하기 힘든\n디자이너분들!',
      description: 'UI 이미지를 업로드하면\n다크패턴 요소와 개선방향을 알려드려요.',
      image: '/main/iconDesigner.svg',
      bgColor: '#FFFBE8',
      tagColor: '#F6AE41'
    }
  ];

const MainContents = () => {
  useEffect(() => {
    AOS.init({ duration: 800, offset: 100, once: true });
  }, []);

  return (
    <>
    {/* main-contents1 분석 특징 */}
    <section className="main-contents1" data-aos="fade-up">
      <div className="main-contents1-text">
        <p className="main-contents1-title">AI 다크패턴 분석, 이미지만 업로드 하면<br />
          <span className="highlight">다크패턴 유형부터 법령</span>까지 분석해드려요.
        </p>
      </div>

      <div className="main-contents1-cards">
        {contentItems.map((item, index) => (
          <div className="content1-card" key={index} data-aos="fade-up" data-aos-delay={index * 200}>
            <h3 className="content1-card-title">{item.title}</h3>
            <p className="content1-card-description">{item.description}</p>
            <img src={item.image} alt={item.title} className="panel-image" />
          </div>
        ))}
      </div>
    </section>

    {/* main-contents2 메인기능 2가지 */}
    <section className="main-contents2" data-aos="fade-up">
      <h2 className="main-contents2-title" data-aos="fade-up" data-aos-delay="100">
        정확한 AI 기반 탐지와 한 눈에 파악 가능한 시각화 분석 서비스
      </h2>
      <p className="main-contents2-sub" data-aos="fade-up" data-aos-delay="100">
        점점 다양해지는 다크패턴 유형, 저희가 분석해드릴게요!
      </p>

      <div className="main-contents2-circles">
        <div className="circle-item" data-aos="fade-up" data-aos-delay="200"> {/* AI 아이콘 */}
          <div className="circle-icon circle-bg-blue">
            <img src="/main/iconAi.svg" alt="AI 로봇" className="circle-img" />
            <div className="circle-badge">
              <img src="/main/badgeAi.svg" alt="AI 로봇" className="badge-img" />
            </div>
          </div>
        </div>

        <div className="circle-item" data-aos="fade-up" data-aos-delay="200"> {/* AI 설명 */}
          <div className="circle-icon circle-bg-white">
            <h3 className="circle-title">AI 탐지</h3>
            <p className="circle-desc">Neuro-Symbolic AI를<br /> 활용하여 기존 모델보다<br />
              더 나은 정밀 분석이 가능합니다.</p>
          </div>
        </div>

        <div className="circle-item" data-aos="fade-up" data-aos-delay="400"> {/* 시각화 아이콘*/}
          <div className="circle-icon circle-bg-dark">
            <img src="/main/iconChart.svg" alt="시각화 아이콘" className="circle-img" />
          </div>
        </div>

        <div className="circle-item" data-aos="fade-up" data-aos-delay="400"> {/* 시각화 설명*/}
          <div className="circle-icon circle-bg-white">
            <h3 className="circle-title">시각화 분석</h3>
            <p className="circle-desc">어려운 다크패턴을<br />
              누구나 한 눈에 파악할 수 있도록<br />시각화 분석</p>
          </div>
        </div>
      </div>
    </section>

    {/* main-contents3 대상 설명 */}
    <section className="main-contents3" data-aos="fade-up">
      <p className="main-contents3-sub">어떤 분들에게 도움이 될까요?</p>
      <h2 className="main-contents3-title">소비자부터 개발자까지<br />누구나 활용하실 수 있어요!</h2>

      <div className="main-contents3-cards">
        {audienceItems.map((item, index) => (
          <div
            className="main-contents3-card"
            key={index}
            style={{ backgroundColor: item.bgColor }}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div
              className="content3-card-tag"
              style={{ color: item.tagColor, borderColor: item.tagColor }}
            >
              {item.tag}
            </div>
            <h3 className="content3-card-title" style={{ whiteSpace: 'pre-line' }}>{item.title}</h3>
            <p className="content3-card-description" style={{ whiteSpace: 'pre-line' }}>{item.description}</p>
            <img src={item.image} alt={item.tag} className="content3-card-image" />
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default MainContents;
