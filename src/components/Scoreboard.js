import React from 'react';
import './Scoreboard.css'; // Import the CSS file for styling

const Scoreboard = ({ playerScores, botScores }) => {
  return (
    <div className="scoreboard-container">
      <h3 class='custom-h3'>Scoreboard</h3>
      <table>
        <thead>
          <tr>
            <th>Round</th>
            <th>Player Score</th>
            <th>Bot Score</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(3)].map((_, index) => ( // Create 3 rows initially
            <tr key={index}>
              <td>{index + 1}</td> {/* Round number */}
              <td>{playerScores[index] !== undefined ? playerScores[index] : '-'}</td> {/* Player's score for the round */}
              <td>{botScores[index] !== undefined ? botScores[index] : '-'}</td> {/* Bot's score for the round */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
