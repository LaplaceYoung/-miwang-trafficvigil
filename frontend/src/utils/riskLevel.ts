import type { RiskLevel } from "../types";

export function riskText(level: RiskLevel) {
  return {
    low: "低",
    medium: "中",
    high: "高",
    critical: "极高"
  }[level];
}

export function riskClass(level: RiskLevel) {
  return `risk-${level}`;
}

export function formatBytes(value: number) {
  if (value > 1024 * 1024 * 1024) return `${(value / 1024 / 1024 / 1024).toFixed(2)} GB`;
  if (value > 1024 * 1024) return `${(value / 1024 / 1024).toFixed(2)} MB`;
  return `${value} B`;
}
