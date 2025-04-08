import React from "react";
import GameBoard from "./components/GameBoard";
import "./styles/index.css";

function App() {
  return (
    <div className="app">
      <h1>Card Matching Game</h1>
      <GameBoard />
    </div>
  );
}

export default App;
