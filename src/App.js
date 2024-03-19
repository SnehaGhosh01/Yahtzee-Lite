import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import EndGameModal from './components/EndGameModal';
import {
  checkFullHouse,
  checkSmallStraight,
  checkFullStraight,
} from './components/Utils';

const App = () => {
  const [diceValues, setDiceValues] = useState([]);
  const [selectedDice, setSelectedDice] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerScores, setPlayerScores] = useState([]);
  const [botScore, setBotScore] = useState(0);
  const [botScores, setBotScores] = useState([]); // Initialize botScores state
  const [currentRound, setCurrentRound] = useState(1);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [rerollsLeft, setRerollsLeft] = useState(3); // Track number of rerolls left
  const [botTurnInProgress, setBotTurnInProgress] = useState(false);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [roundScore, setRoundScore] = useState(false);
  const [currentPlayerScores, setCurrentPlayerScores] = useState([]);
  const [botCurrentScores, setBotCurrentScores] = useState([]);
  const [endgame, setEndgame] = useState(false);
  useEffect(() => {
    // Reset rerolls left at the start of each round
    setRerollsLeft(2);
  }, [currentRound]);

  const rollDice = () => {
    const newDiceValues = Array.from(
      { length: 5 },
      () => Math.floor(Math.random() * 6) + 1
    );
    setDiceValues(newDiceValues);
  };

  const handleDiceClick = (index) => {
    setSelectedDice((prevSelectedDice) => {
      const isSelected = prevSelectedDice.includes(index);
      if (isSelected) {
        // If the clicked dice is already selected, remove it
        return prevSelectedDice.filter((item) => item !== index);
      } else {
        // If the clicked dice is not selected, select it
        return [...prevSelectedDice, index];
      }
    });
  };

  const calculateScore = (diceValues) => {
    console.log('Calculating score for dice values:', diceValues);

    if (checkFullStraight(diceValues)) {
      console.log('Full Straight detected');
      return 40; // Score for Full Straight
    } else if (checkSmallStraight(diceValues)) {
      console.log('Small Straight detected');
      return 30; // Score for Small Straight
    } else if (checkFullHouse(diceValues)) {
      console.log('Full House detected');
      return 25; // Score for Full House
    }

    console.log('No scoring combination detected');
    return 0; // No scoring combination
  };

  const handlePlayerTurn = () => {
    // Calculate player's score for the current turn
    rerollDice();
    const playerScoreThisTurn = calculateScore(diceValues);

    // Log player's score for the current turn
    console.log("Player's score this turn:", playerScoreThisTurn);

    setRoundScore(playerScoreThisTurn); // Set roundScore=playerScoreThisTurn;
    // Update the player's total score
    const newPlayerScore = playerScore + playerScoreThisTurn;
    setPlayerScore(newPlayerScore);
    setCurrentPlayerScores([...currentPlayerScores, playerScoreThisTurn]);
    // Update player scores array with the new score
    setPlayerScores([...playerScores, newPlayerScore]);

    // Check if game is over
    const isGameOver = checkGameOver();

    // Reset selectedDice after player's turn
    setSelectedDice([]);

    // If the game is not over, increment the round counter
    if (!isGameOver) {
      // Update isPlayerTurn state
      setIsPlayerTurn(false); // Switch to bot's turn
      setBotTurnInProgress(true); // Set bot turn in progress
      setCurrentRound((currentRound) => currentRound + 1);
      // Trigger bot's turn
      setTimeout(() => {
        handleBotTurn();
      }, 1000); // Adjust delay as needed
    }
  };

  const handleBotTurn = () => {
    rollDice(); // Roll the dice for the bot's turn
    const newDiceValues = diceValues.map(
      () => Math.floor(Math.random() * 6) + 1
    );
    console.log("Bot's roll:", newDiceValues);

    setTimeout(() => {
      // Check for immediate scoring combinations after the first roll
      const initialScore = calculateScore(newDiceValues);
      console.log("Bot's score after first roll:", initialScore);

      // If there's an immediate scoring combination, keep those dice and end the turn
      if (initialScore > 0) {
        console.log('Bot scored on the first roll. Keeping the dice.');
        const newBotScore = botScore + initialScore;
        setBotScore(newBotScore);
        setBotCurrentScores([...botCurrentScores, initialScore]);
        setBotScores([...botScores, newBotScore]);
        setBotTurnInProgress(false);
        return;
      }

      // If no immediate scoring combination, proceed with selecting dice for reroll
      let selectedIndices = [];
      let rerollCount = 0;
      let rollCount = 0;
      let score = 0;
      while (score === 0 && rollCount < 2) {
        // Check for consecutive dice values and select them
        for (let i = 0; i < newDiceValues.length - 1; i++) {
          if (newDiceValues[i] + 1 === newDiceValues[i + 1]) {
            selectedIndices.push(i, i + 1);
            rerollCount += 3; // Rerolling the remaining dice
            break; // Only select the first consecutive pair found
          }
        }

        // If no consecutive dice, select the same two dice if available
        if (selectedIndices.length === 0) {
          for (let i = 0; i < newDiceValues.length - 1; i++) {
            if (newDiceValues[i] === newDiceValues[i + 1]) {
              selectedIndices.push(i, i + 1);
              rerollCount += 3; // Rerolling the remaining dice
              break; // Only select the first pair found
            }
          }
        }

        // If no consecutive or same dice pair, select the first two dice
        if (selectedIndices.length === 0) {
          selectedIndices = [0, 1];
          rerollCount = 3; // Rerolling the remaining dice
        }

        // Apply the selected action
        const newSelectedDice = selectedIndices;

        // Reroll unselected dice
        const newDiceValuesAfterReroll = newDiceValues.map((value, index) => {
          if (!newSelectedDice.includes(index)) {
            return Math.floor(Math.random() * 6) + 1; // Reroll the unselected dice
          }
          return value; // Keep the selected dice value
        });
        rollCount++;
        score = calculateScore(newDiceValuesAfterReroll);
        console.log("Bot's score after reroll:", score);
      }

      // Calculate bot's score for the current turn
      const botScoreThisTurn = score;
      console.log("Bot's score this turn:", botScoreThisTurn);

      // Update bot's total score
      const newBotScore = botScore + botScoreThisTurn;
      setBotCurrentScores([...botCurrentScores, botScoreThisTurn]);
      setBotScore(newBotScore);
      setBotScores([...botScores, newBotScore]);
      setRoundScore(botScoreThisTurn);

      // After bot's turn is complete, set bot turn in progress to false
      setBotTurnInProgress(false);
    }, 5000); // Adjust delay as needed
  };

  useEffect(() => {
    // Check if game is over after current round is updated
    if (!isPlayerTurn && !botTurnInProgress) {
      // Increment the round
      console.log('Current round of bot:', currentRound); // Here you should see the updated round
      const isGameOver = checkGameOver();
      if (!isGameOver) {
        setIsPlayerTurn(true);
        setCurrentRound((prevRound) => prevRound + 1); // Switch to player's turn after bot's turn is complete
        rerollDice();
      }
    }
  }, [isPlayerTurn, botTurnInProgress]);

  const rerollDice = () => {
    // Check if rerolls are available
    if (rerollsLeft > 0) {
      const newDiceValues = diceValues.map((value, index) => {
        if (selectedDice.includes(index)) {
          // Keep the selected dice value
          return value;
        } else {
          // Reroll the unselected dice
          return Math.floor(Math.random() * 6) + 1;
        }
      });

      setDiceValues(newDiceValues);
      setRerollsLeft((prevRerollsLeft) => prevRerollsLeft - 1); // Decrement rerolls left
    }
  };

  const checkGameOver = () => {
    console.log(currentRound);
    if (currentRound >= 6) {
      setGameOver(true);
      // Determine the winner based on scores
      const winner =
        playerScore > botScore
          ? 'Player'
          : playerScore < botScore
          ? 'Bot'
          : 'Draw';
      setShowEndGameModal(true); // Show the end game modal
      setEndgame(true);
      return true; // Game is over
    }
    return false; // Game is not over
  };

  return (
    <div>
      <GameBoard
        diceValues={diceValues}
        selectedDice={selectedDice}
        rollDice={rollDice}
        handleDiceClick={handleDiceClick}
        handlePlayerTurn={handlePlayerTurn}
        rerollsLeft={rerollsLeft}
        rerollDice={rerollDice}
        botTurnInProgress={!isPlayerTurn || botTurnInProgress} // Disable buttons during bot's turn
        playerScores={playerScores}
        botScores={botScores}
        currentRound={currentRound}
        roundScore={roundScore}
        currentPlayerScores={currentPlayerScores} // Pass the score of the current round
        botCurrentScores={botCurrentScores}
        endgame={endgame} // Pass the score of the current round
        resetGame={() => {
          setPlayerScore(0);
          setBotScore(0);
          setCurrentRound(1);
          setPlayerScores([]);
          setBotScores([]);
          setBotCurrentScores([]);
          setCurrentPlayerScores([]);
          setGameOver(false);
          setShowEndGameModal(false); // Close the end game modal
          setIsPlayerTurn(true); // Ensure player's turn is set to true
          setRoundScore(0);
          setEndgame(false);
        }}
      />
      {showEndGameModal && (
        <EndGameModal
          playerScore={playerScore}
          botScore={botScore}
          resetGame={() => {
            setPlayerScore(0);
            setBotScore(0);
            setCurrentRound(1);
            setPlayerScores([]);
            setBotScores([]);
            setBotCurrentScores([]);
            setCurrentPlayerScores([]);
            setGameOver(false);
            setShowEndGameModal(false); // Close the end game modal
            setIsPlayerTurn(true); // Ensure player's turn is set to true
            setRoundScore(0);
            setEndgame(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
