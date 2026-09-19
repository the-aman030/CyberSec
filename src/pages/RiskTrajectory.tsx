import { useState } from "react";
import { useForecast } from "../hooks/useForecast";
import { Panel } from "../components/ui/Panel";
import { RiskChart } from "../components/charts/RiskChart";
import { Drawer } from "../components/evidence/Drawer";
import { Metric } from "../components/ui/Metric";
export default function RiskTrajectory() {
  const { data, loading } = useForecast();
  const [p, setP] = useState<any>();
  if (loading || !data)
    return <div className="p-10 text-xs text-soc-muted">Loading…</div>;
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Risk Trajectory</h1>
        <p className="mt-1 text-xs text-soc-muted">
          Observed risk history, forecast progression, confidence and attack
          stage.
        </p>
      </div>
      <Panel
        title="Risk over time"
        subtitle="Click any point for window-level details"
      >
        <RiskChart data={data.riskHistory} onPoint={setP} />
      </Panel>
      <div className="grid gap-4 md:grid-cols-3">
        {data.predictedStages.map((s) => (
          <Panel key={s.name} title={s.name} subtitle={s.window}>
            <div className="text-3xl font-semibold text-white">
              {s.confidence}%
            </div>
            <p className="mt-2 text-xs leading-5 text-soc-muted">
              {s.description}
            </p>
          </Panel>
        ))}
      </div>
      <Drawer open={!!p} onClose={() => setP(null)} title={`Window ${p?.time}`}>
        <div className="grid grid-cols-2 gap-2">
          <Metric label="Risk" value={`${p?.risk}%`} />
          <Metric label="Confidence" value={`${p?.confidence}%`} />
          <Metric label="Stage" value={p?.stage} />
          <Metric label="Type" value={p?.forecast ? "Forecast" : "Observed"} />
        </div>
      </Drawer>
    </div>
  );
}
