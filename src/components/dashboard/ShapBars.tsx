import type { RiskContributor } from "../../types/security";
export function ShapBars({
  items,
  onClick,
}: {
  items: RiskContributor[];
  onClick: (x: RiskContributor) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((x) => (
        <button
          key={x.feature}
          onClick={() => onClick(x)}
          className="w-full text-left"
        >
          <div className="mb-1 flex justify-between text-[10px]">
            <span className="text-slate-300">{x.feature}</span>
            <span className="font-mono text-orange-300">
              +{x.value.toFixed(2)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-orange-400/80"
              style={{ width: `${(x.value / 0.28) * 100}%` }}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
