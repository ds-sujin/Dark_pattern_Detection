import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import MenuListPage from './pages/MenuListPage';
import CompletePage from './pages/CompletePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/menu" element={<MenuListPage />} />
        <Route path="/complete" element={<CompletePage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
