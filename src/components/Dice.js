// Dice.js
import React from 'react';
import './Dice.css'; // Import the CSS file for styling

const Dice = ({ dice }) => {
  return (
    <div className="dice-container">
      {dice.map((value, index) => (
        <div key={index} className={`die-${value} animated-die`}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default Dice;
