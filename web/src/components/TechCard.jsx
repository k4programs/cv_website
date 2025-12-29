import React from 'react';
import { motion } from 'framer-motion';

const TechCard = ({ children, delay = 0, title, onClick, interactive = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
    className="h-100"
    onClick={onClick}
    style={{ cursor: interactive ? 'pointer' : 'default' }}
    whileHover={interactive ? { scale: 1.02, translateY: -5 } : {}}
  >
    <div className={`tech-card mb-4 d-flex flex-column ${interactive ? 'glitch-hover' : ''}`}>
      <div className="corner-tl"></div>
      <div className="corner-tr"></div>
      <div className="corner-bl"></div>
      <div className="corner-br"></div>
      
      {title && <h5 className="border-bottom border-success pb-2 mb-3 text-dim">&gt; {title}</h5>}
      <div className="flex-grow-1">{children}</div>
    </div>
  </motion.div>
);

export default TechCard;
