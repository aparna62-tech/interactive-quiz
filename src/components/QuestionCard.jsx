
export default function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
  onNext,
  isLast,
  secondsLeft,
}) {
  const isAnswered = selectedAnswer !== null;

  return (
    <section className="question-card">
      <div className="question-tags">
        <span className="category-tag">{question.category}</span>
        <span className="difficulty-tag">
          {question.difficulty}
        </span>
      </div>

      <div className="question-heading-row">
        <h2>{question.question}</h2>
        <div className="timer">
          ⏱️ 00:{String(secondsLeft).padStart(2, "0")}
        </div>
      </div>

      <p className="choose-hint">
        Choose the correct answer
      </p>

      <div className="answers-list">
        {question.options.map((option, index) => (
          <button
            key={option}
            className={`answer-option ${
              isAnswered && index === question.answer
                ? "correct"
                : isAnswered && index === selectedAnswer
                ? "incorrect"
                : ""
            }`}
            onClick={() => onSelect(index)}
            disabled={isAnswered}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>

            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>

      

      <div className="question-footer">
        <span className="keyboard-hint">
          Take your time. You can do this!
        </span>

        <button
          className="button button-primary"
          onClick={onNext}
          disabled={!isAnswered}
        >
          {isLast ? "See results" : "Next question"} →
        </button>
      </div>
    </section>
  );
}
