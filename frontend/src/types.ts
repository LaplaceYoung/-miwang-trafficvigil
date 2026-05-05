export type TaskStatus = "pending" | "running" | "success" | "failed";
export type RiskLevel = "low" | "medium" | "high" | "critical";
export type UserRole = "管理员" | "分析员" | "访客";

export type PacketRow = {
  no: number;
  time: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  info: string;
  encryptedTag: string;
};

export type FlowResult = {
  flowId: string;
  source: string;
  destination: string;
  protocol: string;
  packetCount: number;
  vpnProbability: number;
  simProbability: number;
  prediction: string;
  confidence: number;
};

export type BehaviorInstance = {
  id: string;
  primary: string;
  secondary: string;
  confidence: number;
  packetCount: number;
  duration: string;
  app: string;
  avgLength: number;
  avgInterval: string;
};

export type GroupMatch = {
  groupId: string;
  groupName: string;
  platform: "Telegram" | "WhatsApp" | "Signal";
  probability: number;
  riskLevel: RiskLevel;
  evidenceCount: number;
  lastActiveTime: string;
  deviceCount: number;
};

export type AnalysisTask = {
  taskId: string;
  taskName: string;
  fileName: string;
  status: TaskStatus;
  createdAt: string;
  owner: string;
  capture: {
    mode: "upload" | "realtime";
    packetCount: number;
    totalBytes: number;
    encryptedRatio: number;
    vpnSuspectCount: number;
    simSuspectCount: number;
  };
  vpnResult: {
    vpnRatio: number;
    nonVpnRatio: number;
    protocols: Record<"tls13" | "quic" | "wireguard" | "unknown", number>;
  };
  simResult: {
    simRatio: number;
    appTop1: "Telegram" | "WhatsApp" | "Signal" | "WeChat" | "QQ";
    appConfidence: number;
    apps: Record<string, number>;
  };
  behaviorResult: {
    topBehavior: "chat" | "photo" | "file" | "voice" | "video";
    confidence: number;
    distribution: Record<string, number>;
    instances: BehaviorInstance[];
  };
  groupMatch: GroupMatch[];
};

export type UserSession = {
  userId: string;
  username: string;
  organization: string;
  role: UserRole;
  token: string;
  recentTasks: number;
};
