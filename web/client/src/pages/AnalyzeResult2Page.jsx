import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AnalyzeResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const imageSrc = location.state?.image;
  const fileName = location.state?.fileName || 'unknown_image.png';
  const isSample = location.state?.isSample || false;

  // 업로드되지 않고 직접 접근한 경우 리다이렉트
  if (!imageSrc) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-semibold mb-4">이미지를 업로드해주세요</h1>
        <button
          onClick={() => navigate('/analyze')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          분석하러 가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">📊 분석 결과</h2>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            업로드한 이미지: <span className="font-medium">{fileName}</span>
            {isSample && <span className="text-blue-500 ml-2">(샘플 이미지)</span>}
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <img
            src={imageSrc}
            alt="업로드 이미지"
            className="max-w-[80%] max-h-[400px] object-contain border rounded"
          />
        </div>

        <div className="text-gray-700 text-sm">
          <p className="mb-2">
            🔍 <span className="font-medium">분석 내용 예시:</span> 이 영역에는 실제로 다크패턴 분석 결과가 들어갈 수 있습니다.
          </p>
          <p>예: "이 버튼은 사용자가 실수로 클릭하게 유도하는 구조입니다."</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeResultPage;
