import React from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import './MainMenu.css'; // 스타일 분리
//타이핑 애니메이션
import { motion } from 'framer-motion';
import Button from '../components/button';
//스크롤 애니메이션
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const menuItems = [
    {
      title: '이미지로 쉽게\n다크패턴 분석 가능',
      description: '원하는 이미지를 업로드하면\n다크패턴 분석이 끝!',
      image: '/main/mainMenuAnalyze.svg',
      buttons: [
        { label: '바로가기', to: '/analyze', variant: 'outline' },
      ]
    },
    {
      title: '다크패턴 유형부터\n재미있는 퀴즈',
      description: '생소하고 어려운 다크패턴에 대해서\n퀴즈도 풀어보며 쉽게 이해해보세요!',
      image: '/main/mainMenuLearn.svg',
      buttons: [
        { label: '바로가기', to: '/learn', variant: 'outline' }
      ]
    },
    {
      title: '다크패턴 관련 뉴스',
      description: '국내부터 해외까지\n다양한 다크패턴 관련 뉴스를 빠르게 알려드릴게요!',
      image: '/main/mainMenuNews.svg',
      buttons: [
        { label: '바로가기', to: '/news', variant: 'outline' }
      ]
    }
  ];
  
const MainMenu = () => {

    useEffect(() => {
        AOS.init({ duration: 800, once: true, offset: 100 });
      }, []);

    return (
      <section className="main-menu" >
        {menuItems.map((item, index) => (
          <div className="menu-item" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="menu-text">
              <h3 className="menu-title">{item.title}</h3>
              <p className="menu-description">{item.description}</p>
              <div className="menu-buttons">
                {item.buttons.map((btn, idx) => (
                  <Button key={idx} to={btn.to} variant={btn.variant}>{btn.label}</Button>
                ))}
              </div>
            </div>
            <div className="menu-thumbnail" data-aos="fade-up" data-aos-delay={index * 300}>
                <img src={item.image} alt="썸네일" className="menu-image" /></div>
          </div>
        ))}
      </section>
    );
};
  
export default MainMenu;