import { useEffect, useState } from "react";

const protocols = ["TLS1.3", "QUIC", "WireGuard", "TCP", "UDP"];
const apps = ["Telegram", "WhatsApp", "Signal", "WeChat", "Unknown"];

type StreamRow = {
  id: string;
  time: string;
  protocol: string;
  app: string;
  length: number;
  score: number;
};

function makeRow(index: number): StreamRow {
  const now = new Date();
  return {
    id: `PKT-${String(9000 + index).slice(-4)}`,
    time: now.toLocaleTimeString("zh-CN", { hour12: false }),
    protocol: protocols[index % protocols.length],
    app: apps[(index * 2) % apps.length],
    length: 180 + ((index * 137) % 1300),
    score: 62 + ((index * 7) % 36)
  };
}

export function LivePacketStream() {
  const [rows, setRows] = useState<StreamRow[]>(() => Array.from({ length: 8 }, (_, index) => makeRow(index)));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRows((current) => [makeRow(Date.now() % 1000), ...current.slice(0, 7)]);
    }, 1200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="live-stream">
      {rows.map((row) => (
        <div key={`${row.id}-${row.time}-${row.length}`}>
          <span>{row.time}</span>
          <strong>{row.protocol}</strong>
          <em>{row.app}</em>
          <b>{row.length}B</b>
          <i>{row.score}%</i>
        </div>
      ))}
    </div>
  );
}
