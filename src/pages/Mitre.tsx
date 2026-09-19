import { useState } from "react";
import { useForecast } from "../hooks/useForecast";
import { Panel, Badge } from "../components/ui/Panel";
import { MitreList } from "../components/mitre/MitreList";
import { Drawer } from "../components/evidence/Drawer";
export default function Mitre() {
  const { data } = useForecast();
  const [x, setX] = useState<any>();
  if (!data) return null;
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">
          MITRE ATT&CK Mapping
        </h1>
        <p className="mt-1 text-xs text-soc-muted">
          Technique hypotheses derived from predicted behavior and supporting
          telemetry.
        </p>
      </div>
      <Panel
        title="Technique mapping"
        subtitle="Lateral Movement is the dominant predicted tactic"
      >
        <div className="mb-4 flex items-center gap-2">
          <Badge tone="orange">Lateral Movement</Badge>
          <span className="text-xs text-soc-muted">
            72% top technique confidence
          </span>
        </div>
        <MitreList items={data.mitreTechniques} onClick={setX} />
      </Panel>
      <Drawer
        open={!!x}
        onClose={() => setX(null)}
        title={`${x?.id} · ${x?.name}`}
      >
        <div className="space-y-3">
          <Badge tone="blue">{x?.tactic}</Badge>
          <div className="text-2xl font-semibold text-white">
            {x?.confidence}%
          </div>
          <p className="text-xs leading-5 text-slate-300">{x?.why}</p>
          {x?.evidence?.map((e: string) => (
            <div
              key={e}
              className="rounded-md border border-soc-line bg-soc-panel2 p-2 font-mono text-[10px] text-cyan-200"
            >
              {e}
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
