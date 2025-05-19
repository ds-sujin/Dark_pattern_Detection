import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/analyze" element={<div>다크패턴 분석하기 페이지</div>} />
        <Route path="/learn" element={<div>다크패턴 알아보기 페이지</div>} />
        <Route path="/news" element={<div>관련 뉴스</div>} />
        <Route path="/history" element={<div>나의 분석기록</div>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;