import type { AnalysisTask, FlowResult, PacketRow } from "../types";

export const currentTask: AnalysisTask = {
  taskId: "TV-20260505-0427",
  taskName: "校园网关加密 IM 流量综合检测",
  fileName: "campus-gateway-2026-05-05.pcapng",
  status: "success",
  createdAt: "2026-05-05 23:42:20",
  owner: "TrafficVigil 管理员账号",
  capture: {
    mode: "upload",
    packetCount: 18420,
    totalBytes: 2136400000,
    encryptedRatio: 0.69,
    vpnSuspectCount: 4973,
    simSuspectCount: 7736
  },
  vpnResult: {
    vpnRatio: 0.27,
    nonVpnRatio: 0.73,
    protocols: {
      tls13: 0.38,
      quic: 0.26,
      wireguard: 0.21,
      unknown: 0.15
    }
  },
  simResult: {
    simRatio: 0.42,
    appTop1: "Telegram",
    appConfidence: 0.86,
    apps: {
      Telegram: 0.86,
      WhatsApp: 0.64,
      Signal: 0.57,
      WeChat: 0.48,
      QQ: 0.37,
      Unknown: 0.22
    }
  },
  behaviorResult: {
    topBehavior: "chat",
    confidence: 0.92,
    distribution: {
      chat: 0.92,
      photo: 0.66,
      file: 0.78,
      voice: 0.38,
      video: 0.41,
      idle: 0.18,
      unknown: 0.09
    },
    instances: [
      { id: "INS-1029", primary: "chat", secondary: "photo", confidence: 0.94, packetCount: 428, duration: "11.8s", app: "Telegram", avgLength: 382, avgInterval: "18ms" },
      { id: "INS-1184", primary: "file", secondary: "chat", confidence: 0.88, packetCount: 791, duration: "34.2s", app: "Telegram", avgLength: 984, avgInterval: "42ms" },
      { id: "INS-1307", primary: "photo", secondary: "file", confidence: 0.81, packetCount: 356, duration: "8.6s", app: "WhatsApp", avgLength: 746, avgInterval: "23ms" },
      { id: "INS-1412", primary: "video", secondary: "voice", confidence: 0.73, packetCount: 1286, duration: "88.4s", app: "Signal", avgLength: 1098, avgInterval: "31ms" },
      { id: "INS-1533", primary: "voice", secondary: "chat", confidence: 0.68, packetCount: 614, duration: "45.1s", app: "WeChat", avgLength: 512, avgInterval: "27ms" }
    ]
  },
  groupMatch: [
    { groupId: "G-7001", groupName: "TG-Group-7", platform: "Telegram", probability: 0.91, riskLevel: "critical", evidenceCount: 38, lastActiveTime: "23:42:09", deviceCount: 7 },
    { groupId: "G-4812", groupName: "Signal-Channel", platform: "Signal", probability: 0.84, riskLevel: "high", evidenceCount: 24, lastActiveTime: "23:41:33", deviceCount: 4 },
    { groupId: "G-6120", groupName: "WA-Relay-12", platform: "WhatsApp", probability: 0.77, riskLevel: "high", evidenceCount: 19, lastActiveTime: "23:39:54", deviceCount: 3 },
    { groupId: "G-2819", groupName: "TG-Open-Archive", platform: "Telegram", probability: 0.63, riskLevel: "medium", evidenceCount: 12, lastActiveTime: "23:38:11", deviceCount: 2 },
    { groupId: "G-1730", groupName: "Signal-Study-Room", platform: "Signal", probability: 0.34, riskLevel: "low", evidenceCount: 6, lastActiveTime: "23:34:20", deviceCount: 1 }
  ]
};

export const packetRows: PacketRow[] = Array.from({ length: 16 }, (_, index) => {
  const protocols = ["TLS 1.3", "QUIC", "WireGuard", "TCP", "UDP"];
  const apps = ["telegram", "whatsapp", "signal", "wechat", "unknown"];
  return {
    no: index + 1,
    time: `23:42:${String(10 + index).padStart(2, "0")}.${index * 37}`,
    source: `10.24.${index % 8}.${42 + index}`,
    destination: `172.31.${index % 5}.${120 + index}`,
    protocol: protocols[index % protocols.length],
    length: 128 + ((index * 173) % 1260),
    info: `${apps[index % apps.length]} encrypted session fragment`,
    encryptedTag: index % 3 === 0 ? "VPN suspect" : index % 2 === 0 ? "SIM suspect" : "TLS encrypted"
  };
});

export const flowResults: FlowResult[] = Array.from({ length: 12 }, (_, index) => ({
  flowId: `FLOW-${String(4200 + index)}`,
  source: `10.24.${index % 8}.${42 + index}`,
  destination: `172.31.${index % 5}.${120 + index}`,
  protocol: ["TLS 1.3", "QUIC", "WireGuard", "Shadowsocks"][index % 4],
  packetCount: 120 + index * 31,
  vpnProbability: Number((0.41 + (index % 5) * 0.11).toFixed(2)),
  simProbability: Number((0.38 + (index % 6) * 0.09).toFixed(2)),
  prediction: index % 3 === 0 ? "VPN" : index % 3 === 1 ? "SIM" : "Non-VPN",
  confidence: Number((0.71 + (index % 4) * 0.06).toFixed(2))
}));

export const historyTasks = [
  currentTask,
  { ...currentTask, taskId: "TV-20260504-0312", taskName: "Telegram 专项行为嗅探", fileName: "telegram-lab-iscx.pcapng", status: "success" as const, createdAt: "2026-05-04 20:10:08" },
  { ...currentTask, taskId: "TV-20260503-0188", taskName: "WireGuard 混合流量评估", fileName: "wireguard-mixed-flow.pcap", status: "running" as const, createdAt: "2026-05-03 19:28:41" },
  { ...currentTask, taskId: "TV-20260502-0097", taskName: "公共群组匹配回放", fileName: "group-attribution-case.pcapng", status: "pending" as const, createdAt: "2026-05-02 22:17:12" }
];
