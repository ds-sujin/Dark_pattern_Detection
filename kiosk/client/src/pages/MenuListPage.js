import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logClick } from '../api';
import SetPage from './SetPage'; // ✅ SetPage를 팝업 컴포넌트로 import
import TimerPage from './TimerPage';


const menuData = [
  { name: '된장찌개', price: 8000, image: '/menu1.jpg' },
  { name: '순두부찌개', price: 9000, image: '/menu2.jpg' },
  { name: '김치볶음밥', price: 6500, image: '/menu3.jpg' },
  { name: '라볶이', price: 8000, image: '/menu4.jpg', soldOut: true },
  { name: '광운 김밥', price: 3000, image: '/menu5.jpg' },
  { name: '돈까스', price: 10000, image: '/menu6.jpg' },
  { name: '닭볶음탕', price: 12000, image: '/menu7.jpg', soldOut: true },
  { name: '공기밥 추가', price: 1000, image: '/menu8.jpg' },
];

function MenuListPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [timeLeft, setTimeLeft] = useState(3); // 3분
  const [showTimeoutPopup, setShowTimeoutPopup] = useState(false); // 시간 초과 팝업업
  const [showSetPopup, setShowSetPage] = useState(false); // ✅ 팝업 표시 여부 상태
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowTimeoutPopup(true);
          setTimeout(() => {
            navigate('/'); // 메인으로 이동
          }, 3000); // 3초 후
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  const formatTime = (sec) => {
    const min = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${min}:${s}`;
  };

  const handleSelect = async (item) => {
    await logClick(item.name);

    setSelected((prev) => {
      const exists = prev.find((m) => m.name === item.name);
      if (exists) {
        return prev.map((m) =>
          m.name === item.name ? { ...m, quantity: m.quantity + 1 } : m
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const total = selected.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="relative flex flex-col h-screen"> {/* ✅ relative 추가! */}
      {/* 상단 고정 영역 */}
      <div className="p-4 shrink-0 bg-gray-100">
        <div className="flex justify-center items-center mb-2">
          <span className="font-semibold">남은 시간</span>
          <span className="ml-2 text-red-600 font-bold">⏱ {formatTime(timeLeft)}</span>
        </div>
        <p className="text-center text-gray-600 text-sm">빠르게 주문하세요! 시간이 지나면 주문이 초기화됩니다.</p>
      </div>

      {/* 메뉴 탭 */}
      <div className="bg-white px-4 py-2 border-b font-semibold text-lg shrink-0">
        <div className="flex gap-6">
          <button className="text-black border-b-2 border-black pb-1">전체메뉴</button>
          <button className="text-gray-400">점심특선</button>
          <button className="text-gray-400">음료/주류</button>
        </div>
      </div>

      {/* 메뉴 스크롤 영역 */}
      <div className="flex-1 overflow-y-scroll px-4 py-4">
        <div className="grid grid-cols-3 gap-4">
          {menuData.map((item, index) => (
            <div
              key={index}
              className={`border rounded-lg p-2 text-center ${
                item.soldOut ? 'opacity-40' : 'cursor-pointer hover:shadow-md'
              }`}
              onClick={() => !item.soldOut && handleSelect(item)}
            >
              <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded" />
              <p className="mt-2">{item.name}</p>
              <p className="font-bold">{item.price.toLocaleString()}원</p>
              {item.soldOut && <div className="text-white bg-black text-sm mt-1">품절</div>}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 고정 영역 */}
      <div className="bg-white border-t p-4 grid grid-cols-2 shrink-0">
        <div>
          <p className="font-semibold mb-2">담은 메뉴</p>
          {selected.map((item, i) => (
            <div key={i} className="flex justify-between items-center mb-1">
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold">
                  {item.quantity} × {item.price.toLocaleString()}원
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right">
          <p className="font-semibold mb-2">총 결제금액</p>
          <p className="text-xl font-bold">{total.toLocaleString()}원</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 mt-2 rounded disabled:opacity-50"
            disabled={total === 0}
            onClick={() => setShowSetPage(true)} // ✅ 팝업 열기
          >
            결제
          </button>
        </div>
      </div>
      
      {/* ✅ 팝업 조건부 렌더링 */}
       {showSetPopup && (
        <SetPage
          onClose={() => setShowSetPage(false)}
          onConfirm={() => {
            setShowSetPage(false);
            navigate('/complete'); // TODO: 주문 완료 페이지
          }}
        />
      )}
      {/* 시간 초과 팝업*/}
      {showTimeoutPopup && <TimerPage />}

    </div>
  );
}

export default MenuListPage;