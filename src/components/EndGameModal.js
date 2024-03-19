import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './EndGameModal.css';

const EndGameModal = ({ playerScore, botScore, resetGame }) => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };
  const winner =
    playerScore > botScore ? 'Player' : playerScore < botScore ? 'Bot' : 'Draw';

  return (
    showModal && (
      <div className='modal-overlay'>
        <div className='modal-content'>
          <div className='emoji trophy-emoji'>🏆</div>
          <div className='winner'>
            <h1>Winner: {winner}</h1>
          </div>
          <div className='score-card'>
            <div>
              <h2>Player</h2>
              <h2>{playerScore}</h2>
              {winner === 'Player' && (
                <div className='emoji celebration-emoji'>🎉</div>
              )}
              {winner === 'Bot' && <div className='emoji sad-emoji'>😢</div>}
              {winner === 'Draw' && (
                <div className='emoji neutral-emoji'>😐</div>
              )}
            </div>
            <div>
              <h2>Bot</h2>
              <h2>{botScore}</h2>
              {winner === 'Player' && <div className='emoji sad-emoji'>😢</div>}
              {winner === 'Bot' && (
                <div className='emoji celebration-emoji'>🎉</div>
              )}
              {winner === 'Draw' && (
                <div className='emoji neutral-emoji'>😐</div>
              )}
            </div>
          </div>
          <Button
            variant='contained'
            onClick={resetGame}
            className='mui-button'
          >
            Play Again
          </Button>
          <Button
            variant='contained'
            onClick={closeModal}
            className='mui-button'
          >
            Close
          </Button>
        </div>
      </div>
    )
  );
};

export default EndGameModal;
