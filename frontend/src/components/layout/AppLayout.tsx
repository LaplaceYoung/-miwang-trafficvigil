import {
  Activity,
  Bell,
  Boxes,
  Clock3,
  Cpu,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareLock,
  Radio,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
  Workflow
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";

const navItems: { label: string; path: string; icon: LucideIcon }[] = [
  { label: "数据中心", path: "/dashboard", icon: LayoutDashboard },
  { label: "流量捕获", path: "/capture", icon: Radio },
  { label: "综合检测", path: "/workspace", icon: Workflow },
  { label: "VPN 分析", path: "/vpn-analysis", icon: ShieldCheck },
  { label: "SIM 分析", path: "/sim-analysis", icon: MessageSquareLock },
  { label: "行为嗅探", path: "/behavior", icon: Activity },
  { label: "群组匹配", path: "/group-match", icon: UsersRound },
  { label: "报告中心", path: "/reports", icon: FileText },
  { label: "模型技术", path: "/model", icon: Boxes },
  { label: "历史设置", path: "/settings", icon: Settings }
];

const pageTitles: Record<string, { title: string; task: string }> = {
  "/dashboard": { title: "数据中心：全局流量态势", task: "TV-20260505-0427 / success" },
  "/capture": { title: "流量捕获中心：PCAP 与实时抓取", task: "TASK-20260505-0427 / running" },
  "/workspace": { title: "综合检测工作台：八步分析流程", task: "PIPELINE-20260505-0427 / running" },
  "/vpn-analysis": { title: "VPN 流量分析：协议识别与分类", task: "VPN-20260505-0427 / success" },
  "/sim-analysis": { title: "SIM 加密即时通信分析", task: "SIM-20260505-0427 / success" },
  "/behavior": { title: "用户行为嗅探：GNN 行为分类", task: "BEH-20260505-0427 / success" },
  "/group-match": { title: "公共群组匹配：三维关系图谱", task: "GRAPH-20260505-0427 / success" },
  "/reports": { title: "分析报告中心：结构化研判输出", task: "RPT-20260505-0427 / ready" },
  "/model": { title: "模型与技术展示：训练与评测", task: "TV-Model v2.4.1 / online" },
  "/settings": { title: "任务历史与系统设置", task: "SYS-20260505 / normal" }
};

export function AppLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuthStore();
  const { toast, setToast } = useUiStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [clock, setClock] = useState(() => new Date());
  const [collapsed, setCollapsed] = useState(false);
  const pageMeta = pageTitles[location.pathname] ?? pageTitles["/dashboard"];

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className={`console-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <aside className="console-sidebar">
        <NavLink to="/dashboard" className="console-brand">
          <span>巡</span>
          <strong>TrafficVigil</strong>
          <small>密网巡哨安全分析控制台</small>
        </NavLink>
        <button className="menu-toggle" aria-label="折叠菜单" onClick={() => setCollapsed((value) => !value)}><Menu size={18} /></button>
        <nav>
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink key={path} to={path}>
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-health">
          <div><ShieldCheck size={18} /><strong>系统运行状态</strong><span>正常运行</span></div>
          <label><span>CPU</span><i><b style={{ width: "23%" }} /></i><em>23%</em></label>
          <label><span>内存</span><i><b style={{ width: "47%" }} /></i><em>47%</em></label>
          <label><span>存储</span><i><b style={{ width: "62%" }} /></i><em>62%</em></label>
          <label><span>网络</span><i><b style={{ width: "78%" }} /></i><em>128 Mbps</em></label>
        </div>
      </aside>
      <section className="console-main">
        <header className="console-topbar">
          <div>
            <strong>{pageMeta.title}</strong>
            <span>任务状态：{pageMeta.task}</span>
          </div>
          <div className="topbar-meta">
            <span><i className="online-dot" />在线</span>
            <span><Cpu size={16} />模型版本：TV-Model v2.4.1</span>
            <span><Clock3 size={16} />{clock.toLocaleString("zh-CN", { hour12: false })}</span>
            <button aria-label="通知" onClick={() => setToast("12 条系统通知已同步")}><Bell size={17} /><b>12</b></button>
          </div>
          <div className="user-pill">
            <UserRound size={17} />
            <span>{user?.userId ?? "当前未登录"}</span>
            <b>{user?.role ?? "管理员"}</b>
            <button
              aria-label="退出登录"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>
        <main className="page-container">{children}</main>
        {toast && <div className="global-toast">{toast}</div>}
      </section>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </header>
  );
}
