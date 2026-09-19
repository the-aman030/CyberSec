import type { ReactNode } from "react";
export function Panel({
  title,
  subtitle,
  children,
  action,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-soc-line bg-soc-panel shadow-[0_10px_30px_rgba(0,0,0,.18)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-soc-line px-4 py-3">
        {title ? (
          <div>
            <h2 className="text-sm font-semibold text-slate-100">{title}</h2>
            {subtitle && (
              <p className="mt-0.5 text-[11px] text-soc-muted">{subtitle}</p>
            )}
          </div>
        ) : (
          <span />
        )}
        {action}
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}
export function Badge({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "red" | "orange" | "green" | "gray";
}) {
  const c = {
    blue: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    red: "border-red-400/20 bg-red-400/10 text-red-300",
    orange: "border-orange-400/20 bg-orange-400/10 text-orange-300",
    green: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    gray: "border-slate-500/20 bg-slate-500/10 text-slate-300",
  }[tone];
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium ${c}`}
    >
      {children}
    </span>
  );
}
export function EmptyState({
  title = "No data",
  text = "Nothing to display.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="flex min-h-40 items-center justify-center text-center">
      <div>
        <p className="text-sm text-slate-300">{title}</p>
        <p className="mt-1 text-xs text-soc-muted">{text}</p>
      </div>
    </div>
  );
}
