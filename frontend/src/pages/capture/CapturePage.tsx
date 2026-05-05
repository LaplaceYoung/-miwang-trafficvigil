import { Copy, Download, Pause, Play, Square } from "lucide-react";
import { useState } from "react";
import { GaugeRing } from "../../components/charts/Charts";
import { PageHeader } from "../../components/layout/AppLayout";
import { PacketTable } from "../../components/tables/DataTables";
import { useAnalysisStore } from "../../store/analysisStore";
import { useUiStore } from "../../store/uiStore";
import { formatBytes } from "../../utils/riskLevel";

export function CapturePage() {
  const { task, packets, uploadProgress, captureRunning, simulateCapture } = useAnalysisStore();
  const setToast = useUiStore((state) => state.setToast);
  const [fileName, setFileName] = useState(task.fileName);
  const [mode, setMode] = useState<"upload" | "realtime">("upload");

  return (
    <>
      <PageHeader
        eyebrow="Capture Center"
        title="流量捕获中心"
        description="完整支持 PCAP 上传与实时端口抓取，两种输入共同构成流量捕获层输入源。"
        action={<div className="task-id-pill"><span>当前任务 ID：{task.taskId}</span><button className="icon-button" aria-label="复制任务 ID" onClick={() => { navigator.clipboard?.writeText(task.taskId); setToast("任务 ID 已复制"); }}><Copy size={16} /></button></div>}
      />
      <section className="capture-layout">
        <article className="panel">
          <div className="panel-title"><h2>PCAP 文件上传</h2><span>{fileName}</span></div>
          <div className="segmented">
            <button className={mode === "upload" ? "active" : ""} onClick={() => { setMode("upload"); setToast("已切换到 PCAP 上传"); }}>上传 PCAP 文件</button>
            <button className={mode === "realtime" ? "active" : ""} onClick={() => { setMode("realtime"); setToast("已切换到实时抓取"); }}>实时抓取端口流量</button>
          </div>
          <label className="upload-zone">
            <input
              type="file"
              accept=".pcap,.pcapng"
              hidden
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  const valid = file.name.endsWith(".pcap") || file.name.endsWith(".pcapng");
                  setFileName(valid ? file.name : "格式错误：仅支持 .pcap / .pcapng");
                  setToast(valid ? `文件 ${file.name} 已加入任务` : "文件格式校验未通过");
                }
              }}
            />
            <strong>{fileName}</strong>
            <span>拖拽或点击上传，自动校验 .pcap / .pcapng 格式</span>
          </label>
          <div className="progress">
            <i style={{ width: `${uploadProgress}%` }} />
            <span>上传 / 抓取进度 {uploadProgress}%</span>
          </div>
          <div className="upload-meta">
            <span>已上传：1.42 GB / 1.82 GB</span>
            <strong>预计剩余：00:00:12</strong>
          </div>
        </article>
        <article className="panel">
          <div className="panel-title"><h2>实时抓取</h2><span>{captureRunning ? "进行中" : "待启动"}</span></div>
          <div className="form-grid two">
            <label>网卡选择<select name="capture-interface" aria-label="网卡选择"><option>WLAN</option><option>Ethernet</option><option>Loopback</option></select></label>
            <label>抓取时长<select name="capture-duration" aria-label="抓取时长"><option>30s</option><option>60s</option><option>120s</option><option>自定义</option></select></label>
            <label>协议过滤<select name="capture-protocols" aria-label="协议过滤"><option>TCP / UDP / TLS / QUIC / WireGuard</option><option>TLS only</option><option>QUIC only</option></select></label>
            <label>任务 ID<input name="capture-task-id" aria-label="任务 ID" value={task.taskId} readOnly /></label>
          </div>
          <div className="button-row sticky-actions">
            <button className="primary-button" onClick={() => { simulateCapture(); setToast("实时抓取任务已启动"); }}><Play size={17} />开始抓取</button>
            <button className="secondary-button" onClick={() => setToast("抓取任务已暂停")}><Pause size={16} />暂停</button>
            <button className="secondary-button" onClick={() => setToast("抓取任务已停止")}><Square size={16} />停止</button>
          </div>
        </article>
        <aside className="panel capture-status">
          <div className="panel-title"><h2>任务状态</h2><span>{captureRunning ? "进行中" : "已就绪"}</span></div>
          <GaugeRing value={uploadProgress} label="抓取进度" />
          <dl>
            <div><dt>开始时间</dt><dd>2026-05-05 23:42:15</dd></div>
            <div><dt>运行时长</dt><dd>00:02:36</dd></div>
            <div><dt>数据源</dt><dd>WLAN (10.24.0.42)</dd></div>
            <div><dt>协议过滤</dt><dd>TCP / UDP / TLS 1.3 / QUIC</dd></div>
          </dl>
          <button className="primary-button full" onClick={() => setToast("已准备进入综合检测工作台")}>进入综合检测</button>
        </aside>
      </section>
      <section className="panel packet-stats">
        <div className="panel-title"><h2>数据包动态统计</h2><span>last 5 minutes</span></div>
        <div className="packet-stat-row">
          {[
            ["总数据包", task.capture.packetCount.toLocaleString(), "+24,186"],
            ["总流量大小", formatBytes(task.capture.totalBytes), "+318 MB"],
            ["加密流量占比", `${Math.round(task.capture.encryptedRatio * 100)}%`, "+3.8%"],
            ["疑似 VPN 流量", task.capture.vpnSuspectCount.toLocaleString(), "+3,348"],
            ["疑似 SIM 流量", task.capture.simSuspectCount.toLocaleString(), "+7,963"]
          ].map(([label, value, delta]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <em>{delta}</em>
            </div>
          ))}
        </div>
        <div className="button-row"><button className="secondary-button" onClick={() => setToast("原始 PCAP 下载任务已创建")}><Download size={16} />下载原始 PCAP</button></div>
      </section>
      <section className="panel">
        <div className="panel-title"><h2>数据包预览表</h2><span>first packets</span></div>
        <PacketTable rows={packets} />
      </section>
    </>
  );
}
