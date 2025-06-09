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
    question: "문제 2",
    options: [ { text: "네", correct: false }, { text: "아니오", correct: true } ],
    hint: "힌트 2"
  },
  {
    question: "문제 3",
    image: "none",
    options: [ { text: "정답", correct: true }, { text: "오답", correct: false } ],
    hint: "힌트 3"
  },
  {
    question: "문제 4",
    image: "/quiz/quiz-lv4.svg",
    options: [ { text: "선택지 A", correct: false }, { text: "선택지 B", correct: true } ],
    hint: "힌트 4"
  },
  {
    question: "문제 5",
    image: "/quiz/quiz-lv5.svg",
    options: [ { text: "True", correct: true }, { text: "False", correct: false } ],
    hint: "힌트 5",
    explanation: '“품절임박” 문구와 “구매 가능 수량”은 Scarcity(희소성) 유형의 다크패턴입니다.'
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
        <p><strong>정답 :</strong> {quizData[currentLevel - 1].options.find(o => o.correct).text}</p>
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
                setShowResult(true);
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