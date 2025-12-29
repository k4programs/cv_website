import React, { useState, useEffect } from 'react';

const Typewriter = ({ messages, loop = false, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blinkingCursor, setBlinkingCursor] = useState(true);

  // Typewriter Logik
  useEffect(() => {
    if (index >= messages.length) {
      if (onComplete) onComplete();
      setBlinkingCursor(false);
      return;
    }

    if (subIndex === messages[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000); // Pause am Ende des Satzes
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      if (loop) {
        setIndex((prev) => (prev + 1) % messages.length);
      } else {
        setIndex((prev) => prev + 1);
      }
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 70); // Rückwärts schneller löschen

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, messages, loop, onComplete]);

  // Cursor blinking
  useEffect(() => {
    const cursorTimeout = setInterval(() => {
      setBlinkingCursor(prev => !prev);
    }, 500); // Blink every 500ms
    return () => clearInterval(cursorTimeout);
  }, []);

  return (
    <span className="font-monospace">
      {messages[index]?.substring(0, subIndex)}
      {blinkingCursor && <span className="blink">_</span>}
    </span>
  );
};

export default Typewriter;