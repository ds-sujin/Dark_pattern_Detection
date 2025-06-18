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
      <p className="law-definition"><strong>정의:</strong> {law.definition}</p>
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
  const currentData = analysisData[currentIndex] ?? {};
  const hasResult = currentData?.bbox;

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
        console.error('❌ 분석 fetch 실패:', err);
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

  //const currentData = analysisData[currentIndex] ?? null;

  useEffect(() => {
    const normalizeTitle = (str) =>
      str.replace(/–|—/g, '-').replace(/\s+/g, ' ').trim();

    const fetchLaws = async () => {
      if (!currentData || !currentData.laws || !Array.isArray(currentData.laws)) return;

      try {
        const responses = await Promise.all(
          currentData.laws.map(async (lawTitle) => {
            const cleanTitle = normalizeTitle(lawTitle);

            const res = await fetch('http://localhost:5001/law', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ title: cleanTitle })
            });

            if (res.ok) {
              return await res.json();
            } else {
              console.warn(`❗ 관련 법령을 찾을 수 없음: ${cleanTitle}`);
              return null;
            }
          })
        );

        const filtered = responses.filter(Boolean);
        setRelatedLaws(filtered);
      } catch (err) {
        console.error('❌ 관련 법령 요청 실패:', err);
        setRelatedLaws([]);
      }
    };
  
    fetchLaws();
  }, [currentData]);


  useEffect(() => {
    const normalizeTitle = (str) =>
      str.replace(/–|—/g, '-').replace(/\s+/g, ' ').trim();

    const fetchCases = async () => {
      if (!currentData || !currentData.laws || !Array.isArray(currentData.laws)) return;
  
      try {
        const responses = await Promise.all(
          currentData.laws.map(async (lawTitle) => {
            const cleanTitle = normalizeTitle(lawTitle);

            const res = await fetch('http://localhost:5001/case', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title: cleanTitle })
            });

            if (res.ok) {
              return await res.json();  // ✅ 이건 배열
            } else {
              console.warn(`❗ 관련 사례 없음: ${cleanTitle}`);
              return [];
            }
          })
        );

        const mergedCases = responses.flat(); // 배열 안 배열 → 1차원으로 합치기
        setRelatedCases(mergedCases);
      } catch (err) {
        console.error('❌ 사례 검색 실패:', err);
        setRelatedCases([]);
      }
    };
  
    fetchCases();
  }, [currentData]);


  useEffect(() => {
    if (!currentData?.text) return;
    fetch('http://localhost:5001/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: currentData.text }),
    })
      .then(res => res.json())
      .then(result => {
        setSuggestedSentences(result.suggestions.map(s => s.replace(/^\d+\.\s*/, '')));
        setTimeout(() => setLoading(false), 100);
      })
      .catch(() => {
        setSuggestedSentences([]);
        setLoading(false);
      });
  }, [currentData]);

  const { x = 0, y = 0, width: w = 0, height: h = 0 } = currentData.bbox || {};
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
            <div className="uploaded-image-wrapper" style={{ position: 'relative' }}>
  <img
    ref={imageRef}
    src={imageSrc}
    alt="분석 이미지"
    className="uploaded-image"
    onLoad={handleImageLoad}
  />

  {hasResult && (
    <>
      {/* 어두운 배경 오버레이 4조각 */}
      <div
        className="dim-top"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `${y * scaleY}px`,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 2,
        }}
      />
      <div
        className="dim-left"
        style={{
          position: 'absolute',
          top: `${y * scaleY}px`,
          left: 0,
          width: `${x * scaleX}px`,
          height: `${h * scaleY}px`,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 2,
        }}
      />
      <div
        className="dim-right"
        style={{
          position: 'absolute',
          top: `${y * scaleY}px`,
          left: `${(x + w) * scaleX}px`,
          right: 0,
          height: `${h * scaleY}px`,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 2,
          width: '100%',
        }}
      />
      <div
        className="dim-bottom"
        style={{
          position: 'absolute',
          top: `${(y + h) * scaleY}px`,
          left: 0,
          width: '100%',
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 2,
          height: '100%',
        }}
      />

      {/* 밝은 하이라이트 사각형 */}
      <div
        className="highlight-box"
        style={{
          position: 'absolute',
          top: `${y * scaleY-2.0}px`,
          left: `${x * scaleX-2.0}px`,
          width: `${w * scaleX}px`,
          height: `${h * scaleY}px`,
          backgroundColor: 'transparent',
          zIndex: 3,
        }}
      />
    </>
  )}
</div>
            </div>
          </div>

          {hasResult ? (
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
                    <p>{currentData.text}</p>
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
          ) : (
            <div className="upload-result" style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p><strong>❗ 분석 결과를 찾을 수 없습니다.</strong></p>
            </div>
          )}
        </div>

        {hasResult && (
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
            </div>

            <motion.div className="subtype-card">
              <h4>다크패턴 세부유형</h4>
              <div className="subtype-contents-type">
                <p><strong>{currentData.predicate}</strong></p>
              </div>
            </motion.div>

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
        )}
      </motion.div>
      <Footer />
    </div>
  );
}

export default AnalyzeResult;
