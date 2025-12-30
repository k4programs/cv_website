import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Form, ProgressBar } from 'react-bootstrap';
import useSoundEffects from '../hooks/useSoundEffects';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'IDLE' | 'ENCRYPTING' | 'TRANSMITTING' | 'SENT'>('IDLE');
  const [progress, setProgress] = useState(0);
  const playSound = useSoundEffects();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Start Simulation Sequence
    playSound('hover'); // Click sound
    setStatus('ENCRYPTING');
    
    // Simulate Encryption Progress
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 10;
      if (p > 100) {
        p = 100;
        clearInterval(interval);
        setStatus('TRANSMITTING');
        
        // Simulate Network Delay
        setTimeout(() => {
          setStatus('SENT');
          playSound('access_granted');
          console.log("SECURE TRANSMISSION PAYLOAD:", formState);
          // Here you would implement EmailJS or similar
        }, 800);
      }
      setProgress(p);
    }, 100);
  };

  return (
    <motion.div 
      className="holo-backdrop" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="holo-window p-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px', width: '90%' }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-success pb-2">
          <h4 className="m-0 text-bright">&gt; SECURE_UPLINK</h4>
          <button onClick={onClose} className="btn btn-link text-success p-0" style={{textDecoration: 'none'}}>X</button>
        </div>

        {status === 'SENT' ? (
          <div className="text-center py-5">
            <h1 className="text-success mb-3"><i className="bi bi-check-circle"></i></h1>
            <h5 className="text-bright">TRANSMISSION COMPLETE</h5>
            <p className="text-dim">Your packet has been encrypted and delivered to the mainframe.</p>
            <Button variant="outline-success" onClick={onClose} className="rounded-0 mt-3">
              [ CLOSE_CONNECTION ]
            </Button>
          </div>
        ) : status === 'IDLE' ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-dim small">IDENTITY (NAME)</Form.Label>
              <Form.Control 
                type="text" 
                className="bg-transparent border-success text-bright rounded-0"
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-dim small">RETURN_ADDRESS (EMAIL)</Form.Label>
              <Form.Control 
                type="email" 
                className="bg-transparent border-success text-bright rounded-0"
                value={formState.email}
                onChange={e => setFormState({...formState, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="text-dim small">PAYLOAD (MESSAGE)</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                className="bg-transparent border-success text-bright rounded-0"
                value={formState.message}
                onChange={e => setFormState({...formState, message: e.target.value})}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
               <Button type="submit" variant="success" className="rounded-0 w-100 fw-bold">
                 &gt; INITIATE_TRANSMISSION
               </Button>
            </div>
          </Form>
        ) : (
          <div className="py-5">
            <p className="text-dim font-monospace mb-2">
              {status === 'ENCRYPTING' ? `ENCRYPTING_PACKETS... ${(progress).toFixed(0)}%` : 'UPLOADING_TO_SATELLITE...'}
            </p>
            <ProgressBar animated now={progress} variant="success" style={{height: '20px', backgroundColor: '#001100'}} />
            <div className="mt-2 text-end small text-success blink">
               AES-256 PROCESSING
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;