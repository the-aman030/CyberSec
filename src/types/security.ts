export type Severity = "Critical" | "High" | "Medium" | "Low";
export type AlertStatus = "Open" | "Investigating" | "Monitoring" | "Resolved";
export type NodeType =
  "workstation" | "server" | "database" | "file server" | "suspected host";
export interface RiskPoint {
  time: string;
  risk: number;
  confidence: number;
  stage: string;
  forecast?: boolean;
}
export interface RiskContributor {
  feature: string;
  value: number;
  description: string;
  implication: string;
}
export interface NetworkNode {
  id: string;
  ip: string;
  hostname: string;
  role: NodeType;
  risk: number;
  traffic: number;
  connections: number;
  state: string;
  x: number;
  y: number;
}
export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  protocol: string;
  port: number;
  traffic: number;
  risk: number;
  type: "normal" | "suspicious" | "predicted";
}
export interface MitreTechnique {
  id: string;
  name: string;
  tactic: string;
  confidence: number;
  why: string;
  evidence: string[];
}
export interface SecurityAlert {
  id: string;
  timestamp: string;
  severity: Severity;
  sourceIP: string;
  destinationIP: string;
  description: string;
  stage: string;
  confidence: number;
  status: AlertStatus;
}
export interface ForecastStage {
  name: string;
  confidence: number;
  window: string;
  description: string;
}
export interface ForecastSnapshot {
  currentRisk: number;
  predictedRisk: number[];
  confidence: number;
  currentAttackStage: string;
  predictedStages: ForecastStage[];
  riskHistory: RiskPoint[];
  riskContributors: RiskContributor[];
  networkNodes: NetworkNode[];
  networkEdges: NetworkEdge[];
  mitreTechniques: MitreTechnique[];
  alerts: SecurityAlert[];
}
