import { FormEvent, useState } from "react";
import { Building2, CheckCircle2, KeyRound, Mail, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { TrafficScene } from "../../components/three/TrafficScene";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";

const fields = [
  ["用户名", "username", UserRound],
  ["所属单位", "organization", Building2],
  ["邮箱", "email", Mail],
  ["密码", "password", KeyRound],
  ["确认密码", "confirm", KeyRound]
] as const;

const roles = [
  ["管理员", "系统管理与全局权限", ShieldCheck],
  ["分析员", "执行分析与任务操作", UserRound],
  ["访客", "只读访问与有限权限", UsersRound]
] as const;

const steps = ["用户 ID 生成", "哈希密码存储", "权限初始化", "任务空间创建", "身份密钥生成"];

export function RegisterPage() {
  const register = useAuthStore((state) => state.register);
  const setToast = useUiStore((state) => state.setToast);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "captain",
    organization: "计算机设计大赛项目组",
    email: "captain@trafficvigil.local",
    password: "",
    confirm: ""
  });
  const [createdId, setCreatedId] = useState("");
  const [selectedRole, setSelectedRole] = useState("分析员");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (form.password && form.confirm && form.password !== form.confirm) {
      setToast("两次密码输入需要保持一致");
      return;
    }
    const user = register(form);
    setCreatedId(user.userId);
    setToast(`${selectedRole}身份密钥已创建`);
    window.setTimeout(() => navigate("/dashboard"), 900);
  };

  return (
    <main className="auth-page register">
      <TrafficScene />
      <section className="auth-card wide-auth">
        <div className="auth-brand">
          <ShieldCheck size={34} />
          <div>
            <strong>TrafficVigil</strong>
            <span>身份创建与权限初始化</span>
          </div>
        </div>
        <h1>注册分析员身份</h1>
        <p>提交后生成 User ID，并创建身份密钥。</p>
        <form onSubmit={submit} className="form-grid two">
          {fields.map(([label, key, Icon]) => (
            <label key={key}>
              {label}
              <span className="field-shell">
                <Icon size={17} />
                <input
                  type={key === "password" || key === "confirm" ? "password" : "text"}
                  name={`register-${key}`}
                  aria-label={label}
                  value={form[key]}
                  onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                />
              </span>
            </label>
          ))}
          <div className="role-picker">
            {roles.map(([role, text, Icon]) => (
              <button type="button" key={role} className={selectedRole === role ? "active" : ""} onClick={() => { setSelectedRole(role); setToast(`已选择${role}角色`); }}>
                <Icon size={18} />
                <strong>{role}</strong>
                <span>{text}</span>
              </button>
            ))}
          </div>
          <button className="primary-button">创建身份密钥</button>
        </form>
        {createdId && <div className="success-toast">用户身份密钥已创建：{createdId}</div>}
        <div className="auth-links"><Link to="/login">返回登录</Link></div>
      </section>
      <aside className="identity-flow-panel">
        <h2>身份创建流程</h2>
        {steps.map((step, index) => (
          <article key={step}>
            <span>{index + 1}</span>
            <div>
              <strong>{step}</strong>
              <small>{index < 2 ? "自动加密处理" : index < 4 ? "基础权限写入" : "用于安全认证"}</small>
            </div>
            <CheckCircle2 size={18} />
          </article>
        ))}
      </aside>
    </main>
  );
}
