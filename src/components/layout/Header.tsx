import { Bell, Upload, Presentation, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
export function Header({
  onUpload,
  onPresentation,
}: {
  onUpload: () => void;
  onPresentation: () => void;
}) {
  const [range, setRange] = useState("Last 20 min");
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-soc-line bg-[#07111f]/95 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <Menu className="text-slate-500 lg:hidden" size={19} />
        <div>
          <div className="text-xs font-semibold text-slate-200">
            Security Operations Center
          </div>
          <div className="text-[10px] text-soc-muted">
            Predictive network attack forecasting
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onUpload}
          className="hidden items-center gap-2 rounded-md border border-soc-line bg-soc-panel px-3 py-2 text-xs text-slate-300 hover:border-cyan-400/30 sm:flex"
        >
          <Upload size={14} /> Ingest telemetry
        </button>
        <button
          onClick={onPresentation}
          className="hidden items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200 hover:bg-cyan-400/15 md:flex"
        >
          <Presentation size={14} /> Presentation
        </button>
        <label className="relative flex items-center">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="appearance-none rounded-md border border-soc-line bg-soc-panel py-2 pl-3 pr-8 text-xs text-slate-300 outline-none"
          >
            <option>Last 5 min</option>
            <option>Last 20 min</option>
            <option>Last hour</option>
            <option>Last 24 hours</option>
          </select>
          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-2 text-soc-muted"
          />
        </label>
        <button className="relative rounded-md border border-soc-line bg-soc-panel p-2 text-slate-400 hover:text-slate-200">
          <Bell size={15} />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-400" />
        </button>
      </div>
    </header>
  );
}
