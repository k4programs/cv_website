import React, { useState, useEffect } from 'react';
import { BootStep } from '../types';

const bootSteps: BootStep[] = [
  { msg: "INITIALIZING SECURE CORE...", progress: 15, delay: 1000 },
  { msg: "LOADING SYSTEM MODULES...", progress: 25, delay: 800 },
  { msg: "ESTABLISHING NEURAL LINK...", progress: 60, delay: 1500 },
  { msg: "AUTHENTICATING USER CREDENTIALS...", progress: 85, delay: 1000 },
  { msg: "ACCESS GRANTED TO MACCV_NETWORK.", progress: 99, delay: 700 },
  { msg: "WELCOME, OPERATOR.", progress: 100, delay: 500 },
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [typedMessages, setTypedMessages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentTimeout: ReturnType<typeof setTimeout>;
    const executeStep = (stepIndex: number) => {
      if (stepIndex >= bootSteps.length) {
        currentTimeout = setTimeout(onComplete, 1200);
        return;
      }

      const currentStep = bootSteps[stepIndex];
      
      setTypedMessages(prev => [...prev, currentStep.msg]);
      setProgress(currentStep.progress);

      currentTimeout = setTimeout(() => {
        executeStep(stepIndex + 1);
      }, currentStep.delay);
    };

    executeStep(0);

    return () => clearTimeout(currentTimeout);
  }, [onComplete]);

  return (
    <div className="boot-sequence-overlay">
      <div className="terminal-window boot-window">
        <div>
          <div className="terminal-header d-flex justify-content-between align-items-center border-bottom border-success px-2 py-1 mb-2">
            <span className="small text-dim">MACCV_BOOT_PROTOCOL</span>
            <span className="small text-dim">STATUS: RUNNING</span>
          </div>
          <div className="terminal-body font-monospace text-success p-2" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {typedMessages.map((msg, idx) => (
              <div key={idx} className="mb-1" style={{ whiteSpace: 'pre-wrap' }}>
                &gt; {msg}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-center small mt-1 text-dim">
            LOADING... {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootSequence;