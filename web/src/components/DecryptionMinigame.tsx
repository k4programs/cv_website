import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';

const generateSequence = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

interface DecryptionMinigameProps {
  onSuccess: () => void;
}

type GameStatus = 'instructions' | 'pending' | 'showing' | 'playing' | 'failed';

const DecryptionMinigame: React.FC<DecryptionMinigameProps> = ({ onSuccess }) => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<GameStatus>('instructions');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === 'pending' || status === 'failed') {
      const newSequence = generateSequence(level + 3);
      setSequence(newSequence);
      setStatus('showing');
      setTimeout(() => {
        setStatus('playing');
        setUserInput('');
        inputRef.current?.focus();
      }, 2000 + level * 500); // Show sequence for longer at higher levels
    }
  }, [status, level]);

  useEffect(() => {
    if (status === 'playing' && userInput.length > 0) {
      if (!sequence.startsWith(userInput)) {
        setStatus('failed');
        setLevel(1); // Reset to level 1 on failure
      } else if (userInput === sequence) {
        if (level >= 3) {
          onSuccess();
        } else {
          setLevel(prev => prev + 1);
          setStatus('pending');
        }
      }
    }
  }, [userInput, sequence, status, level, onSuccess]);

  let content;
  if (status === 'instructions') {
    content = <div className="text-center">
      <h4 className="text-bright">SYSTEM ENCRYPTED</h4>
      <p className="text-dim mt-3">To decrypt the system, complete the memory sequence challenge or use the master bypass key.</p>
      <hr className="border-success" />
      <div className="d-flex justify-content-center gap-2 mt-3">
        <Button variant="outline-success" size="sm" className="rounded-0" onClick={() => setStatus('pending')}>
          &gt; BEGIN CHALLENGE
        </Button>
        <Button variant="outline-danger" size="sm" className="rounded-0" onClick={onSuccess}>
          &gt; USE MASTER DECRYPT_KEY
        </Button>
      </div>
    </div>;
  } else if (status === 'showing') {
    content = <div className="text-center">
      <p className="text-dim">MEMORIZE SEQUENCE:</p>
      <h2 className="display-4 font-monospace">{sequence}</h2>
    </div>;
  } else if (status === 'playing') {
    content = <div className="text-center">
      <p className="text-dim">INPUT SEQUENCE:</p>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value.toUpperCase())}
        className="bg-transparent border-bottom border-success text-success text-center display-4 font-monospace"
        style={{ outline: 'none', width: '100%' }}
        autoFocus
      />
    </div>;
  } else if (status === 'failed') {
    content = <div className="text-center">
      <p className="text-danger">SEQUENCE MISMATCH. RE-INITIALIZING...</p>
    </div>;
  } else {
    content = <div className="text-center"><p className="text-dim">PREPARING NEXT SEQUENCE...</p></div>;
  }

  return (
    <div className="minigame-overlay">
      <div className="terminal-window" style={{ maxWidth: '600px' }}>
        <div className="terminal-header d-flex justify-content-between align-items-center border-bottom border-success px-2 py-1 mb-2">
          <span className="small text-dim">DECRYPTION_MINIGAME</span>
          <span className="small text-dim">LEVEL: {status === 'instructions' ? '-' : `${level}/3`}</span>
        </div>
        <div className="terminal-body p-4 d-flex align-items-center justify-content-center" style={{minHeight: '200px'}}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default DecryptionMinigame;