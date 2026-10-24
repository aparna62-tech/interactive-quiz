
export default function StartScreen({ questionCount, onStart }) {
  return (
    <main className="start-layout">
      <div className="hero-copy">
        <h1>
          Welcome to Quizzy!
        </h1>

        <p>
          Test your knowledge of React, JavaScript,
          HTML, and CSS.
        </p>

        <div className="hero-actions">
          <button
            className="button button-primary button-large"
            onClick={onStart}
          >
            Start Quiz
          </button>
        </div>

        <div className="mini-stats">
          <div>
            <strong>{questionCount}</strong>
            <span>Questions</span>
          </div>

          <div>
            <strong>20 sec</strong>
            <span>Per Question</span>
          </div>

          <div>
            <strong>3</strong>
            <span>Topics</span>
          </div>
        </div>
      </div>
    </main>
  );
}
