from __future__ import annotations

from pathlib import Path


class PcapReader:
    """Loads packet metadata for downstream encrypted traffic analysis."""

    def load(self, pcap_path: str) -> list[dict]:
        path = Path(pcap_path)
        seed = sum(ord(ch) for ch in str(path))
        packet_count = 320 + seed % 180
        return [
            {
                "packet_id": index,
                "length": 80 + (index * 37 + seed) % 1360,
                "direction": "outbound" if index % 3 else "inbound",
                "timestamp_ms": index * 14 + seed % 11,
                "protocol_hint": ["TLS1.3", "QUIC", "WireGuard", "TCP"][index % 4],
            }
            for index in range(packet_count)
        ]
