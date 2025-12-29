import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import HoloModal from './components/HoloModal';
import TechCard from './components/TechCard';
import Typewriter from './components/Typewriter';
import Terminal from './components/Terminal';
import BootSequence from './components/BootSequence';
import InteractiveBackground from './components/InteractiveBackground';
import DecryptionMinigame from './components/DecryptionMinigame';

// Data
import { PROJECTS_DATA, ABOUT_DATA, HISTORY_DATA } from './data/database';

const useRandomInterval = (callback, minDelay, maxDelay) => {
  useEffect(() => {
    let timeout;
    const tick = () => {
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      callback();
      timeout = setTimeout(tick, delay);
    };
    timeout = setTimeout(tick, Math.random() * (maxDelay - minDelay) + minDelay);
    return () => clearTimeout(timeout);
  }, [callback, minDelay, maxDelay]);
};

function App() {
  const [modalData, setModalData] = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [isEncrypted, setIsEncrypted] = useState(true);

  // System Status State
  const [cpuLoad, setCpuLoad] = useState(40);
  const [memLoad, setMemLoad] = useState(60);
  const [uplink, setUplink] = useState(128);
  const [downlink, setDownlink] = useState(1024);

  const updateCpu = useCallback(() => setCpuLoad(Math.random() * 80 + 10), []);
  const updateMem = useCallback(() => setMemLoad(Math.random() * 70 + 20), []);
  const updateUplink = useCallback(() => setUplink(Math.random() * 200 + 50), []);
  const updateDownlink = useCallback(() => setDownlink(Math.random() * 1000 + 200), []);

  useRandomInterval(updateCpu, 1000, 3000);
  useRandomInterval(updateMem, 1500, 4000);
  useRandomInterval(updateUplink, 500, 2000);
  useRandomInterval(updateDownlink, 800, 2500);

  const processes = [
    'sentinel.sys        [RUNNING]',
    'core_integrity.bin  [OK]',
    'firewall_daemon     [ACTIVE]',
    'neural_link.proc    [STABLE]',
    'defrag.exe          [IDLE]',
  ];

  const handleBootComplete = useCallback(() => {
    setShowBootSequence(false);
  }, []);
  
  const handleInitiateContact = () => {
    console.log("Initiating contact...");
    window.location.href = "mailto:max.mustermann@example.com?subject=MacCV_Contact&body=Hello Max, I'm interested in your profile...";
  };
  
  const handleDecryptResume = () => {
    console.log("Attempting to decrypt and open resume PDF...");
    window.open('/resume', '_blank'); 
  };
  
  const handleDecrypt = () => {
    setIsEncrypted(false);
  };

  const systemMessages = [
    "SYSTEM.INIT: SENIOR ARCHITECT // CLEARANCE: LEVEL 5",
    "STATUS: ONLINE // ENCRYPTION: AES-256-ACTIVE",
    "LOCATION: BERLIN_NODE_01 // UPTIME: 100%",
    "SCANNING_FOR_THREATS... NO_THREATS_FOUND",
    "CONNECTED_TO_MAINFRAME... ACCESS_GRANTED"
  ];

  if (showBootSequence) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  if (isEncrypted) {
    return <DecryptionMinigame onSuccess={handleDecrypt} />;
  }

  return (
    <div className="min-vh-100 py-4 position-relative">
      <InteractiveBackground />
      <div className="scanlines"></div>
      <div className="glow-overlay"></div>
      
      <AnimatePresence>
        {modalData && (
          <HoloModal data={modalData} onClose={() => setModalData(null)} />
        )}
      </AnimatePresence>

      {showTerminal && (
        <Terminal 
          onClose={() => setShowTerminal(false)} 
          onOpenProject={(proj) => setModalData(proj)}
        />
      )}

      <Container style={{ position: 'relative', zIndex: 10 }}>
        <Row className="mb-4 align-items-center">
          <Col md={3} className="text-center text-md-start">
             <motion.img 
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              src="https://i.pravatar.cc/150?u=max" 
              className="rounded-0 border border-success p-1"
              style={{ width: '120px', height: '120px', filter: 'grayscale(100%) contrast(120%)' }}
            />
          </Col>
          <Col md={9}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="display-4 fw-bold glitch-hover">MAX MUSTERMANN</h1>
              <p className="lead text-bright font-monospace">
                <Typewriter messages={systemMessages} loop={true} />
              </p>
              <div className="d-flex gap-2 flex-wrap align-items-center">
                 <Button 
                    variant="outline-success" 
                    size="sm" 
                    className="rounded-0"
                    onClick={() => setShowTerminal(true)}
                 >
                    &gt; TERMINAL_ACCESS [CTRL+K]
                 </Button>
                 <Button 
                    variant="success" 
                    size="sm" 
                    className="rounded-0 blink" 
                    onClick={handleDecryptResume}
                 >
                    &gt; DECRYPT_FULL_PROFILE.PDF
                 </Button>
                 <Button 
                    variant="outline-info" 
                    size="sm" 
                    className="rounded-0"
                    onClick={handleInitiateContact}
                 >
                    &gt; INITIATE_CONTACT
                 </Button>
                 <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-0">
                    <i className="bi bi-github"></i>
                 </a>
                 <a href="https://linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-0">
                    <i className="bi bi-linkedin"></i>
                 </a>
              </div>
            </motion.div>
          </Col>
        </Row>
        
        <Row>
          <Col lg={4}>
            <TechCard 
              title="ABOUT_ME" 
              delay={0.2} 
              interactive={true}
              onClick={() => setModalData(ABOUT_DATA)}
            >
              <p className="text-bright small">
                Leidenschaftlicher Full-Stack Entwickler mit Fokus auf High-Performance Architekturen. 
                <span className="text-success d-block mt-2">[CLICK_TO_EXPAND]</span>
              </p>
              <hr className="border-success" />
              <div className="mb-3">
                <div className="d-flex justify-content-between text-dim mb-1"><small>CYBER_SECURITY</small> <small>99%</small></div>
                <ProgressBar variant="success" now={99} style={{ height: '5px', backgroundColor: '#003300' }} />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between text-dim mb-1"><small>SYSTEM_ARCH</small> <small>95%</small></div>
                <ProgressBar variant="success" now={95} style={{ height: '5px', backgroundColor: '#003300' }} />
              </div>
              <div className="mt-4 p-2 border border-success bg-black">
                <small className="text-dim">
                  &gt; LOCATION: BERLIN, DE<br/>
                  &gt; UPTIME: 29 YEARS<br/>
                  &gt; STATUS: ONLINE
                </small>
              </div>
              <div className="mt-4">
                <h5 className="border-bottom border-success pb-2 mb-3 text-dim">&gt; SYSTEM_STATUS</h5>
                <div className="mb-3">
                  <div className="d-flex justify-content-between text-dim mb-1"><small>CPU_LOAD</small> <small>{cpuLoad.toFixed(2)}%</small></div>
                  <ProgressBar variant="success" now={cpuLoad} style={{ height: '5px', backgroundColor: '#003300' }} />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between text-dim mb-1"><small>MEMORY_USAGE</small> <small>{memLoad.toFixed(2)}%</small></div>
                  <ProgressBar variant="success" now={memLoad} style={{ height: '5px', backgroundColor: '#003300' }} />
                </div>
                <div className="d-flex justify-content-between text-dim mb-3">
                  <small>UPLINK: {uplink.toFixed(2)} KB/s</small>
                  <small>DOWNLINK: {downlink.toFixed(2)} MB/s</small>
                </div>
                <div className="p-2 border border-success bg-black process-box">
                  <small className="text-dim">
                    {processes.map(p => <div key={p}>{p}</div>)}
                  </small>
                </div>
              </div>
            </TechCard>
          </Col>
          <Col lg={8}>
            <Row>
              <Col md={12}>
                <TechCard 
                  title="EXECUTION_HISTORY // EXPERIENCE" 
                  delay={0.4}
                  interactive={true}
                  onClick={() => setModalData(HISTORY_DATA)}
                >
                  <div className="small">
                    <div className="mb-3 border-start border-success ps-3">
                      <div className="text-success fw-bold">&gt;&gt; 2022 - PRESENT: LEAD ARCHITECT @ TECH_CORE</div>
                      <div className="text-bright">Entwicklung von Cloud-Nativen Sicherheitslösungen.</div>
                    </div>
                    <div className="mb-3 border-start border-dim ps-3 opacity-75">
                      <div className="text-dim fw-bold">&gt;&gt; 2019 - 2022: SENIOR DEVELOPER @ GLOBAL_SYSTEMS</div>
                    </div>
                    <div className="text-center text-success mt-3 border-top border-success pt-2 opacity-75">
                       [CLICK_FOR_FULL_LOG]
                    </div>
                  </div>
                </TechCard>
              </Col>
            </Row>
            
            <Row className="mt-4">
              <Col md={12}>
                <h5 className="text-dim mb-3 blink">&gt; DEPLOYED_PROJECTS:</h5>
              </Col>
              
              {PROJECTS_DATA.map((proj, idx) => (
                <Col md={4} key={proj.id} className="mb-3">
                   <TechCard 
                      interactive={true} 
                      delay={0.5 + (idx * 0.1)}
                      onClick={() => setModalData(proj)}
                    >
                      <div className="text-center py-2">
                        <i className="bi bi-cpu text-success opacity-75" style={{fontSize: '2rem'}}></i>
                        <h6 className="mt-2 text-bright" style={{fontSize: '0.7rem'}}>{proj.title}</h6>
                        <small className="text-dim" style={{fontSize: '0.6rem'}}>VIEW_DATA</small>
                      </div>
                   </TechCard>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <footer className="text-center mt-5 mb-3 text-dim font-monospace">
          <small>SYSTEM_ID: MAC_OS_X // RENDERED: 2025 // SECURE_CONNECTION</small>
        </footer>

      </Container>
    </div>
  );
}

export default App;