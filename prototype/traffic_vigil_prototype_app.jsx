import React, { useEffect, useId, useMemo, useState } from "react";

function IconBase({ children, size = 20, className = "", color, x, y, width, height, strokeWidth = 2 }) {
  const w = width || size;
  const h = height || size;
  return (
    <svg
      x={x}
      y={y}
      width={w}
      height={h}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

const makeIcon = (type) => function Icon(props) {
  const common = { ...props };
  const glyphs = {
    shield: <><path d="M12 3l7 3v5c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6l7-3z"/><path d="M12 8v5"/><path d="M12 16h.01"/></>,
    menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    activity: <><path d="M3 12h4l2-7 4 14 2-7h6"/></>,
    upload: <><path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M4 20h16"/></>,
    play: <path d="M8 5v14l11-7-11-7z" fill="currentColor" stroke="none"/>,
    square: <rect x="6" y="6" width="12" height="12" rx="2"/>,
    database: <><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/></>,
    file: <><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h6"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3 21c1-4 4-6 6-6s5 2 6 6"/><circle cx="17" cy="9" r="2"/><path d="M15 15c2 .4 4 2.2 5 5"/></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c3 3 3 15 0 18"/><path d="M12 3c-3 3-3 15 0 18"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></>,
    bell: <><path d="M6 9a6 6 0 1112 0c0 7 3 6 3 9H3c0-3 3-2 3-9"/><path d="M10 21h4"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 22c1.5-5 5-8 8-8s6.5 3 8 8"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></>,
    download: <><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/></>,
    refresh: <><path d="M21 12a9 9 0 01-15 6.7L3 16"/><path d="M3 16h5v5"/><path d="M3 12a9 9 0 0115-6.7L21 8"/><path d="M21 8h-5V3"/></>,
    chevronRight: <path d="M9 5l7 7-7 7"/>,
    chevronDown: <path d="M6 9l6 6 6-6"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 10h18"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></>,
    x: <><path d="M6 6l12 12"/><path d="M18 6L6 18"/></>,
    zap: <path d="M13 2L4 14h7l-1 8 10-13h-7l0-7z"/>,
    chart: <><path d="M4 19V5"/><path d="M4 19h16"/><rect x="7" y="11" width="3" height="5"/><rect x="12" y="8" width="3" height="8"/><rect x="17" y="4" width="3" height="12"/></>,
    pie: <><path d="M12 3v9h9"/><path d="M21 12a9 9 0 11-9-9"/></>,
    network: <><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M8 7l3 9"/><path d="M16 7l-3 9"/><path d="M8 6h8"/></>,
    box: <><path d="M12 2l8 4v12l-8 4-8-4V6z"/><path d="M4 6l8 4 8-4"/><path d="M12 10v12"/></>,
    radio: <><path d="M7 15a7 7 0 010-6"/><path d="M4 18a11 11 0 010-12"/><circle cx="12" cy="12" r="2"/><path d="M17 9a7 7 0 010 6"/><path d="M20 6a11 11 0 010 12"/></>,
    folder: <><path d="M3 6h7l2 3h9v10H3z"/></>,
    gauge: <><path d="M4 14a8 8 0 0116 0"/><path d="M12 14l4-4"/><path d="M6 20h12"/></>,
    alert: <><path d="M12 3l10 18H2z"/><path d="M12 9v5"/><path d="M12 18h.01"/></>,
    printer: <><path d="M7 8V3h10v5"/><rect x="5" y="13" width="14" height="8"/><path d="M5 17H3V9h18v8h-2"/></>,
    maximize: <><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2"/><rect x="4" y="4" width="12" height="12" rx="2"/></>,
    login: <><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M14 4h6v16h-6"/></>,
    key: <><circle cx="7" cy="17" r="3"/><path d="M10 14L21 3"/><path d="M15 8l3 3"/></>,
    building: <><path d="M4 21V5l8-3 8 3v16"/><path d="M9 21v-6h6v6"/><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
    eyeOff: <><path d="M3 3l18 18"/><path d="M10.5 10.5a3 3 0 004 4"/><path d="M7 7C4 9 2 12 2 12s4 7 10 7c2 0 3.7-.5 5.2-1.3"/><path d="M14 5.2C19 6.2 22 12 22 12a18 18 0 01-3 4"/></>,
    message: <><path d="M4 5h16v11H7l-3 3z"/><path d="M8 9h8"/><path d="M8 13h5"/></>,
    image: <><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M21 16l-5-5-4 4-2-2-5 5"/></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0"/><path d="M12 18v4"/></>,
    video: <><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/></>,
    hash: <><path d="M8 3L6 21"/><path d="M18 3l-2 18"/><path d="M3 9h18"/><path d="M2 15h18"/></>,
    save: <><path d="M5 3h12l2 2v16H5z"/><path d="M8 3v6h8"/><path d="M8 21v-7h8v7"/></>,
    home: <><path d="M3 11l9-8 9 8"/><path d="M5 10v11h14V10"/></>,
    server: <><rect x="4" y="4" width="16" height="6" rx="2"/><rect x="4" y="14" width="16" height="6" rx="2"/><path d="M8 7h.01M8 17h.01"/></>,
    wifi: <><path d="M5 12a10 10 0 0114 0"/><path d="M8 15a6 6 0 018 0"/><path d="M12 19h.01"/></>,
    circle: <circle cx="12" cy="12" r="8"/>,
    layers: <><path d="M12 2l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/></>,
    brain: <><path d="M9 3a4 4 0 00-4 4v1a4 4 0 000 8v1a4 4 0 004 4"/><path d="M15 3a4 4 0 014 4v1a4 4 0 010 8v1a4 4 0 01-4 4"/><path d="M9 8h6M9 14h6"/></>,
    table: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M9 10v10"/><path d="M15 10v10"/></>,
    fileJson: <><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6"/><path d="M10 13l-2 2 2 2"/><path d="M14 13l2 2-2 2"/></>,
    fileSheet: <><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/></>,
  };
  return <IconBase {...common}>{glyphs[type] || glyphs.circle}</IconBase>;
};

const Shield = makeIcon("shield");
const Menu = makeIcon("menu");
const Activity = makeIcon("activity");
const UploadCloud = makeIcon("upload");
const Play = makeIcon("play");
const Square = makeIcon("square");
const Database = makeIcon("database");
const FileText = makeIcon("file");
const Settings = makeIcon("gauge");
const Users = makeIcon("users");
const Eye = makeIcon("eye");
const Globe2 = makeIcon("globe");
const Lock = makeIcon("lock");
const Cpu = makeIcon("server");
const Bell = makeIcon("bell");
const UserCircle = makeIcon("user");
const Search = makeIcon("search");
const Download = makeIcon("download");
const RefreshCw = makeIcon("refresh");
const ChevronRight = makeIcon("chevronRight");
const ChevronDown = makeIcon("chevronDown");
const Calendar = makeIcon("calendar");
const CheckCircle2 = makeIcon("check");
const X = makeIcon("x");
const Zap = makeIcon("zap");
const BarChart3 = makeIcon("chart");
const PieChart = makeIcon("pie");
const Network = makeIcon("network");
const Box = makeIcon("box");
const Radio = makeIcon("radio");
const Folder = makeIcon("folder");
const Gauge = makeIcon("gauge");
const AlertTriangle = makeIcon("alert");
const Printer = makeIcon("printer");
const Maximize2 = makeIcon("maximize");
const Copy = makeIcon("copy");
const LogIn = makeIcon("login");
const KeyRound = makeIcon("key");
const Building2 = makeIcon("building");
const Mail = makeIcon("mail");
const EyeOff = makeIcon("eyeOff");
const FileDown = makeIcon("download");
const Radar = makeIcon("pie");
const MessageCircle = makeIcon("message");
const Image = makeIcon("image");
const Mic = makeIcon("mic");
const Video = makeIcon("video");
const Clock = makeIcon("clock");
const Hash = makeIcon("hash");
const HardDrive = makeIcon("database");
const Save = makeIcon("save");
const SlidersHorizontal = makeIcon("gauge");
const Trash2 = makeIcon("x");
const ArrowRight = makeIcon("chevronRight");
const ArrowLeft = (props = {}) => <ChevronRight {...props} className={`rotate-180 ${props.className || ""}`} />;
const Home = makeIcon("home");
const Server = makeIcon("server");
const Wifi = makeIcon("wifi");
const CircleDot = makeIcon("circle");
const Layers3 = makeIcon("layers");
const Brain = makeIcon("brain");
const TableProperties = makeIcon("table");
const ShieldCheck = makeIcon("shield");
const FileJson = makeIcon("fileJson");
const FileSpreadsheet = makeIcon("fileSheet");

const palette = {
  bg: "#06111f",
  panel: "rgba(10, 28, 48, 0.88)",
  panel2: "rgba(13, 38, 64, 0.74)",
  line: "rgba(80, 176, 255, 0.18)",
  blue: "#1488ff",
  cyan: "#18d5ff",
  green: "#34e4a6",
  purple: "#8a55ff",
  amber: "#ffbd2e",
  red: "#ff4d61",
};

const navItems = [
  { id: "dashboard", label: "数据中心", icon: Home },
  { id: "capture", label: "流量捕获", icon: Radio },
  { id: "workspace", label: "综合检测", icon: ShieldCheck },
  { id: "vpn", label: "VPN 分析", icon: Globe2 },
  { id: "sim", label: "SIM 分析", icon: TableProperties },
  { id: "behavior", label: "行为嗅探", icon: Eye },
  { id: "group", label: "群组匹配", icon: Users },
  { id: "reports", label: "报告中心", icon: FileText },
  { id: "model", label: "模型展示", icon: Box },
  { id: "tasks", label: "任务历史", icon: Folder },
  { id: "settings", label: "系统设置", icon: Settings },
];

const flowRows = [
  ["flow_000001", "10.10.1.23:54321", "172.31.45.67:443", "TLS 1.3", "12,842", "0.987", "VPN", "98.7%"],
  ["flow_000002", "192.168.2.45:49152", "162.159.134.234:443", "QUIC", "8,731", "0.942", "VPN", "94.2%"],
  ["flow_000003", "10.0.0.8:51874", "203.0.113.11:51820", "WireGuard", "3,210", "0.996", "VPN", "99.6%"],
  ["flow_000004", "172.16.5.10:49732", "203.0.113.99:53", "DNS", "112", "0.081", "非 VPN", "91.9%"],
  ["flow_000005", "192.168.1.88:60732", "93.184.216.34:80", "HTTP", "432", "0.053", "非 VPN", "88.3%"],
  ["flow_000006", "10.10.2.33:60123", "34.120.190.55:443", "TLS 1.3", "6,541", "0.904", "VPN", "90.4%"],
];

const simRows = [
  ["10458", "Telegram", "99.3%", "WhatsApp", "0.6%", "99.3%", "0.6%", "0.1%", "Telegram"],
  ["10459", "WhatsApp", "98.7%", "Telegram", "1.1%", "1.1%", "98.7%", "0.2%", "WhatsApp"],
  ["10460", "Signal", "96.8%", "Telegram", "2.0%", "2.0%", "1.2%", "96.8%", "Signal"],
  ["10461", "WeChat", "94.5%", "Telegram", "3.3%", "3.3%", "2.2%", "1.1%", "WeChat"],
  ["10462", "Telegram", "97.6%", "WhatsApp", "1.6%", "97.6%", "1.6%", "0.3%", "Telegram"],
  ["10463", "Unknown", "71.9%", "Telegram", "12.2%", "12.2%", "8.7%", "7.2%", "Unknown"],
  ["10464", "QQ", "92.4%", "WeChat", "5.1%", "1.9%", "0.6%", "0.5%", "QQ"],
];

const groupRows = [
  ["-1002456893172", "Group_Bravo", "Telegram", "92.4%", "高危", "28", "2025-05-19 14:28:09"],
  ["-1001992837465", "Night_Owl_Channel", "Telegram", "88.1%", "中危", "22", "2025-05-19 14:21:33"],
  ["1234567890123", "Silent_Hub", "WhatsApp", "76.3%", "中危", "17", "2025-05-19 14:17:48"],
  ["-1001678234567", "Data_Vault", "Telegram", "69.2%", "低危", "13", "2025-05-19 14:09:27"],
  ["9876543210987", "Echo_Network", "Signal", "61.5%", "低危", "11", "2025-05-19 13:58:40"],
  ["-1002223344556", "Shadow_Forum", "Telegram", "95.7%", "严重", "35", "2025-05-19 14:25:17"],
];

const reports = [
  ["RPT-20250519-0001", "企业网络异常访问分析-0520", "2025-05-19 14:21:33", "192.168.1.88", "高危"],
  ["RPT-20250519-0002", "跨境 VPN 隧道检测分析", "2025-05-19 13:47:05", "10.0.5.23", "中危"],
  ["RPT-20250519-0003", "可疑通讯应用识别分析", "2025-05-19 13:12:18", "172.16.3.44", "低危"],
  ["RPT-20250519-0004", "SIM 卡异常使用行为分析", "2025-05-19 12:39:55", "172.16.8.101", "中危"],
  ["RPT-20250519-0005", "潜在数据泄露行为分析", "2025-05-19 11:58:40", "192.168.3.77", "高危"],
  ["RPT-20250519-0006", "公共 WiFi 风险行为研判", "2025-05-19 11:21:08", "10.1.2.55", "低危"],
];

const appMeta = {
  Telegram: { slug: "telegram", color: "#26a5e4", label: "Telegram" },
  WhatsApp: { slug: "whatsapp", color: "#25d366", label: "WhatsApp" },
  Signal: { slug: "signal", color: "#3a76f0", label: "Signal" },
  WeChat: { slug: "wechat", color: "#07c160", label: "WeChat" },
  QQ: { slug: "tencentqq", color: "#12b7f5", label: "QQ" },
  Unknown: { slug: null, color: "#94a3b8", label: "Unknown" },
};

function cx(...v) {
  return v.filter(Boolean).join(" ");
}

function buttonLabel(children) {
  if (typeof children === "string") return children.trim();
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(buttonLabel).filter(Boolean).join(" ").trim();
  if (children && typeof children === "object" && "props" in children) return buttonLabel(children.props.children);
  return "";
}

function toast(msg) {
  window.dispatchEvent(new CustomEvent("tv-toast", { detail: msg }));
}

function downloadText(name, content, type = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
  toast(`${name} 已生成`);
}

function App() {
  const [route, setRoute] = useState("login");
  const [authed, setAuthed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedReport, setSelectedReport] = useState(reports[0]);
  const [settingsTab, setSettingsTab] = useState("模型配置");
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const onToast = (e) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, msg: e.detail }]);
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 2400);
    };
    window.addEventListener("tv-toast", onToast);
    return () => window.removeEventListener("tv-toast", onToast);
  }, []);

  const go = (id, options = {}) => {
    if (id === "settings" && options.tab) setSettingsTab(options.tab);
    if (!options.force && !authed && !["login", "register"].includes(id)) {
      toast("请先登录系统");
      setRoute("login");
      return;
    }
    setRoute(id);
  };

  const page = useMemo(() => {
    const props = { go, selectedReport, setSelectedReport };
    if (route === "login") return <LoginPage go={go} setAuthed={setAuthed} />;
    if (route === "register") return <RegisterPage go={go} />;
    if (route === "dashboard") return <DashboardPage go={go} />;
    if (route === "capture") return <CapturePage go={go} />;
    if (route === "workspace") return <WorkspacePage go={go} />;
    if (route === "vpn") return <VpnPage go={go} />;
    if (route === "sim") return <SimPage go={go} />;
    if (route === "behavior") return <BehaviorPage go={go} />;
    if (route === "group") return <GroupPage go={go} />;
    if (route === "reports") return <ReportsPage {...props} />;
    if (route === "model") return <ModelPage />;
    if (route === "tasks") return <TasksPage go={go} />;
    if (route === "settings") return <SettingsPage initialTab={settingsTab} />;
    return <DashboardPage go={go} />;
  }, [route, authed, selectedReport, settingsTab]);

  if (["login", "register"].includes(route)) {
    return (
      <div className="tv-app min-h-screen bg-[#040c17] text-slate-100 selection:bg-blue-500/30">
        <BgGrid />
        {page}
        <ToastStack items={toasts} />
      </div>
    );
  }

  return (
    <div className="tv-app min-h-screen bg-[#06111f] text-slate-100 selection:bg-blue-500/30">
      <BgGrid />
      <Topbar collapsed={collapsed} setCollapsed={setCollapsed} go={go} />
      <div className="flex pt-[62px]">
        <Sidebar route={route} go={go} collapsed={collapsed} />
        <main className={cx("tv-main-content min-h-[calc(100vh-62px)] min-w-0 transition-all duration-300", collapsed ? "ml-[82px] w-[calc(100vw-82px)]" : "ml-[250px] w-[calc(100vw-250px)]")}>{page}</main>
      </div>
      <ToastStack items={toasts} />
    </div>
  );
}

function BgGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(24,136,255,0.20),transparent_25%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,0.12),transparent_26%),linear-gradient(135deg,#050b14_0%,#071426_50%,#030812_100%)]" />
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(113,184,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(113,184,255,.7) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
    </div>
  );
}

function ToastStack({ items }) {
  return (
    <div className="fixed right-5 top-20 z-[999] space-y-3">
      {items.map((t) => (
        <div key={t.id} className="rounded-xl border border-cyan-400/30 bg-slate-950/90 px-4 py-3 text-sm text-cyan-100 shadow-2xl shadow-cyan-500/10 backdrop-blur">
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400" />{t.msg}</div>
        </div>
      ))}
    </div>
  );
}

function Topbar({ collapsed, setCollapsed, go }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { title: "高危群组预警", body: "TG-8f3a...7c21 命中严重风险", target: "group", tag: "严重", read: false },
    { title: "报告生成完成", body: "RPT-20250519-0001 可导出", target: "reports", tag: "完成", read: false },
    { title: "任务仍在运行", body: "TASK-20250519-0003 正在复现", target: "tasks", tag: "运行中", read: false },
  ]);
  const unreadCount = notifications.filter((item) => !item.read).length;
  return (
    <header className="tv-topbar fixed left-0 right-0 top-0 z-50 h-[62px] border-b border-cyan-300/15 bg-[#06111f]/92 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-xl font-bold tracking-tight">
            <div className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-400/40 bg-blue-500/10 text-cyan-300 shadow-lg shadow-cyan-500/10"><Shield size={22} /></div>
            <span>TrafficVigil 密网巡哨</span>
          </div>
          <button type="button" onClick={() => setCollapsed(!collapsed)} className="tv-icon-button rounded-xl border border-cyan-300/15 bg-slate-800/40 p-2.5 text-slate-200 hover:border-cyan-300/40 hover:bg-cyan-400/10" aria-label="切换侧边栏"><Menu size={19} /></button>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-300">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34e4a6]" />在线</span>
          <span className="hidden md:inline">模型版本： TV-Model v2.4.1</span>
          <span className="hidden md:flex items-center gap-2"><Clock size={17} />2025-05-19 14:32:45</span>
          <div className="relative">
            <button type="button" onClick={() => setNotificationsOpen((v) => !v)} className="tv-icon-button relative rounded-lg p-1.5" aria-label="通知中心" aria-expanded={notificationsOpen}>
              <Bell size={20} />
              {unreadCount > 0 && <b className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[10px]">{unreadCount}</b>}
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-11 w-80 rounded-xl border border-cyan-300/20 bg-slate-950/95 p-2 text-left shadow-2xl shadow-black/40">
                <div className="mb-1 flex items-center justify-between px-2 py-1 text-xs text-slate-400"><span>通知中心</span><button type="button" className="text-cyan-300" onClick={() => setNotifications((items) => items.map((item) => ({ ...item, read: true })))}>全部已读</button></div>
                {notifications.map((notice) => (
                  <button key={notice.title} type="button" onClick={() => { setNotifications((items) => items.map((item) => item.title === notice.title ? { ...item, read: true } : item)); setNotificationsOpen(false); go(notice.target); }} className={cx("tv-button mb-1 w-full rounded-lg border border-cyan-300/10 p-3 text-left hover:bg-cyan-400/10", notice.read ? "bg-slate-900/35 opacity-70" : "bg-slate-900/70")}>
                    <div className="flex items-center justify-between gap-3"><b className="text-slate-100">{notice.title}</b><span className="rounded-md border border-cyan-300/20 px-2 py-0.5 text-xs text-cyan-200">{notice.tag}</span></div>
                    <p className="mt-1 text-xs text-slate-400">{notice.body}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="button" onClick={() => { setNotificationsOpen(false); go("settings", { tab: "用户信息" }); }} className="tv-button flex items-center gap-2 rounded-lg px-2 py-1"><UserCircle size={24} />admin <ChevronDown size={14} /></button>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ route, go, collapsed }) {
  return (
    <aside className={cx("tv-sidebar fixed bottom-0 left-0 top-[62px] z-40 border-r border-cyan-300/15 bg-[#071426]/90 transition-all duration-300 backdrop-blur-xl", collapsed ? "w-[82px]" : "w-[250px]") }>
      <div className="flex h-full flex-col justify-between px-3 py-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = route === item.id;
            return (
              <button key={item.id} type="button" onClick={() => go(item.id)} className={cx("tv-nav-button group flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition", active ? "border border-cyan-400/35 bg-blue-500/20 text-cyan-300 shadow-[inset_3px_0_0_#1488ff,0_0_20px_rgba(20,136,255,.15)]" : "text-slate-300 hover:bg-slate-800/60 hover:text-cyan-200") }>
                <Icon size={20} className={active ? "text-cyan-300" : "text-slate-300"} />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>
        <div className={cx("rounded-xl border border-cyan-300/15 bg-slate-900/50 p-4 text-xs text-slate-300", collapsed && "hidden") }>
          <div className="mb-3 flex items-center gap-2 text-emerald-300"><Shield size={20} />系统运行状态<br /><b>正常运行</b></div>
          {[["CPU", 23], ["内存", 47], ["存储", 62]].map(([k, v]) => <MiniMeter key={k} label={k} value={v} />)}
          <div className="mt-2 flex items-center justify-between"><span>网络</span><span>128 Mbps</span></div>
          <TinyLine color={palette.blue} />
          <div className="mt-10 text-center text-slate-500">© 2025 TrafficVigil</div>
        </div>
      </div>
    </aside>
  );
}

function MiniMeter({ label, value }) {
  return <div className="mb-2 flex items-center gap-3"><span className="w-10 text-slate-400">{label}</span><div className="h-1.5 flex-1 rounded-full bg-slate-700"><div className="h-full rounded-full bg-blue-400" style={{ width: `${value}%` }} /></div><span>{value}%</span></div>;
}

function TinyLine({ color = palette.blue }) {
  const points = "0,25 12,20 24,28 36,16 48,22 60,12 72,19 84,10 96,18 108,15 120,22 132,12 144,18 156,16 168,24 180,20";
  return <svg viewBox="0 0 180 36" className="mt-2 h-9 w-full"><polyline points={points} fill="none" stroke={color} strokeWidth="2" opacity=".65" /></svg>;
}

function ChartTooltip({ tip }) {
  if (!tip) return null;
  return (
    <div className="pointer-events-none absolute z-20 min-w-28 rounded-lg border border-cyan-300/20 bg-slate-950/95 px-3 py-2 text-xs text-slate-100 shadow-xl shadow-black/40" style={{ left: tip.x, top: tip.y }}>
      <b className="block text-cyan-200">{tip.title}</b>
      {tip.body && <span className="mt-1 block text-slate-400">{tip.body}</span>}
    </div>
  );
}

function AppIcon({ app, size = 26 }) {
  const meta = appMeta[app] || appMeta.Unknown;
  if (!meta.slug) {
    return <span className="grid place-items-center rounded-full border border-slate-500/30 bg-slate-800/70" style={{ width: size, height: size }}><Hash size={Math.max(14, size - 10)} className="text-slate-300" /></span>;
  }
  return <img src={`https://cdn.simpleicons.org/${meta.slug}/${meta.color.replace("#", "")}`} alt={`${meta.label} icon`} width={size} height={size} className="rounded-full bg-slate-950/60 p-1" loading="lazy" />;
}

function PageShell({ title, subtitle, children, actions }) {
  return (
    <section className="tv-page-shell relative z-10 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
        </div>
        {actions && <div className="tv-page-actions flex flex-wrap items-center justify-end gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  );
}

function Card({ children, className = "" }) {
  return <div className={cx("tv-card rounded-xl border border-cyan-300/15 bg-[#0a1c30]/80 p-3 shadow-xl shadow-black/20 backdrop-blur", className)}>{children}</div>;
}

function Button({ children, onClick, icon: Icon, variant = "primary", className = "" }) {
  const styles = variant === "primary" ? "border-blue-400/40 bg-blue-600/95 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500" : variant === "ghost" ? "border-cyan-300/15 bg-slate-900/40 text-cyan-200 hover:border-cyan-300/35 hover:bg-cyan-400/10" : "border-cyan-300/15 bg-slate-800/40 text-slate-200 hover:bg-slate-700/50";
  const label = buttonLabel(children) || "操作";
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
      return;
    }
    toast(`${label} 已响应`);
  };
  return <button type="button" onClick={handleClick} aria-label={label} className={cx("tv-button inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition", styles, className)}>{Icon && <Icon size={17} />}{children}</button>;
}

function StatCard({ title, value, sub, icon: Icon, color = palette.blue, spark = true }) {
  return (
    <Card className="min-h-[92px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-1 text-2xl font-bold text-white">{value}</h3>
          <p className="mt-1 text-xs text-slate-400">较昨日 <span className="text-emerald-400">↑ {sub}</span></p>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-300/20 bg-slate-900/60" style={{ color }}><Icon size={20} /></div>
      </div>
      {spark ? <TinyLine color={color} /> : <div className="mt-4 h-2 rounded-full bg-slate-800"><div className="h-full rounded-full" style={{ width: "78%", background: color }} /></div>}
    </Card>
  );
}

function Donut({ data, center, size = 160, labels = [], onSegmentClick }) {
  const [tip, setTip] = useState(null);
  let start = 0;
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center" onMouseLeave={() => setTip(null)}>
      <svg width={size} height={size} viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(148,163,184,.18)" strokeWidth="16" />
        {data.map((d, i) => {
          const len = (d.value / 100) * c;
          const dash = `${len} ${c - len}`;
          const label = d.label || labels[i] || `分段 ${i + 1}`;
          const el = <circle key={i} cx="60" cy="60" r={r} fill="none" stroke={d.color} strokeWidth="16" strokeLinecap="butt" strokeDasharray={dash} strokeDashoffset={-start} className="cursor-pointer transition-opacity hover:opacity-80" onMouseEnter={() => setTip({ title: label, body: `${d.value}%`, x: size / 2 + 12, y: size / 2 - 22 })} onClick={() => onSegmentClick ? onSegmentClick(d, i) : toast(`${label} ${d.value}%`)} />;
          start += len;
          return el;
        })}
      </svg>
      <div className="absolute text-center text-sm text-slate-300">{center}</div>
      <ChartTooltip tip={tip} />
    </div>
  );
}

function BarChart({ items, max = 50, height = 92, onBarClick, showAppIcons = false }) {
  const [tip, setTip] = useState(null);
  return (
    <div className="relative grid h-full grid-cols-[repeat(auto-fit,minmax(64px,1fr))] items-end gap-2 px-1 pt-1" style={{ minHeight: height + (showAppIcons ? 74 : 46) }} onMouseLeave={() => setTip(null)}>
      {items.map((it) => (
        <button key={it.label} type="button" onMouseEnter={(event) => setTip({ title: it.label, body: `${it.value}%`, x: event.currentTarget.offsetLeft + 4, y: 6 })} onClick={() => onBarClick ? onBarClick(it) : toast(`${it.label} ${it.value}%`)} className="tv-chart-bar flex min-w-0 flex-col items-center gap-2 rounded-lg border border-transparent p-1.5 hover:border-cyan-300/20 hover:bg-cyan-400/5">
          {showAppIcons && <AppIcon app={it.label} size={22} />}
          <div className="text-xs font-semibold text-slate-100">{it.value}%</div>
          <div className="w-full max-w-8 rounded-t-lg shadow-lg" style={{ height: `${Math.max(14, (it.value / max) * height)}px`, background: `linear-gradient(${it.color}, ${it.color}88)` }} />
          <div className="w-full break-words text-center text-[11px] leading-tight text-slate-300">{it.label}</div>
        </button>
      ))}
      <ChartTooltip tip={tip} />
    </div>
  );
}

function AreaLine({ color = palette.blue, height = 170, onPointClick }) {
  const [tip, setTip] = useState(null);
  const points = [[0,150],[40,120],[80,135],[120,90],[160,115],[200,130],[240,100],[280,125],[320,85],[360,70],[400,118],[440,105],[480,80],[520,120],[560,110],[600,140],[640,115],[680,125],[720,100],[760,130],[800,122]];
  const pts = points.map((p) => p.join(",")).join(" ");
  return (
    <div className="relative" onMouseLeave={() => setTip(null)}>
      <svg viewBox="0 0 800 220" className="h-full w-full" style={{ minHeight: height }}>
        <defs><linearGradient id={`g-${color}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".35" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
        {[40,80,120,160,200].map((y) => <line key={y} x1="0" x2="800" y1={y} y2={y} stroke="rgba(148,163,184,.12)" />)}
        {[100,200,300,400,500,600,700].map((x) => <line key={x} y1="20" y2="205" x1={x} x2={x} stroke="rgba(148,163,184,.08)" />)}
        <polygon points={`0,220 ${pts} 800,220`} fill={`url(#g-${color})`} />
        <polyline points={pts} fill="none" stroke={color} strokeWidth="3" />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="12" fill="transparent" className="cursor-pointer" onMouseEnter={() => setTip({ title: `采样点 ${i + 1}`, body: `${Math.round(220 - y)} Mbps`, x: Math.min(640, x + 12), y: Math.max(6, y - 44) })} onClick={() => onPointClick ? onPointClick(i) : toast(`采样点 ${i + 1} 已选中`)} />
        ))}
        <circle cx="520" cy="120" r="5" fill={color} />
      </svg>
      <ChartTooltip tip={tip} />
    </div>
  );
}

function DataTable({ columns, rows, renderCell }) {
  return (
    <div className="tv-table-wrap rounded-xl border border-cyan-300/12">
      <table className="w-full table-fixed border-collapse text-xs">
        <thead className="bg-slate-900/55 text-xs text-slate-300">
          <tr>{columns.map((c) => <th key={c} className="border-b border-cyan-300/12 px-3 py-2 text-left font-medium">{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => <tr key={i} className="border-b border-cyan-300/8 text-slate-300 hover:bg-cyan-400/5">{r.map((cell, j) => <td key={j} data-label={columns[j]} className="break-words px-3 py-2 align-top">{renderCell ? renderCell(cell, j, r, i) : cell}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

function RiskTag({ level }) {
  const map = { 严重: "border-red-400/40 bg-red-500/15 text-red-300", 高危: "border-red-400/40 bg-red-500/15 text-red-300", 中危: "border-amber-400/40 bg-amber-500/15 text-amber-300", 低危: "border-emerald-400/40 bg-emerald-500/15 text-emerald-300" };
  return <span className={cx("rounded-md border px-2 py-0.5 text-xs font-bold", map[level] || map.低危)}>{level}</span>;
}

function LoginPage({ go, setAuthed }) {
  const [show, setShow] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const login = () => { setAuthed(true); toast("登录成功，已进入数据中心"); go("dashboard", { force: true }); };
  return (
    <div className="relative z-10 min-h-screen p-6">
      <div className="absolute left-6 top-5 rounded-lg border border-cyan-300/15 bg-slate-950/40 px-3 py-1.5 text-xs text-slate-300"><Shield size={14} className="mr-2 inline text-cyan-300" />全流量解析 · 隐密洞察 · 精准溯源</div>
      <div className="tv-login-shell grid min-h-[calc(100vh-64px)] grid-cols-2 items-center gap-8">
        <div className="tv-login-visual relative pl-8">
          <div className="absolute left-0 top-1/2 h-96 w-[760px] -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative h-[520px]">
            <NetworkIllustration />
            {[["加密流量解析", 180, 110], ["GNN 图分析引擎", 520, 110], ["多模态特征融合", 58, 410], ["行为模式识别", 610, 485], ["溯源追踪", 500, 555]].map(([t, x, y]) => (
              <div key={t} className="absolute rounded-md border border-cyan-300/35 bg-slate-950/50 px-3 py-1.5 text-xs text-cyan-200 shadow-lg shadow-cyan-500/10" style={{ left: x, top: typeof y === "number" ? Math.min(y, 470) : y }}>{t}</div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-4 gap-3 rounded-xl border border-cyan-300/18 bg-slate-950/45 p-3 backdrop-blur">
            {[ [Shield, "全流量采集", "多维度数据采集能力"], [Database, "深度特征解析", "200+ 协议解析引擎"], [Brain, "AI 智能分析", "多模态大模型驱动"], [Gauge, "溯源追踪定位", "端到端精准溯源"] ].map(([Icon, t, s]) => <div key={t} className="text-center"><Icon className="mx-auto mb-2 text-cyan-300" /><b>{t}</b><p className="mt-1 text-xs text-slate-400">{s}</p></div>)}
          </div>
        </div>
        <div className="mx-auto w-full max-w-[500px] rounded-2xl border border-cyan-300/35 bg-slate-950/55 p-6 shadow-[0_0_50px_rgba(20,136,255,.22)] backdrop-blur-xl">
          <div className="text-center">
            <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-blue-500/20 text-cyan-300"><Shield size={36} /></div>
            <h1 className="text-3xl font-black">TrafficVigil 密网巡哨</h1>
            <p className="mt-2 text-sm text-slate-400">融合多模态大数据的加密流量识别溯源系统</p>
          </div>
          <form className="mt-6 space-y-4" onSubmit={(event) => { event.preventDefault(); login(); }}>
            <Input label="账号" icon={UserCircle} placeholder="请输入账号" autoComplete="username" />
            <Input label="密码" icon={Lock} placeholder="请输入密码" type={show ? "text" : "password"} autoComplete="current-password" right={<button type="button" aria-label="切换密码可见性" onClick={() => setShow(!show)}>{show ? <Eye size={18} /> : <EyeOff size={18} />}</button>} />
            <div className="flex justify-between text-sm"><label className="tv-check-row flex items-center gap-2 text-slate-400"><input type="checkbox" className="accent-blue-500" />记住登录</label><button type="button" onClick={() => setResetSent(true)} className="text-cyan-300">{resetSent ? "重置链接已发送" : "忘记密码?"}</button></div>
            <Button onClick={login} className="h-11 w-full" icon={LogIn}>登录系统</Button>
            <Button onClick={login} variant="ghost" className="h-10 w-full" icon={Users}>演示账号进入</Button>
          </form>
          <div className="mt-5 grid grid-cols-5 gap-2 text-xs text-slate-300">
            {[ [Globe2,"VPN 分类"], [TableProperties,"SIM 识别"], [Activity,"行为嗅探"], [Users,"群组匹配"], [FileText,"报告生成"] ].map(([Icon,t]) => <div key={t} className="rounded-lg border border-cyan-300/15 bg-slate-900/50 p-2 text-center"><Icon size={17} className="mx-auto mb-1 text-cyan-300" />{t}</div>)}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[ ["98.7%", "SIM 提取准确率", palette.cyan], ["90.2%", "行为分析准确率", palette.blue], ["89.4%", "群组匹配准确率", palette.purple] ].map(([v,t,c]) => <div key={t} className="rounded-xl border border-cyan-300/15 bg-slate-900/45 p-3 text-center"><div className="text-2xl font-black" style={{color:c}}>{v}</div><p className="mt-1 text-xs text-slate-400">{t}</p><TinyLine color={c} /></div>)}
          </div>
        </div>
      </div>
      <footer className="relative z-10 flex justify-between border-t border-cyan-300/10 pt-3 text-xs text-slate-500"><span>© 2025 TrafficVigil 密网巡哨 All Rights Reserved.</span><span>安全可信 · 自主可控</span></footer>
    </div>
  );
}

function NetworkIllustration() {
  return (
    <svg viewBox="0 0 780 640" className="h-full w-full">
      <defs><radialGradient id="node" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#18d5ff" /><stop offset="1" stopColor="#1488ff" stopOpacity=".35" /></radialGradient></defs>
      {Array.from({ length: 36 }).map((_, i) => {
        const x = 260 + Math.cos(i * 0.86) * (140 + (i % 5) * 24);
        const y = 300 + Math.sin(i * 0.86) * (115 + (i % 6) * 22);
        return <circle key={i} cx={x} cy={y} r={5 + (i % 4) * 2} fill="url(#node)" opacity=".85" />;
      })}
      {Array.from({ length: 70 }).map((_, i) => {
        const a = i % 36, b = (i * 7 + 9) % 36;
        const ax = 260 + Math.cos(a * 0.86) * (140 + (a % 5) * 24), ay = 300 + Math.sin(a * 0.86) * (115 + (a % 6) * 22);
        const bx = 260 + Math.cos(b * 0.86) * (140 + (b % 5) * 24), by = 300 + Math.sin(b * 0.86) * (115 + (b % 6) * 22);
        return <line key={i} x1={ax} y1={ay} x2={bx} y2={by} stroke="rgba(24,213,255,.22)" />;
      })}
      <path d="M0 330 C120 250 180 350 300 280 S520 240 760 120" fill="none" stroke="#18d5ff" strokeWidth="3" opacity=".65" />
      <path d="M0 350 C120 270 190 390 310 300 S530 270 760 150" fill="none" stroke="#1488ff" strokeWidth="2" opacity=".45" />
      <circle cx="390" cy="330" r="74" fill="rgba(20,136,255,.12)" stroke="rgba(24,213,255,.45)" />
      <Lock x="360" y="300" width="60" height="60" color="#82d9ff" />
      <ellipse cx="250" cy="560" rx="230" ry="55" fill="none" stroke="rgba(24,213,255,.25)" />
      <ellipse cx="250" cy="560" rx="150" ry="32" fill="none" stroke="rgba(24,213,255,.35)" />
    </svg>
  );
}

function RegisterPage({ go }) {
  const [role, setRole] = useState("管理员");
  const [done, setDone] = useState(false);
  const submit = () => { setDone(true); toast("用户身份密钥已创建"); };
  return (
    <div className="relative z-10 min-h-screen p-10">
      <div className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-3"><Shield size={48} className="text-cyan-300" /><div><h1 className="text-3xl font-black">TrafficVigil 密网巡哨</h1><p className="text-slate-400">融合多模态大数据的加密流量识别溯源系统</p></div></div>
        <button type="button" onClick={() => go("login")} className="flex items-center gap-2 text-slate-300 hover:text-cyan-300"><ArrowLeft size={18} />返回登录</button>
      </div>
      <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] gap-9">
        <Card className="mx-auto w-full max-w-[900px] rounded-[28px] p-10">
          <div className="mb-8 flex items-center gap-5"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-500/15 text-cyan-300"><UserCircle size={38}/></div><div><h2 className="text-3xl font-bold">创建分析员账号</h2><p className="mt-1 text-slate-400">请填写以下信息以创建您的分析员账号</p></div></div>
          <div className="space-y-5">
            <Input label="用户名" icon={UserCircle} placeholder="请输入用户名（4-20位，支持字母、数字、下划线）" />
            <Input label="所属单位" icon={Building2} placeholder="请输入所属单位或组织名称" />
            <Input label="邮箱" icon={Mail} placeholder="请输入有效邮箱地址" />
            <Input label="密码" icon={Lock} placeholder="请输入密码（8-32位，包含字母、数字和特殊字符）" type="password" />
            <Input label="确认密码" icon={Lock} placeholder="请再次输入密码以确认" type="password" />
            <div className="grid grid-cols-[120px_1fr] items-center gap-6"><label className="text-right text-slate-300">角色选择</label><div className="grid grid-cols-3 gap-3">{["管理员", "分析员", "访客"].map((r) => <button type="button" key={r} onClick={() => { setRole(r); toast(`角色已切换为 ${r}`); }} className={cx("rounded-xl border p-4 text-center transition", role === r ? "border-blue-400 bg-blue-500/18 text-cyan-200" : "border-cyan-300/15 bg-slate-900/35 text-slate-300") }><Shield className="mx-auto mb-2" /> <b>{r}</b><p className="mt-1 text-xs text-slate-400">{r === "管理员" ? "系统管理与全局权限" : r === "分析员" ? "执行分析与任务操作" : "只读访问与有限权限"}</p></button>)}</div></div>
            <div className="ml-[144px] flex items-center gap-2 text-sm text-slate-400"><input type="checkbox" className="accent-blue-500" />我已阅读并同意《用户服务协议》与《隐私政策》</div>
            <div className="ml-[144px]"><Button onClick={submit} className="h-14 w-full text-lg">创建账号 <ArrowRight size={18}/></Button></div>
          </div>
        </Card>
        <Card className="rounded-[28px] p-8">
          <h3 className="mb-6 flex items-center gap-2 text-xl font-bold"><Shield size={22} className="text-cyan-300" />身份创建流程</h3>
          <div className="space-y-6">
            {[ ["1", "用户 ID 生成", "系统为您生成唯一身份标识", "TVA-20250529-8F7C3A21", UserCircle], ["2", "哈希密码存储", "密码经安全哈希处理后存储", "b7f9e3a8d4f2c7e9...9d2a1c3b6f8e7d2c", Lock], ["3", "权限初始化", "根据角色分配系统基础权限", role, ShieldCheck], ["4", "任务空间创建", "为您创建隔离的任务与数据空间", "SPACE-8F7C3A21", Box], ["5", "身份密钥生成", "生成专属身份密钥，用于安全认证", "TVK-8F7C3A21-9B6D1E4F", KeyRound] ].map(([n,t,s,v,Icon]) => <div key={t} className="relative rounded-xl border border-cyan-300/18 bg-slate-900/35 p-4 pl-16"><span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-blue-600 font-bold">{n}</span><h4 className="font-bold">{t}</h4><p className="mt-1 text-sm text-slate-400">{s}</p><div className="mt-3 flex items-center justify-between rounded-lg border border-cyan-300/15 bg-slate-950/40 px-4 py-3 text-cyan-300"><span>{v}</span><Icon size={20}/></div></div>)}
          </div>
        </Card>
      </div>
      {done && <div className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-emerald-400/45 bg-slate-950/90 px-8 py-5 shadow-2xl"><CheckCircle2 size={42} className="text-emerald-300" /><div><b>用户身份密钥已创建</b><p className="text-sm text-slate-400">您的账号已成功创建，请妥善保管您的身份密钥</p></div><button type="button" onClick={() => go("login")} className="text-cyan-300">去登录</button></div>}
    </div>
  );
}

function Input({ label, icon: Icon, placeholder, type = "text", right, autoComplete }) {
  const id = useId();
  return <div className="tv-input-row grid grid-cols-[88px_1fr] items-center gap-4"><label htmlFor={id} className="text-right text-sm text-slate-300">{label}</label><div className="flex h-11 items-center gap-3 rounded-lg border border-cyan-300/18 bg-slate-950/35 px-3 focus-within:border-cyan-300/55"><Icon size={17} className="text-slate-500" /><input id={id} name={label} type={type} autoComplete={autoComplete} placeholder={placeholder} className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-600" />{right && <div className="text-slate-500">{right}</div>}</div></div>;
}

function DashboardPage({ go }) {
  const [updatedAt, setUpdatedAt] = useState("14:32:45");
  const [range, setRange] = useState("今日");
  const refreshDashboard = () => {
    const now = new Date();
    setUpdatedAt(now.toLocaleTimeString("zh-CN", { hour12: false }));
  };
  return (
    <PageShell title="数据中心" subtitle={`全局数据概览与系统运行态势 · 更新 ${updatedAt}`} actions={<><SmallSelect label={range} options={["今日","近 7 日","近 30 日"]} onChange={setRange} /><Button variant="ghost" icon={RefreshCw} onClick={refreshDashboard}>刷新</Button></>}>
      <div className="grid grid-cols-6 gap-4">
        <StatCard title="今日分析任务" value="1,246" sub="18.6%" icon={FileText} color={palette.blue} />
        <StatCard title="已处理 PCAP 文件" value="3,782" sub="22.4%" icon={Folder} color={palette.purple} />
        <StatCard title="混合流量识别成功率" value="94%" sub="2.1%" icon={CircleDot} color={palette.cyan} />
        <StatCard title="SIM 提取准确率" value="98.7%" sub="1.3%" icon={TableProperties} color={palette.green} />
        <StatCard title="行为分析准确率" value="90.2%" sub="1.8%" icon={Activity} color={palette.blue} />
        <StatCard title="群组匹配准确率" value="89.4%" sub="1.6%" icon={Users} color={palette.purple} />
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-4">
        <Card><PanelTitle title="实时流量态势" /><AreaLine onPointClick={() => go("capture")} /></Card>
        <Card><PanelTitle title="加密流量构成" right={<SmallSelect label={range} options={["今日","近 7 日","近 30 日"]} onChange={setRange} />} /><div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] items-center"><Donut labels={["普通流量", "VPN 流量", "SIM 流量"]} onSegmentClick={(d, i) => go(i === 1 ? "vpn" : i === 2 ? "sim" : "capture")} center={<><div>总流量</div><b className="text-xl">1.82 TB</b></>} data={[{value:43.4,color:palette.blue},{value:39.1,color:palette.cyan},{value:17.5,color:palette.purple}]} /><Legend items={[ ["普通流量", "789.45 GB", "43.4%", palette.blue], ["VPN 流量", "712.31 GB", "39.1%", palette.cyan], ["SIM 流量", "319.77 GB", "17.5%", palette.purple] ]} /></div><div className="mt-2 text-center text-cyan-300">加密流量占比：56.6%（1.03 TB）</div></Card>
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] gap-4">
        <Card><PanelTitle title="IM 应用分布" right={<SmallSelect label={range} options={["今日","近 7 日","近 30 日"]} onChange={setRange} />} /><BarChart showAppIcons onBarClick={() => go("sim")} items={[{label:"Telegram",value:42.7,color:appMeta.Telegram.color},{label:"WhatsApp",value:24.3,color:appMeta.WhatsApp.color},{label:"Signal",value:12.6,color:appMeta.Signal.color},{label:"WeChat",value:8.9,color:appMeta.WeChat.color},{label:"QQ",value:6.3,color:appMeta.QQ.color},{label:"Unknown",value:5.2,color:appMeta.Unknown.color}]} /></Card>
        <Card><PanelTitle title="高危群组预警" right={<button onClick={() => go("group")} className="text-cyan-300">更多</button>} /><div className="space-y-3">{[["严重","TG-8f3a...7c21","暗网交易，武器，支付凭证","2025-05-19 14:28:11"],["高危","TG-2bd9...a631","涉诈引流，虚假投资，跳转链接","2025-05-19 14:21:47"],["高危","WA-7c11...09ab","赌博，洗钱，USDT 交易","2025-05-19 14:19:02"],["中危","TG-9e2b...c44f","违规营销，批量注册，账号交易","2025-05-19 14:13:33"],["中危","TG-4a7d...f18b","色情内容，付费资源分享","2025-05-19 14:07:59"]].map(r => <div key={r[1]} className="grid grid-cols-[70px_130px_1fr_170px] items-center border-b border-cyan-300/10 py-2 text-sm"><RiskTag level={r[0]} /><span>{r[1]}</span><span className="text-slate-300">{r[2]}</span><span className="text-right text-slate-400">{r[3]}</span></div>)}</div></Card>
      </div>
      <Card className="mt-4"><PanelTitle title="检测流程" /><div className="flex items-center justify-between py-4">{[[Radio,"流量捕获"],[Zap,"预处理"],[Globe2,"VPN 分类"],[TableProperties,"SIM 分类"],[Layers3,"应用识别"],[Eye,"行为嗅探"],[Users,"群组匹配"],[FileText,"报告生成"]].map(([Icon,t],i) => <React.Fragment key={t}><button onClick={() => go(i === 0 ? "capture" : i < 5 ? "workspace" : i === 5 ? "behavior" : i === 6 ? "group" : "reports")} className="text-center"><div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-full border border-cyan-300/25 bg-slate-900/60 text-cyan-300 hover:bg-blue-500/20"><Icon /></div><span>{t}</span></button>{i<7 && <ArrowRight className="text-cyan-500/50" />}</React.Fragment>)}</div></Card>
    </PageShell>
  );
}

function PanelTitle({ title, right }) { return <div className="mb-2 flex items-center justify-between gap-3"><h3 className="flex items-center gap-2 text-base font-bold">{title} <CircleDot size={13} className="text-slate-500" /></h3>{right}</div>; }
function SmallSelect({ label, options, onChange }) {
  const choices = options || [label, "全部", "高危优先", "按时间排序"];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const pick = (value) => {
    setSelected(value);
    setOpen(false);
    onChange?.(value);
  };
  return (
    <span className="relative inline-flex">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className={cx("tv-button rounded-lg border border-cyan-300/15 bg-slate-950/35 px-3 py-1.5 text-xs text-slate-300", open && "border-cyan-300/45 bg-cyan-400/10 text-cyan-200")}>{selected} <ChevronDown className={cx("inline transition-transform", open && "rotate-180")} size={14}/></button>
      {open && (
        <span className="absolute right-0 top-9 z-30 w-36 rounded-lg border border-cyan-300/20 bg-slate-950/95 p-1 shadow-xl">
          {choices.map((item) => <button type="button" key={item} onClick={() => pick(item)} className={cx("block w-full rounded-md px-3 py-1.5 text-left text-xs hover:bg-cyan-400/10", item === selected ? "text-cyan-200" : "text-slate-300")}>{item}</button>)}
        </span>
      )}
    </span>
  );
}
function Legend({ items }) { return <div className="space-y-4">{items.map(([a,b,c,col]) => <div key={a} className="grid grid-cols-[1fr_110px_70px] items-center gap-2 text-sm"><span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full" style={{background:col}} />{a}</span><b>{b}</b><span>{c}</span></div>)}</div>; }

function CapturePage({ go }) {
  const [upload, setUpload] = useState(0);
  const [running, setRunning] = useState(false);
  const [packets, setPackets] = useState(186542);
  const [elapsed, setElapsed] = useState(156);
  useEffect(() => {
    let t;
    if (running) t = setInterval(() => { setPackets(p => p + Math.floor(820 + Math.random() * 1200)); setElapsed(e => Math.min(e + 1, 600)); }, 700);
    return () => clearInterval(t);
  }, [running]);
  useEffect(() => { const t = setInterval(() => setUpload(v => v < 78 ? v + 2 : v), 180); return () => clearInterval(t); }, []);
  const rows = [
    ["1", "14:32:45.123456", "192.168.1.88:52344", "93.184.216.34:443", "TLS 1.3", "517", "Client Hello", "TLS 1.3"],
    ["2", "14:32:45.123789", "93.184.216.34:443", "192.168.1.88:52344", "TLS 1.3", "1337", "Server Hello, Encrypted Extensions", "TLS 1.3"],
    ["3", "14:32:45.124011", "192.168.1.88:52344", "93.184.216.34:443", "TCP", "54", "52344 → 443 [ACK] Seq=1 Ack=1284", "-"],
    ["4", "14:32:45.124322", "192.168.1.88:53512", "148.72.125.12:51820", "UDP", "142", "QUIC Initial, DCID=4d6c...c2b7", "QUIC"],
    ["5", "14:32:45.124688", "148.72.125.12:51820", "192.168.1.88:53512", "UDP", "128", "QUIC Initial, DCID=8e1a...9f11", "QUIC"],
    ["6", "14:32:45.125099", "192.168.1.88:56789", "10.0.0.53:53", "UDP", "87", "Standard query 0x1a2b A example.com", "-"],
    ["7", "14:32:45.125437", "10.0.0.53:53", "192.168.1.88:56789", "UDP", "103", "Standard query response 0x1a2b", "-"],
    ["8", "14:32:45.125811", "192.168.1.88:52345", "172.217.160.110:443", "TCP", "66", "52345 → 443 [SYN]", "-"],
  ];
  return (
    <PageShell title="流量捕获中心" subtitle="上传 PCAP 文件或进行实时抓取，获取网络数据包用于检测与分析">
      <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)_minmax(0,0.55fr)] gap-4">
        <Card><PanelTitle title="PCAP 文件上传" /><div onClick={() => { setUpload(0); toast("已选择 capture_20250519_142500.pcapng"); setTimeout(() => setUpload(78), 200); }} className="grid h-36 cursor-pointer place-items-center rounded-xl border border-dashed border-cyan-300/35 bg-slate-950/30 text-center hover:bg-cyan-400/5"><div><UploadCloud className="mx-auto mb-3 text-cyan-300" size={45}/><p>将 PCAP / PCAPNG 文件拖到此处，或点击选择文件</p><p className="mt-2 text-sm text-slate-500">支持格式：.pcap / .pcapng</p></div></div><div className="mt-4 flex items-center justify-between rounded-lg border border-cyan-300/12 bg-slate-950/35 px-4 py-3 text-sm"><span><FileText size={16} className="mr-2 inline" />capture_20250519_142500.pcapng</span><span>1.82 GB <X size={15} className="ml-2 inline cursor-pointer" onClick={() => setUpload(0)} /></span></div><div className="mt-5"><div className="mb-2 flex justify-between text-sm"><span>上传进度</span><b>{upload}%</b></div><div className="h-3 rounded-full bg-slate-800"><div className="h-full rounded-full bg-blue-500" style={{ width: `${upload}%` }} /></div><div className="mt-3 flex justify-between text-sm text-slate-400"><span>已上传：1.42 GB / 1.82 GB</span><span>预计剩余：<b className="text-emerald-300">00:00:12</b></span></div></div></Card>
        <Card><PanelTitle title="实时抓取" /><div className="space-y-4"><ControlRow label="选择网卡"><ToggleGroup items={["WLAN","Ethernet","Loopback"]} active="WLAN" /></ControlRow><SelectLine text="Intel(R) Wi‑Fi 6 AX201 160MHz (192.168.1.88)" /><ControlRow label="抓取时长"><SelectLine text="00 : 10 : 00" /></ControlRow><ControlRow label="协议过滤"><div className="flex flex-wrap gap-2">{["TCP","UDP","TLS 1.3","QUIC","WireGuard"].map(x => <span key={x} className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300">{x} ×</span>)}</div></ControlRow><div className="grid grid-cols-2 gap-4 pt-2"><Button onClick={() => { setRunning(true); toast("实时抓取已启动"); }} icon={Play}>开始抓取</Button><Button onClick={() => { setRunning(false); toast("实时抓取已停止"); }} variant="ghost" icon={Square}>停止抓取</Button></div></div></Card>
        <Card><div className="mb-3 flex justify-between"><h3 className="text-lg font-bold">任务状态</h3><span className={cx("rounded-full px-3 py-1 text-xs", running ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-700 text-slate-300")}>{running ? "进行中" : "待启动"}</span></div><div className="rounded-xl border border-cyan-300/15 bg-slate-950/35 p-4"><div className="mb-4 flex items-center gap-3 text-cyan-300"><CircleDot />{running ? "实时抓取中" : "等待抓取"}</div>{[["开始时间","2025-05-19 14:30:15"],["运行时长", formatTime(elapsed)],["数据源","WLAN (192.168.1.88)"],["抓取时长","00:10:00"]].map(r => <div className="mb-3 flex justify-between text-sm" key={r[0]}><span className="text-slate-400">{r[0]}</span><span>{r[1]}</span></div>)}</div><Button onClick={() => go("workspace")} className="mt-4 w-full" icon={ArrowRight}>进入综合检测</Button></Card>
      </div>
      <Card className="mt-4"><div className="grid grid-cols-[260px_1fr] gap-5"><div><PanelTitle title="抓取进度" /><div className="flex items-center gap-5"><Donut size={120} center={<b className="text-2xl text-blue-300">{Math.round((elapsed/600)*100)}%</b>} data={[{value:Math.round((elapsed/600)*100),color:palette.blue}]} /><div><p>已运行 {formatTime(elapsed)} / 00:10:00</p><p className="mt-2 text-slate-400">预计剩余 00:07:24</p></div></div></div><div><PanelTitle title="数据包动态统计" /><div className="grid grid-cols-5 gap-3">{[["总数据包", packets],["TCP 包", 102341],["UDP 包", 56782],["加密包", 27419],["丢弃包", 1238]].map(([t,v],i) => <div key={t} className="rounded-xl border border-cyan-300/15 bg-slate-950/35 p-4"><p className="text-slate-400">{t}</p><b className="mt-1 block text-2xl">{v.toLocaleString()}</b><span className="text-xs text-emerald-300">↑ {i+12}.0%</span></div>)}</div></div></div></Card>
      <Card className="mt-4"><PanelTitle title="数据包预览" /><DataTable columns={["No.","Time","Source","Destination","Protocol","Length","Info","Encrypted Tag"]} rows={rows} renderCell={(c,j)=> j===7 && c!=="-" ? <span className="text-cyan-300"><Lock size={14} className="mr-1 inline" />{c}</span> : c} /><Pagination total="显示 1 - 8 / 1000 条" /></Card>
    </PageShell>
  );
}
function formatTime(s) { const m = String(Math.floor(s/60)).padStart(2,"0"), ss = String(s%60).padStart(2,"0"); return `00:${m}:${ss}`; }
function ControlRow({ label, children }) { return <div className="grid grid-cols-[90px_1fr] items-center gap-3"><span className="text-slate-300">{label}</span>{children}</div>; }
function ToggleGroup({ items, active }) {
  const [selected, setSelected] = useState(active);
  return <div className="flex flex-wrap gap-2">{items.map(x => <button type="button" key={x} onClick={() => { setSelected(x); toast(`已选择 ${x}`); }} className={cx("tv-button rounded-lg border px-3 py-1.5 text-xs", x===selected ? "border-blue-400 bg-blue-500/25 text-cyan-200" : "border-cyan-300/15 bg-slate-900/35 text-slate-300")}>{x}</button>)}</div>;
}
function SelectLine({ text }) {
  const [open, setOpen] = useState(false);
  return <button type="button" onClick={() => { setOpen((v) => !v); toast(`${text} ${open ? "已收起" : "已展开"}`); }} className={cx("tv-button flex h-9 w-full items-center justify-between rounded-lg border border-cyan-300/15 bg-slate-950/35 px-3 text-left text-xs text-slate-300", open && "border-cyan-300/45 text-cyan-200")}>{text}<ChevronDown className={cx("transition-transform", open && "rotate-180")} size={15}/></button>;
}
function Pagination({ total }) {
  const [page, setPage] = useState("1");
  return <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400"><span>{total}</span><div className="flex flex-wrap items-center gap-1.5"><SmallSelect label="100 条/页" />{["‹","1","2","3","4","5","...","100","›"].map((x,i)=><button type="button" key={i} onClick={() => { if (!["‹","›","..."].includes(x)) setPage(x); toast(`分页 ${x} 已响应`); }} className={cx("tv-button rounded-md border border-cyan-300/15 px-2.5 py-1", x===page && "bg-blue-500/25 text-cyan-200")}>{x}</button>)}</div></div>;
}

function WorkspacePage({ go }) {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(3);
  const [progress, setProgress] = useState(39.1);
  useEffect(() => {
    if (!running) return;
    let idx = 0;
    const t = setInterval(() => {
      idx += 1; setStep(Math.min(7, 3 + Math.floor(idx / 4))); setProgress(p => Math.min(100, p + 6.4));
      if (idx > 18) { clearInterval(t); setRunning(false); setStep(7); setProgress(100); toast("综合检测完成，已生成报告草稿"); }
    }, 600);
    return () => clearInterval(t);
  }, [running]);
  const steps = ["选择流量数据","流量预处理","VPN / 非 VPN 分类","SIM / 非 SIM 分类","IM 应用分类","行为嗅探","公共群组匹配","生成分析报告"];
  return (
    <PageShell title={<span>综合检测工作台 <span className="ml-2 rounded-md bg-blue-500/20 px-2 text-base text-cyan-300">P05</span></span>} subtitle="一键式端到端检测流程，自动化识别与分析暗网/隐蔽通信行为" actions={<Button variant="ghost" icon={Folder} onClick={() => go("tasks")}>任务历史</Button>}>
      <Card><div className="grid grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1fr)] gap-3"><ConfigBox title="选择 PCAP" value="sample_traffic_0519.pcap" ok /><ConfigBox title="检测模式" value={<ToggleGroup items={["快速检测","完整检测"]} active="完整检测" />} /><ConfigBox title="目标协议" value="全部协议" select /><ConfigBox title="目标应用" value="全部应用" select /><Button onClick={() => { setRunning(true); setStep(0); setProgress(0); toast("综合检测已启动"); }} className="h-full" icon={Play}>开始综合检测</Button></div></Card>
      <div className="my-6 flex items-center justify-between px-10">{steps.map((s,i) => <React.Fragment key={s}><div className="text-center"><div className={cx("mx-auto grid h-14 w-14 place-items-center rounded-full border text-xl", i < step ? "border-emerald-400 bg-emerald-500/15 text-emerald-300" : i === step ? "border-blue-400 bg-blue-500/25 text-blue-200 animate-pulse" : "border-slate-500 bg-slate-900 text-slate-400")}>{i < step ? <CheckCircle2/> : iconsForStep(i)}</div><div className={cx("mt-2 text-sm", i===step && "text-cyan-300")}>{s}</div></div>{i<steps.length-1 && <div className={cx("h-1 flex-1", i < step ? "bg-emerald-400/70" : "bg-slate-700")}/>}</React.Fragment>)}</div>
      <div className="grid grid-cols-[minmax(0,0.72fr)_minmax(0,1.1fr)_minmax(0,0.9fr)] gap-4">
        <Card><PanelTitle title="检测流程步骤" />{steps.map((s,i) => <div key={s} className="mb-3 grid grid-cols-[28px_1fr_86px_70px] items-center gap-2 text-sm"><span className={cx("grid h-7 w-7 place-items-center rounded-full border", i < step ? "border-emerald-400 text-emerald-300" : i === step ? "border-blue-400 text-blue-300" : "border-slate-600 text-slate-400")}>{i+1}</span><span>{s}</span><span className={cx("rounded-md px-2 py-1 text-center text-xs", i < step ? "bg-emerald-500/15 text-emerald-300" : i === step ? "bg-blue-500/15 text-blue-300" : "bg-slate-700/40 text-slate-400")}>{i < step ? "Success" : i === step ? "Running" : "Pending"}</span><span className="text-slate-500">{i<step?"00:0"+(i+5):i===step?"00:27":"--:--"}</span></div>)}</Card>
        <Card><PanelTitle title={<span>当前步骤：<span className="text-cyan-300">{steps[step] || "生成分析报告"}</span></span>} /><div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] gap-4"><div className="h-[270px] overflow-auto rounded-xl border border-cyan-300/12 bg-slate-950/30 p-4 font-mono text-sm text-slate-300">{["14:32:01  开始加载特征模型与预训练权重...","14:32:03  解析流量特征向量 (Flow Features)...","14:32:04  提取设备指纹与通信模式特征...","14:32:06  构建 SIM 行为特征图谱...","14:32:07  运行 SIM 分类模型 (v2.4.1)...","14:32:23  已处理流量：712.31 GB","14:32:27  识别候选 SIM 流量：6,842 条","14:32:27  正在优化分类阈值与置信度..."].map(x=><p key={x} className="mb-3">{x}</p>)}</div><div className="space-y-4"><Card className="bg-slate-950/25"><Donut size={130} center={<><b className="text-2xl text-blue-300">{progress.toFixed(1)}%</b><p className="text-xs">712.31 GB / 1.82 TB</p></>} data={[{value:progress,color:palette.blue}]} /></Card><Card className="bg-slate-950/25"><PanelTitle title="特征匹配强度" /><TinyLine color={palette.purple}/></Card></div></div></Card>
        <Card><PanelTitle title="SIM 候选分布（置信度）" /><BarChart height={205} max={20} items={[{label:"0-0.2",value:3.4,color:palette.purple},{label:"0.2-0.4",value:7.1,color:palette.purple},{label:"0.4-0.6",value:11.4,color:palette.purple},{label:"0.6-0.8",value:9.1,color:palette.purple},{label:"0.8-1.0",value:5.5,color:palette.purple}]} /></Card>
      </div>
      <div className="mt-4 grid grid-cols-6 gap-4">{[["VPN 置信度","94.8%","VPN 流量占比 43.4%",Globe2,palette.cyan],["SIM 置信度","89.4%","SIM 流量占比 39.1%",TableProperties,palette.purple],["应用分类 Top 3","Telegram","总计占比 79.6%",MessageCircle,palette.green],["行为分类 Top 3","加密通信","总计占比 84.1%",Eye,palette.blue],["群组匹配 Top 5","TG-8f3a...7c21","",Users,palette.cyan],["综合风险等级","高风险","风险评分 82 / 100",AlertTriangle,palette.red]].map(([t,v,s,Icon,c]) => <Card key={t}><div className="flex items-center gap-2 text-slate-400"><Icon size={18} style={{color:c}} />{t}</div><div className="mt-4 text-3xl font-bold" style={{color:c}}>{v}</div><p className="mt-2 text-sm text-slate-400">{s}</p><TinyLine color={c}/></Card>)}</div>
      <p className="mt-5 text-center text-sm text-slate-500">注：检测结果仅供安全分析参考，请结合实际业务场景进行判定。</p>
    </PageShell>
  );
}
function iconsForStep(i) { const arr=[Folder,Zap,Shield,TableProperties,MessageCircle,Eye,Users,FileText]; const I=arr[i]||CircleDot; return <I/>; }
function ConfigBox({ title, value, ok, select, options }) {
  const [selected, setSelected] = useState(typeof value === "string" ? value : "");
  if (select) {
    return (
      <div className="rounded-xl border border-cyan-300/15 bg-slate-950/30 p-3">
        <p className="mb-2 text-xs text-slate-400">{title}</p>
        <SmallSelect label={selected || title} options={options || [selected || "完整检测", "快速检测", "完整检测", "仅分类"]} onChange={setSelected} />
      </div>
    );
  }
  return <div className="rounded-xl border border-cyan-300/15 bg-slate-950/30 p-3"><p className="text-xs text-slate-400">{title}</p><div className="mt-1.5 flex items-center justify-between gap-2 font-medium">{typeof value === "string" ? <span>{value}</span> : value}{ok && <CheckCircle2 className="text-emerald-300" size={17}/>}</div></div>;
}

function VpnPage({ go }) {
  const [running, setRunning] = useState(false);
  const [refreshedAt, setRefreshedAt] = useState("14:32:45");
  const [showFeatures, setShowFeatures] = useState(false);
  const startAnalysis = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 1600);
  };
  return (
    <PageShell title="VPN 流量分析" actions={null}>
      <div className="grid grid-cols-[1fr_230px] gap-4">
        <div>
          <Card className="mb-3"><div className="grid grid-cols-[80px_1fr_140px] items-center gap-4"><span>PCAP 文件</span><div className="rounded-lg border border-dashed border-cyan-300/25 bg-slate-950/35 p-4"><FileText className="mr-3 inline text-blue-300" />capture_20250519_142300.pcap <span className="ml-6 text-sm text-slate-400">大小：1.82 GB　流量时长：02:15:42　捕获时间：2025-05-19 14:23:00</span><span className={cx("ml-4 rounded-md px-2 py-1 text-xs", running ? "bg-blue-500/20 text-blue-200" : "bg-emerald-500/15 text-emerald-300")}>{running ? "分析中" : "结果已就绪"}</span></div><Button icon={running ? RefreshCw : Play} onClick={startAnalysis}>{running ? "分析中" : "开始分析"}</Button></div></Card>
          <div className="grid grid-cols-4 gap-3"><StatCard title="VPN Ratio" value="72.8%" sub="3.6%" icon={Globe2} color={palette.cyan} spark={false}/><StatCard title="Non-VPN Ratio" value="27.2%" sub="2.4%" icon={Shield} color={palette.purple} spark={false}/><StatCard title="Total Flows" value="18,642" sub="1,842" icon={Layers3} color={palette.blue} spark={false}/><StatCard title="Confidence" value="93.6%" sub="1.8%" icon={ShieldCheck} color={palette.green} spark={false}/></div>
          <div className="mt-3 grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] gap-3"><Card><PanelTitle title="VPN / 非 VPN 分类" /><div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,0.8fr)] items-center"><Donut center={<><div>总流数</div><b className="text-2xl">18,642</b></>} data={[{value:72.8,color:palette.cyan},{value:27.2,color:palette.purple}]} /><Legend items={[["VPN 流量","72.8%","13,567 flows",palette.cyan],["非 VPN 流量","27.2%","5,075 flows",palette.purple]]}/></div></Card><Card><PanelTitle title="协议分布" /><BarChart items={[{label:"TLS 1.3",value:46.3,color:palette.cyan},{label:"QUIC",value:24.7,color:palette.blue},{label:"WireGuard",value:18.6,color:palette.purple},{label:"Unknown",value:10.4,color:palette.green}]} /></Card></div>
          <Card className="mt-3"><PanelTitle title="流量趋势（按分类）" right={<SmallSelect label="近 2 小时" />} /><AreaLine height={170} color={palette.blue}/></Card>
          <Card className="mt-3"><div className="mb-3 flex items-center justify-between"><PanelTitle title={`流量分类结果 · ${refreshedAt}`} /><div className="flex flex-wrap gap-2"><div className="rounded-lg border border-cyan-300/15 bg-slate-950/35 px-4 py-2 text-sm text-slate-500"><Search size={15} className="mr-2 inline" />搜索 Flow ID / IP / 协议...</div><SmallSelect label="全部" options={["全部","VPN","非 VPN","高置信度"]} /><Button variant="ghost" icon={RefreshCw} onClick={()=>setRefreshedAt(new Date().toLocaleTimeString("zh-CN", { hour12: false }))}>刷新表格</Button></div></div><DataTable columns={["Flow ID","Source","Destination","Protocol","Packet Count","VPN Probability","Prediction","Confidence"]} rows={flowRows} renderCell={(c,j)=> j===6 ? <span className={cx("rounded-md border px-2 py-1 text-xs", c==="VPN" ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300" : "border-purple-400/30 bg-purple-400/10 text-purple-300")}>{c}</span> : c}/><Pagination total="共 18,642 条" /></Card>
        </div>
        <div className="space-y-3"><Card><PanelTitle title="模型解释" />{[["连接时长","28.3%"],["数据包方向比例","21.7%"],["TLS 握手特征","17.9%"],["JA3/JA4 指纹","14.2%"],["端口/协议组合","9.8%"]].map(([a,b]) => <div key={a} className="mb-4"><div className="mb-1 flex justify-between text-sm"><span>{a}</span><span>{b}</span></div><div className="h-1.5 rounded bg-slate-800"><div className="h-full rounded bg-blue-400" style={{width:b}} /></div></div>)}<div className="mt-6 space-y-3 text-sm text-slate-400">{[["模型名称","TV-VPN-Classifier"],["模型版本","v2.4.1"],["训练数据量","18.7M flows"],["特征维度","128"]].map(r => <div className="flex justify-between" key={r[0]}><span>{r[0]}</span><b className="text-slate-300">{r[1]}</b></div>)}</div>{showFeatures && <div className="mt-4 rounded-lg border border-cyan-300/15 bg-slate-950/35 p-3 text-xs text-slate-300">{["flow_duration","packet_direction_ratio","tls_ja3_hash","quic_spin_bit","burst_interval","payload_entropy"].map((x)=><div key={x} className="mb-1 flex justify-between"><span>{x}</span><span className="text-cyan-300">enabled</span></div>)}</div>}<button type="button" onClick={()=>setShowFeatures((v)=>!v)} className="mt-5 text-cyan-300">{showFeatures ? "收起完整特征列表" : "查看完整特征列表"} →</button></Card><Button className="w-full" variant="ghost" icon={Download} onClick={()=>downloadText("filtered_vpn_traffic.pcap","mock pcap data")}>保存 VPN 流量</Button><Button className="w-full" variant="ghost" icon={FileDown} onClick={()=>downloadText("vpn_classification.csv","flow_id,prediction,confidence\nflow_000001,VPN,98.7%","text/csv")}>导出分类结果</Button><Button className="w-full" variant="ghost" icon={BarChart3} onClick={()=>go("sim")}>进入 SIM 分析</Button></div>
      </div>
    </PageShell>
  );
}

function SimPage({ go }) {
  const [savedApps, setSavedApps] = useState([]);
  const exports = [["Telegram","175.86 GB","2",palette.blue],["WhatsApp","65.21 GB","2",palette.green],["Signal","38.84 GB","1",palette.purple],["WeChat","24.04 GB","1",palette.green],["QQ","15.10 GB","1",palette.amber],["Unknown","71.31 GB","2","#94a3b8"]];
  const saveTelegram = () => setSavedApps((prev) => prev.includes("Telegram") ? prev : [...prev, "Telegram"]);
  return (
    <PageShell title="SIM 流量分析系统" subtitle="对过滤后的 VPN 流量进行 IM 应用识别与置信度评估">
      <Card className="mb-4"><div className="grid grid-cols-4 divide-x divide-cyan-300/10 text-sm"><div><span className="text-slate-400">当前任务</span><b className="ml-4">#20250519-001</b></div><div><span className="text-slate-400">过滤后的 VPN 流量文件</span><b className="ml-4 text-cyan-300">filtered_sim_traffic.pcap</b><span className="ml-4">712.31 GB</span><span className="ml-4 text-emerald-300">已加载</span></div><div><span className="text-slate-400">任务开始时间</span><b className="ml-4">2025-05-19 13:41:02</b></div><div><span className="text-slate-400">任务耗时</span><b className="ml-4">00:51:42</b></div></div></Card>
      <div className="grid grid-cols-4 gap-4"><StatCard title="SIM 占比" value="43.4%" sub="" icon={PieChart} color={palette.blue} spark={false}/><StatCard title="Top 应用" value="Telegram" sub="24.7%" icon={MessageCircle} color={palette.blue} spark={false}/><StatCard title="最高置信度" value="99.3%" sub="" icon={CheckCircle2} color={palette.green} spark={false}/><StatCard title="已保存流量数" value="6" sub="" icon={Save} color={palette.purple} spark={false}/></div>
      <div className="mt-4 grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4"><Card><PanelTitle title="SIM / 非 SIM 分类" /><div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] items-center"><Donut center={<><div>总流量</div><b className="text-xl">712.31 GB</b></>} data={[{value:43.4,color:palette.blue},{value:56.6,color:"#cbd5e1"}]} /><Legend items={[["SIM 流量","307.89 GB","43.4%",palette.blue],["非 SIM 流量","404.42 GB","56.6%","#cbd5e1"]]} /></div><div className="mt-3 rounded-lg border border-cyan-300/10 p-3 text-center text-cyan-300">SIM 流量占比：43.4% (307.89 GB)</div></Card><Card><PanelTitle title="IM 应用识别分布" right={<SmallSelect label="按流量占比" options={["按流量占比","按置信度","按文件数量"]} />} /><BarChart showAppIcons items={[{label:"Telegram",value:24.7,color:appMeta.Telegram.color},{label:"WhatsApp",value:18.3,color:appMeta.WhatsApp.color},{label:"Signal",value:12.6,color:appMeta.Signal.color},{label:"WeChat",value:7.8,color:appMeta.WeChat.color},{label:"QQ",value:4.9,color:appMeta.QQ.color},{label:"Unknown",value:31.7,color:appMeta.Unknown.color}]} /></Card></div>
      <div className="mt-4 grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.6fr)] gap-4"><Card><PanelTitle title="应用识别概率" /><DataTable columns={["Flow ID","Top1","Top1 Probability","Top2","Top2 Probability","Telegram","WhatsApp","Signal","Prediction"]} rows={simRows} renderCell={(c,j)=> j>=5&&j<=7 ? <span className="block rounded bg-blue-500/20 px-2 py-1 text-center text-blue-100">{c}</span> : j===8 ? <span className="font-bold text-cyan-300">{c}</span> : c}/><Pagination total="共 25,684 条" /></Card><Card><PanelTitle title="分类导出文件管理" /><DataTable columns={["应用类型","流量大小","文件数量","操作"]} rows={exports.map(e=>[e[0],e[1],e[2],"下载"])} renderCell={(c,j,r)=> j===0 ? <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full" style={{background: exports.find(e=>e[0]===c)?.[3]}} />{c}</span> : j===3 ? <button onClick={()=>downloadText(`${r[0]}.pcap`,"mock pcap")} className="text-cyan-300"><Download size={16}/></button> : c}/><div className="mt-4 flex justify-between font-bold"><span>合计</span><span>390.36 GB</span><span>9</span></div></Card></div>
      <Card className="mt-4"><div className="grid grid-cols-3 gap-6"><Button variant="ghost" icon={FileText} onClick={saveTelegram}>{savedApps.includes("Telegram") ? "Telegram 已保存" : "保存 Telegram 流量"}</Button><Button icon={ArrowRight} onClick={()=>go("behavior")}>进入行为嗅探</Button><Button variant="ghost" icon={Download} onClick={()=>downloadText("filtered_sim_traffic.pcap","mock pcap")}>导出 filtered_sim_traffic.pcap</Button></div></Card>
    </PageShell>
  );
}

function BehaviorPage({ go }) {
  const [detail, setDetail] = useState(true);
  const [fullDetail, setFullDetail] = useState(false);
  const cards = [[MessageCircle,"chat","52.6%","主要预测",palette.blue],[Image,"photo","21.3%","次要预测",palette.cyan],[FileText,"file","11.4%","",palette.amber],[Mic,"voice","7.2%","",palette.purple],[Video,"video","4.5%","",palette.red]];
  return (
    <PageShell title={<span>用户行为嗅探 <span className="ml-2 rounded-md bg-blue-500/20 px-2 text-base text-cyan-300">P08</span></span>} subtitle="当前输入文件： capture_20250519_142815.pcap　(1.82 GB)" actions={<Button variant="ghost" onClick={()=>go("group")}>进入群组匹配</Button>}>
      <div className={cx("grid gap-4", detail ? "grid-cols-[1fr_360px]" : "grid-cols-1")}>
        <div>
          <Card><div className="grid grid-cols-[1fr_520px] items-center gap-5"><div><h3 className="mb-3 text-lg font-bold"><Shield className="mr-2 inline text-cyan-300" />基于流量图特征的加密流量用户行为分析</h3><p className="text-sm leading-7 text-slate-400">本方法将加密流量按时间顺序转换为包级流量图，提取时序与拓扑特征，并通过图神经网络（GNN）进行推理，输出各类用户行为的概率分布。</p></div><div className="flex items-center justify-between">{[[Network,"构建包级流量图"],[Activity,"提取时序特征"],[Brain,"GNN 推理"],[PieChart,"生成行为概率"]].map(([Icon,t],i)=><React.Fragment key={t}><div className="relative rounded-xl border border-cyan-300/18 bg-slate-900/40 p-4 text-center"><span className="absolute -top-3 left-1/2 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full bg-blue-500 text-sm">{i+1}</span><Icon className="mx-auto mb-2 text-cyan-300" /><span className="text-xs">{t}</span></div>{i<3 && <ArrowRight className="text-cyan-500"/>}</React.Fragment>)}</div></div></Card>
          <div className="mt-4 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-4"><Card><PanelTitle title="行为概率" /><RadarChart /></Card><Card><PanelTitle title="行为概率排名" /><div className="space-y-4 p-4">{[["chat",52.6,MessageCircle,palette.blue],["photo",21.3,Image,palette.cyan],["file",11.4,FileText,palette.green],["voice",7.2,Mic,palette.purple],["video",4.5,Video,palette.amber],["idle",1.8,Clock,"#94a3b8"],["unknown",1.2,Hash,"#64748b"]].map(([t,v,Icon,c],i)=><div key={t} className="grid grid-cols-[34px_100px_1fr_60px] items-center gap-3"><span>{i+1}</span><span className="flex items-center gap-2"><Icon size={20} style={{color:c}} />{t}</span><div className="h-3 rounded bg-slate-800"><div className="h-full rounded" style={{width:`${v/60*100}%`,background:c}} /></div><b>{v}%</b></div>)}</div></Card></div>
          <div className="mt-4 grid grid-cols-6 gap-3">{[["最可能行为","chat","52.6%"],["行为置信度","0.783","高置信度"],["样本数量","12,846","条流记录"],["平均包长","486.7 B","标准差 312.8 B"],["平均间隔","152.3 ms","标准差 210.6 ms"],["持续时间","00:26:48","hh:mm:ss"]].map(([t,v,s]) => <Card key={t} className="text-center"><p className="text-slate-400">{t}</p><h3 className="mt-2 text-2xl font-bold">{v}</h3><p className="mt-1 text-sm text-slate-400">{s}</p></Card>)}</div>
          <Card className="mt-4"><PanelTitle title="实例结果" /><div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3 pb-2">{cards.map(([Icon,t,v,tag,c],i)=><button key={t} onClick={()=>setDetail(true)} className={cx("rounded-xl border bg-slate-950/35 p-4 text-left", i===0 ? "border-blue-400 shadow-[0_0_20px_rgba(20,136,255,.22)]" : "border-cyan-300/15") }><div className="mb-2 flex justify-between"><Icon style={{color:c}} /><span className="rounded bg-slate-800 px-2 text-xs">{tag || "..."}</span></div><div className="text-2xl font-bold">{t}</div><div className="text-2xl">{v}</div><div className="mt-4 border-t border-cyan-300/10 pt-3 text-sm text-slate-400"><p>置信度　{[.783,.612,.481,.362,.271][i]}</p><p>样本数　12,846</p></div><span className="tv-button mt-3 inline-flex w-full items-center justify-center rounded-lg border border-cyan-300/15 bg-slate-900/40 px-3 py-1.5 text-sm font-semibold text-cyan-200">查看详情</span></button>)}</div></Card>
        </div>
        {detail && <Card className="rounded-none border-y-0 border-r-0"><div className="mb-5 flex justify-between"><h3 className="text-xl font-bold">实例详情</h3><button onClick={()=>setDetail(false)}><X /></button></div><div className="space-y-3 text-sm">{[["主要预测","chat (52.6%)"],["文件","capture_20250519_142815.pcap"],["时间范围","2025-05-19 14:02:15 ~ 14:28:63"],["持续时间","00:26:48"],["样本数量","12,846"]].map(r => <div className="flex justify-between" key={r[0]}><span className="text-slate-400">{r[0]}</span><b>{r[1]}</b></div>)}</div><SideChart title="包长序列" color={palette.blue}/><SideChart title="时间间隔序列" color={palette.purple}/><PanelTitle title="流量方向分布" /><Donut size={145} center={<><div>总流量</div><b>1.82 TB</b></>} data={[{value:53.1,color:palette.blue},{value:44.7,color:palette.cyan},{value:2.2,color:palette.purple}]} /><div className="mt-4 space-y-3 text-sm">{[["流量图节点数（均值）","213.6"],["流量图边数（均值）","1,248.7"],["流量图密度（均值）","0.027"],["连接持续时间（均值）","18.6 s"],["突发数（均值）","24.3"]].map(r=><div className="flex justify-between" key={r[0]}><span className="text-slate-400">{r[0]}</span><b>{r[1]}</b></div>)}</div>{fullDetail && <div className="mt-4 rounded-lg border border-cyan-300/15 bg-slate-950/35 p-3 text-sm text-slate-300"><p>判定依据：短间隔小包密集、上行消息段占比 61.8%、会话保持时间稳定。</p><p className="mt-2">建议动作：进入群组匹配页联查设备、公共群组与历史会话。</p></div>}<Button className="mt-6 w-full" onClick={()=>setFullDetail((v)=>!v)}>{fullDetail ? "收起完整详情" : "查看完整详情"}</Button></Card>}
      </div>
    </PageShell>
  );
}
function RadarChart() { const labels=["chat","photo","file","voice","video","idle","unknown"]; const pts="150,35 190,90 215,145 165,190 120,175 75,145 95,85"; return <svg viewBox="0 0 300 250" className="h-[280px] w-full"><g transform="translate(0,10)">{[35,65,95,125].map((r,i)=><polygon key={r} points={labels.map((_,idx)=>`${150+Math.cos(-Math.PI/2+idx*2*Math.PI/7)*r},${120+Math.sin(-Math.PI/2+idx*2*Math.PI/7)*r}`).join(" ")} fill="none" stroke="rgba(148,163,184,.22)" />)}{labels.map((l,idx)=><g key={l}><line x1="150" y1="120" x2={150+Math.cos(-Math.PI/2+idx*2*Math.PI/7)*125} y2={120+Math.sin(-Math.PI/2+idx*2*Math.PI/7)*125} stroke="rgba(148,163,184,.15)"/><text x={150+Math.cos(-Math.PI/2+idx*2*Math.PI/7)*142} y={120+Math.sin(-Math.PI/2+idx*2*Math.PI/7)*142} fill="#cbd5e1" fontSize="13" textAnchor="middle">{l}</text></g>)}<polygon points={pts} fill="rgba(20,136,255,.35)" stroke="#1488ff" strokeWidth="2" /></g></svg>; }
function SideChart({ title, color }) { return <div className="mt-5 rounded-xl border border-cyan-300/15 bg-slate-950/35 p-4"><PanelTitle title={title}/><TinyLine color={color}/><TinyLine color={color}/><TinyLine color={color}/></div>; }

function GroupPage({ go }) {
  const [selected, setSelected] = useState("Group_Bravo");
  const [refreshedAt, setRefreshedAt] = useState("14:32:45");
  const [graphFullscreen, setGraphFullscreen] = useState(false);
  const [graphSettingsOpen, setGraphSettingsOpen] = useState(false);
  const [graphLayout, setGraphLayout] = useState("物理布局");
  const copyTaskId = async () => {
    try {
      await navigator.clipboard?.writeText("T20250519001");
    } catch {
      // Browser clipboard permission may be unavailable in local previews.
    }
    toast("任务 ID 已复制");
  };
  return (
    <PageShell title="公共群组匹配" subtitle="基于多源特征与关系图谱的群组关联分析与溯源追踪" actions={<><Button variant="ghost" icon={Copy} onClick={copyTaskId}>任务 ID：T20250519001</Button><Button icon={FileText} onClick={()=>go("reports")}>导出报告</Button></>}>
      <div className="grid grid-cols-4 gap-4"><StatCard title="匹配群组数量" value="128" sub="18.5%" icon={Folder} color={palette.blue}/><StatCard title="高危群组数量" value="23" sub="27.8%" icon={Users} color={palette.amber}/><StatCard title="最高置信度" value="98.7%" sub="1.6%" icon={CircleDot} color={palette.cyan}/><StatCard title="关联设备数量" value="2,436" sub="15.3%" icon={Server} color={palette.purple}/></div>
      <div className={cx("mt-4 grid gap-4", graphFullscreen ? "grid-cols-1" : "grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]")}><Card><div className="mb-4 flex flex-wrap justify-between gap-2"><PanelTitle title={`用户-设备-群组三维关系图谱 · ${graphLayout}`} /><div className="flex flex-wrap gap-2"><SmallSelect label={graphLayout} options={["物理布局","风险优先","平台聚类"]} onChange={setGraphLayout} /><Button variant="ghost" icon={Maximize2} onClick={()=>setGraphFullscreen((v)=>!v)}>{graphFullscreen ? "退出全屏" : "全屏"}</Button><Button variant="ghost" icon={Settings} onClick={()=>setGraphSettingsOpen((v)=>!v)}>{graphSettingsOpen ? "收起配置" : "配置"}</Button></div></div>{graphSettingsOpen && <div className="mb-3 grid grid-cols-3 gap-3 rounded-xl border border-cyan-300/15 bg-slate-950/35 p-3 text-sm"><SwitchRow label="显示证据连线" /><SwitchRow label="突出高危节点" /><SwitchRow label="自动聚焦选中群组" /></div>}<RelationGraph selected={selected} setSelected={setSelected} /><div className="mt-4 flex flex-wrap justify-center gap-4 rounded-xl border border-cyan-300/15 bg-slate-950/35 p-3 text-sm text-slate-300"><span>→ uses</span><span className="text-cyan-300">···· communicates</span><span className="text-slate-400">-- belongs_to</span><span className="text-orange-300">→ matches</span><span className="text-green-300">···· correlates</span></div></Card>{!graphFullscreen && <div className="space-y-4"><Card><h3 className="mb-3 font-bold">当前选中：<span className="text-white">{selected}</span> <RiskTag level="高危" /></h3><div className="grid grid-cols-[1fr_180px] gap-3"><div className="space-y-2 text-sm">{[["平台","Telegram"],["Group ID","-1002456893172"],["成员数量","1,274"],["创建时间","2024-11-03 18:22:11"],["简介","匿名情报交流与资源共享频道"]].map(r=><div className="flex justify-between" key={r[0]}><span className="text-slate-400">{r[0]}：</span><span>{r[1]}</span></div>)}</div><GaugeCircle value={92.4}/></div>{[["时间模式相似度",91],["包长分布相似度",86],["跨协议交互特征",88]].map(([t,v])=><div className="mt-3" key={t}><div className="mb-1 flex justify-between text-sm"><span>{t}</span><span>0.{v}</span></div><div className="h-2 rounded bg-slate-800"><div className="h-full rounded bg-gradient-to-r from-blue-500 to-green-400" style={{width:`${v}%`}} /></div></div>)}</Card><Card><PanelTitle title="证据链" />{["User_9c8f 使用 Device_C3D4","Device_C3D4 与 Flow_c2b3 通信","Flow_c2b3 匹配到 Group_Bravo","Group_Bravo 存在于 Telegram","与历史流量模式高度相似"].map((x,i)=><div key={x} className="mb-3 grid grid-cols-[90px_1fr_70px] items-center gap-3 text-sm"><span className="text-cyan-300">14:{38+i*5}:12</span><span>{x}</span><span className="text-emerald-300">0.9{i}</span></div>)}</Card></div>}</div>
      <Card className="mt-4"><div className="mb-3 flex items-center justify-between"><PanelTitle title={`群组匹配结果 · ${refreshedAt}`} /><div className="flex flex-wrap gap-3"><SmallSelect label="风险等级：全部" options={["风险等级：全部","严重","高危","中危","低危"]}/><div className="rounded-lg border border-cyan-300/15 bg-slate-950/35 px-4 py-2 text-sm text-slate-500"><Search size={15} className="mr-2 inline" />搜索 Group ID / Name</div><Button variant="ghost" icon={RefreshCw} onClick={()=>setRefreshedAt(new Date().toLocaleTimeString("zh-CN", { hour12: false }))}>刷新表格</Button></div></div><DataTable columns={["Group ID","Group Name","Platform","匹配概率","风险等级","证据数量","Last Active Time"]} rows={groupRows} renderCell={(c,j,r)=> j===1 ? <button onClick={()=>setSelected(c)} className="text-left text-cyan-200">{c}</button> : j===3 ? <div className="flex items-center gap-2"><span>{c}</span><div className="h-2 w-24 rounded bg-slate-800"><div className="h-full rounded bg-blue-400" style={{width:c}} /></div></div> : j===4 ? <RiskTag level={c}/> : c}/><Pagination total="共 128 条" /></Card>
    </PageShell>
  );
}
function GaugeCircle({ value }) { return <div className="text-center"><Donut size={160} center={<><b className="text-3xl">{value}%</b></>} data={[{value,color:palette.blue},{value:100-value,color:palette.red}]} /><p className="text-sm text-slate-400">匹配概率</p></div>; }
function RelationGraph({ selected, setSelected }) { const nodes=[ ["User_7a21",50,95,palette.blue], ["User_9c8f",50,170,palette.blue], ["User_b4f2",50,245,palette.blue], ["User_e3a7",50,320,palette.blue], ["Device_A1B2",180,80,palette.cyan], ["Device_C3D4",180,160,palette.cyan], ["Device_E5F6",180,240,palette.cyan], ["Device_G7H8",180,320,palette.cyan], ["Flow_f9a1",340,85,palette.purple], ["Flow_c2b3",340,165,palette.purple], ["Flow_a6c7",340,245,palette.purple], ["Flow_b8d9",340,325,palette.purple], ["Group_Alpha",520,90,"#f97316"], ["Group_Bravo",520,210,"#f97316"], ["Group_Delta",520,325,"#f97316"], ["Telegram",720,80,palette.green], ["WhatsApp",720,210,palette.green], ["Signal",720,330,palette.green] ]; return <svg viewBox="0 0 800 420" className="h-[420px] w-full rounded-xl bg-slate-950/25">{nodes.slice(0,12).map((n,i)=><line key={i} x1={n[1]+20} y1={n[2]} x2={nodes[(i+4)%12+4]?.[1]||520} y2={nodes[(i+4)%12+4]?.[2]||210} stroke="rgba(24,213,255,.35)" />)}{[[340,85,520,210],[340,165,520,210],[340,245,520,210],[340,325,520,210],[520,210,720,80],[520,210,720,210],[520,210,720,330],[520,90,720,80],[520,325,720,330]].map((l,i)=><line key={`m${i}`} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={i<4?"#fb923c":"#22c55e"} strokeDasharray="7 5" opacity=".8"/>)}{nodes.map(([t,x,y,c])=><g key={t} onClick={()=> t.includes("Group") && setSelected(t)} className="cursor-pointer"><circle cx={x} cy={y} r={t===selected?33:24} fill={c} opacity={t === selected ? 0.8 : 0.35} stroke={t===selected?"#fff":c} strokeWidth="2"/><text x={x} y={y+45} fill="#cbd5e1" fontSize="13" textAnchor="middle">{t}</text></g>)}</svg>; }

function ReportsPage({ selectedReport, setSelectedReport }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [riskFilter, setRiskFilter] = useState("全部风险等级");
  const [dateRange, setDateRange] = useState("近 30 日");
  const exportReport = (kind) => downloadText(`TrafficVigil_Report.${kind.toLowerCase()}`, `TrafficVigil 分析报告\n报告编号：${selectedReport[0]}\n风险等级：${selectedReport[4]}`);
  const filteredReports = riskFilter === "全部风险等级" ? reports : reports.filter((report) => report[4] === riskFilter);
  return (
    <PageShell title="分析报告中心" subtitle="集中管理与查看所有分析任务生成的报告" actions={<><Button variant="ghost" icon={FileDown} onClick={()=>exportReport("PDF")}>导出 PDF</Button><Button variant="ghost" icon={FileSpreadsheet} onClick={()=>exportReport("CSV")}>导出 CSV</Button><Button variant="ghost" icon={FileJson} onClick={()=>exportReport("JSON")}>导出 JSON</Button></>}>
      <div className={cx("grid gap-4", fullscreen ? "grid-cols-1" : "grid-cols-[360px_1fr]")}><Card className={cx(fullscreen && "hidden")}><div className="mb-4 grid grid-cols-2 gap-3"><SmallSelect label={riskFilter} options={["全部风险等级","严重","高危","中危","低危"]} onChange={setRiskFilter}/><SmallSelect label="全部任务类型" options={["全部任务类型","完整检测","快速检测","报告生成"]}/><SmallSelect label={dateRange} options={["今日","近 7 日","近 30 日"]} onChange={setDateRange}/><Button variant="ghost" icon={RefreshCw} onClick={()=>{ setRiskFilter("全部风险等级"); setDateRange("近 30 日"); setSelectedReport(reports[0]); }}>重置</Button></div><p className="mb-4 text-sm text-slate-400">共 {filteredReports.length} 条报告 · {dateRange}</p><div className="space-y-3">{filteredReports.map(r=><button key={r[0]} onClick={()=>setSelectedReport(r)} className={cx("w-full rounded-xl border p-4 text-left transition", selectedReport[0]===r[0]?"border-blue-400 bg-blue-500/15":"border-cyan-300/15 bg-slate-950/25 hover:bg-cyan-400/5")}><div className="flex justify-between"><span className="text-sm text-slate-400">{r[0]}</span><RiskTag level={r[4]}/></div><h3 className="mt-2 text-lg font-bold">{r[1]}</h3><p className="mt-2 text-sm text-slate-400">{r[2]} · {r[3]} <span className="float-right text-cyan-300">查看详情 ›</span></p></button>)}</div><Pagination total="" /></Card><Card><div className="mb-3 flex justify-between"><PanelTitle title={fullscreen ? "报告全屏预览" : "报告预览"} /><div className="flex gap-2"><Button variant="ghost" icon={Printer} onClick={()=>window.print()}>打印</Button><Button variant="ghost" icon={Maximize2} onClick={()=>setFullscreen((v)=>!v)}>{fullscreen ? "退出全屏" : "全屏查看"}</Button></div></div><ReportPreview report={selectedReport} /></Card></div>
    </PageShell>
  );
}
function ReportPreview({ report }) { return <div className="mx-auto rounded-xl bg-slate-100 p-5 text-slate-900 shadow-2xl"><div className="mb-4 flex items-center justify-between rounded-xl border border-slate-300 p-4"><div><h2 className="flex items-center gap-2 text-2xl font-black text-slate-900"><Shield className="text-blue-600"/>TrafficVigil 分析报告</h2><p className="mt-3 text-sm">任务名称　<b>{report[1]}</b></p></div><div className="text-right"><p>报告编号：{report[0]}</p><div className="mt-3 flex items-center gap-4"><RiskTag level={report[4]}/><GaugeCircle value={92}/></div></div></div><div className="grid grid-cols-6 gap-3 text-sm">{["VPN 分类结论 恶意 VPN","SIM 分类结论 可疑 SIM","应用识别结论 可疑应用","行为嗅探结论 数据外传","群组匹配结论 高风险群组","模型置信度 96.4%"].map((x,i)=><div key={x} className="rounded-lg border border-slate-300 bg-white p-3"><b>{x.split(" ")[0]}</b><p className="mt-2 text-red-600">{x.split(" ").slice(1).join(" ")}</p></div>)}</div><div className="mt-3 grid grid-cols-3 gap-3"><div className="rounded-lg bg-[#0b1a2d] p-4 text-white"><PanelTitle title="基础信息"/><p>源 IP：192.168.1.88</p><p>目的 IP：45.77.233.12</p><p>协议：TLSv1.3</p><p>设备类型：Windows 10</p></div><div className="rounded-lg bg-[#0b1a2d] p-4 text-white"><PanelTitle title="流量捕获摘要"/><Donut size={130} center={<b>1.82 TB</b>} data={[{value:68.7,color:palette.blue},{value:18.3,color:palette.cyan},{value:6.2,color:palette.green},{value:3.1,color:palette.purple}]} /></div><div className="rounded-lg bg-[#0b1a2d] p-4 text-white"><PanelTitle title="多层分类结果"/><div className="space-y-2"><p>VPN 分类 <b className="float-right text-red-400">恶意 VPN</b></p><p>SIM 分类 <b className="float-right text-amber-400">可疑 SIM</b></p><p>群组匹配 <b className="float-right text-red-400">高风险群组</b></p></div></div></div><div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-lg bg-[#0b1a2d] p-4 text-white"><PanelTitle title="用户行为画像"/><RadarChart /></div><div className="rounded-lg bg-[#0b1a2d] p-4 text-white"><PanelTitle title="公共群组匹配"/><RelationGraph selected="" setSelected={()=>{}} /></div></div><div className="mt-3 grid grid-cols-3 gap-3"><div className="rounded-lg bg-[#0b1a2d] p-4 text-white"><PanelTitle title="风险研判"/><div className="text-center text-6xl font-black text-red-400">92</div><p className="text-center text-red-400">高危</p></div><div className="rounded-lg bg-[#0b1a2d] p-4 text-white"><PanelTitle title="证据链说明"/><p className="text-sm leading-7 text-slate-300">检测到 TLS 加密连接、VPN 隧道特征、可疑 SIM 通信、群组匹配路径，任务结果已自动归档。</p></div><div className="rounded-lg bg-[#0b1a2d] p-4 text-white"><PanelTitle title="模型可信度说明"/><Donut size={120} center={<b>96.4%</b>} data={[{value:96.4,color:palette.blue}]} /></div></div><footer className="mt-4 text-sm text-slate-500">本报告由 TrafficVigil v2.4.1 自动生成，仅供安全分析参考　第 1 页 / 共 1 页</footer></div>; }

function ModelPage() { return <PageShell title="模型与技术展示" subtitle="特征建模 - 流量分类 - 行为关联"><div className="grid grid-cols-3 gap-4"><Card className="col-span-2"><PanelTitle title="系统技术架构"/><div className="grid grid-cols-3 gap-4">{[["预训练模型","通用网络流量预训练 + SIM 微调",Brain,palette.blue],["字节级图建模","Header Graph / Payload Graph / Fusion Graph",Network,palette.cyan],["多模态融合","流量元数据、时序模式、跨协议交互",Layers3,palette.purple],["GraphSAGE / GAT","跨粒度图表示学习",Activity,palette.green],["对抗性训练","高比例噪声流量增强鲁棒性",Shield,palette.amber],["报告生成","结构化研判与证据链输出",FileText,palette.red]].map(([t,s,Icon,c])=><div key={t} className="rounded-xl border border-cyan-300/15 bg-slate-950/35 p-5"><Icon style={{color:c}}/><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="mt-2 text-sm text-slate-400">{s}</p></div>)}</div><div className="mt-6"><PanelTitle title="预训练 → 微调 → 推理流程"/><div className="flex items-center justify-between">{["大规模通用流量","自监督预训练","SIM 专项微调","对抗噪声增强","多层分类推理","行为与群组关联"].map((x,i)=><React.Fragment key={x}><div className="rounded-xl border border-blue-300/20 bg-blue-500/10 px-5 py-4 text-center">{x}</div>{i<5&&<ArrowRight className="text-cyan-400"/>}</React.Fragment>)}</div></div></Card><Card><PanelTitle title="性能指标"/>{[["SIM 提取准确率","98.7%",palette.cyan],["用户行为分析","90.2%",palette.blue],["群组匹配准确率","89.4%",palette.purple],["混合流量识别","94%",palette.green]].map(([t,v,c])=><div key={t} className="mb-5"><div className="mb-2 flex justify-between"><span>{t}</span><b style={{color:c}}>{v}</b></div><div className="h-3 rounded bg-slate-800"><div className="h-full rounded" style={{width:v,background:c}}/></div></div>)}</Card></div><div className="mt-4 grid grid-cols-2 gap-4"><Card><PanelTitle title="字节级流量图示意"/><RelationGraph selected="" setSelected={()=>{}} /></Card><Card><PanelTitle title="方法对比"/><DataTable columns={["方法","SIM 提取","行为分析","群组匹配","备注"]} rows={[["TrafficVigil","98.7%","90.2%","89.4%","多模态图神经网络"],["ET-BERT","78.2%","74.1%","--","预训练流量模型"],["GraphDApp","81.4%","76.5%","--","流级图建模"],["ECD-GNN","84.3%","79.8%","71.2%","粗粒度图结构"]]} /></Card></div></PageShell>; }

function TasksPage({ go }) {
  const [statusFilter, setStatusFilter] = useState("全部状态");
  const [taskRows, setTaskRows] = useState(() => Array.from({length:10}).map((_,i)=>[`TASK-20250519-${String(i+1).padStart(4,"0")}`,`capture_20250519_${142300+i}.pcap`,i%2?"快速检测":"完整检测",`2025-05-19 14:${20+i}:33`,i%3?"已完成":"运行中",["高危","中危","低危"][i%3],["Telegram","WhatsApp","Signal"][i%3],["chat","file","photo"][i%3],"查看报告","复现 / 删除"]));
  const visibleRows = statusFilter === "全部状态" ? taskRows : taskRows.filter((row) => row[4] === statusFilter);
  return <PageShell title="任务历史" subtitle="管理所有流量检测任务记录" actions={<Button icon={Play} onClick={()=>go("workspace")}>创建新任务</Button>}><Card><div className="mb-4 flex flex-wrap gap-3"><div className="flex-[1_1_220px] rounded-lg border border-cyan-300/15 bg-slate-950/35 px-4 py-2 text-slate-500"><Search className="mr-2 inline" size={16}/>搜索任务</div><SmallSelect label={statusFilter} options={["全部状态","已完成","运行中"]} onChange={setStatusFilter}/><SmallSelect label="风险等级"/><SmallSelect label="检测类型"/></div><DataTable columns={["Task ID","File Name","Detection Mode","Created Time","Status","Risk Level","Top Application","Top Behavior","Report","Actions"]} rows={visibleRows} renderCell={(c,j,row)=> j===4 ? <span className={row[4] === "运行中" ? "text-blue-300" : "text-emerald-300"}>{c}</span> : j===5 ? <RiskTag level={c}/> : j===8 ? <button onClick={()=>go("reports")} className="text-cyan-300">{c}</button> : j===9 ? <div className="flex flex-wrap gap-2"><button onClick={()=>go("workspace")} className="text-cyan-300">复现</button><button onClick={()=>setTaskRows((items)=>items.filter((item)=>item[0] !== row[0]))} className="text-red-300">删除</button></div> : c}/><Pagination total={`共 ${visibleRows.length} 条`}/></Card></PageShell>;
}

function SettingsPage({ initialTab = "模型配置" }) {
  const [tab,setTab]=useState(initialTab);
  const [savedAt, setSavedAt] = useState("");
  const [identityKey, setIdentityKey] = useState("TVK-8F7C3A21-9B6D1E4F");
  const [selectedTemplate, setSelectedTemplate] = useState("执法研判模板");
  useEffect(() => setTab(initialTab), [initialTab]);
  const tabs = ["用户信息","模型配置","协议适配","报告模板","数据脱敏","系统日志"];
  return (
    <PageShell title="系统设置" subtitle="配置用户信息、模型参数、协议适配、报告模板与数据脱敏">
      <div className="grid grid-cols-[220px_1fr] gap-4">
        <Card>{tabs.map(x=><button type="button" key={x} onClick={()=>{ setTab(x); toast(`已切换到${x}`); }} className={cx("tv-button mb-2 w-full rounded-lg px-4 py-2.5 text-left",tab===x?"bg-blue-500/20 text-cyan-300":"hover:bg-slate-800/40")}>{x}</button>)}</Card>
        <Card>
          <PanelTitle title={tab}/>
          {tab==="用户信息"&&(
            <div className="grid grid-cols-[1fr_280px] gap-4">
              <div className="space-y-4">
                <Input label="用户名" icon={UserCircle} placeholder="admin" />
                <Input label="所属单位" icon={Building2} placeholder="密网巡哨实验室" />
                <Input label="邮箱" icon={Mail} placeholder="admin@trafficvigil.local" />
                <Input label="身份密钥" icon={KeyRound} placeholder={identityKey} />
              </div>
              <div className="rounded-xl border border-cyan-300/15 bg-slate-950/35 p-4">
                <UserCircle size={44} className="mb-3 text-cyan-300" />
                <h3 className="text-lg font-bold">admin</h3>
                <p className="mt-1 text-sm text-slate-400">管理员 · 全局权限</p>
                <div className="mt-4 space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between"><span>最近登录</span><b>2025-05-19 14:32</b></div>
                  <div className="flex justify-between"><span>任务空间</span><b>SPACE-8F7C3A21</b></div>
                  <div className="flex justify-between"><span>双因素认证</span><b className="text-emerald-300">已启用</b></div>
                </div>
                <Button className="mt-4 w-full" variant="ghost" icon={KeyRound} onClick={()=>setIdentityKey(`TVK-${Math.random().toString(16).slice(2,10).toUpperCase()}-${Math.random().toString(16).slice(2,10).toUpperCase()}`)}>刷新身份密钥</Button>
              </div>
            </div>
          )}
          {tab==="模型配置"&&<div className="grid grid-cols-2 gap-4"><ConfigBox title="当前模型" value="TV-Model v2.4.1" select options={["TV-Model v2.4.1","TV-Model v2.3.8","TV-Model Lite"]}/><ConfigBox title="默认检测模式" value="完整检测" select options={["完整检测","快速检测","仅分类"]}/><ConfigBox title="置信度阈值" value="0.85"/><ConfigBox title="批处理大小" value="128"/></div>}
          {tab==="协议适配"&&<div className="space-y-3">{["TLS 1.3","QUIC","WireGuard","OpenVPN","Shadowsocks"].map(x=><SwitchRow key={x} label={x}/>)}</div>}
          {tab==="报告模板"&&(
            <div className="grid grid-cols-3 gap-4">
              {[["执法研判模板","包含风险评分、证据链与溯源路径",FileText],["管理简报模板","面向领导汇报，突出趋势与结论",Printer],["机器可读模板","JSON/CSV 字段完整输出",FileJson]].map(([title,body,Icon])=>(
                <button type="button" key={title} aria-pressed={selectedTemplate === title} onClick={()=>setSelectedTemplate(title)} className={cx("tv-button rounded-xl border p-4 text-left hover:bg-cyan-400/10", selectedTemplate === title ? "border-blue-400 bg-blue-500/15" : "border-cyan-300/15 bg-slate-950/35")}>
                  <Icon className="mb-3 text-cyan-300" />
                  <h3 className="flex items-center justify-between font-bold">{title}{selectedTemplate === title && <CheckCircle2 size={16} className="text-emerald-300" />}</h3>
                  <p className="mt-2 text-sm text-slate-400">{body}</p>
                </button>
              ))}
            </div>
          )}
          {tab==="数据脱敏"&&<div className="space-y-3">{["IP 地址匿名化","MAC 地址匿名化","端口重映射","序列号随机化","时间戳清除"].map(x=><SwitchRow key={x} label={x}/>)}</div>}
          {tab==="系统日志"&&<DataTable columns={["Time","Level","Module","Message"]} rows={[["14:32:01","INFO","Model","加载特征模型成功"],["14:32:07","INFO","SIM","运行 SIM 分类模型"],["14:33:10","WARN","Group","发现高危群组匹配"],["14:35:22","INFO","Report","报告生成完成"]]} />}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button icon={Save} onClick={()=>setSavedAt(new Date().toLocaleTimeString("zh-CN", { hour12: false }))}>保存设置</Button>
            <Button variant="ghost" icon={RefreshCw} onClick={()=>setSavedAt("已恢复推荐配置")}>恢复推荐配置</Button>
            {savedAt && <span className="self-center text-sm text-emerald-300">{tab}：{savedAt}</span>}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
function SwitchRow({ label }) { const [on,setOn]=useState(true); return <div className="flex items-center justify-between rounded-xl border border-cyan-300/15 bg-slate-950/35 p-3"><span>{label}</span><button type="button" aria-pressed={on} onClick={()=>{ setOn(!on); toast(`${label} 已${on ? "关闭" : "开启"}`); }} className={cx("tv-switch h-6 w-11 rounded-full p-1 transition",on?"bg-blue-500":"bg-slate-700")}><span className={cx("block h-4 w-4 rounded-full bg-slate-100 transition",on&&"translate-x-5")}/></button></div>; }

export default App;
