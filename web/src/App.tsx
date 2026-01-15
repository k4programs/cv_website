import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import HoloModal from './components/HoloModal';
import TechCard from './components/TechCard';
import Typewriter from './components/Typewriter';
import Terminal from './components/Terminal';
import BootSequence from './components/BootSequence';
import InteractiveBackground from './components/InteractiveBackground';
import DecryptionMinigame from './components/DecryptionMinigame';
import SystemMonitor from './components/SystemMonitor';
import CyberGlobe from './components/CyberGlobe';
import ContactModal from './components/ContactModal';
import CodeVault from './components/CodeVault';
import SkillGraph from './components/SkillGraph';

import { generateClassifiedPDF } from './utils/pdfGenerator';

// Hooks
import useSoundEffects from './hooks/useSoundEffects';

// Data & Types
import { PROJECTS_DATA, ABOUT_DATA, HISTORY_DATA, SYSTEM_DATA } from './data/database';
import { ProjectData } from './types';
import { fetchEnvironmentData, EnvData } from './services/environmentService';

const App: React.FC = () => {
  // Persistence Layer
  const [modalData, setModalData] = useState<ProjectData | null>(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showCodeVault, setShowCodeVault] = useState(false);
  const [isSeriousMode, setIsSeriousMode] = useState(false);
  const [envData, setEnvData] = useState<EnvData | null>(null);
  
  const [showBootSequence, setShowBootSequence] = useState<boolean>(() => {
    return localStorage.getItem('maccv_booted') !== 'true';
  });
  const [isEncrypted, setIsEncrypted] = useState<boolean>(() => {
    return localStorage.getItem('maccv_decrypted') !== 'true';
  });

  const playSound = useSoundEffects();

  useEffect(() => {
    const loadEnv = async () => {
      const data = await fetchEnvironmentData();
      if (data) setEnvData(data);
    };
    loadEnv();
  }, []);

  const handleBootComplete = useCallback(() => {
    setShowBootSequence(false);
    localStorage.setItem('maccv_booted', 'true');
    playSound('access_granted');
  }, [playSound]);
  
  const handleInitiateContact = () => {
    setShowContact(true);
    playSound('hover');
  };
  
  const handleDecryptResume = () => {
    window.open('/resume', '_blank'); 
  };
  
  const handleDecrypt = () => {
    setIsEncrypted(false);
    localStorage.setItem('maccv_decrypted', 'true');
    playSound('access_granted');
  };

  const handleReboot = () => {
    localStorage.removeItem('maccv_booted');
    localStorage.removeItem('maccv_decrypted');
    window.location.reload();
  };

  const systemMessages = [
    "SYSTEM.INIT: SENIOR ARCHITECT // CLEARANCE: LEVEL 5",
    "STATUS: ONLINE // ENCRYPTION: AES-256-ACTIVE",
    `LOCATION: ${envData ? `${envData.city}_NODE` : 'DETECTING_NODE...'} // UPTIME: 100%`,
    `ENVIRONMENT: ${envData ? `${envData.temp}°C // ${envData.condition}` : 'SCANNING_ATMOSPHERE...'}`,
    "CONNECTED_TO_MAINFRAME... ACCESS_GRANTED"
  ];

  if (showBootSequence) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  if (isEncrypted) {
    return <DecryptionMinigame onSuccess={handleDecrypt} />;
  }

  return (
    <div className={`min-vh-100 py-4 position-relative ${isSeriousMode ? 'serious-mode' : ''}`}>
      <InteractiveBackground />
      <div className="scanlines"></div>
      <div className="glow-overlay"></div>
      
      <AnimatePresence>
        {modalData && (
          <HoloModal data={modalData} onClose={() => setModalData(null)} />
        )}
        {showContact && (
          <ContactModal onClose={() => setShowContact(false)} />
        )}
        {showCodeVault && (
          <CodeVault onClose={() => setShowCodeVault(false)} />
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
             <CyberGlobe />
          </Col>
          <Col md={9}>
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="display-4 fw-bold glitch-hover" onMouseEnter={() => playSound('hover')}>MAX MUSTERMANN</h1>
              <p className="lead text-bright font-monospace">
                <Typewriter messages={systemMessages} loop={true} />
              </p>
              <div className="d-flex gap-2 flex-wrap align-items-center">
                 <Button 
                    variant="outline-success" 
                    size="sm" 
                    className="rounded-0"
                    onClick={() => setShowTerminal(true)}
                    onMouseEnter={() => playSound('hover')}
                 >
                    &gt; TERMINAL_ACCESS [CTRL+K]
                 </Button>
                 <Button 
                    variant="outline-success" 
                    size="sm" 
                    className="rounded-0 blink" 
                    onClick={() => {
                      playSound('access_granted');
                      generateClassifiedPDF();
                    }}
                    onMouseEnter={() => playSound('hover')}
                 >
                    &gt; DECRYPT_FULL_PROFILE.PDF
                 </Button>
                 <Button 
                    variant="outline-info" 
                    size="sm" 
                    className="rounded-0"
                    onClick={handleInitiateContact}
                    onMouseEnter={() => playSound('hover')}
                 >
                    &gt; INITIATE_CONTACT
                 </Button>
                 <Button 
                    variant="outline-warning" 
                    size="sm" 
                    className="rounded-0"
                    onClick={() => setShowCodeVault(true)}
                    onMouseEnter={() => playSound('hover')}
                 >
                    &gt; SOURCE_CODE
                 </Button>
                 <a href="https://github.com/k4programs" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-0" onMouseEnter={() => playSound('hover')}>
                    <i className="bi bi-github"></i>
                 </a>
                 <a href="https://linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm rounded-0" onMouseEnter={() => playSound('hover')}>
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
              interactive={false}
              onClick={() => setModalData(ABOUT_DATA)}
              className="about-me-box"
              style={{ cursor: 'pointer' }}
            >
              <div onMouseEnter={() => playSound('hover')}>
                <p className="text-bright small">
                  Leidenschaftlicher Full-Stack Entwickler mit Fokus auf High-Performance Architekturen. 
                  <span className="text-success d-block mt-2">[CLICK_TO_EXPAND]</span>
                </p>
                <hr className="border-success" />
                <div className="mt-4 p-2 border border-success bg-black">
                  <small className="text-dim">
                    &gt; LOCATION: {envData ? `${envData.city}, ${envData.country}` : 'UNKNOWN_SECTOR'}<br/>
                    &gt; ATMOSPHERE: {envData ? `${envData.temp}°C [${envData.condition}]` : 'SCANNERS_OFFLINE'}<br/>
                    &gt; STATUS: ONLINE
                  </small>
                </div>
              </div>
            </TechCard>

            <div className="mt-4">
              <TechCard 
                title="SYSTEM_STATUS" 
                delay={0.3} 
                interactive={false}
                onClick={() => setModalData(SYSTEM_DATA)}
                style={{ cursor: 'pointer' }}
              >
                <div onMouseEnter={() => playSound('hover')}>
                  <SystemMonitor />
                  <div className="text-center mt-3 text-dim small blink">
                    [ CLICK_FOR_DIAGNOSTICS ]
                  </div>
                </div>
              </TechCard>
            </div>
          </Col>
          <Col lg={8}>
            {/* 1. Experience */}
            <Row>
              <Col md={12}>
                <TechCard 
                  title="EXECUTION_HISTORY // EXPERIENCE" 
                  delay={0.4}
                  interactive={false}
                  onClick={() => setModalData(HISTORY_DATA)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="small" onMouseEnter={() => playSound('hover')}>
                    <div className="mb-3 border-start border-success ps-3">
                      <div className="text-success fw-bold">&gt;&gt; 2022 - PRESENT: LEAD ARCHITECT @ TECH_CORE</div>
                      <div className="text-bright">Entwicklung von Cloud-Nativen Sicherheitslösungen.</div>
                    </div>
                    <div className="text-center text-success mt-3 border-top border-success pt-2 opacity-75">
                       [CLICK_FOR_FULL_LOG]
                    </div>
                  </div>
                </TechCard>
              </Col>
            </Row>
            
            {/* 2. Projects */}
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
                      <div className="text-center py-2" onMouseEnter={() => playSound('hover')}>
                        <i className="bi bi-cpu text-success opacity-75" style={{fontSize: '2rem'}}></i>
                        <h6 className="mt-2 text-bright" style={{fontSize: '0.7rem'}}>{proj.title}</h6>
                        <small className="text-dim" style={{fontSize: '0.6rem'}}>VIEW_DATA</small>
                      </div>
                   </TechCard>
                </Col>
              ))}
            </Row>

            {/* 3. Skill Graph (moved to bottom) */}
            <Row className="mt-3">
               <Col md={12}>
                  <TechCard title="NEURAL_NET_SKILL_GRAPH" delay={0.6} interactive={false}>
                     <SkillGraph />
                  </TechCard>
               </Col>
            </Row>
          </Col>
        </Row>

        <footer className="text-center mt-5 mb-3 text-dim font-monospace">
          <small>SYSTEM_ID: MAC_OS_X // RENDERED: 2025 // SECURE_CONNECTION</small>
          <div className="mt-2 d-flex justify-content-center gap-3">
            <button className="btn btn-link btn-sm text-dim p-0" style={{fontSize: '0.7rem', textDecoration: 'none'}} onClick={handleReboot}>
              [ SYSTEM_REBOOT ]
            </button>
            <button className="btn btn-link btn-sm text-dim p-0" style={{fontSize: '0.7rem', textDecoration: 'none'}} onClick={() => setIsSeriousMode(!isSeriousMode)}>
              [ {isSeriousMode ? 'HACKER_MODE' : 'SERIOUS_MODE'} ]
            </button>
          </div>
        </footer>

      </Container>
    </div>
  );
}

export default App;