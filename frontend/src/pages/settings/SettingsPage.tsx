import { RotateCcw, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "../../components/layout/AppLayout";
import { historyTasks } from "../../store/analysisStore";
import { logRows } from "../../data/series";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";

export function SettingsPage() {
  const user = useAuthStore((state) => state.user);
  const setToast = useUiStore((state) => state.setToast);
  const [query, setQuery] = useState("");
  const filtered = historyTasks.filter((task) => task.fileName.includes(query) || task.taskName.includes(query));
  return (
    <>
      <PageHeader
        eyebrow="History & Settings"
        title="任务历史与系统设置"
        description="包含历史任务筛选、任务复现、模型配置、协议适配、用户权限、系统日志和 API 延迟监测。"
      />
      <section className="workspace-grid">
        <article className="panel">
          <div className="panel-title"><h2>历史任务</h2><span>{filtered.length} tasks</span></div>
          <label className="search-box"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索文件名或任务名" /></label>
          <div className="table-wrap">
            <table>
              <thead><tr><th>任务</th><th>文件</th><th>状态</th><th>时间</th><th>操作</th></tr></thead>
              <tbody>
                {filtered.map((task) => (
                  <tr key={task.taskId}>
                    <td>{task.taskName}</td><td>{task.fileName}</td><td>{task.status}</td><td>{task.createdAt}</td>
                    <td><button className="icon-button" aria-label="复现" onClick={() => setToast(`${task.taskName} 已进入复现队列`)}><RotateCcw size={16} /></button><button className="icon-button" aria-label="删除" onClick={() => setToast(`${task.taskName} 已移入回收站`)}><Trash2 size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <article className="panel">
          <div className="panel-title"><h2>系统设置</h2><span>{user?.role}</span></div>
          <div className="form-grid">
            <label>用户信息<input name="settings-user" aria-label="用户信息" value={`${user?.username} / ${user?.organization}`} readOnly /></label>
            <label>模型选择<select name="settings-model" aria-label="模型选择"><option>TrafficVigil-GNN-v1</option><option>ET-BERT compatible</option><option>GraphDApp baseline</option></select></label>
            <label>协议适配<select name="settings-protocol" aria-label="协议适配"><option>TLS1.3 / QUIC / WireGuard 开启</option><option>仅 TLS1.3</option></select></label>
            <label>默认检测模式<select name="settings-mode" aria-label="默认检测模式"><option>完整检测</option><option>快速检测</option></select></label>
            <label>报告模板<select name="settings-report" aria-label="报告模板"><option>标准分析报告模板</option><option>安全运营研判版</option></select></label>
            <label>数据脱敏<select name="settings-mask" aria-label="数据脱敏"><option>启用 IP 与设备标识脱敏</option><option>保留授权实验字段</option></select></label>
            <label>主题切换<select name="settings-theme" aria-label="主题切换"><option>深色安全态势</option><option>浅色报告模式</option></select></label>
          </div>
        </article>
      </section>
      <section className="panel">
        <div className="panel-title"><h2>系统日志</h2><span>login / upload / inference / report / error</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>时间</th><th>类型</th><th>事件</th><th>API 延迟</th></tr></thead>
            <tbody>{logRows.map((row) => <tr key={row.join("-")}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </section>
    </>
  );
}
