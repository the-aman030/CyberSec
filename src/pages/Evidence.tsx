import { useState } from "react";
import { BrainCircuit, Upload } from "lucide-react";
import { useForecast } from "../hooks/useForecast";
import { Panel } from "../components/ui/Panel";
import { ShapBars } from "../components/dashboard/ShapBars";
import { Drawer } from "../components/evidence/Drawer";
import { Metric } from "../components/ui/Metric";
import { UploadModal } from "../components/evidence/UploadModal";
export default function Evidence() {
  const { data } = useForecast();
  const [x, setX] = useState<any>();
  const [upload, setUpload] = useState(false);
  if (!data) return null;
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">
            Evidence & Explainability
          </h1>
          <p className="mt-1 text-xs text-soc-muted">
            SHAP-style feature contributions for the current forecast snapshot.
          </p>
        </div>
        <button
          onClick={() => setUpload(true)}
          className="flex items-center gap-2 rounded-md border border-soc-line bg-soc-panel px-3 py-2 text-xs"
        >
          <Upload size={14} /> Upload telemetry
        </button>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Panel
          title="Risk contribution ranking"
          subtitle="Click a feature to inspect its meaning"
        >
          <ShapBars items={data.riskContributors} onClick={setX} />
        </Panel>
        <Panel
          title="Explainability note"
          subtitle="How to read the contribution chart"
        >
          <div className="flex gap-3 rounded-lg border border-cyan-400/15 bg-cyan-400/[.04] p-4">
            <BrainCircuit className="shrink-0 text-cyan-300" size={19} />
            <p className="text-xs leading-5 text-slate-300">
              Positive values indicate features pushing the demo model toward
              higher risk. These are illustrative contributions, not outputs
              from a trained production model.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Metric label="Current risk" value="86%" />
            <Metric label="Model confidence" value="82%" />
            <Metric label="Top feature" value="SYN Activity" />
            <Metric label="Top contribution" value="+0.28" />
          </div>
        </Panel>
      </div>
      <Drawer open={!!x} onClose={() => setX(null)} title={x?.feature || ""}>
        <Metric label="Contribution" value={`+${x?.value?.toFixed(2)}`} />
        <div className="mt-3 rounded-lg border border-soc-line bg-soc-panel2 p-3 text-xs leading-5 text-slate-300">
          {x?.description}
        </div>
        <div className="mt-3 rounded-lg border border-orange-400/20 bg-orange-400/[.04] p-3 text-xs leading-5 text-orange-100">
          {x?.implication}
        </div>
      </Drawer>
      <UploadModal open={upload} onClose={() => setUpload(false)} />
    </div>
  );
}
