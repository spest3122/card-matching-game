import React from "react";

const ScorePanel = ({
  score,
  moves,
  bestScore,
  onNewGame,
  gameCompleted,
  consecutiveMatches,
}) => {
  return (
    <div className="score-panel">
      <div className="score-info">
        <div className="score-item">
          <span className="score-label">Score</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Moves</span>
          <span className="score-value">{moves}</span>
        </div>
        {bestScore > 0 && (
          <div className="score-item">
            <span className="score-label">Best Score</span>
            <span className="score-value">{bestScore}</span>
          </div>
        )}
        {consecutiveMatches > 0 && (
          <div className="score-item streak">
            <span className="score-label">Streak</span>
            <span className="score-value">{consecutiveMatches}🔥</span>
          </div>
        )}
      </div>

      <button className="new-game-btn" onClick={onNewGame}>
        {gameCompleted ? "Play Again" : "New Game"}
      </button>
    </div>
  );
};

export default ScorePanel;
