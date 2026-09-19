import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  BrainCircuit,
  GitBranch,
  Network,
  ShieldCheck,
  Timer,
  UploadCloud,
} from "lucide-react";
import { useForecast } from "../hooks/useForecast";
import { Panel, Badge } from "../components/ui/Panel";
import { KpiCard } from "../components/dashboard/KpiCard";
import { RiskChart } from "../components/charts/RiskChart";
import { StageTimeline } from "../components/dashboard/StageTimeline";
import { ShapBars } from "../components/dashboard/ShapBars";
import { MitreList } from "../components/mitre/MitreList";
import { NetworkGraph } from "../components/network/NetworkGraph";
import { Drawer } from "../components/evidence/Drawer";
import { Metric } from "../components/ui/Metric";
import type {
  ForecastStage,
  NetworkEdge as NEdge,
  NetworkNode as NNode,
  RiskContributor,
  MitreTechnique,
  SecurityAlert,
} from "../types/security";
import { AlertTable } from "../components/alerts/AlertTable";
export default function Dashboard() {
  const { data, loading } = useForecast();
  const [drawer, setDrawer] = useState<{
    title: string;
    content: React.ReactNode;
  } | null>(null);
  if (loading || !data)
    return (
      <div className="grid min-h-[70vh] place-items-center text-xs text-soc-muted">
        Loading forecast snapshot…
      </div>
    );
  const openNode = (n: NNode) =>
    setDrawer({
      title: `Host investigation · ${n.ip}`,
      content: (
        <div className="grid grid-cols-2 gap-2">
          {[
            ["IP", n.ip],
            ["Hostname", n.hostname],
            ["Role", n.role],
            ["Risk", `${n.risk}%`],
            ["Traffic", `${n.traffic} MB/min`],
            ["Connections", n.connections],
            ["State", n.state],
          ].map(([a, b]) => (
            <Metric key={a} label={a} value={b} />
          ))}
        </div>
      ),
    });
  const openEdge = (e: NEdge) =>
    setDrawer({
      title: `Network path · ${e.source} → ${e.target}`,
      content: (
        <div className="space-y-2">
          {[
            [
              "Source",
              data.networkNodes.find((n) => n.id === e.source)?.ip || e.source,
            ],
            [
              "Destination",
              data.networkNodes.find((n) => n.id === e.target)?.ip || e.target,
            ],
            ["Protocol", e.protocol],
            ["Port", e.port],
            ["Traffic", `${e.traffic} MB/min`],
            ["Risk", `${e.risk}%`],
            ["Path type", e.type],
          ].map(([a, b]) => (
            <Metric key={a} label={a} value={b} />
          ))}
        </div>
      ),
    });
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Badge tone="green">LIVE DEMO</Badge>
            <span className="text-[10px] text-soc-muted">
              Model snapshot · 20:47:31 IST
            </span>
          </div>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-white">
            Predictive Cyber Defence
          </h1>
          <p className="mt-1 max-w-2xl text-xs text-soc-muted">
            Forecasting attack progression from network telemetry, with
            explainable risk and investigation context.
          </p>
        </div>
        <div className="rounded-lg border border-orange-400/20 bg-orange-400/[.04] px-3 py-2 text-[10px] text-orange-200">
          Synthetic data · backend not connected
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label="Current Risk"
          value="86%"
          sub="High Risk"
          trend="+23% vs baseline"
          icon={<Activity size={17} />}
        />
        <KpiCard
          label="Forecast Risk"
          value="63 → 74 → 86%"
          sub="Next 3 forecast checkpoints"
          icon={<GitBranch size={17} />}
        />
        <KpiCard
          label="Predicted Attack Stage"
          value="Lateral Movement"
          sub="Confidence 82%"
          icon={<Network size={17} />}
        />
        <KpiCard
          label="Forecast Horizon"
          value="10 sec / window"
          sub="120 windows"
          icon={<Timer size={17} />}
        />
        <KpiCard
          label="Active Signals"
          value="17 / 43 / 8 / 3"
          sub="hosts · flows · alerts · paths"
          icon={<AlertTriangle size={17} />}
        />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.55fr_1fr]">
        <Panel
          title="Risk trajectory"
          subtitle="Historical telemetry + forecast horizon"
          action={
            <div className="flex items-center gap-3 text-[10px] text-soc-muted">
              <span className="flex items-center gap-1">
                <i className="h-0.5 w-4 bg-cyan-300" /> observed
              </span>
              <span className="flex items-center gap-1">
                <i className="h-0.5 w-4 border-t border-dashed border-orange-300" />{" "}
                forecast
              </span>
            </div>
          }
        >
          <RiskChart
            data={data.riskHistory}
            onPoint={(p) =>
              setDrawer({
                title: `Forecast window · ${p.time}`,
                content: (
                  <div className="grid grid-cols-2 gap-2">
                    <Metric label="Risk" value={`${p.risk}%`} />
                    <Metric label="Confidence" value={`${p.confidence}%`} />
                    <Metric label="Attack stage" value={p.stage} />
                    <Metric
                      label="Window type"
                      value={p.forecast ? "Forecast" : "Observed"}
                    />
                  </div>
                ),
              })
            }
          />
        </Panel>
        <Panel title="Attack progression" subtitle="Predicted next stages">
          <StageTimeline
            stages={data.predictedStages}
            onClick={(s: ForecastStage) =>
              setDrawer({
                title: `Stage evidence · ${s.name}`,
                content: (
                  <div className="space-y-4">
                    <Metric label="Confidence" value={`${s.confidence}%`} />
                    <Metric label="Forecast window" value={s.window} />
                    <p className="text-xs leading-5 text-slate-300">
                      {s.description}
                    </p>
                    <div className="rounded-lg border border-orange-400/15 bg-orange-400/[.04] p-3 text-[11px] leading-5 text-orange-100">
                      Investigation focus: validate source host behavior,
                      authentication events, and internal destination sequence.
                    </div>
                  </div>
                ),
              })
            }
          />
        </Panel>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.45fr_.8fr_.8fr]">
        <Panel
          title="Network attack graph"
          subtitle="Blue normal · red suspicious · orange predicted"
        >
          <NetworkGraph
            nodes={data.networkNodes}
            edges={data.networkEdges}
            onNode={openNode}
            onEdge={openEdge}
          />
        </Panel>
        <Panel
          title="SHAP risk contributors"
          subtitle="Positive contribution to current risk"
        >
          <ShapBars
            items={data.riskContributors}
            onClick={(x: RiskContributor) =>
              setDrawer({
                title: `Feature explanation · ${x.feature}`,
                content: (
                  <div className="space-y-3">
                    <Metric
                      label="Contribution"
                      value={`+${x.value.toFixed(2)}`}
                    />
                    <div className="rounded-lg border border-soc-line bg-soc-panel2 p-3 text-xs leading-5 text-slate-300">
                      <b className="text-slate-100">Feature description:</b>
                      <br />
                      {x.description}
                    </div>
                    <div className="rounded-lg border border-orange-400/15 bg-orange-400/[.04] p-3 text-xs leading-5 text-orange-100">
                      <b>Risk implication:</b>
                      <br />
                      {x.implication}
                    </div>
                  </div>
                ),
              })
            }
          />
        </Panel>
        <Panel title="MITRE ATT&CK" subtitle="Top mapped techniques">
          <MitreList
            items={data.mitreTechniques}
            onClick={(x: MitreTechnique) =>
              setDrawer({
                title: `MITRE ${x.id} · ${x.name}`,
                content: (
                  <div className="space-y-3">
                    <Metric label="Tactic" value={x.tactic} />
                    <Metric label="Confidence" value={`${x.confidence}%`} />
                    <p className="text-xs leading-5 text-slate-300">{x.why}</p>
                    <div>
                      <div className="mb-2 text-[10px] uppercase tracking-wider text-soc-muted">
                        Supporting evidence
                      </div>
                      {x.evidence.map((e) => (
                        <div
                          key={e}
                          className="mb-1 rounded-md border border-soc-line bg-soc-panel2 p-2 font-mono text-[10px] text-cyan-200"
                        >
                          {e}
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              })
            }
          />
        </Panel>
      </div>
      <Panel
        title="Recent alerts"
        subtitle="Click an alert to open investigation context"
        action={
          <div className="text-[10px] text-soc-muted">
            8 high-risk alerts · 4 shown
          </div>
        }
      >
        <AlertTable
          alerts={data.alerts}
          onClick={(a: SecurityAlert) =>
            setDrawer({
              title: `Investigation · ${a.id}`,
              content: (
                <div className="space-y-3">
                  <Badge
                    tone={
                      a.severity === "Critical" || a.severity === "High"
                        ? "red"
                        : "orange"
                    }
                  >
                    {a.severity}
                  </Badge>
                  <p className="text-sm leading-5 text-slate-200">
                    {a.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Metric label="Source" value={a.sourceIP} />
                    <Metric label="Destination" value={a.destinationIP} />
                    <Metric label="Stage" value={a.stage} />
                    <Metric label="Confidence" value={`${a.confidence}%`} />
                    <Metric label="Status" value={a.status} />
                    <Metric label="Timestamp" value={a.timestamp} />
                  </div>
                </div>
              ),
            })
          }
        />
      </Panel>
      <Drawer
        open={!!drawer}
        onClose={() => setDrawer(null)}
        title={drawer?.title || ""}
      >
        {drawer?.content}
      </Drawer>
    </div>
  );
}
