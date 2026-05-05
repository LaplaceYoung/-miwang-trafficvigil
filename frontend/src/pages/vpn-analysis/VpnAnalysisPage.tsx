import { Download, Save } from "lucide-react";
import { BarChart, DonutChart, LineAreaChart } from "../../components/charts/Charts";
import { PageHeader } from "../../components/layout/AppLayout";
import { FlowResultTable } from "../../components/tables/DataTables";
import { flowResults } from "../../data/tasks";
import { packetPerMinute, protocolBars } from "../../data/series";
import { useUiStore } from "../../store/uiStore";

export function VpnAnalysisPage() {
  const setToast = useUiStore((state) => state.setToast);
  return (
    <>
      <PageHeader
        eyebrow="VPN Analysis"
        title="VPN 流量分析"
        description="完成 VPN / 非 VPN 分类、协议识别、流量分布展示和分类结果表输出，支撑后续 SIM 分析。"
        action={<button className="primary-button" onClick={() => setToast("VPN 分类任务已完成")}>开始 VPN 分类</button>}
      />
      <section className="workspace-grid">
        <article className="panel">
          <div className="panel-title"><h2>PCAP 输入区</h2><span>TV-0427</span></div>
          <div className="form-grid">
            <label>上传 PCAP<input value="campus-gateway-2026-05-05.pcapng" readOnly /></label>
            <label>选择历史任务<select><option>校园网关加密 IM 流量综合检测</option><option>WireGuard 混合流量评估</option></select></label>
          </div>
          <div className="button-row"><button className="secondary-button" onClick={() => setToast("VPN 流量已保存")}><Save size={16} />保存 VPN 流量</button><button className="secondary-button" onClick={() => setToast("VPN 分类结果已导出")}><Download size={16} />导出分类结果</button></div>
        </article>
        <article className="panel">
          <div className="panel-title"><h2>VPN / Non-VPN 环形图</h2><span>classification</span></div>
          <DonutChart segments={[{ label: "VPN", value: 27, color: "var(--orange)" }, { label: "Non-VPN", value: 73, color: "var(--cyan)" }]} centerValue="87%" centerLabel="VPN 置信度" />
        </article>
      </section>
      <section className="dashboard-grid">
        <article className="panel"><div className="panel-title"><h2>协议分布柱状图</h2><span>TLS / QUIC / WireGuard</span></div><BarChart rows={protocolBars} /></article>
        <article className="panel span-2"><div className="panel-title"><h2>流量时间轴</h2><span>packet count</span></div><LineAreaChart values={packetPerMinute} color="var(--orange)" /></article>
      </section>
      <section className="panel">
        <div className="panel-title"><h2>分类结果表</h2><span>flow-level predictions</span></div>
        <FlowResultTable rows={flowResults} mode="vpn" />
      </section>
      <section className="grid-4">
        {["预训练模型", "SODF 多分类任务", "RIFA 数据增强", "协议理解能力"].map((title) => (
          <article className="tech-card" key={title}><h3>{title}</h3><p>模型解释卡展示该模块如何提升 VPN 流量识别的准确性、泛化能力和鲁棒性。</p></article>
        ))}
      </section>
    </>
  );
}
