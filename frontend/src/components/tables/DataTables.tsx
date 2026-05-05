import type { FlowResult, GroupMatch, PacketRow } from "../../types";
import { riskClass, riskText } from "../../utils/riskLevel";

export function PacketTable({ rows }: { rows: PacketRow[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Time</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Protocol</th>
            <th>Length</th>
            <th>Info</th>
            <th>加密标签</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.no}>
              <td>{row.no}</td>
              <td>{row.time}</td>
              <td>{row.source}</td>
              <td>{row.destination}</td>
              <td>{row.protocol}</td>
              <td>{row.length}</td>
              <td>{row.info}</td>
              <td><span className="tag">{row.encryptedTag}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FlowResultTable({ rows, mode = "vpn" }: { rows: FlowResult[]; mode?: "vpn" | "sim" }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Flow ID</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Protocol</th>
            <th>Packet Count</th>
            <th>{mode === "vpn" ? "VPN Probability" : "SIM Probability"}</th>
            <th>Prediction</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.flowId}>
              <td>{row.flowId}</td>
              <td>{row.source}</td>
              <td>{row.destination}</td>
              <td>{row.protocol}</td>
              <td>{row.packetCount}</td>
              <td>{Math.round((mode === "vpn" ? row.vpnProbability : row.simProbability) * 100)}%</td>
              <td>{row.prediction}</td>
              <td>{Math.round(row.confidence * 100)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GroupMatchTable({ rows, onSelect }: { rows: GroupMatch[]; onSelect?: (id: string) => void }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Group ID</th>
            <th>Group Name</th>
            <th>Platform</th>
            <th>Match Probability</th>
            <th>Risk Level</th>
            <th>Evidence Count</th>
            <th>Last Active Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.groupId} onClick={() => onSelect?.(row.groupId)}>
              <td>{row.groupId}</td>
              <td>{row.groupName}</td>
              <td>{row.platform}</td>
              <td>{Math.round(row.probability * 100)}%</td>
              <td><span className={`risk-chip ${riskClass(row.riskLevel)}`}>{riskText(row.riskLevel)}</span></td>
              <td>{row.evidenceCount}</td>
              <td>{row.lastActiveTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
