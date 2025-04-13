import React, { useEffect } from 'react';

const TimerDP = ({ onNext }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext(); // 5초 후 자동 닫기
    }, 5000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center relative">
        <h2 className="text-lg font-bold text-red-600 mb-2">주문 전, 3분 시간 제한이 시작됩니다!</h2>
        <p className="text-black-700 mb-4 leading-relaxed">
          5초 후 자동으로 시작되며,<br />
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
