import { ArrowRight, LockKeyhole, Radar, ShieldCheck, UserRound, Workflow } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrafficScene } from "../../components/three/TrafficScene";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";

const loginSignals = [
  { label: "VPN 分类", value: "94.8%", icon: ShieldCheck },
  { label: "SIM 识别", value: "98.7%", icon: Workflow },
  { label: "行为嗅探", value: "90.2%", icon: Radar }
];

export function LoginPage() {
  const [account, setAccount] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const setToast = useUiStore((state) => state.setToast);
  const navigate = useNavigate();

  const submit = (event: FormEvent, demo = false) => {
    event.preventDefault();
    const passed = login(demo ? "admin" : account, demo ? "123456" : password);
    if (!passed) {
      setError("账号或密码错误");
      return;
    }
    if (remember) localStorage.setItem("trafficvigil-remember", account);
    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <TrafficScene />
      <aside className="auth-visual-copy" aria-label="系统能力概览">
        <div className="auth-kicker"><ShieldCheck size={18} />全流量解析 · 隐密洞察 · 精准溯源</div>
        <div className="network-lock">
          <LockKeyhole size={42} />
        </div>
        <span>加密流量解析</span>
        <span>多模态特征融合</span>
        <span>GNN 图分析引擎</span>
        <span>行为模式识别</span>
        <span>溯源追踪</span>
        <div className="auth-feature-strip">
          <div><ShieldCheck size={24} /><strong>全流量采集</strong><small>多维度数据采集能力</small></div>
          <div><Workflow size={24} /><strong>深度特征解析</strong><small>200+ 协议解析引擎</small></div>
          <div><Radar size={24} /><strong>AI 智能分析</strong><small>多模态大模型驱动</small></div>
        </div>
      </aside>
      <section className="auth-card">
        <div className="auth-brand">
          <ShieldCheck size={34} />
          <div>
            <strong>TrafficVigil</strong>
            <span>密网巡哨安全分析控制台</span>
          </div>
        </div>
        <h1>登录系统</h1>
        <p>请输入授权账号进入 TrafficVigil 安全分析控制台。</p>
        <form onSubmit={submit} className="form-stack">
          <label>账号<span className="field-shell"><UserRound size={17} /><input name="login-account" aria-label="账号" value={account} onChange={(event) => setAccount(event.target.value)} /></span></label>
          <label>密码<span className="field-shell"><LockKeyhole size={17} /><input name="login-password" aria-label="密码" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></span></label>
          <label className="check-row"><input name="remember-login" aria-label="记住登录" type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />记住登录</label>
          {error && <div className="error-toast">{error}</div>}
          <button className="primary-button">登录系统<ArrowRight size={18} /></button>
          <button className="secondary-button" type="button" onClick={(event) => submit(event as unknown as FormEvent, true)}>演示账号进入<UserRound size={17} /></button>
        </form>
        <div className="auth-signal-grid">
          {loginSignals.map(({ label, value, icon: Icon }) => (
            <div key={label}><Icon size={18} /><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
        <div className="auth-links"><Link to="/register">注册账号</Link><button type="button" onClick={() => setToast("密码找回请求已提交给管理员")}>找回密码</button></div>
      </section>
    </main>
  );
}
