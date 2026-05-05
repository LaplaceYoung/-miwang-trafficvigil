import {
  ArrowRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  FileText,
  Github,
  Network,
  Radio,
  ShieldCheck,
  UsersRound,
  Workflow
} from "lucide-react";
import { Link } from "react-router-dom";
import { TrafficScene } from "../../components/three/TrafficScene";
import { useUiStore } from "../../store/uiStore";

const capabilityCards = [
  { title: "实时流量抓取", text: "支持网卡选择、协议过滤、抓取进度、数据包预览与原始流量管理。", icon: Radio },
  { title: "多层流量分类", text: "完成 VPN / 非 VPN、SIM / 非 SIM、IM 应用类别识别与概率矩阵输出。", icon: Workflow },
  { title: "行为嗅探分析", text: "识别 chat、photo、file、voice、video 等通信行为并输出实例级证据。", icon: BrainCircuit },
  { title: "公共群组匹配", text: "构建用户、设备、流量、群组、频道之间的三维关系图谱。", icon: UsersRound },
  { title: "结构化报告", text: "汇总流量摘要、分类结论、行为画像、群组关联和风险研判。", icon: FileText },
  { title: "模型技术展示", text: "呈现预训练、字节级图建模、双粒度 GNN 与性能对比结果。", icon: Boxes }
];

const metrics = [
  ["混合流量识别成功率", "94%"],
  ["SIM 流量识别准确率", "98.7%"],
  ["行为分析准确率", "90.2%"],
  ["群组匹配准确率", "89.4%"],
  ["混合流量处理吞吐量", "6.32Gbps"],
  ["首包响应时间", "0.38ms"]
];

const flowSteps = ["流量捕获", "预处理", "VPN 分类", "SIM 分类", "行为嗅探", "群组匹配", "报告生成"];

export function HomePage() {
  const setToast = useUiStore((state) => state.setToast);
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <main className="site-page">
      <nav className="site-nav">
        <Link to="/" className="site-brand"><ShieldCheck size={24} /><span>TrafficVigil 密网巡哨</span></Link>
        <div>
          <button type="button" onClick={() => scrollToSection("capabilities")}>核心能力</button>
          <button type="button" onClick={() => scrollToSection("technology")}>技术路线</button>
          <button type="button" onClick={() => scrollToSection("materials")}>作品材料</button>
          <Link to="/login" className="site-login">进入系统</Link>
        </div>
      </nav>

      <section className="site-hero">
        <TrafficScene />
        <div className="site-hero-copy">
          <span>融合多模态大数据的加密流量识别溯源系统</span>
          <h1>TrafficVigil 密网巡哨</h1>
          <p>面向 Telegram、WhatsApp、Signal、WeChat 等加密即时通信场景，提供从流量采集、分层分类、行为嗅探到公共群组关联的全流程分析能力。</p>
          <div className="site-actions">
            <Link to="/login" className="primary-button">进入安全分析控制台<ArrowRight size={17} /></Link>
            <a className="secondary-button" href="https://github.com/LaplaceYoung/-miwang-trafficvigil"><Github size={17} />查看仓库</a>
          </div>
        </div>
        <aside className="hero-console-preview" aria-label="系统运行指标">
          {metrics.slice(0, 4).map(([label, value]) => (
            <div key={label}><span>{label}</span><strong>{value}</strong></div>
          ))}
        </aside>
      </section>

      <section className="site-section compact" id="capabilities">
        <div className="site-section-head">
          <span>Capability Matrix</span>
          <h2>从流量输入到报告输出的完整链路</h2>
        </div>
        <div className="capability-grid">
          {capabilityCards.map(({ title, text, icon: Icon }) => (
            <article key={title} onClick={() => setToast(`${title} 模块说明已定位`)}>
              <Icon size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-section split" id="technology">
        <div className="site-section-head">
          <span>Technical Architecture</span>
          <h2>预训练模型、双粒度图神经网络与多模态关系图谱协同工作</h2>
          <p>系统将加密流量分析拆成可验证的工程步骤，并通过统一任务对象驱动控制台页面、报告中心和材料截图。</p>
        </div>
        <div className="architecture-visual">
          {flowSteps.map((step, index) => (
            <div key={step} onClick={() => setToast(`${step} 流程节点已聚焦`)}>
              <b>{String(index + 1).padStart(2, "0")}</b>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="site-section metrics-band">
        {metrics.map(([label, value]) => (
          <article key={label} onClick={() => setToast(`${label}：${value}`)}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="site-section material-section" id="materials">
        <div className="site-section-head">
          <span>Project Materials</span>
          <h2>作品材料与系统入口</h2>
        </div>
        <div className="material-grid">
          <Link to="/login"><ShieldCheck size={22} /><strong>安全分析控制台</strong><span>登录后进入完整系统工作流</span></Link>
          <a href="./docs/work-introduction.md"><FileText size={22} /><strong>作品简介</strong><span>背景、功能、技术方案与应用前景</span></a>
          <a href="./docs/design-thinking.md"><Network size={22} /><strong>设计思路</strong><span>系统架构、数据流与模块协同</span></a>
          <a href="./docs/key-difficulties.md"><BarChart3 size={22} /><strong>重点难点</strong><span>难点、方案、指标与页面证据</span></a>
        </div>
      </section>
      <SiteToast />
    </main>
  );
}

function SiteToast() {
  const toast = useUiStore((state) => state.toast);
  return toast ? <div className="global-toast">{toast}</div> : null;
}
