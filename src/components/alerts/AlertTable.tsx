import type { SecurityAlert } from "../../types/security";
import { Badge } from "../ui/Panel";
const sev = (s: string) =>
  s === "Critical"
    ? "red"
    : s === "High"
      ? "orange"
      : s === "Medium"
        ? "blue"
        : "gray";
export function AlertTable({
  alerts,
  onClick,
}: {
  alerts: SecurityAlert[];
  onClick: (a: SecurityAlert) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="text-[10px] uppercase tracking-wider text-soc-muted">
          <tr>
            <th className="pb-3">Alert</th>
            <th className="pb-3">Severity</th>
            <th className="pb-3">Source → Destination</th>
            <th className="pb-3">Stage</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((a) => (
            <tr
              key={a.id}
              onClick={() => onClick(a)}
              className="cursor-pointer border-t border-soc-line hover:bg-white/[.025]"
            >
              <td className="py-3">
                <div className="font-mono text-[10px] text-cyan-300">
                  {a.id}
                </div>
                <div className="mt-1 max-w-sm text-slate-300">
                  {a.description}
                </div>
                <div className="mt-1 text-[10px] text-soc-muted">
                  {a.timestamp}
                </div>
              </td>
              <td>
                <Badge tone={sev(a.severity) as any}>{a.severity}</Badge>
              </td>
              <td className="font-mono text-[10px] text-slate-400">
                {a.sourceIP} → {a.destinationIP}
              </td>
              <td className="text-slate-400">
                {a.stage}
                <div className="text-[10px] text-soc-muted">
                  {a.confidence}% confidence
                </div>
              </td>
              <td>
                <Badge
                  tone={
                    a.status === "Open"
                      ? "red"
                      : a.status === "Investigating"
                        ? "orange"
                        : a.status === "Resolved"
                          ? "green"
                          : "blue"
                  }
                >
                  {a.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
