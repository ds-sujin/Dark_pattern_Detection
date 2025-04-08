import React from 'react';
import { logClick } from '../api';

const StartPage = () => {
  const handleClick = () => {
    logClick('StartButton');
    alert('주문을 시작합니다!');
  };

  return (
    <div className="w-screen min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
         style={{ backgroundImage: `url('/start_bg.jpg')` }}>
      
      <div className="w-full bg-black bg-opacity-70 text-center py-12 px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-red-500">광운 식당</span>에<br />오신 걸 환영합니다
        </h1>
        <p className="text-yellow-400 text-lg md:text-2xl mb-10">
          아래 <span className="font-bold">[주문하기]</span> 버튼을 눌러 주문해주세요!
        </p>
        <button
          className="bg-red-600 hover:bg-red-700 text-white text-2xl px-12 py-4 rounded-2xl font-semibold transition"
          onClick={handleClick}
        >
          주문하기
        </button>
      </div>
    </div>
  );
};

export default StartPage;