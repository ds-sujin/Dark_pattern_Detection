import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterCompletePage from './pages/RegisterCompletePage';
import NewsPage from './pages/NewsPage'; // ✅ 추가
import AboutDark from './pages/AboutDark'; // ✅ 추가
import AnalyzePage from './pages/AnalyzePage'; // ✅ 추가
import DarkQuiz from './pages/DarkQuiz'; // ✅ 추가
import AnalyzeResult from './pages/AnalyzeResult'; // 분석 결과 페이지
import LandingPage from './pages/LandingPage'; // 꼭 추가





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/analyze" element={<AnalyzePage/>} />
        <Route path="/analyze/result" element={<AnalyzeResult />} />
        <Route path="/analyze/loading" element={<LandingPage />} />
        <Route path="/learn" element={<AboutDark/>} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/quiz" element={<DarkQuiz />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-complete" element={<RegisterCompletePage />} />
      </Routes>
    </Router>
  );
}

export default App;
