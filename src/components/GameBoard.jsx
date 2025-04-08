import React, { useState, useEffect } from "react";
import Card from "./Card";
import { shuffleCards } from "../utils/gameLogic";
import ScorePanel from "./ScorePanel";
import GameCompletedModal from "./GameCompletedModal";

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(
    parseInt(localStorage.getItem("bestScore")) || 0
  );
  const [gameCompleted, setGameCompleted] = useState(false);
  const [consecutiveMatches, setConsecutiveMatches] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    // Check if all cards are matched
    if (matchedCards.length > 0 && matchedCards.length === cards.length) {
      setGameCompleted(true);

      // Update best score (highest score is better)
      if (bestScore < score) {
        setBestScore(score);
        localStorage.setItem("bestScore", score.toString());
      }

      // Show the modal
      setShowModal(true);
    }
  }, [matchedCards, cards.length, score, bestScore]);

  const startNewGame = () => {
    const initialCards = shuffleCards();
    setCards(initialCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setScore(0);
    setConsecutiveMatches(0);
    setGameCompleted(false);
    setShowModal(false);
  };

  const handleCardClick = (card) => {
    // Prevent clicking if two cards are already flipped or the card is already matched
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(card) &&
      !matchedCards.includes(card)
    ) {
      setFlippedCards((prev) => [...prev, card]);

      if (flippedCards.length === 1) {
        setMoves((prev) => prev + 1);
        checkForMatch(card);
      }
    }
  };

  const checkForMatch = (card) => {
    const [firstCard] = flippedCards;

    // Set a timeout to ensure the second card is visible before processing
    setTimeout(() => {
      // Check if the matchId is the same, but the id is different (different cards with same value)
      if (firstCard.matchId === card.matchId && firstCard.id !== card.id) {
        // It's a match!
        setMatchedCards((prev) => [...prev, firstCard, card]);

        // Increment consecutive matches
        const newConsecutiveMatches = consecutiveMatches + 1;
        setConsecutiveMatches(newConsecutiveMatches);

        // Award points based on consecutive matches (bonus for streaks)
        const pointsToAdd = 1 + Math.floor(newConsecutiveMatches / 3);
        setScore((prev) => prev + pointsToAdd);
      } else {
        // Not a match - decrease score but don't go below 0
        setScore((prev) => Math.max(0, prev - 1));
        // Reset consecutive matches
        setConsecutiveMatches(0);
      }

      // Clear flipped cards
      setFlippedCards([]);
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="game-container">
      <ScorePanel
        score={score}
        moves={moves}
        bestScore={bestScore}
        onNewGame={startNewGame}
        gameCompleted={gameCompleted}
        consecutiveMatches={consecutiveMatches}
      />

      <div className="game-board">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
            isFlipped={
              flippedCards.includes(card) || matchedCards.includes(card)
            }
          />
        ))}
      </div>

      {showModal && (
        <GameCompletedModal
          score={score}
          moves={moves}
          bestScore={bestScore}
          isNewHighScore={bestScore === score}
          onClose={closeModal}
          onPlayAgain={startNewGame}
        />
      )}
    </div>
  );
};

export default GameBoard;
