import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import useSystemStats from '../hooks/useSystemStats';

const SystemMonitor: React.FC = () => {
  const { cpuLoad, memLoad, uplink, downlink } = useSystemStats();

  const processes = [
    'sentinel.sys        [RUNNING]',
    'core_integrity.bin  [OK]',
    'firewall_daemon     [ACTIVE]',
    'neural_link.proc    [STABLE]',
    'defrag.exe          [IDLE]',
  ];

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
      <div className="p-2 border border-success bg-black process-box">
        <small className="text-dim">
          {processes.map(p => <div key={p}>{p}</div>)}
        </small>
      </div>
    </div>
  );
};

export default SystemMonitor;