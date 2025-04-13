import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import MenuListPage from './pages/MenuListPage';
import CompletePage from './pages/CompletePage';


function App() {
  return (
    <div className="w-screen h-screen overflow-visible">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/menu" element={<MenuListPage />} />
          <Route path="/complete" element={<CompletePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
