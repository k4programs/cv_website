import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import useSystemStats from '../hooks/useSystemStats';
import { fetchGitHubStats, GitHubStats } from '../services/githubService';

const SystemMonitor: React.FC = () => {
  const { cpuLoad, memLoad, uplink, downlink } = useSystemStats();
  const [ghStats, setGhStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    fetchGitHubStats('k4programs').then(setGhStats);
  }, []);

  return (
    <div className="mt-0">
      <div className="mb-3">
        <div className="d-flex justify-content-between text-dim mb-1">
          <small>CPU_LOAD</small> <small>{cpuLoad.toFixed(2)}%</small>
        </div>
        <ProgressBar variant="success" now={cpuLoad} style={{ height: '5px', backgroundColor: '#003300' }} />
      </div>
      <div className="mb-3">
        <div className="d-flex justify-content-between text-dim mb-1">
          <small>MEMORY_USAGE</small> <small>{memLoad.toFixed(2)}%</small>
        </div>
        <ProgressBar variant="success" now={memLoad} style={{ height: '5px', backgroundColor: '#003300' }} />
      </div>
      <div className="d-flex justify-content-between text-dim mb-3">
        <small>UPLINK: {uplink.toFixed(2)} KB/s</small>
        <small>DOWNLINK: {downlink.toFixed(2)} MB/s</small>
      </div>
      
      <div className="text-dim small mb-1">&gt; ACTIVE_PROTOCOLS (TOP_NODES):</div>
      <div className="p-2 border border-success process-box">
        <small className="text-dim">
          {ghStats ? (
            <>
              {ghStats.top_languages.map(([lang, count]) => (
                <div key={lang} className="d-flex justify-content-between">
                  <span>{lang.toUpperCase()}.mod</span>
                  <span>[{count} REPOS]</span>
                </div>
              ))}
              <div className="mt-2 text-success border-top border-success pt-1">
                LAST_INJECTION: {ghStats.last_push}
              </div>
            </>
          ) : (
             <>
               <div>SCANNING_GITHUB_NODES...</div>
               <div className="blink">[Connecting...]</div>
             </>
          )}
        </small>
      </div>
    </div>
  );
};

export default SystemMonitor;