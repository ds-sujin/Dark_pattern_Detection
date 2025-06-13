import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DarkQuiz.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Button from '../components/button';

function DarkQuiz() {
  const [quizData, setQuizData] = useState([]);
  const [hintVisible, setHintVisible] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // DB에서 퀴즈 데이터 가져오기
    axios.get('http://localhost:5001/quiz')
      .then(res => {
        // level 순으로 정렬된 데이터라고 가정
        const sortedQuiz = res.data.data.sort((a, b) => a.level - b.level);
        setQuizData(sortedQuiz);
        setAnswers(new Array(sortedQuiz.length).fill(null));
      })
      .catch(err => {
        console.error('퀴즈 데이터를 불러오는 데 실패했습니다:', err);
      });
  }, []);

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
            {quizData
              .slice(0)
              .reverse()
              .map((quiz) => (
                <div
                  key={quiz.level}
                  className={`quiz-level ${currentLevel === quiz.level ? 'active' : ''}`}
                  onClick={() =>
                    answers[quiz.level - 1] !== null && setCurrentLevel(quiz.level)
                  }
                >
                  <img
                    src={
                      answers[quiz.level - 1] === true
                        ? "/quiz/check.svg"
                        : answers[quiz.level - 1] === false
                        ? "/quiz/x.svg"
                        : `/quiz/level${quiz.level}.svg`
                    }
                    alt={`Lv.${quiz.level}`}
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
                {getScore() === quizData.length && (
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
                    setAnswers(new Array(quizData.length).fill(null));
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
                    <strong>정답 :</strong> {quizData[currentLevel - 1]?.real_answer}
                  </p>
                  <pre className="explanation-text">
                    {quizData[currentLevel - 1]?.explanation}
                  </pre>
                  {currentLevel < quizData.length ? (
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
                  <p>{quizData[currentLevel - 1]?.question}</p>

                  {quizData[currentLevel - 1]?.picture &&
                    quizData[currentLevel - 1].picture !== '' && (
                      <div className="quiz-image-wrapper">
                        <img
                          src={`http://localhost:5001${quizData[currentLevel - 1].picture}`}
                          alt="문제 이미지"
                          className="quiz-image"
                        />
                      </div>
                    )}

                  <div className="quiz-options">
                    {quizData[currentLevel - 1]?.answer.map((opt, idx) => (
                      <button
                        key={idx}
                        className={`quiz-option-btn ${
                          answers[currentLevel - 1] !== null
                            ? opt === quizData[currentLevel - 1].real_answer
                              ? 'correct'
                              : 'incorrect'
                            : ''
                        }`}
                        onClick={() => {
                          const isCorrect = opt === quizData[currentLevel - 1].real_answer;
                          const updated = [...answers];
                          updated[currentLevel - 1] = isCorrect;
                          setAnswers(updated);
                          setHintVisible(false);
                          setShowExplanation(true);
                        }}
                        disabled={answers[currentLevel - 1] !== null}
                      >
                        {opt}
                      </button>
                    ))}

                    <div className="quiz-hint-wrapper">
                      {hintVisible ? (
                        <div className="quiz-hint">
                          <strong>힌트:</strong> {quizData[currentLevel - 1]?.hint}
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
