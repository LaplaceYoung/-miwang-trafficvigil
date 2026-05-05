# 图片占位与截图规范

## 一、PPT 推荐图片清单

| 编号 | 占位文本 | 建议来源 | 用途 |
| --- | --- | --- | --- |
| 01 | `[图片占位：作品首页总览截图]` | GitHub Pages 首页 | 开场介绍 |
| 02 | `[图片占位：加密流量增长趋势图]` | 作品书图表或重绘图 | 项目背景 |
| 03 | `[图片占位：系统四层架构图]` | 根据 README 架构重绘 | 系统方案 |
| 04 | `[图片占位：PCAP 上传与实时抓包页面截图]` | 前端页面截图 | 功能展示 |
| 05 | `[图片占位：流量分类结果页面截图]` | `#classification` 页面 | 多层分类 |
| 06 | `[图片占位：行为嗅探概率分布图]` | `#behavior` 页面 | 行为分析 |
| 07 | `[图片占位：用户-设备-群组三维关系图]` | `#groups` 页面 | 群组溯源 |
| 08 | `[图片占位：三层技术架构图]` | 技术路线重绘 | 创新说明 |
| 09 | `[图片占位：核心指标对比图]` | 实验数据重绘 | 测试效果 |
| 10 | `[图片占位：未来发展路线图]` | PPT 自绘 | 应用前景 |

## 二、截图命名规范

截图统一保存到：

```text
assets/screenshots/
```

推荐命名：

```text
01-home-overview.png
02-classification-center.png
03-behavior-sniffing.png
04-group-attribution.png
05-technical-architecture.png
```

## 三、截图尺寸建议

- PPT 宽屏：1920x1080
- README 展示：1440x900
- 移动端适配检查：390x844

## 四、PPT 插图原则

1. 一页只放一个核心截图或一张核心架构图。
2. 指标图与系统截图组合使用，突出“能力完整 + 数据支撑”。
3. 技术路线图使用三层结构：特征建模、流量分类、行为关联。
4. 重点难点页使用“难点-方案-效果”三列结构。
5. 截图中保留项目名称、关键指标和模块标题，方便评审快速定位。

## 五、截图完成度与插入页映射

| 图位 | 目标文件名 | 来源页面 | 当前状态 | PPT 用途 |
| --- | --- | --- | --- | --- |
| 作品首页总览截图 | `01-home-overview.png` | `/dashboard` | 已生成基础图，需按新版 UI 更新 | 开场介绍 |
| PCAP 上传与实时抓包页面截图 | `trafficvigil-console-capture.png` | `/capture` | 已生成基础图，需按新版 UI 更新 | 流量采集 |
| VPN / 非 VPN 分类结果图 | `02-vpn-analysis.png` | `/vpn-analysis` | 待截图 | 多层分类 |
| SIM 应用识别页面截图 | `03-sim-analysis.png` | `/sim-analysis` | 待截图 | 应用识别 |
| 行为嗅探概率分布图 | `04-behavior-sniffing.png` | `/behavior` | 待截图 | 行为分析 |
| 用户-设备-群组三维关系图 | `05-group-attribution.png` | `/group-match` | 待截图 | 群组溯源 |
| 分析报告页面截图 | `06-report-center.png` | `/reports` | 待截图 | 报告输出 |
| 模型与技术展示截图 | `07-model-technology.png` | `/model` | 待截图 | 创新说明 |
| 系统四层架构图 | `08-system-architecture.png` | 重绘 | 待绘制 | 系统方案 |
| 核心指标对比图 | `09-metrics-comparison.png` | 重绘 | 待绘制 | 测试效果 |
