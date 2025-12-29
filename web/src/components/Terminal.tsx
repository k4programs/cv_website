import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS_DATA } from '../data/database';
import { ProjectData } from '../types';
import { fetchGitHubStats, GitHubStats } from '../services/githubService';

interface TerminalProps {
  onClose: () => void;
  onOpenProject: (proj: ProjectData) => void;
}

interface HistoryEntry {
  type: 'input' | 'output';
  content: string;
}

const Terminal: React.FC<TerminalProps> = ({ onClose, onOpenProject }) => {
  const [input, setInput] = useState('');
  const [ghStats, setGhStats] = useState<GitHubStats | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'output', content: 'WELCOME TO TERMINAL V2.0 // TYPE "help" FOR COMMANDS' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadStats = async () => {
      const stats = await fetchGitHubStats('your-github-username'); // Replace with real username later
      if (stats) setGhStats(stats);
    };
    loadStats();
  }, []);

  // Auto-Focus & Scroll
  useEffect(() => {
    inputRef.current?.focus();
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();

    let output = '';

    switch (command) {
      case 'help':
        output = 'AVAILABLE COMMANDS:\n  > help    : Show this message\n  > ls      : List all projects\n  > cat [id]: Open project details\n  > whoami  : User info & Live Stats\n  > socials : Display social media links\n  > clear   : Clear terminal\n  > exit    : Close terminal';
        break;
      case 'ls':
        output = PROJECTS_DATA.map(p => `[${p.id}] ${p.title} (${p.status})`).join('\n');
        break;
      case 'cat':
        if (args[1]) {
          const proj = PROJECTS_DATA.find(p => p.id === args[1]);
          if (proj) {
            onOpenProject(proj);
            output = `OPENING FILE: ${proj.title}...`;
          } else {
            output = `ERROR: FILE "${args[1]}" NOT FOUND.`;
          }
        } else {
          output = 'ERROR: MISSING ARGUMENT. USAGE: cat [id]';
        }
        break;
      case 'whoami':
        output = `USER: GUEST\nROLE: VISITOR\nACCESS_LEVEL: 1\n\nGITHUB_INTEL:\n  > REPOS:   ${ghStats?.public_repos || 'FETCHING...'}\n  > STARS:   ${ghStats?.total_stars || 'FETCHING...'}\n  > FOLLOWS: ${ghStats?.followers || 'FETCHING...'}`;
        break;
      case 'socials':
        output = 'GitHub:   https://github.com/your-github-username\nLinkedIn: https://linkedin.com/in/your-linkedin-profile';
        break;
      case 'sudo':
        output = 'ACCESS DENIED: YOU HAVE NO POWER HERE.\nTHIS INCIDENT WILL BE REPORTED.';
        break;
      case 'rm -rf /':
      case 'rm -rf':
        output = 'CRITICAL ERROR: SYSTEM INTEGRITY PROTECTED.\nNICE TRY, HACKER.';
        break;
      case 'matrix':
        output = 'WAKE UP, NEO...\nTHE MATRIX HAS YOU.\n(FOLLOW THE WHITE RABBIT)';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      case '':
        return;
      default:
        output = `COMMAND NOT FOUND: "${command}". TYPE "help".`;
    }

    setHistory(prev => [
      ...prev, 
      { type: 'input', content: `guest@maccv:~$ ${cmd}` },
      { type: 'output', content: output }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="terminal-overlay" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-window">
        <div className="terminal-header d-flex justify-content-between align-items-center border-bottom border-success px-2 py-1 mb-2">
          <span className="small text-dim">TERMINAL_EMULATOR</span>
          <button onClick={onClose} className="btn btn-sm btn-link text-success p-0" style={{textDecoration: 'none'}}>X</button>
        </div>
        
        <div className="terminal-body font-monospace text-success p-2" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {history.map((entry, idx) => (
            <div key={idx} className={`mb-1 ${entry.type === 'input' ? 'opacity-50' : ''}`} style={{ whiteSpace: 'pre-wrap' }}>
              {entry.content}
            </div>
          ))}
          
          <div className="d-flex">
            <span className="me-2 text-dim">guest@maccv:~$</span>
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-0 text-success p-0 w-100"
              style={{ outline: 'none', caretColor: '#00ff41' }}
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default Terminal;