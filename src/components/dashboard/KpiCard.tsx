import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
export function KpiCard({
  label,
  value,
  sub,
  trend,
  icon,
}: {
  label: string;
  value: string;
  sub: string;
  trend?: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-soc-line bg-soc-panel p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[.16em] text-soc-muted">
            {label}
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {value}
          </div>
          <div className="mt-1 text-[11px] text-soc-muted">{sub}</div>
        </div>
        <div className="rounded-lg border border-cyan-400/15 bg-cyan-400/[.05] p-2 text-cyan-300">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-[10px] text-red-300">
          <ArrowUpRight size={12} />
          {trend}
        </div>
      )}
    </div>
  );
}
