from __future__ import annotations

from dataclasses import dataclass

from trafficvigil.behavior.engine import BehaviorSniffingEngine
from trafficvigil.capture.reader import PcapReader
from trafficvigil.classification.engine import TrafficClassificationEngine
from trafficvigil.grouping.engine import GroupAttributionEngine
from trafficvigil.reporting.report import ReportBuilder


@dataclass(frozen=True)
class AnalysisRequest:
    pcap_path: str
    task_id: str = "trafficvigil-task"


class TrafficVigilPipeline:
    """End-to-end encrypted traffic analysis pipeline."""

    def __init__(self) -> None:
        self.reader = PcapReader()
        self.classifier = TrafficClassificationEngine()
        self.behavior = BehaviorSniffingEngine()
        self.grouping = GroupAttributionEngine()
        self.reporter = ReportBuilder()

    def run(self, request: AnalysisRequest) -> dict:
        packets = self.reader.load(request.pcap_path)
        classification = self.classifier.predict(packets)
        behavior = self.behavior.predict(packets, classification)
        groups = self.grouping.match(packets, behavior)
        return self.reporter.build(request.task_id, packets, classification, behavior, groups)
