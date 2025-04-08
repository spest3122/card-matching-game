import React from "react";

const Card = ({ card, onClick, isFlipped }) => {
  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          {/* Card back - question mark */}
          <span>?</span>
        </div>
        <div className="card-back">
          {/* Card face - emoji or value */}
          <span className="card-value">{card.value}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
