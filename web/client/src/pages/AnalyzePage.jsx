import './AnalyzePage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AnalyzePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage({ image: imageUrl, fileName: file.name, isSample: false });

      // 결과 페이지로 이동
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
    const sampleImage = '/sample_darkpattern.png';
    const sampleFileName = 'sample_darkpattern.png';

    setSelectedImage({
      image: sampleImage,
      fileName: sampleFileName,
      isSample: true,
    });

    navigate('/analyze/result', {
      state: {
        image: sampleImage,
        fileName: sampleFileName,
        isSample: true,
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="analyze-container">
        <div className="upload-box">
          <h2>AI를 이용한 다크패턴 분석 서비스</h2>
          <p>이미지 파일을 통해 분석을 해드립니다.</p>
          <label className="upload-button">
            이미지 파일 업로드
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </label>
          <p>또는<br />이곳에 파일을 드래그 하세요.</p>
        </div>

        <div className="sample-box">
          <h4>샘플이미지</h4>
          <p>아래 이미지를 사용해 분석해보세요.</p>
          <img src="/sample_darkpattern.png" alt="샘플 이미지" />
          <button onClick={handleSampleImageUse}>사용하기 →</button>
        </div>
      </div>
    </>
  );
};

export default AnalyzePage;
