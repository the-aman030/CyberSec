export function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg border border-soc-line bg-soc-panel2 p-3">
      <div className="text-[9px] uppercase tracking-[.15em] text-soc-muted">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-slate-100">{value}</div>
    </div>
  );
}
