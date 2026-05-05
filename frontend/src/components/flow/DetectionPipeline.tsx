import { CheckCircle2, Clock3, Loader2, TriangleAlert } from "lucide-react";

export function DetectionPipeline({
  steps
}: {
  steps: { label: string; status: "pending" | "running" | "success" | "warning"; summary: string }[];
}) {
  const icons = {
    pending: <Clock3 size={18} />,
    running: <Loader2 size={18} className="spin" />,
    success: <CheckCircle2 size={18} />,
    warning: <TriangleAlert size={18} />
  };

  return (
    <div className="pipeline-list">
      {steps.map((step, index) => (
        <article key={step.label} className={`pipeline-step ${step.status}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{step.label}</h3>
            <p>{step.summary}</p>
          </div>
          {icons[step.status]}
        </article>
      ))}
    </div>
  );
}

export function ProcessOverview() {
  const steps = ["流量捕获", "多层分类", "行为嗅探", "智能识别", "报告生成"];
  return (
    <div className="process-overview">
      {steps.map((step, index) => (
        <div key={step}>
          <span>{index + 1}</span>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}
