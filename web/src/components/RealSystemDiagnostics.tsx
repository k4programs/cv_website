import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

interface SysInfo {
  os: string;
  browser: string;
  cores: number;
  memory: string;
  resolution: string;
  battery: string;
  online: boolean;
  userAgent: string;
  // Metrics for right column
  threads: number;
  language: string;
  platform: string;
}

const RealSystemDiagnostics: React.FC = () => {
  const [info, setInfo] = useState<SysInfo | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    let os = "UNKNOWN_OS";
    if (ua.indexOf("Win") !== -1) os = "MICROSOFT_WINDOWS_NT";
    if (ua.indexOf("Mac") !== -1) os = "DARWIN_KERNEL (MACOS)";
    if (ua.indexOf("Linux") !== -1) os = "LINUX_KERNEL";
    if (ua.indexOf("Android") !== -1) os = "ANDROID_SYSTEM";
    if (ua.indexOf("like Mac") !== -1) os = "IOS_CORE";

    let browser = "UNKNOWN_BROWSER";
    if (ua.indexOf("Chrome") !== -1) browser = "CHROME_ENGINE";
    if (ua.indexOf("Firefox") !== -1) browser = "GECKO_ENGINE";
    if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) browser = "WEBKIT_ENGINE";

    // 2. Hardware (Best Effort)
    const logicalProcessors = navigator.hardwareConcurrency || 4; 
    // @ts-ignore - deviceMemory is experimental but supported in Chrome
    const mem = (navigator as any).deviceMemory ? `~${(navigator as any).deviceMemory} GB` : "N/A";

    const res = `${window.screen.width}x${window.screen.height}`;

    // 3. Battery
    let batInfo = "AC_POWER / UNKNOWN";
    // @ts-ignore
    if (navigator.getBattery) {
      // @ts-ignore
      navigator.getBattery().then(bat => {
        const level = Math.round(bat.level * 100);
        const charging = bat.charging ? "CHARGING" : "DISCHARGING";
        setInfo(prev => prev ? { ...prev, battery: `${level}% [${charging}]` } : null);
      });
    }

    setInfo({
      os,
      browser,
      cores: Math.floor(logicalProcessors / 2), // Estimate Physical Cores
      memory: mem,
      resolution: res,
      battery: batInfo,
      online: navigator.onLine,
      userAgent: ua.substring(0, 40) + "...",
      threads: logicalProcessors, // Real Logical Threads
      language: navigator.language.toUpperCase(),
      platform: navigator.platform.toUpperCase()
    });

  }, []);

  if (!info) return <div className="text-warning blink">LOADING_SYSTEM_INTEL...</div>;

  return (
    <Row>
      <Col md={8}>
        <div className="font-monospace small">
          <p className="mb-1"><span className="text-dim">HOST_OS:</span> {info.os}</p>
          <p className="mb-1"><span className="text-dim">ENGINE:</span> {info.browser} // {info.cores} CORES</p>
          <p className="mb-4"><span className="text-dim">MEMORY_ALLOC:</span> {info.memory} // RES: {info.resolution}</p>
          
          <h6 className="text-success mb-2">&gt; POWER_MANAGEMENT:</h6>
          <ul className="list-unstyled text-bright ps-3 border-start border-dim">
            <li>[+] BATTERY_LEVEL .......... [{info.battery}]</li>
            <li>[+] NETWORK_STATUS ......... [{info.online ? "ONLINE" : "OFFLINE"}]</li>
            <li>[+] SECURE_CONTEXT ......... [{window.isSecureContext ? "YES" : "NO"}]</li>
          </ul>
          
          <div className="mt-3 p-2 border border-dim text-dim opacity-75" style={{fontSize: '0.7em'}}>
            &gt; USER_AGENT_STRING:<br/>
            {info.userAgent}
          </div>
        </div>
      </Col>
      <Col md={4} className="border-start border-success">
        <h6 className="text-dim">LIVE_METRICS:</h6>
        
        <div className="mb-2">
          <small className="d-block text-success text-uppercase" style={{fontSize: '0.7rem'}}>LOGICAL_THREADS</small>
          <span className="h5 text-bright">{info.threads}</span>
        </div>
        <div className="mb-2">
          <small className="d-block text-success text-uppercase" style={{fontSize: '0.7rem'}}>LOCALE</small>
          <span className="h5 text-bright">{info.language}</span>
        </div>
        <div className="mb-2">
          <small className="d-block text-success text-uppercase" style={{fontSize: '0.7rem'}}>PLATFORM_ID</small>
          <span className="h5 text-bright">{info.platform}</span>
        </div>

        <div className="mt-4 p-2 bg-success text-black text-center fw-bold blink small">
          SCAN_COMPLETE
        </div>
      </Col>
    </Row>
  );
};

export default RealSystemDiagnostics;