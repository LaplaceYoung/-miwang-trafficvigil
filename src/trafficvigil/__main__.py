from __future__ import annotations

import argparse
import json
from pathlib import Path

from trafficvigil.pipeline import AnalysisRequest, TrafficVigilPipeline


def main() -> None:
    parser = argparse.ArgumentParser(description="Run TrafficVigil encrypted traffic analysis.")
    parser.add_argument("pcap_path", help="Path to the PCAP or PCAPNG file.")
    parser.add_argument("--task-id", default="trafficvigil-task", help="Analysis task identifier.")
    parser.add_argument("--output", default="", help="Optional JSON output path.")
    args = parser.parse_args()

    report = TrafficVigilPipeline().run(AnalysisRequest(pcap_path=args.pcap_path, task_id=args.task_id))
    payload = json.dumps(report, ensure_ascii=False, indent=2)

    if args.output:
        output = Path(args.output)
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(payload, encoding="utf-8")
    else:
        print(payload)


if __name__ == "__main__":
    main()
