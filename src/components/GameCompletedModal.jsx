import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const GameCompletedModal = ({
  score,
  moves,
  bestScore,
  isNewHighScore,
  onClose,
  onPlayAgain,
}) => {
  const modalRef = useRef();

  // Handle click outside of the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Add escape key listener
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Modal content
  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <div className="modal-header">
          <h2>🎉 Congratulations! 🎉</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          <p className="result-text">
            You completed the game with{" "}
            <span className="highlight">{score}</span> points in{" "}
            <span className="highlight">{moves}</span> moves!
          </p>

          {isNewHighScore && (
            <div className="new-high-score">
              <p>🏆 New High Score! 🏆</p>
              <div className="trophy-animation"></div>
            </div>
          )}

          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-label">Score:</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Moves:</span>
              <span className="stat-value">{moves}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Best Score:</span>
              <span className="stat-value">{bestScore}</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="play-again-btn" onClick={onPlayAgain}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );

  // Use createPortal to render the modal at the body level
  return createPortal(modalContent, document.body);
};

export default GameCompletedModal;
