import type { GroupMatch } from "../../types";
import { riskClass } from "../../utils/riskLevel";

export function RelationGraph({
  groups,
  selectedId,
  onSelect
}: {
  groups: GroupMatch[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const active = groups.find((group) => group.groupId === selectedId) ?? groups[0];
  const groupNodes = groups.map((group, index) => {
    const angle = -1.1 + index * (2.2 / Math.max(groups.length - 1, 1));
    return {
      group,
      x: 675 + Math.cos(angle) * 82,
      y: 230 + Math.sin(angle) * 175
    };
  });

  return (
    <div className="relation-graph">
      <svg viewBox="0 0 900 460" role="img" aria-label="用户-设备-群组三维关系图谱">
        <defs>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <line x1="210" y1="180" x2="430" y2="230" />
        <line x1="210" y1="310" x2="430" y2="230" />
        {groupNodes.map(({ group, x, y }) => (
          <line key={`${group.groupId}-edge`} x1="430" y1="230" x2={x} y2={y} />
        ))}
        <circle cx="430" cy="230" r="58" className="node-user" filter="url(#nodeGlow)" />
        <text x="430" y="236">User-A</text>
        <circle cx="210" cy="180" r="44" className="node-device" />
        <text x="210" y="186">Device-01</text>
        <circle cx="210" cy="310" r="44" className="node-device" />
        <text x="210" y="316">Device-02</text>
        {groupNodes.map(({ group, x, y }) => {
          return (
            <g
              key={group.groupId}
              tabIndex={0}
              role="button"
              aria-label={`选择群组 ${group.groupName}`}
              onClick={() => onSelect(group.groupId)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelect(group.groupId);
                }
              }}
              className={selectedId === group.groupId ? "selected" : ""}
            >
              <circle cx={x} cy={y} r={selectedId === group.groupId ? 50 : 38} className={`node-group ${riskClass(group.riskLevel)}`} />
              <text x={x} y={y + 5}>{group.platform}</text>
            </g>
          );
        })}
      </svg>
      <aside>
        <span>当前选中</span>
        <h3>{active.groupName}</h3>
        <p>匹配概率 {Math.round(active.probability * 100)}%，证据链 {active.evidenceCount} 条，关联设备 {active.deviceCount} 台。</p>
      </aside>
    </div>
  );
}
