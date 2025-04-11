import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
export default function MainPage() {
  const [analysisOpen, setAnalysisOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9FC] font-sans">
      {/* 상단 고정 헤더 */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 font-bold text-lg sticky top-0 z-10">
        DARKPATTERN DETECTION
      </header>

      <div className="flex w-full px-8">
        <div className="flex w-full">
          {/* 좌측 사이드바 */}
          <aside className="w-[232px] bg-white py-10 px-6 border-r border-gray-200 text-[14px] text-[#4B5563]">
            {/* 다크패턴 분석 토글 */}
            <div
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => setAnalysisOpen(!analysisOpen)}
            >
              <div className="flex items-center gap-2">
                <img src="/ChartLine.png" alt="분석 아이콘" className="w-[18px] h-[18px]" />
                <span className="text-[15px] font-semibold text-black group-hover:text-[#2563EB] transition">
                  다크패턴 분석
                </span>
              </div>
              {analysisOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {/* 분석 메뉴 항목 */}
            {analysisOpen && (
              <nav className="mt-6 text-[13px]">
                <div className="text-[#4B5563] hover:text-[#2563EB] cursor-pointer pl-[26px] py-4 mt-2">분석하기</div>
                <div className="text-[#4B5563] hover:text-[#2563EB] cursor-pointer pl-[26px] py-4 mt-2">나의 분석 기록</div>
                <div className="text-[#4B5563] hover:text-[#2563EB] cursor-pointer pl-[26px] py-4 mt-2">다크패턴 유형</div>
              </nav>
            )}

            {/* 마이페이지 */}
            <div className="flex items-center justify-between mt-16 cursor-pointer group">
              <div className="flex items-center gap-3">
                <img src="/User.png" alt="마이페이지 아이콘" className="w-[18px] h-[18px]" />
                <span className="text-[15px] font-semibold text-black group-hover:text-[#2563EB] transition">
                  마이페이지
                </span>
              </div>
              <ChevronDown size={16} />
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <main className="flex-1 px-8 py-10">
            <section className="bg-white rounded-[10px] border border-gray-200 p-8 mb-6">
              <h1 className="text-[15px] font-semibold text-gray-800 mb-2">다크패턴 분석하기</h1>
              <p className="text-[13px] text-gray-600 mb-5">분석하고 싶은 다크패턴을 이미지 또는 해당 웹사이트 URL로 업로드하면 분석이 시작됩니다.</p>

              {/* 탭 버튼 */}
              <div className="flex space-x-2 mb-4">
                <button className="text-sm px-3 py-1 border border-gray-300 rounded bg-white text-gray-900 font-medium shadow-sm">이미지로 분석</button>
                <button className="text-sm px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:text-gray-900">URL로 분석</button>
              </div>

              {/* 업로드 박스 */}
              <div className="bg-[#F8FAFC] border border-dashed border-gray-300 rounded-md h-56 flex flex-col justify-center items-center text-[13px] text-gray-500 text-center">
                <p className="mb-1">이미지 파일을 업로드</p>
                <p>또는 이곳에 드래그 하세요.</p>
              </div>
            </section>

            {/* 분석 결과 영역 */}
            <section className="bg-white rounded-[10px] border border-gray-200 p-8 mt-8">
              <h2 className="text-base font-bold text-gray-900 mb-4">다크패턴 분석 결과</h2>
              <div className="flex flex-col items-center justify-center text-gray-400 text-sm py-14">
                <img src="/result.png" alt="분석 대기" className="w-52 mb-4" />
                <p>분석할 이미지 또는 URL을 업로드 해주세요.</p>
              </div>
            </section>
          </main>

          {/* 우측 정보 패널 */}
          <aside className="w-[232px] pl-6 pt-8">
            <img src="/darkpatterntype.png" alt="다크패턴 유형 정리" className="w-full h-auto rounded-xl" />
          </aside>
        </div>
      </div>
    </div>
  );
}