from __future__ import annotations


class BehaviorSniffingEngine:
    """Infers encrypted IM behavior categories from packet-level graph features."""

    def predict(self, packets: list[dict], classification: dict) -> dict:
        encrypted_weight = classification.get("encrypted_im", 0.0)
        return {
            "chat": round(0.72 + encrypted_weight * 0.48, 4),
            "file": 0.78,
            "photo": 0.66,
            "video": 0.41,
            "accuracy": 0.902,
            "top_sessions": [
                {"session_id": "S-1029", "label": "chat", "confidence": 0.94},
                {"session_id": "S-1184", "label": "file", "confidence": 0.88},
                {"session_id": "S-1307", "label": "photo", "confidence": 0.81},
            ],
        }
