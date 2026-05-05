export const packetPerMinute = [860, 1120, 1380, 1210, 1640, 1890, 2030, 1760, 2210, 2460, 2180, 2370];
export const encryptedRatioSeries = [42, 48, 51, 55, 59, 64, 69, 66, 71, 74, 70, 69];
export const protocolBars = [
  { label: "TLS 1.3", value: 38 },
  { label: "QUIC", value: 26 },
  { label: "WireGuard", value: 21 },
  { label: "Unknown", value: 15 }
];
export const performanceRows = [
  { model: "TrafficVigil", accuracy: 98.7, f1: 96.82, throughput: "6.32Gbps" },
  { model: "ET-BERT", accuracy: 94.72, f1: 83.05, throughput: "5.14Gbps" },
  { model: "GraphDApp", accuracy: 97.41, f1: 85.67, throughput: "4.12Gbps" },
  { model: "ECD-GNN", accuracy: 96.62, f1: 47.78, throughput: "5.63Gbps" },
  { model: "AppScanner", accuracy: 31.0, f1: 83.04, throughput: "3.67Gbps" }
];
export const logRows = [
  ["23:41:02", "auth", "管理员账号完成登录", "42ms"],
  ["23:41:18", "upload", "campus-gateway-2026-05-05.pcapng 上传完成", "118ms"],
  ["23:41:46", "inference", "VPN 分类模型完成推理", "231ms"],
  ["23:42:03", "inference", "GATv2 行为嗅探完成", "388ms"],
  ["23:42:20", "report", "结构化报告 TV-0427 生成", "96ms"]
];
