// AnalyzeResultPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import './AnalyzeResult.css';
import DonutChart from '../components/DonutChart';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

function LawCard({ law }) {
  return (
    <li className="law-card">
      <a href={law.url} className="law-title" target="_blank" rel="noreferrer">
        {law.title}
      </a>
      <p className="law-definition"><strong>객정:</strong> {law.definition}</p>
      <p className="law-excerpt"><strong>조합:</strong> {law.excerpt}</p>
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

function AnalyzeResult() {
  const [analysisData, setAnalysisData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const [naturalSize, setNaturalSize] = useState({ width: 800, height: 600 });
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('laws');
  const [relatedLaws, setRelatedLaws] = useState([]);
  const [relatedCases, setRelatedCases] = useState([]);
  const [suggestedSentences, setSuggestedSentences] = useState([]);

  const location = useLocation();
  const imageRef = useRef(null);
  const navigate = useNavigate();

  const filename = location.state?.fileName;
  const imageSrc = `http://localhost:5001/input_image/${filename}`;
  const total = analysisData.length;

  useEffect(() => {
    if (!filename) return;

    const fetchAnalysis = async () => {
      try {
        const res = await fetch('http://localhost:5001/predict_detail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename }),
        });

        const result = await res.json();
        setAnalysisData(result);
      } catch (err) {
        console.error('Analysis fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [filename]);

  useEffect(() => {
    setLoading(true);
  }, [currentIndex]);


  useEffect(() => {
  const handleResize = () => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.offsetWidth,
        height: imageRef.current.offsetHeight,
      });
    }
  };

  window.addEventListener('resize', handleResize);

  // 초기 실행
  handleResize();

  return () => window.removeEventListener('resize', handleResize);
}, []);

  const handleImageLoad = () => {
  if (imageRef.current) {
    setImageSize({
      width: imageRef.current.offsetWidth,
      height: imageRef.current.offsetHeight,
    });
    setNaturalSize({
      width: imageRef.current.naturalWidth,
      height: imageRef.current.naturalHeight,
    });
  }
};

  const currentData = analysisData[currentIndex] ?? null;

  useEffect(() => {
    const fetchLaw = async () => {
      if (!currentData || !currentData.type) return;

      try {
        const res = await fetch('http://localhost:5001/law', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: currentData.type })
        });

        if (!res.ok) {
          console.warn('❗ 관련 법령을 찾을 수 없음');
          setRelatedLaws([]);
          return;
        }

        const lawResult = await res.json();
        setRelatedLaws([lawResult]);
      } catch (err) {
        console.error('❌ 관련 법령 요청 실패:', err);
        setRelatedLaws([]);
      }
    };

    fetchLaw();
  }, [currentData]);


  useEffect(() => {
    const fetchCases = async () => {
      if (!currentData?.type) return;

      try {
        const res = await fetch('http://localhost:5001/case', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: currentData.type }),
        });

        const cases = await res.json();
        setRelatedCases(cases);
      } catch (err) {
        setRelatedCases([]);
      }
    };

    fetchCases();
  }, [currentData]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!currentData?.text) return;

      try {
        const res = await fetch('http://localhost:5001/suggest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: currentData.text }),
        });

        const result = await res.json();
        setSuggestedSentences(result.suggestions.map(s => s.replace(/^\d+\.\s*/, '')));
        setTimeout(() => setLoading(false), 100);
      } catch (err) {
        setSuggestedSentences([]);
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [currentData]);

  if (!currentData?.bbox) {
    return <div className="loading">분석 데이터를 불러오는 중입니다...</div>;
  }

  const { x, y, width: w, height: h } = currentData.bbox;
  const scaleX = imageSize.width / naturalSize.width;
  const scaleY = imageSize.height / naturalSize.height;
  const scaledBox = {
    top: `${y * scaleY}px`,
    left: `${x * scaleX}px`,
    width: `${w * scaleX}px`,
    height: `${h * scaleY}px`,
  };

  return (
    <div className="analyzeAll-page">
      <motion.div className="analysis-page">
        <div className="left-column">
          <div className="image-scroll-container">
            <div className="image-card">
              <div className="uploaded-image-wrapper">
                <img ref={imageRef} src={imageSrc} alt="분석 이미지" className="uploaded-image" onLoad={handleImageLoad} />
                <div className="highlight-box" style={{ ...scaledBox, position: 'absolute' }}></div>
              </div>
            </div>
          </div>

          <div className="bottom-row">
            <div className="upload-result">
              <p><strong>총 {total}개의 다크패턴 문장이 탐지되었습니다.</strong></p>
              <div className="pagination-container">
                <button onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))} disabled={currentIndex === 0}>이전</button>
                <span>{currentIndex + 1} / {total}</span>
                <button onClick={() => setCurrentIndex(prev => Math.min(prev + 1, total - 1))} disabled={currentIndex === total - 1}>다음</button>
              </div>
            </div>

            <div className="bottom-card-row">
              <motion.div className="text-card">
                <div className="text-title">
                  <h4>탐지된 문장</h4>
                  <span className="ocr-label">OCR 신뢰도 : {Math.round(currentData.confidence)}%</span>
                </div>
                <div className="text-content">
                  {loading ? <Skeleton count={3} height={18} /> : <p>{currentData.text}</p>}
                </div>
              </motion.div>

              <motion.div className="suggestion-card">
                <h4>해당 문장을 이렇게 바꿔보세요.</h4>
                <div className="suggestion-content">
                  {loading ? (
                    <Skeleton count={3} height={18} />
                  ) : suggestedSentences.length > 0 ? (
                    <ul>
                      {suggestedSentences.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  ) : (
                    <p>추천 문장이 없습니다.</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="top-row">
            <motion.div className="pattern-card">
              <div className="pattern-card-left">
                <div className="pattern-card-title">
                  <h4>다크패턴 유형</h4>
                  <span className="ocr-label">AI 분석</span>
                </div>
                <div className="donut-wrapper">
                  <DonutChart value={currentData.prob * 0.01} label={currentData.type} />
                </div>
              </div>
            </motion.div>
            <motion.div className="subtype-card">
              <h4>다크패턴 세부유형</h4>
              <div className="subtype-contents-type">
                <p><strong>{currentData.predicate}</strong></p>
              </div>
            </motion.div>
          </div>


          <motion.div className="legal-card">
            <div className="tab-line-container">
              <div className="tab-line">
                <button className={`tab-link ${currentTab === 'laws' ? 'active' : ''}`} onClick={() => setCurrentTab('laws')}>관련 법령</button>
                <button className={`tab-link ${currentTab === 'cases' ? 'active' : ''}`} onClick={() => setCurrentTab('cases')}>실제 사례</button>
              </div>
            </div>
            <motion.div className="tab-content">
              {currentTab === 'laws' ? (
                <ul>
                  {relatedLaws.length > 0 ? relatedLaws.map((law, i) => <LawCard key={i} law={law} />) : <li className="law-card"><p className="law-definition"><strong>❗ 관련 법령 정보를 찾을 수 없습니다.</strong></p></li>}
                </ul>
              ) : (
                <ul>
                  {relatedCases.length > 0 ? relatedCases.map((item, i) => <CaseCard key={i} item={item} />) : <li className="case-card"><p><strong>❗ 관련 사례 정보를 찾을 수 없습니다.</strong></p></li>}
                </ul>
              )}
            </motion.div>
          </motion.div>

          <div className="back-btn">
            <button className="upload-btn" onClick={() => navigate('/analyze')}>다른 이미지 분석하기</button>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default AnalyzeResult;
