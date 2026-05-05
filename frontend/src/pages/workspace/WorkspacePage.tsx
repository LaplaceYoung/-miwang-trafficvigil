import { FileText, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/layout/AppLayout";
import { BarChart, GaugeRing, LineAreaChart } from "../../components/charts/Charts";
import { DetectionPipeline } from "../../components/flow/DetectionPipeline";
import { LivePacketStream } from "../../components/charts/LivePacketStream";
import { useAnalysisStore } from "../../store/analysisStore";
import { useUiStore } from "../../store/uiStore";
import { packetPerMinute } from "../../data/series";

export function WorkspacePage() {
  const { task, wizardSteps, runWizard } = useAnalysisStore();
  const setToast = useUiStore((state) => state.setToast);
  const navigate = useNavigate();
  const startRun = () => {
    runWizard();
    setToast("综合检测流程已启动");
  };
  return (
    <>
      <PageHeader
        eyebrow="Detection Workspace"
        title="综合检测工作台"
        description="综合检测核心页面，以 Step Wizard 完整执行选择流量数据、预处理、VPN 分类、SIM 分类、应用识别、行为嗅探、群组匹配和报告生成。"
        action={<button className="primary-button" onClick={startRun}><PlayCircle size={17} />开始综合检测</button>}
      />
      <section className="panel workspace-command">
        <div className="form-grid command-grid">
          <label>选择已有 PCAP<select name="workspace-pcap" aria-label="选择已有 PCAP"><option>{task.fileName}</option><option>telegram-lab-iscx.pcapng</option></select></label>
          <label>检测模式<select name="workspace-mode" aria-label="检测模式"><option>完整检测</option><option>快速检测</option><option>行为专项检测</option><option>群组专项检测</option></select></label>
          <label>目标协议<select name="workspace-protocols" aria-label="目标协议"><option>TLS 1.3 / QUIC / WireGuard</option><option>TLS 1.3</option><option>QUIC</option></select></label>
          <label>目标应用<select name="workspace-apps" aria-label="目标应用"><option>Telegram / WhatsApp / Signal / WeChat / QQ / Unknown</option><option>Telegram</option><option>Signal</option></select></label>
          <button className="primary-button" onClick={startRun}><PlayCircle size={17} />运行</button>
        </div>
      </section>
      <section className="workspace-grid wide-left">
        <article className="panel">
          <div className="panel-title"><h2>八步检测流程</h2><span>{task.taskId}</span></div>
          <DetectionPipeline steps={wizardSteps} />
        </article>
        <article className="panel">
          <div className="panel-title"><h2>综合结果面板</h2><span>auto summary</span></div>
          <div className="mini-metrics">
            <div><span>VPN 置信度</span><strong>87%</strong></div>
            <div><span>SIM 置信度</span><strong>98.7%</strong></div>
            <div><span>风险等级</span><strong>高</strong></div>
          </div>
          <h3>应用分类 Top 3</h3>
          <BarChart rows={[{ label: "Telegram", value: 86 }, { label: "WhatsApp", value: 64 }, { label: "Signal", value: 57 }]} />
          <h3>行为分类 Top 3</h3>
          <BarChart rows={[{ label: "chat", value: 92 }, { label: "file", value: 78 }, { label: "photo", value: 66 }]} />
          <h3>群组匹配 Top 5</h3>
          <BarChart rows={task.groupMatch.map((group) => ({ label: group.groupName, value: Math.round(group.probability * 100) }))} />
          <button className="primary-button full" onClick={() => { setToast("分析报告已生成"); navigate("/reports"); }}><FileText size={17} />一键生成报告</button>
        </article>
      </section>
      <section className="inference-grid">
        <article className="panel">
          <div className="panel-title"><h2>模型推理实时事件</h2><span>packet and inference stream</span></div>
          <LivePacketStream />
        </article>
        <article className="panel inference-lab">
          <div className="panel-title"><h2>特征匹配强度</h2><span>feature signal</span></div>
          <GaugeRing value={87} label="VPN" color="var(--orange)" />
          <GaugeRing value={99} label="SIM" color="var(--green)" />
          <GaugeRing value={91} label="Group" color="var(--red)" />
        </article>
        <article className="panel">
          <div className="panel-title"><h2>推理吞吐趋势</h2><span>packets per minute</span></div>
          <LineAreaChart values={packetPerMinute.slice(2)} color="var(--blue)" />
        </article>
      </section>
    </>
  );
}
