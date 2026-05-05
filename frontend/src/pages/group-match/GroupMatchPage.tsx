import { BarChart } from "../../components/charts/Charts";
import { RelationGraph } from "../../components/flow/RelationGraph";
import { PageHeader } from "../../components/layout/AppLayout";
import { GroupMatchTable } from "../../components/tables/DataTables";
import { TrafficScene } from "../../components/three/TrafficScene";
import { useAnalysisStore } from "../../store/analysisStore";
import { useUiStore } from "../../store/uiStore";

export function GroupMatchPage() {
  const { task, selectedGroupId, selectGroup } = useAnalysisStore();
  const setToast = useUiStore((state) => state.setToast);
  const selected = task.groupMatch.find((group) => group.groupId === selectedGroupId) ?? task.groupMatch[0];
  const selectWithToast = (id: string) => {
    selectGroup(id);
    const group = task.groupMatch.find((item) => item.groupId === id);
    setToast(`${group?.groupName ?? id} 关系图谱已聚焦`);
  };
  return (
    <>
      <PageHeader
        eyebrow="Group Match"
        title="公共群组匹配"
        description="融合流量元数据、时序模式、跨协议交互特征，构建用户-设备-群组三维关系图谱。"
      />
      <section className="metric-grid five">
        <article><span>疑似平台</span><strong>Telegram</strong></article>
        <article><span>匹配群组数量</span><strong>{task.groupMatch.length}</strong></article>
        <article><span>高危群组数量</span><strong>3</strong></article>
        <article><span>最高置信度</span><strong>91%</strong></article>
        <article><span>关联设备数量</span><strong>7</strong></article>
      </section>
      <section className="workspace-grid wide-left">
        <article className="panel">
          <div className="panel-title"><h2>用户-设备-群组三维关系图</h2><span>click nodes</span></div>
          <RelationGraph groups={task.groupMatch} selectedId={selectedGroupId} onSelect={selectWithToast} />
        </article>
        <article className="panel scene-card"><TrafficScene mode="group" /></article>
      </section>
      <section className="workspace-grid">
        <article className="panel"><div className="panel-title"><h2>群组匹配表</h2><span>probability</span></div><GroupMatchTable rows={task.groupMatch} onSelect={selectWithToast} /></article>
        <article className="panel">
          <div className="panel-title"><h2>证据链面板</h2><span>{selected.groupName}</span></div>
          <BarChart rows={[{ label: "时间模式相似度", value: 88 }, { label: "包长分布相似度", value: 81 }, { label: "跨协议交互特征", value: 74 }, { label: "公共流量形状匹配", value: 91 }]} />
          <p className="muted">置信度解释：该群组在活跃时间、包长分布、跨协议切换和公共流量形状上与目标会话高度一致。</p>
        </article>
      </section>
    </>
  );
}
