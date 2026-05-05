import { useState } from "react";
import { RadarChart, BarChart } from "../../components/charts/Charts";
import { PageHeader } from "../../components/layout/AppLayout";
import { currentTask } from "../../data/tasks";
import { useUiStore } from "../../store/uiStore";

export function BehaviorPage() {
  const setToast = useUiStore((state) => state.setToast);
  const [progress, setProgress] = useState(100);
  const [selected, setSelected] = useState(currentTask.behaviorResult.instances[0]);

  const start = () => {
    setProgress(0);
    const timer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          window.clearInterval(timer);
          setToast("行为概率生成完成");
          return 100;
        }
        return value + 10;
      });
    }, 240);
  };

  return (
    <>
      <PageHeader
        eyebrow="Behavior Sniffing"
        title="用户行为嗅探"
        description="对多层分类后的加密即时通信流量进行行为分类，并以概率总览、横向滚动实例卡片和详情抽屉展示结果。"
        action={<button className="primary-button" onClick={start}>开始分析</button>}
      />
      <section className="process-overview behavior-flow">
        {["包级流量图", "时序特征", "GNN 推理", "行为概率"].map((step, index) => (
          <div key={step}><span>{index + 1}</span><strong>{step}</strong></div>
        ))}
      </section>
      <section className="workspace-grid">
        <article className="panel">
          <div className="panel-title"><h2>行为分类任务</h2><span>GATv2 behavior model</span></div>
          <p className="muted">系统根据包长序列、时间间隔、上下行方向与会话上下文生成 chat、photo、file、voice、video、idle、unknown 七类行为概率。</p>
          <div className="progress big"><i style={{ width: `${progress}%` }} /><span>{progress < 35 ? "正在构建包级流量图" : progress < 65 ? "正在提取时序特征" : progress < 95 ? "正在进行 GNN 推理" : "行为概率生成完成"}</span></div>
          {progress === 100 && <div className="success-toast inline">行为分析完成，用户行为分析准确率 90.2%</div>}
          <div className="mini-metrics">
            <div><span>最可能行为</span><strong>{currentTask.behaviorResult.topBehavior}</strong></div>
            <div><span>置信度</span><strong>{Math.round(currentTask.behaviorResult.confidence * 100)}%</strong></div>
            <div><span>样本数量</span><strong>{currentTask.behaviorResult.instances.length}</strong></div>
            <div><span>平均包长</span><strong>{selected.avgLength}</strong></div>
          </div>
        </article>
        <article className="panel">
          <div className="panel-title"><h2>行为概率总览</h2><span>radar + ranking</span></div>
          <RadarChart values={currentTask.behaviorResult.distribution} />
          <BarChart rows={Object.entries(currentTask.behaviorResult.distribution).map(([label, value]) => ({ label, value: Math.round(value * 100) }))} />
        </article>
      </section>
      <section className="panel">
        <div className="panel-title"><h2>横向滚动结果卡片</h2><span>instance predictions</span></div>
        <div className="instance-strip">
          {currentTask.behaviorResult.instances.map((item) => (
            <article key={item.id} className={item.id === selected.id ? "active" : ""} onClick={() => { setSelected(item); setToast(`${item.id} 详情已载入`); }}>
              <strong>{item.id}</strong>
              <span>{item.primary}</span>
              <small>Secondary: {item.secondary}</small>
              <b>{Math.round(item.confidence * 100)}%</b>
              <em>{item.packetCount} packets / {item.duration}</em>
            </article>
          ))}
        </div>
      </section>
      <section className="panel detail-drawer">
        <div><h2>单实例详情抽屉：{selected.id}</h2><p>关联应用：{selected.app}，平均间隔 {selected.avgInterval}。模型解释：包长序列、时间间隔序列和上下行方向分布共同支撑当前预测。</p></div>
        <div className="spark-grid"><span></span><span></span><span></span></div>
      </section>
    </>
  );
}
