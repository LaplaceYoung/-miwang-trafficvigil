import { PageHeader } from "../../components/layout/AppLayout";
import { BarChart, DonutChart, LineAreaChart, MiniSparkline } from "../../components/charts/Charts";
import { LivePacketStream } from "../../components/charts/LivePacketStream";
import { ProcessOverview } from "../../components/flow/DetectionPipeline";
import { TrafficScene } from "../../components/three/TrafficScene";
import { currentTask } from "../../data/tasks";
import { encryptedRatioSeries, packetPerMinute } from "../../data/series";
import { riskClass, riskText } from "../../utils/riskLevel";
import { useUiStore } from "../../store/uiStore";

export function DashboardPage() {
  const setToast = useUiStore((state) => state.setToast);
  const metrics = [
    { label: "今日分析任务", value: "1,246", delta: "较昨日 ↑ 18.6%", color: "var(--blue)", series: [18, 24, 19, 31, 28, 35, 38, 32, 41, 39] },
    { label: "已处理 PCAP 文件", value: "3,782", delta: "较昨日 ↑ 22.4%", color: "var(--violet)", series: [20, 18, 26, 23, 31, 27, 34, 29, 36, 33] },
    { label: "混合流量识别成功率", value: "94%", delta: "较昨日 ↑ 2.1%", color: "var(--cyan)", series: [81, 84, 86, 85, 89, 90, 88, 93, 91, 94] },
    { label: "SIM 提取准确率", value: "98.7%", delta: "较昨日 ↑ 1.3%", color: "var(--green)", series: [91, 93, 94, 96, 95, 97, 96, 98, 97, 99] },
    { label: "行为分析准确率", value: "90.2%", delta: "较昨日 ↑ 1.8%", color: "var(--blue)", series: [76, 78, 82, 80, 86, 84, 88, 87, 91, 90] },
    { label: "群组匹配准确率", value: "89.4%", delta: "较昨日 ↑ 1.6%", color: "var(--violet)", series: [70, 74, 73, 79, 82, 81, 85, 84, 88, 89] }
  ];

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="数据中心 Dashboard"
        description="综合展示流量监测系统各项数据，覆盖 6 个主流 IM 应用、94% 混合流量识别成功率和高危公共频道预警。"
        action={<div className="page-actions"><button className="secondary-button" onClick={() => setToast("已切换到今日数据视图")}>今日 2026-05-05</button><button className="secondary-button" onClick={() => setToast("数据中心指标已刷新")}>刷新</button></div>}
      />
      <section className="metric-grid six">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <em>{metric.delta}</em>
            <MiniSparkline values={metric.series} color={metric.color} />
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel span-2">
          <div className="panel-title"><h2>实时流量态势</h2><span>packets / minute</span></div>
          <LineAreaChart values={packetPerMinute} color="var(--cyan)" />
        </article>
        <article className="panel">
          <div className="panel-title"><h2>流量比例</h2><span>normal / vpn / sim</span></div>
          <DonutChart segments={[
            { label: "普通", value: 31, color: "var(--blue)" },
            { label: "VPN", value: 27, color: "var(--orange)" },
            { label: "SIM", value: 42, color: "var(--cyan)" }
          ]} centerValue="1.82TB" centerLabel="总流量" />
        </article>
        <article className="panel span-2">
          <div className="panel-title"><h2>加密流量占比变化</h2><span>encrypted ratio</span></div>
          <LineAreaChart values={encryptedRatioSeries} color="var(--green)" />
        </article>
        <article className="panel">
          <div className="panel-title"><h2>IM 应用覆盖</h2><span>6 apps</span></div>
          <BarChart rows={Object.entries(currentTask.simResult.apps).map(([label, value]) => ({ label, value: Math.round(value * 100) }))} />
        </article>
      </section>

      <section className="dashboard-grid lower">
        <article className="panel scene-card span-2">
          <div className="panel-title"><h2>网络节点扫描</h2><span>3D traffic field</span></div>
          <TrafficScene />
        </article>
        <article className="panel">
          <div className="panel-title"><h2>高危群组预警</h2><span>risk alerts</span></div>
          <div className="alert-list">
            {currentTask.groupMatch.map((group) => (
              <button className="alert-row" key={group.groupId} onClick={() => setToast(`${group.groupName} 证据链已定位`)}>
                <strong>{group.groupName}</strong>
                <span>{group.platform} / {group.lastActiveTime}</span>
                <b>{Math.round(group.probability * 100)}%</b>
                <em className={riskClass(group.riskLevel)}>{riskText(group.riskLevel)}</em>
                <small>{group.deviceCount} devices</small>
              </button>
            ))}
          </div>
        </article>
        <article className="panel span-3">
          <div className="panel-title"><h2>技术流程概览</h2><span>capture to report</span></div>
          <ProcessOverview />
        </article>
        <article className="panel span-3">
          <div className="panel-title"><h2>实时数据包流</h2><span>live packet stream</span></div>
          <LivePacketStream />
        </article>
      </section>
    </>
  );
}
