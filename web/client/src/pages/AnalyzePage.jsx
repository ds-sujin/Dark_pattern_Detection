import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnalyzePage.css';
import Navbar from '../components/Navbar';

const AnalyzePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 사용자 정보 가져오기
    const user = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user'))
      : { id: '', name: '' };

    // FormData 구성
    const formData = new FormData();
    formData.append('image', file);
    formData.append('user_id', user.id);
    formData.append('user_name', user.name);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const imageUrl = URL.createObjectURL(file);
        const fileName = file.name;

        setSelectedImage({ image: imageUrl, fileName, isSample: false });

        // sample_darkpattern2.png 여부 체크
        const isSecondSample = fileName === 'sample_darkpattern2.png';

        // 결과 페이지로 이동
        navigate('/analyze/result', {
          state: {
            image: imageUrl,
            fileName,
            isSample: false,
            ocrText: result.text || '',
            isSecondSample, // ✅ 플래그 전달
          },
        });
      } else {
        alert('업로드 실패: ' + result.error);
      }
    } catch (error) {
      console.error(error);
      alert('이미지 업로드 중 오류 발생');
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
        ocrText: '', // 샘플은 OCR 없음
        isSecondSample: false, // 기본 샘플 이미지
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
