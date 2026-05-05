import { create } from "zustand";
import type { UserRole, UserSession } from "../types";

type AuthStore = {
  user: UserSession | null;
  login: (username: string, password: string, role?: UserRole) => boolean;
  register: (payload: { username: string; organization: string; email: string }) => UserSession;
  logout: () => void;
};

const saved = localStorage.getItem("trafficvigil-user");

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
    if (username !== "admin" || password !== "123456") return false;
    const user = makeUser(username, "密网巡哨运行中心", role);
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
