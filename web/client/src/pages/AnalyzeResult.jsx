import React, { useState, useEffect, useRef } from 'react';
import './AnalyzeResult.css';
import DonutChart from '../components/DonutChart';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

const dummyData = [
  {
    text: '신규회원 전용 14만원 쿠폰 모두 다운받기',
    bbox: [460, 425, 160, 30],
    suggestions: [
      '1만원 쿠폰과 5천원 쿠폰을 드려요.',
      '처음 가입하면 쿠폰을 드립니다.',
      '처음 가입하면 쿠폰을 드립니다. 처음 가입하면 쿠폰을 드립니다.'
    ],
    type: 'Sneaking',
    predicate: '몰래 장바구니 추가',
    confidence: 0.97,
    laws: ['ICO 대 Emailmovers Limited', '개인정보 보호정책 명시 부족 등'],
    examples: ['자동으로 장바구니에 담기는 항목 예시', '사용자 동의 없는 추가 옵션']
  },
  {
    text: '구매 가능 수량 10개',
    bbox: [400, 467, 65, 20],
    suggestions: [
      '상품 수량은 넉넉합니다.',
      '지금이 아니어도 구매하실 수 있어요.'
    ],
    type: 'Scarcity',
    predicate: 'Low-stock message',
    confidence: 0.89,
    laws: ['전자상거래법 제21조'],
    examples: ['남은 수량 허위 표시', '구매 유도 문구 과장']
  }
];

const softSpring = {
  type: 'spring',
  stiffness: 80,
  damping: 18,
  mass: 0.5,
};

const sampleCases = [
  {
    title: "A.A.A v. Borjamotor, S.A.",
    url: "https://www.deceptive.design/cases/a-a-a-v-borjamotor-s-a",
    Excerpt: "BORJAMOTOR, S.A. received a complaint from a customer...",
    "Our analysis": "The hard to cancel deceptive pattern, used by BORJAMOTOR, S.A., made it difficult for users to withdraw consent.",
    Outcome: "Borjamotor, S.A. was fined by the Spanish DPA (AEPD) for violating Art. 7 GDPR.",
    "Related deceptive patterns": ["Hard to cancel"],
    "Related laws": ["GDPR Article 7", "GDPR Article 12"]
  },
  {
    title: "B.B.B v. DarkShop Inc.",
    url: "https://www.deceptive.design/cases/b-b-b-v-darkshop",
    Excerpt: "DarkShop Inc. faced a complaint regarding misleading subscription flows.",
    "Our analysis": "They used roach motel techniques, making it easy to sign up but hard to cancel.",
    Outcome: "They received sanctions from the FTC.",
    "Related deceptive patterns": ["Roach Motel"],
    "Related laws": ["FTC Act Section 5"]
  }
];

const sampleLaws = [
  {
    title: "Arizona Consumer Fraud Act, A.R.S. § 44–1521",
    url: "https://www.deceptive.design/laws/arizona-consumer-fraud-act-a-r-s-ss",
    definition: "Prohibits deceptive practices, fraud, and misrepresentations in the sale or advertisement of merchandise.",
    excerpt: "A. The act, use or employment by any person of any deception, deceptive act or practice, fraud, misrepresentation...",
    related_cases: ["A.A.A v. Borjamotor, S.A."],
    related_deceptive_patterns: ["Sneaking", "Hard to cancel"]
  },
  {
    title: "General Data Protection Regulation (GDPR), Article 7",
    url: "https://www.deceptive.design/laws/gdpr-article-7",
    definition: "Specifies conditions for consent to be valid under the GDPR.",
    excerpt: "Consent should be freely given, specific, informed and unambiguous...",
    related_cases: [],
    related_deceptive_patterns: ["Obstruction"]
  }
];

function LawCard({ law }) {
  return (
    <li className="law-card">
      <a href={law.url} className="law-title" target="_blank" rel="noreferrer">
        {law.title}
      </a>
      <p className="law-definition"><strong>정의:</strong> {law.definition}</p>
      <p className="law-excerpt"><strong>조항:</strong> {law.excerpt}</p>
      <span className="law-url">{law.url}</span>
    </li>
  );
}

function CaseCard({ item }) {
  return (
    <li className="case-card">
      <a href={item.url} className="case-title" target="_blank" rel="noreferrer">
        {item.title}
      </a>
      <p className="case-analysis"><strong>분석:</strong> {item['Our analysis']}</p>
      <p className="case-outcome"><strong>결과:</strong> {item.Outcome}</p>
      <span className="case-url">{item.url}</span>
    </li>
  );
}

function AnalyzeResultPage({ imageSrc = '/analyze/analyze-ex.png', analysisData = dummyData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('laws');
  const currentData = analysisData[currentIndex];
  const total = analysisData.length;
  const [cases] = useState(sampleCases);
  const imageRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const navigate = useNavigate(); // ✅ 추가

  const tabRefs = {
    laws: null,
    examples: null,
  };
  const [underlineStyle, setUnderlineStyle] = useState({});

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setLoading(false);
    }, 500);
  };

  const handlePrev = () => {
    setLoading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    const updateSize = () => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.offsetWidth,
          height: imageRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  let scaledBox = { top: '0px', left: '0px', width: '0px', height: '0px' };
  if (currentData?.bbox && imageSize.width > 1 && imageSize.height > 1) {
    const [x, y, w, h] = currentData.bbox;
    const scaleX = imageSize.width / 800;
    const scaleY = imageSize.height / 600;
    scaledBox = {
      top: `${y * scaleY}px`,
      left: `${x * scaleX}px`,
      width: `${w * scaleX}px`,
      height: `${h * scaleY}px`
    };
  }

  useEffect(() => {
    const activeTab = tabRefs[currentTab];
    if (activeTab) {
      setUnderlineStyle({
        left: activeTab.offsetLeft + 'px',
        width: activeTab.offsetWidth + 'px',
      });
    }
  }, [currentTab]);

  return (
    <div className="analyzeAll-page">
      <Navbar />
      <motion.div className="analysis-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="left-column">
          <motion.div className="image-card" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={softSpring}>
            <div className="image-header">
              <div>
                <h3>분석이미지</h3>
                <p>분석이 완료되었습니다. 다크패턴 분석 결과를 확인하세요.</p>
              </div>
            </div>
            <div className="upload-result">
              <p><strong>총 {total}개의 다크패턴 문장이 탐지되었습니다.</strong></p>
              <div className="pagination-container">
                <button onClick={handlePrev} disabled={currentIndex === 0}>
                  <img src="./analyze/left-circle.svg" alt="이전" />
                </button>
                <span>{currentIndex + 1} / {total}</span>
                <button onClick={handleNext} disabled={currentIndex === total - 1}>
                  <img src="./analyze/right-circle.svg" alt="다음" />
                </button>
              </div>
            </div>
            <div className="uploaded-image-wrapper">
              <img ref={imageRef} src={imageSrc} alt="분석 이미지" className="uploaded-image" />
              <div className="highlight-box" style={{ ...scaledBox, position: 'absolute' }}></div>
            </div>
          </motion.div>

          <div className="bottom-row">
            <motion.div className="text-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={softSpring}>
              <div className="text-title">
                <h4>탐지된 문장</h4>
                <span className="ocr-label">OCR 신뢰도 : {Math.round(currentData.confidence * 100)}%</span>
              </div>
              <div className="text-content">
                {loading ? <Skeleton count={3} height={20} /> : <p>{currentData.text}</p>}
              </div>
            </motion.div>

            <motion.div className="suggestion-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={softSpring}>
              <h4>해당 문장을 이렇게 바꿔보세요.</h4>
              <div className="suggestion-content">
                {loading ? (
                  <Skeleton count={3} height={18} />
                ) : (
                  <ul>{currentData.suggestions.map((s, i) => <li key={i}>{s}</li>)}</ul>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="right-column">
          <div className="top-row">
            <motion.div className="pattern-card" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={softSpring}>
              <div className="pattern-card-left">
                <h4>다크패턴 유형</h4>
                <DonutChart value={currentData.confidence} label={currentData.type} />
                <p>{currentData.type} 유형은 사용자의 의도와 무관하게 특정 행동이 유도되는 방식입니다.</p>
              </div>
            </motion.div>

            <motion.div className="subtype-card" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={softSpring}>
              <h4>다크패턴 세부유형</h4>
              <p><strong>{currentData.predicate}</strong></p>
              <p>사용자가 직접 선택하지 않았거나 동의 없이 항목이나 요금이 자동 추가된 경우입니다.</p>
            </motion.div>
          </div>

          <motion.div className="legal-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={softSpring}>
            <div className="tab-line">
              <button className={currentTab === 'laws' ? 'active' : ''} onClick={() => setCurrentTab('laws')} ref={el => tabRefs.laws = el}>관련 법령</button>
              <button className={currentTab === 'examples' ? 'active' : ''} onClick={() => setCurrentTab('examples')} ref={el => tabRefs.examples = el}>실제 사례</button>
              <span className="tab-underline" style={underlineStyle}></span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={currentTab} className="tab-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                <ul>
                  {currentTab === 'laws'
                    ? sampleLaws.map((law, i) => <LawCard key={i} law={law} />)
                    : cases.map((item, i) => <CaseCard key={i} item={item} />)}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="back-btn">
          <button className="upload-btn" onClick={() => navigate('/analyze')}>
            다른 이미지 분석하기
          </button>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default AnalyzeResultPage;
