import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logClick } from '../api';

const StartPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [scenario, setScenario] = useState(''); // 시나리오 선택 상태

  const handleClick = () => {
    if (!username.trim() || !scenario) return;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('scenario', scenario); // 선택한 시나리오 저장
    logClick(`StartButton - scenario ${scenario}`, username);
    navigate('/menu');
  };

  return (
    <div
    className="w-full h-[200vh] bg-cover bg-center flex flex-col items-center justify-center text-white"
    style={{ backgroundImage: `url('/start_bg.jpg')` }}
   >

      <div className="w-full bg-black bg-opacity-70 text-center py-12 px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="text-red-500">광운 식당</span>에<br />오신 걸 환영합니다
        </h1>
        <p className="text-yellow-400 text-lg md:text-2xl mb-4">
          먼저 <span className="font-bold">시나리오</span>를 선택해주세요!
        </p>

        {/* 시나리오 선택 버튼 */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-6 py-2 rounded-full text-lg font-semibold border-2 ${scenario === '1' ? 'bg-red-500 border-red-500' : 'border-white'}`}
            onClick={() => {
              setScenario('1');
              sessionStorage.setItem('username', '');
            }}
          >
            시나리오 1
          </button>
          <button
            className={`px-6 py-2 rounded-full text-lg font-semibold border-2 ${scenario === '2' ? 'bg-red-500 border-red-500' : 'border-white'}`}
            onClick={() => {
              setScenario('2');
              sessionStorage.setItem('username', '');
            }}
          >
            시나리오 2
          </button>
        </div>

        {/* 이름 입력 */}
        <p className="text-yellow-400 text-lg md:text-2xl mb-6">
          아래 <span className="font-bold">이름</span>을 입력하고 <span className="font-bold">[주문하기]</span> 버튼을 눌러주세요!
        </p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="이름을 입력하세요"
          className="text-black px-4 py-2 rounded mb-4 w-2/3 max-w-xs"
        />
        <br />
        <button
          className="bg-red-600 hover:bg-red-700 text-white text-2xl px-12 py-4 rounded-2xl font-semibold transition disabled:opacity-50"
          onClick={handleClick}
          disabled={!username.trim() || !scenario}
        >
          주문하기
        </button>
      </div>
    </div>
  );
};

export default StartPage;