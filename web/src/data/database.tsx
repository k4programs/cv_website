import React from 'react';
import { ProjectData } from '../types';

// --- DATA: PROJECTS ---
export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'p1',
    title: 'PROJECT_CHIMERA',
    type: 'AI_NEURAL_NET',
    desc: 'Entwicklung eines selbstlernenden neuronalen Netzwerks zur Erkennung von Anomalien in Finanztransaktionen. Das System verarbeitet 50TB Daten in Echtzeit.',
    tech: ['Python', 'TensorFlow', 'AWS SageMaker'],
    status: 'CLASSIFIED',
    stats: { performance: '99.4%', uptime: '500d' }
  },
  {
    id: 'p2',
    title: 'PROTOCOL_ZERO',
    type: 'CYBER_SECURITY',
    desc: 'White-Hat Penetration Testing Suite für Regierungsbehörden. Automatisiertes Auffinden von Zero-Day Exploits in Legacy-Systemen.',
    tech: ['Rust', 'Kali Linux', 'React'],
    status: 'ACTIVE',
    stats: { security_level: 'MAXIMUM', threats_neutralized: '14,023' }
  },
  {
    id: 'p3',
    title: 'QUANTUM_LINK',
    type: 'BLOCKCHAIN',
    desc: 'Dezentralisiertes Kommunikationsnetzwerk basierend auf Post-Quantum Kryptographie. Resistent gegen Quantencomputer-Angriffe.',
    tech: ['Solidity', 'Node.js', 'Web3.js'],
    status: 'BETA',
    stats: { nodes: '450', encryption: 'AES-256-GCM' }
  },
  {
    id: 'p4',
    title: 'PROJECT_SINGULARITY',
    type: 'DEVOPS_AUTOMATION',
    desc: 'Eine Infrastructure-as-Code (IaC) Pipeline zur vollautomatisierten Bereitstellung und Skalierung von Microservices in einer Multi-Cloud-Umgebung.',
    tech: ['Terraform', 'Ansible', 'Kubernetes', 'Jenkins'],
    status: 'OPERATIONAL',
    stats: { deployments_per_day: '250+', time_saved: '80%' }
  },
  {
    id: 'p5',
    title: 'PROJECT_OVERDRIVE',
    type: 'REAL-TIME_DATA',
    desc: 'Entwicklung einer High-Frequency-Streaming-Plattform für IoT-Sensordaten. Verarbeitet über 1 Million Nachrichten pro Sekunde.',
    tech: ['Kafka', 'Apache Flink', 'Go', 'Prometheus'],
    status: 'STABLE',
    stats: { latency: '5ms', msg_per_sec: '1.2M' }
  },
  {
    id: 'p6',
    title: 'PROJECT_AEGIS',
    type: 'MOBILE_SECURITY',
    desc: 'Ein SDK für Android & iOS zur Laufzeit-Analyse und zum Schutz vor mobilen Bedrohungen, einschließlich Code-Injection und Reverse Engineering.',
    tech: ['Kotlin', 'Swift', 'Frida', 'Radare2'],
    status: 'MAINTAINED',
    stats: { threats_detected: '5M+', adoption_rate: '95%' }
  }
];

// --- DATA: ABOUT ME (EXPANDED) ---
export const ABOUT_DATA: ProjectData = {
  id: 'about',
  title: 'IDENTITY_CORE // MAX MUSTERMANN',
  type: 'PERSONNEL_FILE',
  status: 'VERIFIED',
  desc: (
    <>
      <p>
        Full-Stack Architect mit einer Passion für hochskalierbare Systeme und Cyber-Security. 
        Ich glaube nicht an "sauberen Code", ich glaube an <strong className="text-success">effiziente Algorithmen</strong>.
      </p>
      <p className="mt-3">
        Meine Philosophie: Ein System ist nur so sicher wie sein schwächstes Glied. 
        Deshalb baue ich Software mit dem "Security First"-Ansatz. Wenn ich nicht code, 
        optimiere ich meinen Smart-Home-Server oder analysiere Blockchain-Transaktionen.
      </p>
      <div className="mt-4 border border-success p-2 bg-black opacity-75">
        <small className="text-dim">&gt; PERSONAL_QUOTE: "IF IT COMPILES, SHIP IT. IF IT BREAKS, FIX IT FASTER."</small>
      </div>
    </>
  ),
  tech: ['Architecture', 'Leadership', 'Coffee_V2.0'],
  stats: { experience: '10 YEARS', focus: '100%', stamina: 'INFINITE' }
};

// --- DATA: HISTORY (EXPANDED) ---
export const HISTORY_DATA: ProjectData = {
  id: 'history',
  title: 'EXECUTION_LOG // CAREER PATH',
  type: 'TIMELINE_DATA',
  status: 'ARCHIVED',
  desc: (
    <div className="small">
      <div className="mb-4">
        <h5 className="text-success mb-1">&gt;&gt; LEAD ARCHITECT @ TECH_CORE</h5>
        <p className="text-dim mb-1">2022 - PRESENT // BERLIN, DE</p>
        <p className="text-bright">
          Verantwortlich für die Cloud-Transformation der gesamten Infrastruktur. 
          Reduzierung der Serverkosten um 40% durch Serverless-Architektur. 
          Führung eines Teams von 15 Elite-Entwicklern.
        </p>
      </div>
      <div className="mb-4">
        <h5 className="text-success mb-1">&gt;&gt; SENIOR DEV @ GLOBAL_SYSTEMS</h5>
        <p className="text-dim mb-1">2019 - 2022 // REMOTE</p>
        <p className="text-bright">
          Design und Implementierung einer globalen CRM-Lösung. 
          Einführung von CI/CD Pipelines (GitLab CI) und Docker-Containern. 
          Mentoring von Junior-Entwicklern.
        </p>
      </div>
      <div className="mb-0">
        <h5 className="text-success mb-1">&gt;&gt; JUNIOR CODER @ STARTUP_HUB</h5>
        <p className="text-dim mb-1">2017 - 2019 // HAMBURG, DE</p>
        <p className="text-bright">
          Backend-Entwicklung mit Node.js und Express. 
          Erste Erfahrungen mit NoSQL Datenbanken (MongoDB).
        </p>
      </div>
    </div>
  ),
  tech: ['Management', 'Scrum', 'Mentoring'],
  stats: { roles_played: '3', teams_led: '2', bugs_fixed: '9999+' }
};

// --- DATA: SYSTEM STATUS (NEW) ---
export const SYSTEM_DATA: ProjectData = {
  id: 'sys_status',
  title: 'SYSTEM_DIAGNOSTICS // HARDWARE_SCAN',
  type: 'KERNEL_MONITOR',
  status: 'OPTIMAL',
  desc: "INITIATING_DEEP_SCAN...", // Content is overridden by RealSystemDiagnostics component
  tech: ['Unix', 'Bash', 'TCP/IP'],
  stats: { cores: 'SCANNING', threads: 'SCANNING', temp: 'SCANNING' }
};