# 密网巡哨 TrafficVigil

融合多模态大数据的加密流量识别溯源系统。项目面向 Telegram、WhatsApp、Signal、WeChat 等加密即时通信场景，提供从流量采集、分层分类、行为嗅探到公共群组关联的全流程分析能力。

项目仓库：[https://github.com/LaplaceYoung/-miwang-trafficvigil](https://github.com/LaplaceYoung/-miwang-trafficvigil)

线上主页：

```text
https://laplaceyoung.github.io/-miwang-trafficvigil/#/
```

安全分析控制台：

```text
https://laplaceyoung.github.io/-miwang-trafficvigil/#/login
```

## 作品定位

密网巡哨 TrafficVigil 服务于网络安全监管、企业安全运营、运营商流量治理与科研验证场景。系统通过预训练模型、多任务学习、双粒度图神经网络和多模态关系图谱，将授权采集的混合网络流量转化为可解释的分类结果、行为概率和群组关联报告。

核心目标：

- 从混合流量中识别 VPN 流量、加密即时通信流量和普通背景流量。
- 对加密即时通信行为进行细粒度分析，覆盖 chat、photo、file、video 等类别。
- 基于用户、设备和公共群组的三维关系图谱完成群组关联分析。
- 输出适合安全研判、竞赛答辩和技术复现的结构化报告。

## 核心指标

| 指标 | 结果 | 说明 |
| --- | ---: | --- |
| 加密流量提取准确率 | 98.7% | 预训练模型与噪声增强联合提升复杂混合环境识别能力 |
| 用户行为分析准确率 | 90.2% | 字节级图与流量级拓扑图协同建模 |
| 群组成员关联准确率 | 89.4% | 融合元数据、时序模式和跨协议交互特征 |
| 混合流量处理吞吐量 | 6.32Gbps | 面向高并发网络环境的流水线处理能力 |
| 首包响应时间 | 0.38ms | 支持实时检测链路中的快速反馈 |

## 系统架构

```text
PCAP 上传 / 实时抓包
        |
        v
流量预处理与元数据抽取
        |
        v
VPN / 非 VPN 分类
        |
        v
SIM / 非 SIM 分类
        |
        v
加密即时通信行为嗅探
        |
        v
用户-设备-群组三维关系图谱
        |
        v
可视化面板 / 结构化报告
```

## 技术路线

1. 预训练与微调：使用大规模通用网络流量学习底层表征，再针对加密即时通信流量完成任务微调。
2. RIFA 数据增强：通过随机初始化字段增强和噪声注入提升模型对复杂混合流量的鲁棒性。
3. SODF 多任务策略：学习流量的方向、顺序与协议交互关系，增强时序建模能力。
4. 双粒度图神经网络：以 PMI 构建字节级图，同时构建包级与流级拓扑图。
5. 多模态群组匹配：融合流量元数据、时序行为和跨协议交互特征，完成群组关联推理。

## 前端分析平台

```text
.
├── index.html                  # Vite 入口
├── frontend/src/
│   ├── pages/                  # 登录、Dashboard、捕获、工作台、VPN、SIM、行为、群组、报告、模型、设置
│   ├── components/             # 布局、图表、流程、表格、Three.js 场景
│   ├── data/                   # 任务样本与状态快照
│   ├── store/                  # auth 与分析任务状态
│   └── utils/                  # 导出、风险等级等工具
├── assets/screenshots/         # 作品效果图输出目录
├── docs/
│   ├── work-introduction.md    # 计算机设计大赛作品简介
│   ├── design-thinking.md      # 设计思路
│   ├── key-difficulties.md     # 重点难点
│   └── image-placeholders.md   # PPT 图片占位规范
├── examples/sample-task.json   # 示例分析任务
└── src/trafficvigil/           # 核心分析流程代码
```

## 环境要求

- Python 3.10+
- Node.js 22+
- pnpm 10+
- 现代浏览器：Edge、Chrome、Firefox
- GitHub Pages：支持静态部署
- PCAP 数据：授权采集的 `.pcap` 或 `.pcapng` 文件

## 快速启动

### 1. 克隆仓库

```bash
git clone https://github.com/LaplaceYoung/-miwang-trafficvigil.git
cd -miwang-trafficvigil
```

### 2. 安装前端依赖

```bash
pnpm install
```

### 3. 启动作品主页

```bash
pnpm dev
```

访问：

```text
http://127.0.0.1:5173
```

### 4. 构建 GitHub Pages 静态产物

```bash
pnpm build
```

构建产物输出到：

```text
dist/
```

### 5. 运行示例分析流程

```bash
python -m pip install -e .
python -m trafficvigil <你的授权PCAP路径> --task-id case-001 --output data/output/case-001.json
```

输出报告包含：

- 流量分类结果
- 应用识别概率
- 行为嗅探概率
- 群组关联结果
- 处置建议

## 端到端运行说明

TrafficVigil 支持三类使用方式：静态前端访问、本地分析复现、截图材料输出。

```text
授权 PCAP 输入
  -> python -m trafficvigil 生成结构化 JSON 报告
  -> 前端报告中心读取任务结果
  -> Dashboard / 捕获中心 / 工作台 / 分类页 / 行为页 / 群组页 / 报告页统一呈现
  -> 导出 PDF / CSV / JSON / PNG 长图
```

三分钟复现路径：

1. 执行 `pnpm install` 安装前端依赖。
2. 执行 `pnpm dev` 启动前端平台，访问 `http://127.0.0.1:5173/#/login`。
3. 使用账号 `admin`、密码 `123456` 登录。
4. 执行 `python -m pip install -e .` 安装本地分析流程。
5. 执行 `python -m trafficvigil <你的授权PCAP路径> --task-id case-001 --output data/output/case-001.json`。
6. 在报告中心查看分类结论、行为画像、群组关联和导出结果。

验收命令：

```bash
pnpm build
python -m trafficvigil --help
```

## GitHub Pages 部署

仓库已包含 GitHub Actions 工作流：

```text
.github/workflows/deploy-pages.yml
```

推荐设置：

1. 进入 GitHub 仓库 Settings。
2. 打开 Pages。
3. Source 选择 `GitHub Actions`。
4. 推送到 `main` 后自动构建并部署 `dist/`。

部署完成后，作品主页会以 GitHub Pages 形式公开访问。

## 完整部署说明

系统由展示层、分析层、数据层和报告层共同组成：

- 展示层：React + Vite 前端，部署到 GitHub Pages，负责数据中心、捕获中心、综合检测、VPN/SIM 分类、行为嗅探、群组匹配、报告中心和模型技术页面。
- 分析层：`src/trafficvigil/` 提供 PCAP 读取、分类推理、行为分析、群组匹配和报告生成流程。
- 数据层：`examples/` 提供任务模板，`assets/data/` 保存结果快照，`data/output/` 保存本地分析输出。
- 报告层：前端报告中心和 CLI 输出共同提供 JSON、CSV、PDF、PNG 长图等交付形态。

线上主页入口：

```text
https://laplaceyoung.github.io/-miwang-trafficvigil/#/
```

控制台入口：

```text
https://laplaceyoung.github.io/-miwang-trafficvigil/#/login
```

登录账号：

```text
账号：admin
密码：123456
```

## 计算机设计大赛材料

本仓库已整理以下材料：

- `docs/installation-guide.md`：作品安装说明、运行步骤、部署说明与完整页面效果图。
- `docs/work-introduction.md`：作品简介，可直接纳入提交材料。
- `docs/design-thinking.md`：系统设计思路。
- `docs/key-difficulties.md`：重点难点与解决方案。
- `docs/image-placeholders.md`：图片占位与截图命名规范。
- `assets/screenshots/`：作品效果图保存目录。

当前已生成截图：

- `assets/screenshots/00-official-homepage.png`
- `assets/screenshots/trafficvigil-console-dashboard.png`
- `assets/screenshots/trafficvigil-console-capture.png`
- `assets/screenshots/06-report-center.png`

## 合规声明

TrafficVigil 面向授权网络安全分析、科研验证、竞赛答辩和合规安全运营场景。流量采集、行为分析与群组关联流程应建立在合法授权、数据脱敏和审计留痕基础上。
