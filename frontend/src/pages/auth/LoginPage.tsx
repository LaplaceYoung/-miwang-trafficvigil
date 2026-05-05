import { ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrafficScene } from "../../components/three/TrafficScene";
import { useAuthStore } from "../../store/authStore";

export function LoginPage() {
  const [account, setAccount] = useState("admin");
  const [password, setPassword] = useState("123456");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const passed = login(account, password);
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
          <label>账号<input name="login-account" aria-label="账号" value={account} onChange={(event) => setAccount(event.target.value)} /></label>
          <label>密码<input name="login-password" aria-label="密码" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <label className="check-row"><input name="remember-login" aria-label="记住登录" type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />记住登录</label>
          {error && <div className="error-toast">{error}</div>}
          <button className="primary-button">登录</button>
        </form>
        <div className="auth-links"><Link to="/register">注册账号</Link><a href="#recover">找回密码</a></div>
      </section>
    </main>
  );
}
