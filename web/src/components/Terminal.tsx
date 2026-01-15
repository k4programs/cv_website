import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS_DATA } from '../data/database';
import { ProjectData } from '../types';
import { fetchGitHubStats, GitHubStats } from '../services/githubService';
import { fetchEnvironmentData, EnvData } from '../services/environmentService';

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
  const [envData, setEnvData] = useState<EnvData | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'output', content: 'WELCOME TO TERMINAL V2.0 // TYPE "help" FOR COMMANDS' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadStats = async () => {
      const stats = await fetchGitHubStats('k4programs');
      if (stats) setGhStats(stats);
    };
    const loadEnv = async () => {
      const env = await fetchEnvironmentData();
      if (env) setEnvData(env);
    };
    loadStats();
    loadEnv();
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
        output = 'AVAILABLE COMMANDS:\n' +
                 '  > ls              : List directory content\n' +
                 '  > cd [dir]        : Change directory\n' +
                 '  > pwd             : Print working directory\n' +
                 '  > cat [file]      : Display file content\n' +
                 '  > date            : Show current system time\n' +
                 '  > whoami          : Current user info\n' +
                 '  > weather         : Environmental scan\n' +
                 '  > git status      : Check repository status\n' +
                 '  > top             : Monitor system processes\n' +
                 '  > clear           : Clear terminal screen\n' +
                 '  > exit            : Log out';
        break;
      case 'ls':
      case 'll':
        output = 'drwxr-xr-x  guest  staff   128 Jan 15 10:00 .\n' +
                 'drwxr-xr-x  root   wheel   256 Jan 01 00:00 ..\n' +
                 '-r--------  guest  staff  1024 Jan 15 10:05 resume.pdf\n' +
                 '-rw-r--r--  guest  staff   512 Jan 14 18:30 system.log\n' +
                 'drwxr-xr-x  guest  staff   192 Jan 12 09:15 projects\n' +
                 'drwxr-xr-x  guest  staff   128 Jan 10 14:20 skills\n' +
                 PROJECTS_DATA.map(p => `-r--r--r--  guest  staff  2048 Jan 15 11:00 ${p.id}.json`).join('\n');
        break;
      case 'pwd':
        output = '/home/guest/portfolio';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'echo':
        output = args.slice(1).join(' ');
        break;
      case 'cd':
        if (!args[1] || args[1] === '~') {
           output = ''; // Silent success
        } else if (args[1] === '..') {
           output = 'Access Denied: You are jailed in /home/guest/portfolio';
        } else if (['projects', 'skills'].includes(args[1])) {
           output = `Entering directory '${args[1]}'... (Visual interface already loaded)`;
        } else {
           output = `cd: no such file or directory: ${args[1]}`;
        }
        break;
      case 'weather':
        if (envData) {
          output = `ENVIRONMENT SCAN:\n  > LOCATION:  ${envData.city}, ${envData.country}\n  > TEMP:      ${envData.temp}°C\n  > CONDITION: ${envData.condition}\n  > ISP:       ${envData.isp}\n  > IP_NODE:   ${envData.ip}`;
        } else {
          output = 'ERROR: WEATHER SATELLITE UNREACHABLE.\nTRY AGAIN LATER.';
        }
        break;
      case 'cat':
        if (args[1]) {
          const cleanArg = args[1].replace('.json', '');
          const proj = PROJECTS_DATA.find(p => p.id === cleanArg);
          
          if (proj) {
            onOpenProject(proj);
            output = `OPENING FILE: ${proj.title}...`;
          } else if (args[1] === 'resume.pdf') {
             output = 'BINARY FILE DETECTED. PLEASE USE "DECRYPT_FULL_PROFILE" BUTTON TO VIEW.';
          } else if (args[1] === 'system.log') {
             output = '[INFO] Boot sequence initialized...\n[INFO] Loading kernel modules... OK\n[WARN] Security breach detected at port 5173\n[INFO] Interactive mode engaged.';
          } else {
            output = `cat: ${args[1]}: No such file or directory`;
          }
        } else {
          output = 'usage: cat [file]';
        }
        break;
      case 'whoami':
        const topLangs = ghStats?.top_languages.map(([l]) => l).join(', ') || 'ANALYZING...';
        output = `USER: GUEST\nROLE: VISITOR\nACCESS_LEVEL: 1\n\nGITHUB_INTEL:\n  > REPOS:       ${ghStats?.public_repos || 'FETCHING...'}\n  > STARS:       ${ghStats?.total_stars || 'FETCHING...'}\n  > FOLLOWS:     ${ghStats?.followers || 'FETCHING...'}\n  > LAST_ACTIVE: ${ghStats?.last_push || 'UNKNOWN'}\n  > STACK:       [${topLangs}]`;
        break;
      case 'socials':
        output = 'GitHub:   https://github.com/k4programs\nLinkedIn: https://linkedin.com/in/your-linkedin-profile';
        break;
      case 'git':
        if (args[1] === 'status') {
             output = 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nworking tree clean';
        } else if (args[1] === 'log') {
             output = 'commit c71dcdc (HEAD -> main)\nAuthor: k4programs <dev@maccv.com>\nDate:   ' + new Date().toDateString() + '\n\n    feat: implemented immersive terminal experience';
        } else {
             output = 'git: command not found (try "git status" or "git log")';
        }
        break;
      case 'top':
      case 'htop':
        output = 'PID USER      PR  NI  VIRT  RES  SHR S  %CPU %MEM    TIME+ COMMAND\n' +
                 '  1 root      20   0  168m  12m 8840 S   0.0  0.1   0:01.23 init\n' +
                 ' 42 guest     20   0  2.4g 180m 102m S   1.2  2.1   1:42.00 chromium\n' +
                 ' 99 guest     20   0  800m  45m  22m S   0.5  0.8   0:05.15 react-app\n' +
                 '101 guest     20   0   24m   4m   2m R   0.1  0.0   0:00.01 bash';
        break;
      case 'mkdir':
      case 'touch':
      case 'rm':
        output = 'Error: Read-only file system. Modifications not permitted in Guest Mode.';
        break;
      case 'vi':
      case 'vim':
      case 'nano':
      case 'code':
        output = 'Error: Cannot open text editor. No TTY detected.';
        break;
      case 'sudo':
        output = 'guest is not in the sudoers file. This incident will be reported.';
        break;
      case 'matrix':
        output = 'WAKE UP, NEO...\nTHE MATRIX HAS YOU.\n(FOLLOW THE WHITE RABBIT)';
        break;
      case 'reboot':
        output = 'Rebooting system...';
        setTimeout(() => window.location.reload(), 1000);
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
        output = `bash: ${command}: command not found`;
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