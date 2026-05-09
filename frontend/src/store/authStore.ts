import { create } from "zustand";
import type { UserRole, UserSession } from "../types";

type AuthStore = {
  user: UserSession | null;
  login: (username: string, password: string, role?: UserRole) => boolean;
  register: (payload: { username: string; organization: string; email: string }) => UserSession;
  logout: () => void;
};

const saved = localStorage.getItem("trafficvigil-user");

function isValidLogin(username: string, password: string): boolean {
  const name = username.trim();
  return /^[A-Za-z0-9_]{4,20}$/.test(name) && password.length >= 6 && password.length <= 32 && !/\s/.test(password);
}

function makeUser(username: string, organization = "计算机设计大赛项目组", role: UserRole = "管理员"): UserSession {
  return {
    userId: `TVU-${Math.floor(100000 + Math.random() * 899999)}`,
    username,
    organization,
    role,
    token: `session-token-${Date.now()}`,
    recentTasks: 12
  };
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: saved ? (JSON.parse(saved) as UserSession) : null,
  login: (username, password, role = "管理员") => {
    if (!isValidLogin(username, password)) return false;
    const user = makeUser(username.trim(), "密网巡哨运行中心", role);
    localStorage.setItem("trafficvigil-user", JSON.stringify(user));
    set({ user });
    return true;
  },
  register: (payload) => {
    const user = makeUser(payload.username, payload.organization, "分析员");
    localStorage.setItem("trafficvigil-user", JSON.stringify(user));
    set({ user });
    return user;
  },
  logout: () => {
    localStorage.removeItem("trafficvigil-user");
    set({ user: null });
  }
}));
