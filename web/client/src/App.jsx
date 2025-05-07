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
        <Route path="/analyze" element={<div>다크패턴 분석하기 페이지</div>} />
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
