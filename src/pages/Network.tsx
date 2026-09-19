import { useState } from "react";
import { useForecast } from "../hooks/useForecast";
import { Panel } from "../components/ui/Panel";
import { NetworkGraph } from "../components/network/NetworkGraph";
import { Drawer } from "../components/evidence/Drawer";
import { Metric } from "../components/ui/Metric";
export default function Network() {
  const { data } = useForecast();
  const [sel, setSel] = useState<any>();
  if (!data) return null;
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">
          Network Investigation
        </h1>
        <p className="mt-1 text-xs text-soc-muted">
          Interactive topology with normal, suspicious and predicted attack
          paths.
        </p>
      </div>
      <Panel
        title="Attack graph"
        subtitle="Click nodes and edges for investigation details"
      >
        <NetworkGraph
          nodes={data.networkNodes}
          edges={data.networkEdges}
          onNode={setSel}
          onEdge={setSel}
        />
      </Panel>
      <div className="grid gap-3 md:grid-cols-3">
        {data.networkNodes
          .filter((n) => n.risk >= 70)
          .map((n) => (
            <button
              key={n.id}
              onClick={() => setSel(n)}
              className="rounded-lg border border-red-400/20 bg-red-400/[.03] p-3 text-left"
            >
              <div className="font-mono text-xs text-cyan-300">{n.ip}</div>
              <div className="mt-1 text-sm text-white">{n.hostname}</div>
              <div className="mt-2 text-[10px] text-soc-muted">
                Risk {n.risk}% · {n.state}
              </div>
            </button>
          ))}
      </div>
      <Drawer
        open={!!sel}
        onClose={() => setSel(null)}
        title={
          sel?.ip
            ? `Host · ${sel.ip}`
            : `Path · ${sel?.source} → ${sel?.target}`
        }
      >
        {sel?.ip ? (
          <div className="grid grid-cols-2 gap-2">
            {[
              ["IP", sel.ip],
              ["Hostname", sel.hostname],
              ["Role", sel.role],
              ["Risk", `${sel.risk}%`],
              ["Traffic", `${sel.traffic} MB/min`],
              ["Connections", sel.connections],
              ["State", sel.state],
            ].map(([a, b]) => (
              <Metric key={a} label={a} value={b} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {[
              ["Source", sel?.source],
              ["Destination", sel?.target],
              ["Protocol", sel?.protocol],
              ["Port", sel?.port],
              ["Traffic", `${sel?.traffic} MB/min`],
              ["Risk", `${sel?.risk}%`],
              ["Type", sel?.type],
            ].map(([a, b]) => (
              <Metric key={a} label={a} value={b} />
            ))}
          </div>
        )}
      </Drawer>
    </div>
  );
}
