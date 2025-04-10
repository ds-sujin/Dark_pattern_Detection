import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import MenuListPage from './pages/MenuListPage';
import SetPage from './pages/SetPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/menu" element={<MenuListPage />} />
        <Route path="/set" element={<SetPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;