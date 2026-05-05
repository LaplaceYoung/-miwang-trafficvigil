import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export function RegisterPage() {
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "captain",
    organization: "计算机设计大赛项目组",
    email: "captain@trafficvigil.local",
    password: "",
    confirm: ""
  });
  const [createdId, setCreatedId] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const user = register(form);
    setCreatedId(user.userId);
    window.setTimeout(() => navigate("/dashboard"), 900);
  };

  return (
    <main className="auth-page register">
      <section className="auth-card wide-auth">
        <h1>注册分析员身份</h1>
        <p>提交后生成 User ID，并创建身份密钥。</p>
        <form onSubmit={submit} className="form-grid two">
          {[
            ["用户名", "username"],
            ["单位 / 组织", "organization"],
            ["邮箱", "email"],
            ["密码", "password"],
            ["确认密码", "confirm"]
          ].map(([label, key]) => (
            <label key={key}>
              {label}
              <input
                type={key.includes("password") || key === "confirm" ? "password" : "text"}
                name={`register-${key}`}
                aria-label={label}
                value={form[key as keyof typeof form]}
                onChange={(event) => setForm({ ...form, [key]: event.target.value })}
              />
            </label>
          ))}
          <button className="primary-button">创建身份密钥</button>
        </form>
        {createdId && <div className="success-toast">用户身份密钥已创建：{createdId}</div>}
        <div className="auth-links"><Link to="/login">返回登录</Link></div>
      </section>
    </main>
  );
}
