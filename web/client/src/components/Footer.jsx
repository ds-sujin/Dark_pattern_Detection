import React from 'react';
import './Footer.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const groupedMembers = [
    {
      category: '• 개발 파트',
      members: [
        { name: '박제인', major: '정보융합학부', role: 'Front-end / Back-end', img: '/footer/jane.png' },
        { name: '오민진', major: '정보융합학부', role: 'UXUI / Front-end', img: '/footer/minjin.png' },
        { name: '정유빈', major: '정보융합학부', role: 'API 설계 / Back-end', img: '/footer/yubin.png' },
      ],
    },
    {
      category: '• 모델링 파트',
      members: [
        { name: '박소영', major: '정보융합학부', role: 'openAI', img: '/footer/soyoung.png' },
        { name: '박현우', major: '정보융합학부', role: '아키텍처 설계', img: '/footer/hyunwoo.png' },
        { name: '정수진', major: '정보융합학부', role: '데이터 수집', img: '/footer/sujin.png' },
       
      ],
    },
  ];

  const Footer = () => {

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
      }, []);

    return (
      <footer className="footer" data-aos="fade-up">
        <div className="footer-team" data-aos="fade-up" data-aos-delay="100">
          <div className="footer-title">404 DNF</div>
        </div>
  
        <div className="footer-content" data-aos="fade-up" data-aos-delay="300">
          <div className="footer-left">
            <div className="project-info">
              <div className="project-label">project</div>
              <div className="project-value">
                Neuro Symbolic AI를 활용한 다크패턴 탐지 서비스
              </div>
            </div>
            <div className="project-info" >
              <div className="project-label">period</div>
              <div className="project-value">2025.03 - 2025.11</div>
            </div>
            <div className="footer-icons">
            <div className="project-label">tools</div>
            <img src="/footer/figma.svg" alt="피그마" className="tool-image" />
            <img src="/footer/react.svg" alt="피그마" className="tool-image" />
            <img src="/footer/nodejs.svg" alt="피그마" className="tool-image" />
            <img src="/footer/aws.svg" alt="피그마" className="tool-image" />
            <img src="/footer/flask.svg" alt="피그마" className="tool-image" />
            </div>
          </div>
  
          <div className="footer-right">
            {groupedMembers.map((group, idx) => (
                <div className="footer-group" key={idx}>
                <h3 className="group-title">{group.category}</h3>
                <div className="footer-members">
                    {group.members.map((member, index) => (
                    <div className="member" key={index}>
                        <img src={member.img} alt={member.name} className="member-image" />
                        <div className="member-info">
                        <div className="member-name">{member.name}</div>
                        <div className="member-major">{member.major}</div>
                        <div className="member-role">{member.role}</div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>
      </footer>
    );
  };
  
  
  export default Footer;
  