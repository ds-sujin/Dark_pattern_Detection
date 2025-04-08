import axios from 'axios';

// 버튼 클릭 시 로그 전송
export const logClick = async (buttonName) => {
  try {
    await axios.post('http://localhost:2000/log', {
      button: buttonName,
      timestamp: new Date().toISOString(),
    });
    console.log(`✅ [${buttonName}] 로그 전송 완료`);
  } catch (error) {
    console.error(`❌ 로그 전송 실패:`, error);
  }
};