import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// components-gnb
import Navbar from '../components/Navbar';
import MainBanner from '../components/MainBanner';
import MainMenu from '../components/MainMenu';

export default function MainPage() {
    return(
        <div className="analyze">
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
    );}
    