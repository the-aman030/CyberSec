import { useMemo, useState } from "react";
import { useForecast } from "../hooks/useForecast";
import { Panel, Badge } from "../components/ui/Panel";
import { AlertTable } from "../components/alerts/AlertTable";
import { Drawer } from "../components/evidence/Drawer";
import { Metric } from "../components/ui/Metric";
export default function Alerts() {
  const { data } = useForecast();
  const [q, setQ] = useState("");
  const [sev, setSev] = useState("All");
  const [status, setStatus] = useState("All");
  const [a, setA] = useState<any>();
  if (!data) return null;
  const filtered = useMemo(
    () =>
      data.alerts.filter(
        (x) =>
          (sev === "All" || x.severity === sev) &&
          (status === "All" || x.status === status) &&
          `${x.id} ${x.description} ${x.sourceIP} ${x.destinationIP}`
            .toLowerCase()
            .includes(q.toLowerCase()),
      ),
    [data.alerts, q, sev, status],
  );
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Security Alerts</h1>
        <p className="mt-1 text-xs text-soc-muted">
          Search, filter and investigate forecast-linked security signals.
        </p>
      </div>
      <Panel
        title="Alert queue"
        action={<Badge tone="red">{filtered.length} visible</Badge>}
      >
        <div className="mb-4 grid gap-2 md:grid-cols-[1fr_160px_160px]">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search alert, IP, description…"
            className="rounded-md border border-soc-line bg-soc-panel2 px-3 py-2 text-xs outline-none placeholder:text-soc-muted focus:border-cyan-400/30"
          />
          <select
            value={sev}
            onChange={(e) => setSev(e.target.value)}
            className="rounded-md border border-soc-line bg-soc-panel2 px-3 py-2 text-xs"
          >
            <option>All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-md border border-soc-line bg-soc-panel2 px-3 py-2 text-xs"
          >
            <option>All</option>
            <option>Open</option>
            <option>Investigating</option>
            <option>Monitoring</option>
            <option>Resolved</option>
          </select>
        </div>
        <AlertTable alerts={filtered} onClick={setA} />
      </Panel>
      <Drawer
        open={!!a}
        onClose={() => setA(null)}
        title={`Investigation · ${a?.id}`}
      >
        <div className="space-y-3">
          <Badge
            tone={
              a?.severity === "Critical" || a?.severity === "High"
                ? "red"
                : "orange"
            }
          >
            {a?.severity}
          </Badge>
          <p className="text-sm leading-5 text-slate-200">{a?.description}</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Source", a?.sourceIP],
              ["Destination", a?.destinationIP],
              ["Stage", a?.stage],
              ["Confidence", `${a?.confidence}%`],
              ["Status", a?.status],
              ["Time", a?.timestamp],
            ].map(([k, v]) => (
              <Metric key={k} label={k} value={v} />
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
