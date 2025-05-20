import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function MainPage() {
  const [user, setUser] = useState(null);
  const [analysisMode, setAnalysisMode] = useState('image'); // 'image' or 'url'
  const [url, setUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));  // ← 역직렬화
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleImageUpload = async (file) => {
    if (!user) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }
  
    if (!file || !file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('user_id', user.id);         // 사용자 식별 정보 전달
      formData.append('user_name', user.name);     // 사용자 이름 전달
  
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(`OCR 추출 성공: ${result.text || '이미지 업로드 완료'}`);
      } else {
        alert('업로드 실패: ' + result.error);
      }
    } catch (error) {
      console.error(error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
  };
 
  

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    setSelectedImage(file);
    handleImageUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    handleImageUpload(file);
  };

  const handleUrlAnalysis = async () => {
    if (!url.trim()) {
      alert('URL을 입력해주세요.');
      return;
    }

    // URL 형식 검사
    try {
      new URL(url);
    } catch {
      alert('올바른 URL 형식이 아닙니다.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/analyze/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ url: url.trim() })
      });

      if (!response.ok) {
        throw new Error('URL 분석 요청에 실패했습니다.');
      }

      const data = await response.json();
      // 분석 결과 페이지로 이동하거나 결과를 표시
      console.log('URL 분석 결과:', data);

    } catch (error) {
      console.error('URL 분석 중 오류 발생:', error);
      alert('URL 분석에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* 상단 내비게이션 */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* 로고 */}
            <div className="flex-shrink-0 w-1/4">
              <span className="text-[#024B6E] text-xl font-bold">
                DARKPATTERNDETECTION
              </span>
            </div>

            {/* 메뉴 */}
            <div className="flex-1 flex justify-between items-center px-20">
              <Link to="/analyze" className="text-gray-600 hover:text-[#024B6E] font-medium no-underline">
                다크패턴 분석하기
              </Link>
              <Link to="/history" className="text-gray-600 hover:text-[#024B6E] font-medium no-underline">
                나의 분석기록
              </Link>
              <Link to="/notice" className="text-gray-600 hover:text-[#024B6E] font-medium no-underline">
                공지사항
              </Link>
              <Link to="/mypage" className="text-gray-600 hover:text-[#024B6E] font-medium no-underline">
                마이페이지
              </Link>
            </div>

            {/* 프로필 & 로그아웃 */}
            <div className="flex-shrink-0 w-1/4 flex justify-end items-center">
              {user ? (
                <div className="flex items-center">
                  <div className="flex items-center mr-12">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {user.profileImage ? (
                        <img 
                          src="/public/profile.jpg" 
                          alt="프로필" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-600 text-sm">
                          {user.name?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-700 font-medium ml-3">사용자</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-600 text-sm font-medium"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <Link 
                    to="/login"
                    className="text-gray-600 hover:text-[#024B6E] font-medium mr-12"
                  >
                    로그인
                  </Link>
                  <Link 
                    to="/register"
                    className="text-gray-600 hover:text-[#024B6E] font-medium"
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <br />

      {/* 여백 주기 */}
      <div className="mt-96 h-4"></div>

      {/* 전체 이미지 섹션 */}
      <div className="overflow-hidden">
        <img 
          src="/service_describe.jpg" 
          alt="서비스 설명" 
          className="w-screen h-auto object-cover"
          style={{
            maxWidth: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)'
          }}
        />
      </div>

      {/* 다크패턴 분석하기 섹션 */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold text-center mb-2">다크패턴 분석하기</h1>
        <p className="text-gray-600 text-center text-sm mb-8">이미지 또는 URL로 분석이 가능합니다.</p>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${
                analysisMode === 'image'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setAnalysisMode('image')}
            >
              이미지로 분석
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${
                analysisMode === 'url'
                ? 'text-gray-900 border-b-2 border-gray-900'
                : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setAnalysisMode('url')}
            >
              URL로 분석
            </button>
          </div>

          <div className="space-y-4">
            {analysisMode === 'image' ? (
              <div className="bg-gray-50 rounded-lg p-4 max-w-lg mx-auto">
                <br />
                <div
                  className={`border-2 border-dashed ${
                    isDragging ? 'border-gray-500' : 'border-gray-300'
                  } rounded-lg p-6 text-center bg-[#F7F9FD] w-full cursor-pointer transition-colors`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                  {selectedImage ? (
                    <div className="space-y-2">
                      <p className="text-gray-700">선택된 파일:</p>
                      <p className="text-gray-500">{selectedImage.name}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">이미지 파일을 업로드 <br /> 또는 <br /> 이곳에 드래그 하세요.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 max-w-lg mx-auto">
                <div className="flex flex-col items-center space-y-4">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="분석할 웹사이트의 URL을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleUrlAnalysis();
                      }
                    }}
                  />
                  <button
                    className={`px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:border-gray-500 hover:text-gray-900 transition-colors ${
                      isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleUrlAnalysis}
                    disabled={isLoading}
                  >
                    {isLoading ? '분석 중...' : '분석하기'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
