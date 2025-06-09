// src/pages/AboutDark.jsx
import React, { useState } from 'react';
import './DarkQuiz.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Button from '../components/button';

const quizData = [
  {
    question: "Q. 당신은 물건을 구매하는 상황입니다. 다음 상황의 경우는 다크패턴인가요?",
    image: "/quiz/quiz-lv1.svg",
    options: [ { text: "네", correct: true }, { text: "아니오", correct: false } ],
    hint: "품절임박은 다크패턴에 해당합니다.",
    explanation: `“품절임박” 문구와 “구매 가능 수량”은 Scarcity(희소성) 유형의 다크패턴입니다.

상황은 Scarcity 유형의 세부유형인 Low-stock Messages(낮은 재고 메시지)입니다. 해당 경우에는 사용자에게 제품의 수량이 제한적임을 알리지만 재고가 한정적이거나 부족하다고만 표시하고 정확한 수량 표시하지 않는 경우를 의미합니다.`
  },
  {
    question: "Q. 무료 체험 기간이 끝나기 전에 서비스에서 사용자에게 구독 전환 안내를 명확히 제공하고, 해지 방법도 쉽게 설명되어 있다. 이건 Hidden Subscription 다크패턴의 사례에 해당한다.",
    options: [ { text: "네", correct: false }, { text: "아니오", correct: true } ],
    hint: "Hidden Subcription 다크패턴은 사용자에게 구독 전환 사실을 숨기거나, 해지 절차를 어렵게 만드는 경우를 말합니다.",
    explanation : '이 사례는 Hidden Subscription 다크패턴에 해당하지 않습니다. \nHidden Subscription은 일반적으로 사용자에게 구독 전환 사실을 숨기거나, 해지 절차를 어렵게 만드는 경우를 말합니다. \n\n반면 이 문제에서는 \n• 서비스가 무료 체험이 끝나기 전에 구독 전환을 명확히 알림 \n• 해지 방법도 쉽게 안내함 \n따라서 사용자를 속이거나 방해하는 행위가 없기 때문에 다크패턴이 아닙니다.'
  },
  {
    question: "Q. 계정 탈퇴를 하려면 설정 > 기타 > 계정관리 > 고객센터 > 메일 문의 > 해지 신청 링크로 들어가야만 한다. 이 경우에 해당하는 다크패턴 유형은 무엇인가요?",
    image: "none",
    options: [ { text: "A. Sneaking (몰래 끼워넣기)", correct: false }, { text: "B. Urgency (긴급성 부여)", correct: false }, { text: "C. Scarcity (인위적 희소성)", correct: false },{ text: "D. Obstruction (방해하기)", correct: true } ],
    hint: "사용자가 원하는 행동(탈퇴)을 하는 데 과도한 단계와 복잡한 경로를 요구하는 경우에요.",
    explanation:'계정 탈퇴를 하려면 여러 단계의 경로를 거쳐야 하는 이 사례는, 사용자가 쉽게 탈퇴하지 못하도록 절차를 복잡하게 만든 Obstruction(방해) 유형의 다크패턴입니다. \n특히 ‘Hard to Cancel’ 세부 유형에 해당하며, 이는 이용자가 서비스를 원활히 해지하지 못하게 의도적으로 불편함을 유도하는 방식입니다.'
  },
  {
    question: "Q. 다음 중 ‘몰래 장바구니 추가(Sneak into Basket)’에 해당하는 사례는 무엇인가요?",
    image: "none",
    options: [ { text: "A. 사용자가 제품을 클릭하자마자 자동 결제되는 구조", correct: false }, { text: "B. 사용자가 상품을 고르지도 않았는데, 결제 시 추가 상품이 포함돼 있는 경우", correct: true }, { text: "C. 로그인 없이 상품을 볼 수 없는 화면", correct: false },{ text: "D. 사용자가 후기를 쓰지 않으면 주문 완료가 되지 않는 구조", correct: false } ],
    hint: "몰래 장바구니 추가란, 사용자가 선택하지 않은 상품이나 옵션이 결제 단계에 자동으로 포함되는 다크패턴입니다.",
    explanation:'‘몰래 장바구니 추가(Sneak into Basket)’는 사용자가 직접 고르지 않았는데도, 결제 시 추가 상품이나 옵션이 자동 포함되는 구조를 말합니다. \n이는 사용자의 의도와 다르게 비용이 늘어나게 만들며, 소비자가 모르게 결제를 유도하는 전형적인 다크패턴입니다.'
  },
  {
    question: "Q. 다음 중 ‘Misdirection’ 다크패턴 유형에 속하는 상황은 무엇인가요?",
    image: "none",
    options: [ { text: "A. ‘곧 마감됩니다’라는 거짓 메시지로 구매를 유도", correct: false }, { text: "B. ‘아니요, 할인은 필요 없어요’처럼 부정적인 선택지를 제시", correct: false }, { text: "C. 마케팅 수신 동의를 하지 않으면 사이트 접근이 차단", correct: false }, { text: "D. 리뷰 출처를 공개하지 않은 홍보 문구 사용", correct: false } ],
    hint: "Misdirection은 사용자의 주의를 다른 곳으로 돌리거나, 원하는 선택지를 덜 보이게 하거나 불쾌하게 표현해 사용자의 선택을 왜곡하는 방식입니다.",
    explanation: '“‘아니요, 할인은 필요 없어요’처럼 부정적 감정을 자극하는 문구는 사용자가 선택을 망설이게 만들며, 주의를 돌리거나 심리적 압박을 주는 Misdirection(주의 분산) 유형의 다크패턴입니다. \n이는 감정적으로 불쾌하거나 수치심을 느끼게 만들어 의도하지 않은 선택을 하도록 유도하는 방식입니다.'
  }
];

function DarkQuiz() {
  const [hintVisible, setHintVisible] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [answers, setAnswers] = useState([null, null, null, null, null]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const getScore = () => answers.filter((a) => a === true).length;
  
  return (
    <div className="quizpage-container">
      <Navbar />
      <div className="quiz-container">
        <h2>다크패턴 퀴즈 풀기</h2>
        <p>두더지와 함께 땅 깊은 곳 숨겨 있는 다크패턴을 발견해서 없애주세요!</p>
        <div className="quiz-layout">
          <div className="quiz-levels">
            <img src="/quiz/goal.svg" alt="목표" className="goal-img" />
            {[5, 4, 3, 2, 1].map((lvl) => (
              <div
                key={lvl}
                className={`quiz-level ${currentLevel === lvl ? 'active' : ''}`}
                onClick={() => answers[lvl - 1] !== null && setCurrentLevel(lvl)}
                >
                <img
                    src={
                        answers[lvl - 1] === true
                        ? "/quiz/check.svg"
                        : answers[lvl - 1] === false
                            ? "/quiz/x.svg"
                            : `/quiz/level${lvl}.svg`
                    }
                    alt={`Lv.${lvl}`}
                    className="level-img"
                    />
                </div>
            ))}
          </div>

  <div className="quiz-question-area">
   {showResult ? (
    // ✅ 결과 화면
    <div className="quiz-result">
      {getScore() === 0 && (
        <>
          <img src="/quiz/quiz-3.svg" alt="두더지" />
          <h3>다크패턴이 처음이시죠?</h3>
          <p>다크패턴의 덫은 피하기 어렵죠..<br />괜찮아요, 누구나 한 번쯤은 ‘동의합니다’를 누르며 당했답니다.</p>
        </>
      )}
      {getScore() >= 1 && getScore() <= 2 && (
        <>
          <img src="/quiz/quiz-2.svg" alt="두더지" />
          <h3>어… 혹시 다크패턴한테 살짝 속으셨나요?</h3>
          <p>누구나 한 번쯤은 ‘아차!’ 하고 결제 버튼 누르잖아요. <br/> 다크패턴은 교묘하지만, 당신의 눈치도 만만치 않아요.</p>
        </>
      )}
      {getScore() >= 3 && getScore() <= 4 && (
        <>
          <img src="/quiz/quiz-1.svg" alt="두더지" />
          <h3>좋아요! 눈썰미가 생기셨군요.</h3>
          <p>웬만한 다크패턴은 이제 피해갈 수 있겠네요. <br/> 하지만 가장 무서운 건 ‘익숙한 UX에 속는 것’이랍니다.</p>
        </>
      )}
      {getScore() === 5 && (
        <>
          <img src="/quiz/quiz-0.svg" alt="두더지" />
          <h3>당신은 다크패턴 탐지 전문가시네요!!</h3>
          <p>이제 당신은 다크패턴 감별사! 👑 <br/> 어떤 다크패턴도 당신의 눈을 속이긴 어려울거예요!</p>
        </>
      )}

      <button
        className="restart-button"
        onClick={() => {
          setQuizStarted(false);
          setCurrentLevel(1);
          setAnswers([null, null, null, null, null]);
          setHintVisible(false);
          setShowExplanation(false);
          setShowResult(false);
        }}
      >
        처음으로
      </button>
    </div>
  ) : quizStarted ? (
    showExplanation ? (
      // ✅ [정답 or 오답 해설 화면]
      <div className="quiz-explanation">
        <h3 className={answers[currentLevel - 1] ? 'correct' : 'incorrect'}>
          {answers[currentLevel - 1] ? '정답입니다!' : '오답입니다!'}
        </h3>
        <p>
        <strong>정답 :</strong>{' '}
        {quizData[currentLevel - 1]?.options.find((o) => o.correct)?.text ?? '정답 없음'}
        </p>
        <pre className="explanation-text">{quizData[currentLevel - 1].explanation}</pre>
        {currentLevel < 5 ? (
            <button
                className="next-button"
                onClick={() => {
                setCurrentLevel(currentLevel + 1);
                setShowExplanation(false);
                setHintVisible(false);
                }}
            >
                다음 문제 &nbsp; ❯
            </button>
            ) : (
            <button
                className="next-button"
                onClick={() => {
                    setShowExplanation(false);
                    if (answers.every(a => a !== null)) {
                    setShowResult(true);
                    }
                }}
            >
                나의 결과 보기 &nbsp; 📊
            </button>
            )}
      </div>
    ) : (
      // ✅ [문제 화면]
      <div className="quiz-question">
        <h3>Level {currentLevel}</h3>
        <p>{quizData[currentLevel - 1].question}</p>

        {quizData[currentLevel - 1].image &&
            quizData[currentLevel - 1].image !== "none" && (
            <div className="quiz-image-wrapper">
                <img
                src={quizData[currentLevel - 1].image}
                alt="문제 이미지"
                className="quiz-image"
                />
            </div>
            )}

        <div className="quiz-options">
          {quizData[currentLevel - 1].options.map((opt, idx) => (
            <button
              key={idx}
              className={`quiz-option-btn ${
                answers[currentLevel - 1] !== null
                  ? opt.correct
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => {
                const updated = [...answers];
                updated[currentLevel - 1] = opt.correct;
                setAnswers(updated);
                setHintVisible(false);
                setShowExplanation(true);
              }}
              disabled={answers[currentLevel - 1] !== null}
            >
              {opt.text}
            </button>
          ))}

          <div className="quiz-hint-wrapper">
            {hintVisible ? (
              <div className="quiz-hint">
                <strong>힌트:</strong> {quizData[currentLevel - 1].hint}
              </div>
            ) : (
              <button
                className="hint-button"
                onClick={() => setHintVisible(true)}
              >
                힌트보기
              </button>
            )}
          </div>
        </div>
      </div>
    )
  ) : (
    // ✅ [시작 화면]
    <div className="quiz-start">
      <img src="/quiz/quiz-mole.svg" alt="두더지" />
      <button className="custom-btn" onClick={() => setQuizStarted(true)}>
        시작하기
      </button>
    </div>
  )}
</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DarkQuiz; 