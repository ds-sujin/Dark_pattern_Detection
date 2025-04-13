import React from 'react';

const TimerPage = () => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 text-center max-w-sm w-full shadow-xl">
        <img src="/timer.jpg" alt="시간 초과" className="w-20 h-20 mx-auto mb-4" />
        
        <h2 className="text-2xl font-extrabold text-red-600 mb-2">시간이 초과되었습니다.</h2>
        
        <p className="text-gray-600 text-base leading-relaxed">
          선택하신 항목은 모두
          <span className="text-black font-extrabold"> 초기화 </span>
          되며,
          <br />
          <span className="text-black font-extrabold"> 처음 화면 </span>
          으로 돌아갑니다.
        </p>
      </div>
    </div>
  );
};

export default TimerPage;
