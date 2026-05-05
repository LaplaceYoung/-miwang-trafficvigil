import { create } from "zustand";
import { currentTask, historyTasks, packetRows } from "../data/tasks";
import type { AnalysisTask, PacketRow } from "../types";

type WizardStep = {
  label: string;
  status: "pending" | "running" | "success" | "warning";
  summary: string;
};

type AnalysisStore = {
  task: AnalysisTask;
  packets: PacketRow[];
  uploadProgress: number;
  captureRunning: boolean;
  wizardSteps: WizardStep[];
  selectedGroupId: string;
  setUploadProgress: (value: number) => void;
  simulateCapture: () => void;
  runWizard: () => void;
  selectGroup: (id: string) => void;
};

const initialSteps: WizardStep[] = [
  { label: "选择流量数据", status: "success", summary: "已选择 campus-gateway-2026-05-05.pcapng" },
  { label: "流量预处理", status: "pending", summary: "等待会话切分和元数据抽取" },
  { label: "VPN / 非 VPN 分类", status: "pending", summary: "等待预训练分类器推理" },
  { label: "SIM / 非 SIM 分类", status: "pending", summary: "等待加密 IM 流量提取" },
  { label: "IM 应用分类", status: "pending", summary: "等待应用概率矩阵生成" },
  { label: "行为嗅探", status: "pending", summary: "等待 GNN 行为模型推理" },
  { label: "公共群组匹配", status: "pending", summary: "等待三维关系图谱匹配" },
  { label: "生成分析报告", status: "pending", summary: "等待报告模板渲染" }
];

export const useAnalysisStore = create<AnalysisStore>((set, get) => ({
  task: currentTask,
  packets: packetRows,
  uploadProgress: 100,
  captureRunning: false,
  wizardSteps: initialSteps,
  selectedGroupId: currentTask.groupMatch[0].groupId,
  setUploadProgress: (value) => set({ uploadProgress: value }),
  simulateCapture: () => {
    set({ captureRunning: true, uploadProgress: 0 });
    let value = 0;
    const timer = window.setInterval(() => {
      value += 8 + Math.round(Math.random() * 11);
      if (value >= 100) {
        window.clearInterval(timer);
        set({ captureRunning: false, uploadProgress: 100 });
      } else {
        set({ uploadProgress: value });
      }
    }, 260);
  },
  runWizard: () => {
    set({ wizardSteps: initialSteps.map((step, index) => (index === 0 ? step : { ...step, status: "pending" })) });
    const summaries = [
      "会话切分完成，抽取 18,420 个数据包与 1,276 条会话",
      "VPN 置信度 0.87，WireGuard 与 QUIC 特征明显",
      "SIM 流量占比 42%，提取准确率 98.7%",
      "Telegram Top1 概率 0.86，WhatsApp Top2 概率 0.64",
      "chat 概率 0.92，file 概率 0.78，行为分析准确率 90.2%",
      "命中 17 个高危公共频道，最高关联概率 0.91",
      "结构化报告 TV-20260505-0427 已生成"
    ];
    summaries.forEach((summary, offset) => {
      window.setTimeout(() => {
        const steps = get().wizardSteps.map((step, index) => {
          if (index === offset + 1) return { ...step, status: "success" as const, summary };
          if (index === offset + 2) return { ...step, status: "running" as const };
          return step;
        });
        set({ wizardSteps: steps });
      }, 650 * (offset + 1));
    });
  },
  selectGroup: (id) => set({ selectedGroupId: id })
}));

export { historyTasks };
