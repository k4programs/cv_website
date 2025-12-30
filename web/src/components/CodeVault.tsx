import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

interface CodeVaultProps {
  onClose: () => void;
}

const SNIPPETS = [
  {
    name: 'githubService.ts',
    lang: 'typescript',
    code: 'export const fetchGitHubStats = async (username: string): Promise<GitHubStats | null> => {\n' +
          '  // Hybrid Intelligence Layer\n' +
          '  const targetUser = username || SYSTEM_CONFIG.github.username;\n' +
          '  const userResponse = await fetch("https://api.github.com/users/" + targetUser);\n' +
          '  const reposResponse = await fetch("https://api.github.com/users/" + targetUser + "/repos?sort=pushed");\n' +
          '  \n' +
          '  // Merge Live Data with Configured Private Offset\n' +
          '  const totalRepos = userData.public_repos + SYSTEM_CONFIG.github.privateRepoOffset;\n' +
          '  \n' +
          '  return {\n' +
          '    followers: userData.followers,\n' +
          '    public_repos: totalRepos, \n' +
          '    top_languages: sortedLangs\n' +
          '  };\n' +
          '};'
  },
  {
    name: 'RealSystemDiagnostics.tsx',
    lang: 'tsx',
    code: 'const RealSystemDiagnostics: React.FC = () => {\n' +
          '  // Hardware Fingerprinting\n' +
          '  const logicalProcessors = navigator.hardwareConcurrency || 4; \n' +
          '  const mem = (navigator as any).deviceMemory ? "~" + (navigator as any).deviceMemory + " GB" : "N/A";\n' +
          '  \n' +
          '  setInfo({\n' +
          '    os: detectOS(navigator.userAgent),\n' +
          '    cores: Math.floor(logicalProcessors / 2), // Physical Estimate\n' +
          '    threads: logicalProcessors, // Logical Threads\n' +
          '    battery: await getBatteryStatus()\n' +
          '  });\n' +
          '};'
  },
  {
    name: 'useSoundEffects.ts',
    lang: 'typescript',
    code: 'const useSoundEffects = () => {\n' +
          '  // Synthetic Audio Engine\n' +
          '  const playSound = useCallback((type: SoundType) => {\n' +
          '    const osc = ctx.createOscillator();\n' +
          '    const gain = ctx.createGain();\n' +
          '    \n' +
          '    // Procedural sound generation based on type\n' +
          '    if (type === "access_granted") {\n' +
          '       osc.frequency.setValueAtTime(440, ctx.currentTime);\n' +
          '       osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);\n' +
          '    }\n' +
          '    \n' +
          '    osc.connect(gain);\n' +
          '    osc.start();\n' +
          '  }, []);\n' +
          '};'
  }
];

const CodeVault: React.FC<CodeVaultProps> = ({ onClose }) => {
  const [activeSnippet, setActiveSnippet] = useState(0);

  return (
    <motion.div 
      className="holo-backdrop" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="holo-window"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{ width: '90%', maxWidth: '900px', height: '80vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-2 border-bottom border-success bg-dark">
          <div className="d-flex gap-2">
            {SNIPPETS.map((s, idx) => (
              <button 
                key={idx}
                className={`btn btn-sm ${activeSnippet === idx ? 'btn-success text-black' : 'btn-outline-success text-dim'} rounded-0`}
                onClick={() => setActiveSnippet(idx)}
                style={{ fontSize: '0.8rem' }}
              >
                {s.name}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="btn btn-link text-success p-0 text-decoration-none">X</button>
        </div>

        {/* Code Area */}
        <div className="flex-grow-1 overflow-auto bg-black" style={{ position: 'relative' }}>
          <SyntaxHighlighter 
            language={SNIPPETS[activeSnippet].lang} 
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: '20px', fontSize: '0.9rem', background: 'transparent' }}
            showLineNumbers={true}
          >
            {SNIPPETS[activeSnippet].code}
          </SyntaxHighlighter>
        </div>

        {/* Footer */}
        <div className="p-2 border-top border-success text-dim small d-flex justify-content-between bg-dark">
           <span>Ln 1, Col 1</span>
           <span>UTF-8</span>
           <span>{SNIPPETS[activeSnippet].lang.toUpperCase()}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CodeVault;
