import { useState } from "react";
import { useForecast } from "../hooks/useForecast";
import { Panel } from "../components/ui/Panel";
import { StageTimeline } from "../components/dashboard/StageTimeline";
import { Drawer } from "../components/evidence/Drawer";
export default function AttackProgression() {
  const { data } = useForecast();
  const [s, setS] = useState<any>();
  if (!data) return null;
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Attack Progression</h1>
        <p className="mt-1 text-xs text-soc-muted">
          A forecast sequence rather than a claim of confirmed compromise.
        </p>
      </div>
      <Panel
        title="Predicted progression"
        subtitle="Stage confidence across the forecast horizon"
      >
        <StageTimeline stages={data.predictedStages} onClick={setS} />
      </Panel>
      <div className="grid gap-4 md:grid-cols-3">
        {data.predictedStages.map((x, i) => (
          <Panel key={x.name} title={`Window ${i + 1}`} subtitle={x.window}>
            <div className="text-lg font-semibold text-white">{x.name}</div>
            <div className="mt-2 text-xs text-cyan-300">
              {x.confidence}% confidence
            </div>
            <p className="mt-3 text-xs leading-5 text-soc-muted">
              {x.description}
            </p>
          </Panel>
        ))}
      </div>
      <Drawer
        open={!!s}
        onClose={() => setS(null)}
        title={`Evidence · ${s?.name}`}
      >
        <p className="text-xs leading-5 text-slate-300">{s?.description}</p>
      </Drawer>
    </div>
  );
}
