import React, { useEffect, useState } from 'react';
import './GameBoard.css'; // Import the CSS file for styling
import Scoreboard from './Scoreboard';
import RoundCounter from './RoundCounter';

const GameBoard = ({
  diceValues,
  selectedDice,
  rollDice,
  handleDiceClick,
  handlePlayerTurn,
  rerollsLeft,
  rerollDice,
  isPlayerTurn,
  botTurnInProgress,
  playerScores,
  botScores,
  currentRound,
}) => {
  const [isRolling, setIsRolling] = useState(false);
  const [rotationValues, setRotationValues] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    rollDice();
  }, []);

  const getRandomRotation = () => {
    const randomX = Math.floor(Math.random() * 360);
    const randomY = Math.floor(Math.random() * 360);
    const randomZ = Math.floor(Math.random() * 360);
    return { x: randomX, y: randomY, z: randomZ };
  };

  const handleRollAnimation = () => {
    setIsRolling(true);
    const randomRotation = getRandomRotation();
    setRotationValues(randomRotation);
    setTimeout(() => setIsRolling(false), 1000);
  };

  const renderDots = (value) => {
    // Define the positions of dots for each dice face
    const dotPositions = {
      1: ['middle-center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'middle-center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: [
        'top-left',
        'top-right',
        'middle-center',
        'bottom-left',
        'bottom-right',
      ],
      6: [
        'top-left',
        'top-right',
        'middle-left',
        'middle-right',
        'bottom-left',
        'bottom-right',
      ],
    };

    return dotPositions[value].map((position, index) => (
      <div key={index} className={`dot dot-${position}`} />
    ));
  };

  return (
    <div className='background-container'>
      <div className='game-title'>Yahtzee Lite</div>
      <div className='game-board'>
        <div className='play-zone'>
          <RoundCounter currentRound={currentRound} />
          {diceValues.map(
            (value, index) =>
              !selectedDice.includes(index) && (
                <div
                  key={`rest-${value}-${index}`}
                  onClick={() => handleDiceClick(index)}
                  className={`die-${value} animated-die ${
                    isRolling ? 'roll-animation' : ''
                  }`}
                  style={{
                    transform: isRolling
                      ? `rotateX(${rotationValues.x}deg) rotateY(${rotationValues.y}deg) rotateZ(${rotationValues.z}deg)`
                      : null,
                    transitionDuration: isRolling ? '1s' : '0s',
                  }}
                >
                  <div className='dice-face'>
                    {renderDots(value)}{' '}
                    {/* Render dots based on the dice value */}
                  </div>
                </div>
              )
          )}
        </div>
        <div className='rest-zone'>
          {selectedDice.map((index) => (
            <button
              key={`play-${diceValues[index]}-${index}`}
              onClick={() => handleDiceClick(index)}
              className={`die-${diceValues[index]} animated-die selected`}
            >
              <div className='dice-face'>
                {renderDots(diceValues[index])}{' '}
                {/* Render dots based on the dice value */}
              </div>
            </button>
          ))}
        </div>
        <div className='button-container'>
          <button
            onClick={() => {
              handleRollAnimation();
              rerollDice();
            }}
            disabled={rerollsLeft <= 0 || isPlayerTurn || botTurnInProgress}
          >
            Roll Dice ({rerollsLeft} left)
          </button>
          <button
            onClick={handlePlayerTurn}
            disabled={isPlayerTurn || botTurnInProgress}
          >
            End Turn
          </button>
        </div>
        <div className='scoreboard-container'>
          <Scoreboard playerScores={playerScores} botScores={botScores} />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
