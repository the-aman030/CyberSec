import { NavLink } from "react-router-dom";
import {
  Activity,
  Network,
  ShieldAlert,
  BrainCircuit,
  Database,
  FileText,
  Settings,
  Route,
  Waypoints,
  Upload,
  Presentation,
  ChevronRight,
} from "lucide-react";
const items = [
  ["/dashboard", "Overview", Activity],
  ["/risk-trajectory", "Risk Trajectory", Route],
  ["/attack-progression", "Attack Progression", Waypoints],
  ["/network", "Network", Network],
  ["/evidence", "Evidence & SHAP", BrainCircuit],
  ["/mitre", "MITRE ATT&CK", ShieldAlert],
  ["/reports", "Reports", FileText],
  ["/settings", "Settings", Settings],
] as const;
export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-soc-line bg-[#081321] lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-soc-line px-5">
          <div className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10">
            <ShieldAlert size={17} className="text-cyan-300" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-wide text-white">
              PREDICTIVE
            </div>
            <div className="text-[10px] tracking-[.25em] text-cyan-300">
              CYBER DEFENCE
            </div>
          </div>
        </div>
        <div className="px-3 py-4">
          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[.18em] text-soc-muted">
            Operations
          </div>
          {items.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs transition ${isActive ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-200" : "text-slate-400 hover:bg-white/[.03] hover:text-slate-200"}`
              }
            >
              <Icon size={15} />
              <span className="flex-1">{label}</span>
              <ChevronRight
                size={13}
                className="opacity-0 group-hover:opacity-50"
              />
            </NavLink>
          ))}
        </div>
        <div className="mt-auto border-t border-soc-line p-3">
          <div className="rounded-lg border border-orange-400/15 bg-orange-400/[.04] p-3">
            <div className="flex items-center gap-2 text-xs text-orange-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
              Demo environment
            </div>
            <p className="mt-1 text-[10px] leading-4 text-soc-muted">
              Synthetic telemetry • no live network connection
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
