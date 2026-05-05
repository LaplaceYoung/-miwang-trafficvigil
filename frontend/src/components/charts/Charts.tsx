type PointChartProps = {
  values: number[];
  labels?: string[];
  color?: string;
  area?: boolean;
};

export function LineAreaChart({ values, color = "var(--cyan)", area = true }: PointChartProps) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100;
    const y = 88 - ((value - min) / Math.max(max - min, 1)) * 70;
    return `${x},${y}`;
  });
  const areaPoints = `0,100 ${points.join(" ")} 100,100`;
  return (
    <svg className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label={`趋势图 ${values.join(", ")}`}>
      {[20, 40, 60, 80].map((y) => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} className="chart-grid-line" />
      ))}
      {area && <polygon points={areaPoints} fill={color} opacity="0.12" />}
      <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      {points.map((point, index) => {
        const [x, y] = point.split(",").map(Number);
        return <circle key={index} cx={x} cy={y} r="1.4" fill={color} vectorEffect="non-scaling-stroke" />;
      })}
    </svg>
  );
}

export function DonutChart({
  segments,
  centerValue = "94%",
  centerLabel = "success"
}: {
  segments: { label: string; value: number; color: string }[];
  centerValue?: string;
  centerLabel?: string;
}) {
  let offset = 0;
  return (
    <div className="donut-wrap" title={segments.map((segment) => `${segment.label}: ${segment.value}%`).join(" / ")}>
      <svg viewBox="0 0 42 42" className="donut">
        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        {segments.map((segment) => {
          const dash = `${segment.value} ${100 - segment.value}`;
          const node = (
            <circle
              key={segment.label}
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke={segment.color}
              strokeWidth="7"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
            />
          );
          offset += segment.value;
          return node;
        })}
      </svg>
      <div className="donut-center">
        <strong>{centerValue}</strong>
        <span>{centerLabel}</span>
      </div>
      <div className="donut-legend">
        {segments.map((segment) => (
          <span key={segment.label}>
            <i style={{ background: segment.color }} />
            {segment.label} {segment.value}%
          </span>
        ))}
      </div>
    </div>
  );
}

export function BarChart({ rows }: { rows: { label: string; value: number; color?: string }[] }) {
  return (
    <div className="bar-chart">
      {rows.map((row) => (
        <label key={row.label} title={`${row.label}: ${row.value}%`}>
          <span>{row.label}</span>
          <i>
            <b style={{ width: `${row.value}%`, background: row.color }} />
          </i>
          <strong>{row.value}%</strong>
        </label>
      ))}
    </div>
  );
}

export function MiniSparkline({ values, color = "var(--cyan)" }: { values: number[]; color?: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((value, index) => {
    const x = 5 + (index / Math.max(values.length - 1, 1)) * 90;
    const y = 30 - ((value - min) / Math.max(max - min, 1)) * 24;
    return `${x},${y}`;
  });

  return (
    <svg className="mini-sparkline" viewBox="0 0 100 36" preserveAspectRatio="none" role="img" aria-label={`趋势序列 ${values.join(", ")}`}>
      <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
      {points.map((point, index) => {
        const [x, y] = point.split(",").map(Number);
        return <circle key={index} cx={x} cy={y} r="1.1" fill={color} vectorEffect="non-scaling-stroke" />;
      })}
    </svg>
  );
}

export function GaugeRing({
  value,
  label,
  color = "var(--cyan)"
}: {
  value: number;
  label: string;
  color?: string;
}) {
  const dash = `${value} ${100 - value}`;
  return (
    <div className="gauge-ring" title={`${label}: ${value}%`}>
      <svg viewBox="0 0 42 42">
        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle
          cx="21"
          cy="21"
          r="15.915"
          fill="transparent"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={dash}
          strokeDashoffset="25"
          strokeLinecap="round"
        />
      </svg>
      <strong>{value}%</strong>
      <span>{label}</span>
    </div>
  );
}

export function RadarChart({ values }: { values: Record<string, number> }) {
  const entries = Object.entries(values);
  const center = 50;
  const radius = 35;
  const points = entries
    .map(([, value], index) => {
      const angle = (Math.PI * 2 * index) / entries.length - Math.PI / 2;
      return `${center + Math.cos(angle) * radius * value},${center + Math.sin(angle) * radius * value}`;
    })
    .join(" ");

  return (
    <svg className="radar" viewBox="0 0 100 100" role="img" aria-label={entries.map(([label, value]) => `${label}: ${Math.round(value * 100)}%`).join(" / ")}>
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <circle key={scale} cx="50" cy="50" r={radius * scale} />
      ))}
      <polygon points={points} />
      {entries.map(([label], index) => {
        const angle = (Math.PI * 2 * index) / entries.length - Math.PI / 2;
        return (
          <text key={label} x={center + Math.cos(angle) * 45} y={center + Math.sin(angle) * 45}>
            {label}
          </text>
        );
      })}
    </svg>
  );
}
