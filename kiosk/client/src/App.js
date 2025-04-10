import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import MenuListPage from './pages/MenuListPage';
import CompletePage from './pages/CompletePage';
import TimerPage from './pages/TimerPage'; // 상단에 import 추가

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/menu" element={<MenuListPage />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route path="/timer" element={<TimerPage />} /> {/* ✅ 테스트용 경로 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
