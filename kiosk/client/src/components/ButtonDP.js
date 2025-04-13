import React, { useEffect } from 'react';

const ButtonDP = () => {
  useEffect(() => {
    const message =
      "두 개의 버튼 내용을 확인해주세요.";

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'ko-KR'; // 한국어 TTS 설정
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel(); // 컴포넌트 언마운트 시 음성 중지
    };
  }, []);

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[999] pointer-events-none">
      <div className="relative w-[440px] bg-white p-5 rounded-2xl shadow-xl border border-gray-300 text-center pointer-events-auto">
        <p className="text-lg font-bold text-red-600 mb-2">
          두개의 버튼 내용을 확인해주세요!
        </p>

        <p className="text-base text-gray-800 leading-relaxed">
          <span className="font-semibold">빨간색 버튼</span>을 누르면 금액이 추가됩니다.<br />
          의도하지 않은 금액이 추가될 수 있으니<br />
          꼭 내용을 확인하고 눌러주세요!
        </p>

        {/* 꼬리 삼각형 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-10px] w-0 h-0 border-l-8 border-r-8 border-t-[10px] border-l-transparent border-r-transparent border-t-white drop-shadow-sm" />

        {/* 두더지 이미지 */}
        <div className="absolute -bottom-4 right-4">
          <img src="/DPlogo.png" alt="두더지" className="w-16 h-16" />
        </div>
      </div>
    </div>
  );
};

export default ButtonDP;

