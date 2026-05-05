import { Download, Eye, FileJson, Image, Maximize2, Printer, Search, Table2 } from "lucide-react";
import { useMemo, useState } from "react";
import { BarChart, DonutChart } from "../../components/charts/Charts";
import { PageHeader } from "../../components/layout/AppLayout";
import { historyTasks } from "../../data/tasks";
import type { AnalysisTask, RiskLevel } from "../../types";
import { exportCsv, exportJson } from "../../utils/exportReport";
import { riskClass } from "../../utils/riskLevel";
import { useUiStore } from "../../store/uiStore";

export function ReportsPage() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(historyTasks[0].taskId);
  const [filter, setFilter] = useState<"all" | "high" | "completed">("all");
  const [page, setPage] = useState(1);
  const [previewExpanded, setPreviewExpanded] = useState(false);
  const setToast = useUiStore((state) => state.setToast);

  const riskForIndex = (index: number): RiskLevel => (index === 0 ? "critical" : index === 1 ? "high" : "medium");

  const filteredTasks = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return historyTasks.filter((task, index) => {
      const matchesKeyword = !keyword || [task.taskId, task.taskName, task.fileName, task.status].some((value) => value.toLowerCase().includes(keyword));
      const matchesFilter =
        filter === "all" ||
        (filter === "high" && ["critical", "high"].includes(riskForIndex(index))) ||
        (filter === "completed" && task.status === "success");
      return matchesKeyword && matchesFilter;
    });
  }, [query, filter]);

  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageTasks = filteredTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const selected = filteredTasks.find((task) => task.taskId === selectedId) ?? filteredTasks[0] ?? historyTasks[0];
  const selectedRisk: RiskLevel = selected.groupMatch[0]?.riskLevel ?? "medium";

  const setReportFilter = (nextFilter: typeof filter) => {
    setFilter(nextFilter);
    setPage(1);
    setToast(nextFilter === "all" ? "报告筛选：全部" : nextFilter === "high" ? "报告筛选：高风险" : "报告筛选：已完成");
  };

  const exportRows = (task: AnalysisTask) => [
    ["task", task.taskId],
    ["file", task.fileName],
    ["vpn_ratio", String(task.vpnResult.vpnRatio)],
    ["sim_ratio", String(task.simResult.simRatio)],
    ["behavior", task.behaviorResult.topBehavior],
    ["group", task.groupMatch[0]?.groupName ?? ""]
  ];

  return (
    <>
      <PageHeader
        eyebrow="Report Center"
        title="分析报告中心"
        description="输出报告总览、分类结论、行为画像、群组关联、置信度说明，并支持 PDF / CSV / JSON / PNG 导出。"
        action={<div className="page-actions"><button className="secondary-button" onClick={() => { window.print(); setToast("打印任务已创建"); }}><Printer size={16} />打印</button><button className="secondary-button" onClick={() => { setPreviewExpanded((value) => !value); setToast(previewExpanded ? "报告预览已恢复标准视图" : "报告预览已切换到全屏阅读模式"); }}><Maximize2 size={16} />{previewExpanded ? "标准查看" : "全屏查看"}</button></div>}
      />
      <section className={`report-layout rich-report ${previewExpanded ? "preview-expanded" : ""}`}>
        <aside className="panel report-sidebar">
          <div className="panel-title"><h2>报告列表</h2><span>{filteredTasks.length} reports</span></div>
          <label className="search-box"><Search size={16} /><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="搜索报告编号、任务名或文件名" /></label>
          <div className="segmented">
            <button className={filter === "all" ? "active" : ""} onClick={() => setReportFilter("all")}>全部</button>
            <button className={filter === "high" ? "active" : ""} onClick={() => setReportFilter("high")}>高风险</button>
            <button className={filter === "completed" ? "active" : ""} onClick={() => setReportFilter("completed")}>已完成</button>
          </div>
          <div className="report-card-list">
            {pageTasks.map((task) => {
              const index = historyTasks.findIndex((item) => item.taskId === task.taskId);
              const risk = riskForIndex(index);
              return (
              <button key={task.taskId} className={task.taskId === selected.taskId ? "active" : ""} onClick={() => { setSelectedId(task.taskId); setToast(`${task.taskName} 报告已载入`); }}>
                <span>RPT-{task.taskId.slice(-4)}</span>
                <strong>{task.taskName}</strong>
                <small>{task.fileName}</small>
                <em>{task.createdAt}</em>
                <b className={`risk-chip ${riskClass(risk)}`}>{risk === "critical" ? "极高" : risk === "high" ? "高" : "中"}</b>
              </button>
            );})}
          </div>
          <div className="pagination-row">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button key={pageNumber} className={`icon-button ${pageNumber === currentPage ? "active" : ""}`} onClick={() => { setPage(pageNumber); setToast(`已切换到第 ${pageNumber} 页`); }}>{pageNumber}</button>
            ))}
            <span>第 {currentPage} / {totalPages} 页</span>
          </div>
        </aside>
        <article className="report-preview">
          <header><span>TrafficVigil Report</span><strong>{selected.taskId}</strong></header>
          <h2>加密流量综合分析报告</h2>
          <p>基础信息：输入文件 {selected.fileName}，数据包 {selected.capture.packetCount.toLocaleString()}，加密流量占比 {Math.round(selected.capture.encryptedRatio * 100)}%。</p>
          <div className="mini-metrics">
            <div><span>VPN 分类</span><strong>{Math.round(selected.vpnResult.vpnRatio * 100)}%</strong></div>
            <div><span>SIM 分类</span><strong>{Math.round(selected.simResult.simRatio * 100)}%</strong></div>
            <div><span>行为嗅探</span><strong>{Math.round(selected.behaviorResult.confidence * 100)}%</strong></div>
            <div><span>群组关联</span><strong>89.4%</strong></div>
          </div>
          <section className="report-section-grid">
            <div><h3>分类结论</h3><p>VPN 占比 {Math.round(selected.vpnResult.vpnRatio * 100)}%，SIM 占比 {Math.round(selected.simResult.simRatio * 100)}%，应用 Top1 为 {selected.simResult.appTop1}。</p></div>
            <div><h3>行为画像</h3><p>{selected.behaviorResult.topBehavior} 概率 {Math.round(selected.behaviorResult.confidence * 100)}%，file 与 photo 行为处于高活跃区间。</p></div>
            <div><h3>群组关联</h3><p>命中 {selected.groupMatch[0].groupName}，证据链 {selected.groupMatch[0].evidenceCount} 条，关联设备 {selected.groupMatch[0].deviceCount} 台。</p></div>
            <div><h3>置信度说明</h3><p>模型综合协议分布、包长序列、时序间隔、跨协议交互特征给出最终研判。</p></div>
          </section>
          <p>风险研判：最高置信度 {Math.round(selected.groupMatch[0].probability * 100)}%，风险等级 <span className={riskClass(selectedRisk)}>极高</span>。</p>
        </article>
        <aside className="panel">
          <div className="panel-title"><h2>报告导出</h2><span>export panel</span></div>
          <div className="button-column">
            <button className="secondary-button" onClick={() => { window.print(); setToast("PDF 导出流程已启动"); }}><Download size={16} />导出 PDF</button>
            <button className="secondary-button" onClick={() => { exportCsv("trafficvigil-report.csv", exportRows(selected)); setToast("CSV 已导出"); }}><Table2 size={16} />导出 CSV</button>
            <button className="secondary-button" onClick={() => { exportJson("trafficvigil-report.json", selected); setToast("JSON 已导出"); }}><FileJson size={16} />导出 JSON</button>
            <button className="secondary-button" onClick={() => { exportJson("trafficvigil-report-image-manifest.json", { taskId: selected.taskId, type: "PNG 长图" }); setToast("PNG 长图导出任务已创建"); }}><Image size={16} />导出 PNG 长图</button>
          </div>
          <DonutChart segments={[{ label: "risk", value: 91, color: "var(--red)" }, { label: "rest", value: 9, color: "rgba(255,255,255,.16)" }]} centerValue="91%" centerLabel="风险指数" />
          <BarChart rows={Object.entries(selected.behaviorResult.distribution).slice(0, 4).map(([label, value]) => ({ label, value: Math.round(value * 100) }))} />
        </aside>
      </section>
    </>
  );
}
