import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, Route, HashRouter as Router, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { useAuthStore } from "./store/authStore";
import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { CapturePage } from "./pages/capture/CapturePage";
import { WorkspacePage } from "./pages/workspace/WorkspacePage";
import { VpnAnalysisPage } from "./pages/vpn-analysis/VpnAnalysisPage";
import { SimAnalysisPage } from "./pages/sim-analysis/SimAnalysisPage";
import { BehaviorPage } from "./pages/behavior/BehaviorPage";
import { GroupMatchPage } from "./pages/group-match/GroupMatchPage";
import { ReportsPage } from "./pages/reports/ReportsPage";
import { ModelPage } from "./pages/model/ModelPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import "./styles.css";

function Guarded({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Guarded><DashboardPage /></Guarded>} />
        <Route path="/capture" element={<Guarded><CapturePage /></Guarded>} />
        <Route path="/workspace" element={<Guarded><WorkspacePage /></Guarded>} />
        <Route path="/vpn-analysis" element={<Guarded><VpnAnalysisPage /></Guarded>} />
        <Route path="/sim-analysis" element={<Guarded><SimAnalysisPage /></Guarded>} />
        <Route path="/behavior" element={<Guarded><BehaviorPage /></Guarded>} />
        <Route path="/group-match" element={<Guarded><GroupMatchPage /></Guarded>} />
        <Route path="/reports" element={<Guarded><ReportsPage /></Guarded>} />
        <Route path="/model" element={<Guarded><ModelPage /></Guarded>} />
        <Route path="/settings" element={<Guarded><SettingsPage /></Guarded>} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
