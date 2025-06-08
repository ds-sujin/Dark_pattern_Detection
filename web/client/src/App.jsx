import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterCompletePage from './pages/RegisterCompletePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main" element={<MainPage />} /> {/* ✅ 추가된 라우트 */}
        <Route path="/analyze" element={<div>다크패턴 분석하기 페이지</div>} />
        <Route path="/learn" element={<div>다크패턴 알아보기 페이지</div>} />
        <Route path="/news" element={<div>관련 뉴스</div>} />
        <Route path="/history" element={<div>나의 분석기록</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-complete" element={<RegisterCompletePage />} />
      </Routes>
    </Router>
  );
}

export default App;
