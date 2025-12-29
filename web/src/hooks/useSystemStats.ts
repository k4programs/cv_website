import { useState, useEffect, useCallback, useRef } from 'react';

const useRandomInterval = (callback: () => void, minDelay: number, maxDelay: number) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      savedCallback.current();
      timeoutId.current = setTimeout(tick, delay);
    };
    timeoutId.current = setTimeout(tick, Math.random() * (maxDelay - minDelay) + minDelay);
    return () => {
        if(timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [minDelay, maxDelay]);
};

const useSystemStats = () => {
  const [cpuLoad, setCpuLoad] = useState(40);
  const [memLoad, setMemLoad] = useState(60);
  const [uplink, setUplink] = useState(128);
  const [downlink, setDownlink] = useState(1024);

  useRandomInterval(() => setCpuLoad(Math.random() * 80 + 10), 1000, 3000);
  useRandomInterval(() => setMemLoad(Math.random() * 70 + 20), 1500, 4000);
  useRandomInterval(() => setUplink(Math.random() * 200 + 50), 500, 2000);
  useRandomInterval(() => setDownlink(Math.random() * 1000 + 200), 800, 2500);

  return { cpuLoad, memLoad, uplink, downlink };
};

export default useSystemStats;