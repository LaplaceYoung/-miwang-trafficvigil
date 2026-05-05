import { Boxes, BrainCircuit, Cpu, GitBranch, ShieldCheck } from "lucide-react";
import { BarChart } from "../../components/charts/Charts";
import { PageHeader } from "../../components/layout/AppLayout";
import { performanceRows } from "../../data/series";
import { useUiStore } from "../../store/uiStore";

export function ModelPage() {
  const setToast = useUiStore((state) => state.setToast);
  const statusCards = [
    { label: "当前模型", value: "TV-GNN v1", icon: BrainCircuit },
    { label: "在线实例", value: "12", icon: Cpu },
    { label: "融合图层", value: "3", icon: GitBranch },
    { label: "安全状态", value: "Trusted", icon: ShieldCheck }
  ];
  return (
    <>
      <PageHeader
        eyebrow="Model & Technology"
        title="模型与技术展示"
        description="集中呈现系统模型能力、特征建模方法、图神经网络结构、多模态融合机制和性能指标。"
        action={<div className="page-actions"><button className="secondary-button" onClick={() => setToast("模型评测记录已导出")}>导出评测</button><button className="secondary-button" onClick={() => setToast("TrafficVigil-GNN-v1 已设为当前版本")}>启用版本</button></div>}
      />
      <section className="metric-grid five model-status-grid">
        {statusCards.map(({ label, value, icon: Icon }) => (
          <article key={label} className="metric-card">
            <Icon className="metric-icon" size={22} />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
        <article className="metric-card">
          <Boxes className="metric-icon" size={22} />
          <span>基线对比</span>
          <strong>+7.8%</strong>
        </article>
      </section>
      <section className="architecture-board">
        {[
          ["特征建模", "通用流量预训练、SIM 微调、对抗性噪声增强、新协议适配"],
          ["流量分类", "VPN/非 VPN、SIM/非 SIM、应用类型识别、协议理解任务"],
          ["行为关联", "Header Graph、Payload Graph、Fusion Graph、GNN Encoder"],
          ["报告输出", "分类结论、行为画像、群组关联、置信度说明和导出"]
        ].map(([title, desc], index) => (
          <article key={title} onClick={() => setToast(`${title} 技术详情已展开`)}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{desc}</p></article>
        ))}
      </section>
      <section className="workspace-grid">
        <article className="panel">
          <div className="panel-title"><h2>双粒度 GNN 展示</h2><span>GraphSAGE / GATv2</span></div>
          <div className="model-graph">
            <div>字节级图</div><i></i><div>流量级拓扑图</div><i></i><div>特征融合模块</div><i></i><div>GATv2 推理</div>
          </div>
        </article>
        <article className="panel">
          <div className="panel-title"><h2>性能对比</h2><span>TrafficVigil vs baselines</span></div>
          <BarChart rows={performanceRows.map((row) => ({ label: row.model, value: Math.round(row.accuracy) }))} />
        </article>
      </section>
      <section className="panel">
        <div className="panel-title"><h2>对比表</h2><span>from work book</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>模型</th><th>Accuracy</th><th>F1</th><th>吞吐量</th></tr></thead>
            <tbody>{performanceRows.map((row) => <tr key={row.model}><td>{row.model}</td><td>{row.accuracy}%</td><td>{row.f1}%</td><td>{row.throughput}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </>
  );
}
