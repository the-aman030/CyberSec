import { useState } from "react";
import { Panel } from "../components/ui/Panel";
export default function Settings() {
  const [live, setLive] = useState(true);
  const [dense, setDense] = useState(true);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Settings</h1>
        <p className="mt-1 text-xs text-soc-muted">
          Demo preferences and future API configuration points.
        </p>
      </div>
      <Panel title="Dashboard behavior">
        <div className="space-y-4">
          <label className="flex items-center justify-between text-xs">
            <span>
              <b className="text-slate-200">Live demo pulse</b>
              <span className="ml-2 text-soc-muted">
                simulate periodic UI updates
              </span>
            </span>
            <input
              type="checkbox"
              checked={live}
              onChange={(e) => setLive(e.target.checked)}
              className="accent-cyan-400"
            />
          </label>
          <label className="flex items-center justify-between text-xs">
            <span>
              <b className="text-slate-200">Dense SOC layout</b>
              <span className="ml-2 text-soc-muted">
                compact information spacing
              </span>
            </span>
            <input
              type="checkbox"
              checked={dense}
              onChange={(e) => setDense(e.target.checked)}
              className="accent-cyan-400"
            />
          </label>
        </div>
      </Panel>
      <Panel
        title="Backend integration"
        subtitle="No secrets are required for this frontend demo"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-soc-muted">
              API base URL
            </label>
            <input
              placeholder="https://api.example.com"
              className="mt-2 w-full rounded-md border border-soc-line bg-soc-panel2 px-3 py-2 text-xs"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-wider text-soc-muted">
              Forecast endpoint
            </label>
            <input
              value="/v1/forecast"
              readOnly
              className="mt-2 w-full rounded-md border border-soc-line bg-soc-panel2 px-3 py-2 text-xs text-soc-muted"
            />
          </div>
        </div>
      </Panel>
    </div>
  );
}
