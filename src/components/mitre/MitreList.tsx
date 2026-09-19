import type { MitreTechnique } from "../../types/security";
import { Badge } from "../ui/Panel";
export function MitreList({
  items,
  onClick,
}: {
  items: MitreTechnique[];
  onClick: (x: MitreTechnique) => void;
}) {
  return (
    <div className="space-y-2">
      {items.slice(0, 3).map((x) => (
        <button
          key={x.id}
          onClick={() => onClick(x)}
          className="w-full rounded-lg border border-soc-line bg-soc-panel2 p-3 text-left hover:border-cyan-400/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] text-cyan-300">{x.id}</div>
              <div className="mt-1 text-xs text-slate-200">{x.name}</div>
            </div>
            <Badge tone="orange">{x.confidence}%</Badge>
          </div>
          <div className="mt-2 text-[10px] text-soc-muted">{x.tactic}</div>
        </button>
      ))}
    </div>
  );
}
