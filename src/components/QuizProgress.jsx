
export default function QuizProgress({ current, total, score }) {
  
  const percentage = (current / total) * 100;

  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <span>
          Question {current} / {total}
        </span>

        <span className="score-chip">
          ⭐ {score} points
        </span>
      </div>

     
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: percentage + "%" }}
        ></div>
      </div>
    </div>
  );
}
