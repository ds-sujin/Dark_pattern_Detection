// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterCompletePage from './pages/RegisterCompletePage';
import AnalyzePage from './pages/AnalyzePage';
import AnalyzeResultPage from './pages/AnalyzeResultPage';
import RequireAuth from './components/RequireAuth';
import { useState } from 'react';

function App() {
  const [sampleImage, setSampleImage] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route
          path="/analyze"
          element={
            <RequireAuth>
              <AnalyzePage setSampleImage={setSampleImage} setAnalysisData={setAnalysisData} />
            </RequireAuth>
          }
        />
        <Route
          path="/analyze/result"
          element={
            <RequireAuth>
              <AnalyzeResultPage sampleImage={sampleImage} analysisData={analysisData} />
            </RequireAuth>
          }
        />
        <Route path="/history" element={<div>나의 분석기록 페이지</div>} />
        <Route path="/notice" element={<div>공지사항 페이지</div>} />
        <Route path="/mypage" element={<div>마이페이지</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-complete" element={<RegisterCompletePage />} />
      </Routes>
    </Router>
  );
}

export default App;
