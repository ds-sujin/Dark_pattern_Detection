import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import NewsPage from './pages/NewsPage'; // ✅ 추가
import AboutDark from './pages/AboutDark'; // ✅ 추가


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/analyze" element={<div>다크패턴 분석하기 페이지</div>} />
        <Route path="/learn" element={<AboutDark/>} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/history" element={<div>나의 분석기록</div>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
