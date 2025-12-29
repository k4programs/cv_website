import { ReactNode } from 'react';

export interface ProjectStats {
  performance?: string;
  uptime?: string;
  security_level?: string;
  threats_neutralized?: string;
  nodes?: string;
  encryption?: string;
  deployments_per_day?: string;
  time_saved?: string;
  latency?: string;
  msg_per_sec?: string;
  threats_detected?: string;
  adoption_rate?: string;
  experience?: string;
  focus?: string;
  stamina?: string;
  roles_played?: string;
  teams_led?: string;
  bugs_fixed?: string;
  cores?: string;
  threads?: string;
  temp?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  type: string;
  desc: string | ReactNode;
  tech: string[];
  status: string;
  stats: ProjectStats;
}

export interface BootStep {
  msg: string;
  progress: number;
  delay: number;
}
