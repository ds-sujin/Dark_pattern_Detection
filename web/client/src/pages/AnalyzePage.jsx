import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 

const AnalyzePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
    <Navbar />  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage({ image: imageUrl, fileName: file.name, isSample: false });

      // 바로 결과 페이지로 이동
      navigate('/analyze/result', {
        state: {
          image: imageUrl,
          fileName: file.name,
          isSample: false,
        },
      });
    }
  };

  const handleSampleImageUse = () => {
    const sampleImage = '/sample_darkpattern.png'; // public 경로 기준
    const sampleFileName = 'sample_darkpattern.png';

    setSelectedImage({
      image: sampleImage,
      fileName: sampleFileName,
      isSample: true,
    });

    // 샘플 이미지 정보 전달
    navigate('/analyze/result', {
      state: {
        image: sampleImage,
        fileName: sampleFileName,
        isSample: true,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">🕵️ 다크패턴 분석하기</h1>

      <div className="flex flex-col md:flex-row justify-center items-start gap-8">
        {/* 업로드 영역 */}
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">이미지 업로드</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          {selectedImage && !selectedImage.isSample && (
            <div className="mt-4">
              <p className="text-sm text-gray-700 mb-2">업로드된 이미지:</p>
              <img
                src={selectedImage.image}
                alt="업로드 미리보기"
                className="w-full max-h-64 object-contain border rounded"
              />
            </div>
          )}
        </div>

        {/* 샘플 이미지 영역 */}
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-lg font-semibold mb-4">샘플 이미지 사용</h2>
          <img
            src="/sample_darkpattern.png"
            alt="샘플 이미지"
            className="w-full h-48 object-contain mb-4 border"
          />
          <button
            onClick={handleSampleImageUse}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            사용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
