import { Fragment } from "react";
import { Download, Save } from "lucide-react";
import { BarChart, DonutChart } from "../../components/charts/Charts";
import { PageHeader } from "../../components/layout/AppLayout";
import { FlowResultTable } from "../../components/tables/DataTables";
import { currentTask, flowResults } from "../../data/tasks";
import { useUiStore } from "../../store/uiStore";

const apps = Object.entries(currentTask.simResult.apps);

export function SimAnalysisPage() {
  const setToast = useUiStore((state) => state.setToast);
  return (
    <>
      <PageHeader
        eyebrow="SIM Analysis"
        title="SIM 加密即时通信分析"
        description="从混合流量中提取 SIM 流量，识别 Telegram、WhatsApp、Signal、WeChat、QQ、Unknown 等应用，为行为嗅探和群组匹配提供输入。"
        action={<button className="primary-button" onClick={() => setToast("SIM 分类与应用识别已完成")}>开始 SIM 分类</button>}
      />
      <section className="workspace-grid">
        <article className="panel">
          <div className="panel-title"><h2>SIM / 非 SIM 分类</h2><span>accuracy 98.7%</span></div>
          <DonutChart segments={[{ label: "SIM", value: 42, color: "var(--cyan)" }, { label: "Non-SIM", value: 58, color: "var(--violet)" }]} centerValue="98.7%" centerLabel="准确率" />
        </article>
        <article className="panel">
          <div className="panel-title"><h2>IM 应用识别</h2><span>top1 Telegram</span></div>
          <BarChart rows={apps.map(([label, value]) => ({ label, value: Math.round(value * 100) }))} />
        </article>
      </section>
      <section className="panel">
        <div className="panel-title"><h2>应用概率矩阵</h2><span>flow x app confidence</span></div>
        <div className="matrix">
          <div className="matrix-head">Flow</div>
          {apps.map(([app]) => <div className="matrix-head" key={app}>{app}</div>)}
          {flowResults.slice(0, 8).map((flow, index) => (
            <Fragment key={flow.flowId}>
              <div key={`${flow.flowId}-id`} className="matrix-id">{flow.flowId}</div>
              {apps.map(([app, base]) => {
                const value = Math.max(0.12, Math.min(0.97, base - index * 0.03 + (app.length % 3) * 0.04));
                return <div key={`${flow.flowId}-${app}`} className={value > 0.7 ? "cell high" : value > 0.45 ? "cell medium" : "cell low"}>{Math.round(value * 100)}%</div>;
              })}
            </Fragment>
          ))}
        </div>
      </section>
      <section className="panel">
        <div className="panel-title"><h2>分类后流量管理</h2><span>filtered exports</span></div>
        <div className="button-row"><button className="secondary-button" onClick={() => setToast("Telegram 流量已保存")}><Save size={16} />保存 Telegram 流量</button><button className="secondary-button" onClick={() => setToast("WhatsApp 流量已保存")}><Save size={16} />保存 WhatsApp 流量</button><button className="secondary-button" onClick={() => setToast("Signal 流量已保存")}><Save size={16} />保存 Signal 流量</button><button className="secondary-button" onClick={() => setToast("filtered_sim_traffic.pcap 已导出")}><Download size={16} />导出 filtered_sim_traffic.pcap</button></div>
      </section>
      <section className="panel">
        <div className="panel-title"><h2>分类结果表格</h2><span>top1 / top2 labels</span></div>
        <FlowResultTable rows={flowResults} mode="sim" />
      </section>
    </>
  );
}
