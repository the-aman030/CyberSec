import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import Dashboard from "./pages/Dashboard";
import RiskTrajectory from "./pages/RiskTrajectory";
import AttackProgression from "./pages/AttackProgression";
import Network from "./pages/Network";
import Evidence from "./pages/Evidence";
import Mitre from "./pages/Mitre";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/risk-trajectory" element={<RiskTrajectory />} />
        <Route path="/attack-progression" element={<AttackProgression />} />
        <Route path="/network" element={<Network />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/mitre" element={<Mitre />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
