import React from "react";
import "./LiveScore.css";
const LiveScore = ({ roundScore, currentRound }) => {
    console.log(roundScore, currentRound);
  const currentPlayer = currentRound % 2 === 1 ? "Player" : "Bot";
  
  const determineCombinationType = () => {
    if (roundScore === 30) {
      return "Small Straight";
    } else if (roundScore === 40) {
      return "Full Straight";
    } else if (roundScore === 25) {
      return "Full House";
    } else {
      return "No Combination";
    }
  };

  const combinationType = determineCombinationType();
  
  return (
    <div className="live-score-container">
      <h3 class="custom-h3">Live Score : {currentPlayer} is Playing...</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Full House</td>
            <td>{combinationType === "Full House" ? "✔️" : ""}</td>
          </tr>
          <tr>
            <td>Full Straight</td>
            <td>{combinationType === "Full Straight" ? "✔️" : ""}</td>
          </tr>
          <tr>
            <td>Small Straight</td>
            <td>{combinationType === "Small Straight" ? "✔️" : ""}</td>
          </tr>
          <tr>
            <td>No Combination</td>
            <td>{combinationType === "No Combination" ? "✔️" : ""}</td>
          </tr>
        </tbody>
      </table>
      {/* <p>{currentPlayer}'s Turn</p> */}
    </div>
  );
};

export default LiveScore;
