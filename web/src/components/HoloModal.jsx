import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const HoloModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <motion.div 
      className="holo-backdrop" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="holo-window"
        onClick={(e) => e.stopPropagation()} 
        initial={{ scale: 0.9, rotateX: -30, opacity: 0 }}
        animate={{ scale: 1, rotateX: 0, opacity: 1 }}
        exit={{ scale: 0.8, rotateX: 30, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        style={{ perspective: 1000 }}
      >
        <button 
          className="close-btn" 
          onClick={onClose}
          style={{ top: '5px', right: '10px', fontSize: '2rem' }}
        >
          &times;
        </button>
        
        <div className="holo-grid-bg">
          <div className="d-flex justify-content-between border-bottom border-success mb-4 pb-2 pe-4">
            <h3 className="m-0 text-bright">&gt;&gt; {data.title}</h3>
            <span className="badge border border-success text-success bg-black d-flex align-items-center">
              {data.status}
            </span>
          </div>

          <Row>
            <Col md={8}>
              {/* Rendert entweder Text oder JSX */}
              <div className="text-bright lead">{data.desc}</div>
              
              <div className="mt-4">
                <h6 className="text-dim">TAGS / SKILLS:</h6>
                <div className="d-flex gap-2 flex-wrap">
                  {data.tech && data.tech.map(t => (
                    <span key={t} className="border border-success px-2 py-1 small text-success">
                      [{t}]
                    </span>
                  ))}
                </div>
              </div>
            </Col>
            <Col md={4} className="border-start border-success">
              <h6 className="text-dim">METRICS:</h6>
              {data.stats && Object.entries(data.stats).map(([key, val]) => (
                <div key={key} className="mb-2">
                  <small className="d-block text-success text-uppercase" style={{fontSize: '0.7rem'}}>{key}</small>
                  <span className="h5 text-bright">{val}</span>
                </div>
              ))}
              <div className="mt-4 p-2 bg-success text-black text-center fw-bold blink small">
                DATA_DECRYPTED
              </div>
            </Col>
          </Row>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HoloModal;
