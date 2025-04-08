import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import MenuListPage from './pages/MenuListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/menu" element={<MenuListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;