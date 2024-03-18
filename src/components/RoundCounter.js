import React from 'react';
import './RoundCounter.css';
const RoundCounter = ({ currentRound }) => {
  return (
    <div class="round-counter">
      <h3 class="h3">Round Counter</h3>
      <p>Current Round: {currentRound} / 6</p>
    </div>
  );
};

export default RoundCounter;