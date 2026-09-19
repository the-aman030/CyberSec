import type { ForecastStage } from "../../types/security";
import { Badge } from "../ui/Panel";
export function StageTimeline({
  stages,
  onClick,
}: {
  stages: ForecastStage[];
  onClick: (s: ForecastStage) => void;
}) {
  return (
    <div className="relative space-y-3">
      {stages.map((s, i) => (
        <button
          key={s.name}
          onClick={() => onClick(s)}
          className="group relative flex w-full items-center gap-3 text-left"
        >
          <div className="relative flex w-5 justify-center">
            <span
              className={`z-10 h-3 w-3 rounded-full border-2 ${i === 1 ? "border-orange-300 bg-orange-400" : "border-cyan-300 bg-soc-panel"}`}
            />
            {i < stages.length - 1 && (
              <span className="absolute top-3 h-9 w-px bg-soc-line" />
            )}
          </div>
          <div className="flex-1 rounded-lg border border-soc-line bg-soc-panel2 px-3 py-2 group-hover:border-cyan-400/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-200">
                {s.name}
              </span>
              <Badge tone={i === 1 ? "orange" : "blue"}>{s.confidence}%</Badge>
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-soc-muted">
              <span>{s.window}</span>
              <span>predicted</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
