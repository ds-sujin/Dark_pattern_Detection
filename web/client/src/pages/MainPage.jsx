import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// components-gnb
import Navbar from '../components/Navbar';
import MainBanner from '../components/MainBanner';
import MainMenu from '../components/MainMenu';
import MainContents from '../components/MainContents';
import Footer from '../components/Footer';

export default function MainPage() {
  const [user, setUser] = useState({
    name: "사용자",
    profileImage: true
  }); // 테스트용 기본값
  const [analysisMode, setAnalysisMode] = useState('image'); // 'image' or 'url'
  const [url, setUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다:', error);
      }
    };
    fetchUserData();
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
    if (!file) return;
    
    // 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/analyze/image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      const data = await response.json();
      // 분석 결과 페이지로 이동하거나 결과를 표시
      console.log('분석 결과:', data);
      
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
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
      <Navbar className="bg-white shadow-md">
        <div className="w-full px-8 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

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
      </Navbar>

      <MainBanner></MainBanner>
      <MainMenu></MainMenu>
      <MainContents></MainContents>
      <Footer></Footer>


    </div>
  );
}
