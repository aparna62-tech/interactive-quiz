
import { useState, useEffect } from 'react';
import { questionBank, QUIZ_DURATION_SECONDS } from './data/questions.js';

import StartScreen from './components/StartScreen.jsx';
import QuizProgress from './components/QuizProgress.jsx';
import QuestionCard from './components/QuestionCard.jsx';
import ResultsScreen from './components/ResultsScreen.jsx';


function shuffleQuestions(items) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function App() {
  const [stage, setStage] = useState('start');
  const [questions, setQuestions] = useState(() =>
    shuffleQuestions(questionBank)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(
    QUIZ_DURATION_SECONDS
  );

  const currentQuestion = questions[currentIndex];

 
  const score = answers.filter(
    (item) => item.selected === item.question.answer
  ).length;


  function startQuiz() {
    setQuestions(shuffleQuestions(questionBank));
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setSecondsLeft(QUIZ_DURATION_SECONDS);
    setStage('quiz');
  }


  function recordAnswer(answer) {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
    }
  }

  
  function advanceQuestion() {
    if (selectedAnswer === null) return;

    const newAnswers = [
      ...answers,
      { question: currentQuestion, selected: selectedAnswer },
    ];

    setAnswers(newAnswers);

    if (currentIndex + 1 === questions.length) {
      setStage('results');
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setSecondsLeft(QUIZ_DURATION_SECONDS);
    }
  }


  useEffect(() => {
    if (stage !== 'quiz' || selectedAnswer !== null) {
      return;
    }

    if (secondsLeft === 0) {
      const newAnswers = [
        ...answers,
        { question: currentQuestion, selected: null },
      ];

      setAnswers(newAnswers);

      if (currentIndex + 1 === questions.length) {
        setStage('results');
      } else {
        setCurrentIndex(currentIndex + 1);
        setSecondsLeft(QUIZ_DURATION_SECONDS);
      }

      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    stage,
    secondsLeft,
    selectedAnswer,
    answers,
    currentQuestion,
    currentIndex,
    questions.length,
  ]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => setStage('start')}
        >
          <span className="brand-mark">.</span>
          <span>quizzy</span>
        </button>

        <div className="header-right">
          <span className="header-status">
            INTERACTIVE LEARNING
          </span>
          <span className="header-label">React</span>
        </div>
      </header>

      {stage === 'start' && (
        <StartScreen
          questionCount={questionBank.length}
          onStart={startQuiz}
        />
      )}

      {stage === 'quiz' && currentQuestion && (
        <main className="quiz-layout">
          <div className="quiz-intro">
            <h1>
              Let's see what
              <br />
              you've got.
            </h1>
            <p>One question at a time.</p>
          </div>

          <QuizProgress
            current={currentIndex + 1}
            total={questions.length}
            score={score}
          />

          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelect={recordAnswer}
            onNext={advanceQuestion}
            isLast={currentIndex === questions.length - 1}
            secondsLeft={secondsLeft}
          />

          <p className="quiz-footer-note">
            Learn at your pace.
          </p>
        </main>
      )}

      {stage === 'results' && (
        <ResultsScreen
          score={score}
          total={questions.length}
          answers={answers}
          onRestart={startQuiz}
        />
      )}

      <footer className="site-footer">
        <span>© 2026 QUIZZY </span>
        <span>LEARNING PROJECT</span>
      </footer>
    </div>
  );
}
