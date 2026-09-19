import { FileText, Download, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Panel } from "../components/ui/Panel";
export default function Reports() {
  const [done, setDone] = useState(false);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Reports</h1>
        <p className="mt-1 text-xs text-soc-muted">
          Prepare a snapshot for an incident review or SIH walkthrough.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Forecast incident brief" subtitle="Current demo snapshot">
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <FileText size={17} className="text-cyan-300" />
              <div>
                <div className="text-slate-200">Predictive risk assessment</div>
                <div className="text-[10px] text-soc-muted">
                  86% current risk · Lateral Movement · 82% confidence
                </div>
              </div>
            </div>
            <button
              onClick={() => setDone(true)}
              className="flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200"
            >
              <Download size={14} /> Generate demo report
            </button>
            {done && (
              <div className="flex items-center gap-2 text-emerald-300">
                <CheckCircle size={14} /> Report snapshot generated (demo).
              </div>
            )}
          </div>
        </Panel>
        <Panel
          title="Export readiness"
          subtitle="Production integration points"
        >
          <ul className="space-y-2 text-xs text-soc-muted">
            <li>• Forecast window and confidence</li>
            <li>• Network path evidence</li>
            <li>• Explainability contributions</li>
            <li>• MITRE ATT&CK mappings</li>
            <li>• Alert investigation timeline</li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}
