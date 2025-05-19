import React from 'react';
import Lottie from 'lottie-react';
import aiAnimation from '../assets/introAi.json';
import darkEx1 from '../assets/darkEx1.json';
import darkEx2 from '../assets/darkEx2.json';
import { Link } from 'react-router-dom';
import './MainBanner.css'; // 스타일 분리
//타이핑 애니메이션
import { motion } from 'framer-motion';
import Button from '../components/button';
//스크롤 애니메이션
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const firstLine = ['정직한', '웹을', '위한', '첫걸음,'];
const secondLine = [
  { word: 'AI', highlight: true },
  { word: '기반', highlight: true },
  { word: '다크패턴', highlight: true },
  '탐지', '서비스'
];


const MainBanner = () => {

    useEffect(() => {
        AOS.init({
          duration: 1000,      // 애니메이션 지속 시간 (ms)
          once: true,         // 한 번만 실행
          offset:100         // 트리거 시점
        });
      }, []);
    
    return (
    
      <>
            {/* banner1 - main-banner - 정직한 웹을 위한 첫걸음 */}
            <section className="main-banner">
                {/* 텍스트 영역 */}
                <div className="main-banner-text">
                <h1 className="main-banner-title" style={{ whiteSpace: 'pre-line' }}>    
                {/* 첫 줄 */}
                <div className="line">
                {firstLine.map((word, index) => (
                <motion.span
                    key={`first-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    style={{ marginRight: '0.5rem', display: 'inline-block' }}
                >
                {word}
                </motion.span>
                ))}
                </div>

                {/* 둘째 줄 */}
                <div className="line">
                    {secondLine.map((item, index) => {
                    const word = typeof item === 'string' ? item : item.word;
                    const isHighlight = typeof item !== 'string' && item.highlight;

                    return (
                        <motion.span
                        key={`second-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (firstLine.length + index) * 0.15, duration: 0.5,}}
                        className={isHighlight ? 'highlight' : ''}
                        style={{ marginRight: '0.5rem', display: 'inline-block' }}
                        >
                        {word}
                        </motion.span>
                    );
                    })}
                </div>
                </h1>

                    <h2 className="main-banner-subtitle">설명 가능한 Neuro-Symbolic AI 기반 다크패턴 분석</h2>
                    <p className="main-banner-description">
                        Neuro-Symbolic AI는 단순한 예측을 넘어,<br />다크패턴의 발생 원리와 구조적 특징을 해석할 수 있는 능력을 갖추고 있습니다.
                        <br />이에 따라 사용자에게 신뢰할 수 있는 분석 결과를 제공합니다.
                    </p>
                </div>

                {/* 이미지 영역 */}
                <div className="main-banner-lottie">
                    <Lottie animationData={aiAnimation} loop={true} />
                </div>
            </section>


            {/* banner2 - darkPattern - 다크패턴이 뭔가요? */}
            <section className="main-info" data-aos="fade-up">
                {/* 텍스트 영역 */}
                <div className="main-info-text" data-aos="fade-up" data-aos-delay="100">
                    <div className="main-info-search">
                        <img src="/main/bannerSearch.svg" alt="info search" />
                    </div>
                    <h3 className="main-info-title">다크패턴이 뭔가요?</h3>
                    <p className="main-info-description">
                        다크 패턴은 소비자를 속여서<br /> 특정 행동을 하도록 유도하기 위해 <br />
                        교묘하게 설계된 사용자 인터페이스나 디자인을 말합니다.<br />
                        <br />즉, 사용자의 의사결정을 방해하거나 착각을 유도하여 <br />
                        소비자가 예상치 못한 결과에 이르게 하는 방식이죠.
                    </p>
                    <Button to="/learn" variant="filled">다크패턴 알아보기</Button>
                </div>
                
                {/* 오른쪽 상황 카드 영역 */}
                <div className="situation-panel">
                    <div className="situation-card1" data-aos="fade-up" data-aos-delay="300">
                    <p className="situation-title">상황1</p>
                    <p className="situation-text">
                        당신은 물건을 구매하려고 합니다.<br />
                        다음과 같은 <span className="highlight">품절임박 멘트</span>를 본 적 있나요?
                    </p>
                    <div className="main-dark-lottie1">
                    <Lottie animationData={darkEx1} loop={true} />
                    </div>
                    </div>

                    <div className="situation-card2" data-aos="fade-up" data-aos-delay="600">
                    <p className="situation-title">상황2</p>
                    <p className="situation-text">
                        당신은 <span className="highlight">계정탈퇴</span>를 하고 싶은데<br />
                        설정에서 <span className="highlight">탈퇴하기</span>를 찾을 수 없던 적이 있나요?
                    </p>
                    <div className="main-dark-lottie2">
                    <Lottie animationData={darkEx2} loop={true} />
                    </div>
                    </div>
                </div>
            </section>
    
        </>
    );
  };
  
  export default MainBanner;