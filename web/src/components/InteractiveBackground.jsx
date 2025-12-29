import React from 'react';
import { motion } from 'framer-motion';

const InteractiveBackground = () => {
  return (
    <div className="interactive-bg-container">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-particle"
          initial={{ 
            opacity: 0, 
            scale: Math.random() * 0.5 + 0.5, 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{
            opacity: [0, Math.random() * 0.5 + 0.1, 0],
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveBackground;
