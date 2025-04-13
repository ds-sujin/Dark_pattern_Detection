import React, { useEffect } from 'react';

const TimerDP = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext(); // 5초 후 자동 닫기
    }, 5000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="fixed inset-0 z-30 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl py-10 px-55 max-w-sm w-full text-center relative">
        <h2 className="text-2xl font-bold text-red-600 mb-2">주문은 3분 안에 진행해주셔야 합니다!</h2>
        <p className="text-black-700 mb-4 leading-relaxed">
          이 창은 5초 후 자동으로 닫히며,<br />
          시간 초과 시 주문은 초기화됩니다.
        </p>
        {/* ✅ 두더지 이미지 */}
        <div className="flex justify-center">
          <img src="/DPlogo.png" alt="다크패턴 마스코트" className="w-24 h-24 object-contain" />
        </div>
      </div>
    </div>
  );
};

export default TimerDP;
