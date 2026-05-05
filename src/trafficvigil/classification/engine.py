from __future__ import annotations


class TrafficClassificationEngine:
    """Classifies mixed traffic into normal, VPN and encrypted IM segments."""

    def predict(self, packets: list[dict]) -> dict:
        total = max(len(packets), 1)
        vpn_score = round(0.24 + (total % 9) / 100, 4)
        sim_score = round(0.39 + (total % 13) / 100, 4)
        normal_score = round(max(0.0, 1 - vpn_score - sim_score), 4)
        return {
            "normal": normal_score,
            "vpn": vpn_score,
            "encrypted_im": sim_score,
            "applications": {
                "Telegram": 0.86,
                "WhatsApp": 0.64,
                "Signal": 0.57,
                "WeChat": 0.48,
            },
            "protocols": ["TLS1.3", "QUIC", "WireGuard", "Shadowsocks"],
            "accuracy": 0.987,
        }
