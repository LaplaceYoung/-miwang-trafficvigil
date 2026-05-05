from __future__ import annotations

from datetime import datetime, timezone


class ReportBuilder:
    """Builds a structured analysis report for the TrafficVigil dashboard."""

    def build(
        self,
        task_id: str,
        packets: list[dict],
        classification: dict,
        behavior: dict,
        grouping: dict,
    ) -> dict:
        return {
            "task_id": task_id,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "packet_count": len(packets),
            "classification": classification,
            "behavior": behavior,
            "grouping": grouping,
            "recommendation": "建议进入人工复核流程，结合授权日志和业务上下文完成处置闭环。",
        }
