import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// components-gnb
import Navbar from '../components/Navbar';
import MainBanner from '../components/MainBanner';
import MainMenu from '../components/MainMenu';
import MainContents from '../components/MainContents';
import Footer from '../components/Footer';

export default function MainPage() {
  const [user, setUser] = useState(null);
  const [analysisMode, setAnalysisMode] = useState('image');
  const [url, setUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });
      if (response.ok) {
        sessionStorage.removeItem('user');
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleImageUpload = async (file) => {
    if (!user) {
      alert('로그인이 필요합니다.');
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
      formData.append('user_id', user.id);
      formData.append('user_name', user.name);

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
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        throw new Error('URL 분석 요청에 실패했습니다.');
      }

      const data = await response.json();
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
      <Navbar className="bg-white shadow-md">
        <div className="w-full px-8 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex-1 flex justify-between items-center px-20">
              <Link to="/analyze" className="text-gray-600 hover:text-[#024B6E] font-medium">
                다크패턴 분석하기
              </Link>
              <Link to="/history" className="text-gray-600 hover:text-[#024B6E] font-medium">
                나의 분석기록
              </Link>
              <Link to="/notice" className="text-gray-600 hover:text-[#024B6E] font-medium">
                공지사항
              </Link>
              <Link to="/mypage" className="text-gray-600 hover:text-[#024B6E] font-medium">
                마이페이지
              </Link>
            </div>

            <div className="flex-shrink-0 w-1/4 flex justify-end items-center">
              {user ? (
                <div className="flex items-center">
                  <div className="flex items-center mr-12">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-bold">
                        {user.name?.charAt(0) || '유'}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium ml-3">
                      {user.name || '사용자'}
                    </span>
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
                    className="text-gray-600 hover:text-[#024B6E] font-medium mr-6"
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

      </Navbar>

      <MainBanner></MainBanner>
      <MainMenu></MainMenu>
      <MainContents></MainContents>
      <Footer></Footer>


    </div>
  );
}
