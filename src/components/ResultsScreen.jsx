
export default function ResultsScreen({ score, total, answers, onRestart }) {
  const percentage = Math.round((score / total) * 100);

  let message = "Keep going!";
  let emoji = "🚀";

  if (percentage >= 80) {
    message = "Brilliant work!";
    emoji = "🏆";
  } else if (percentage >= 50) {
    message = "You are getting there!";
    emoji = "🌟";
  }

  return (
    <main className="results-layout">
      <div className="results-icon">{emoji}</div>

      <p className="eyebrow centered">QUIZ COMPLETE</p>

      <h1 className="results-title">{message}</h1>

      <div className="results-score-card">
        <h2>Your Final Score</h2>
        <h1>{score} / {total}</h1>
        <p>Percentage: {percentage}%</p>
      </div>

      <div className="results-breakdown">
        <p>Correct answers: {score}</p>
        <p>Incorrect or skipped: {total - score}</p>
      </div>

      <button
        className="button button-primary button-large restart-button"
        onClick={onRestart}
      >
        Start Again 🔄
      </button>

      <details className="review-panel">
        <summary>Review Your Answers</summary>

        <div className="review-list">
          {answers.map((item, index) => (
            <div className="review-item" key={item.question.id}>
              <h3>
                Question {index + 1}: {item.question.category}
              </h3>

              <p>{item.question.question}</p>

              <p>
                Your answer:{" "}
                {item.selected === null
                  ? "Not answered"
                  : item.question.options[item.selected]}
              </p>

              <p>
                Correct answer:{" "}
                {item.question.options[item.question.answer]}
              </p>

          
            </div>
          ))}
        </div>
      </details>
    </main>
  );
}
