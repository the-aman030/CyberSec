# Dashboard Functions

## Global controls
| Component | Purpose | Input | Output / demo behavior | Backend connection |
|---|---|---|---|---|
| Sidebar navigation | Switch screens | Click route | Client-side route changes | React Router maps to API-backed pages |
| Time Range | Select telemetry horizon | Last 5 min / 20 min / hour / 24 hours | Local selection changes control state | Query `GET /v1/forecast?window=` |
| Notifications | Surface alert activity | Click bell | Visual notification indicator | WebSocket/SSE unread count |
| Presentation | Enter presentation context | Click | Opens presentation-mode dialog | UI-only; browser Fullscreen API can be added |
| Ingest telemetry | Start upload workflow | PCAP/PCAPNG/CSV file | Simulated staging response | `POST /v1/telemetry/ingest` multipart |

## Current Risk
**Purpose:** summarize the latest risk score. **Input:** current forecast snapshot. **Output:** 86%, High Risk, +23%. **Demo:** static synthetic snapshot. **Backend:** `currentRisk` and baseline delta from forecast service.

## Forecast Risk
Shows the three headline future checkpoints: 63%, 74%, 86%. **Backend:** derived from forecast windows returned by the model.

## Predicted Attack Stage
Shows Lateral Movement and 82% confidence. **Interaction:** stage cards open evidence drawers. **Backend:** attack-stage classifier output plus confidence.

## Forecast Horizon
Shows 10 seconds/window and 120 windows. **Backend:** model cadence and configured horizon.

## Active Security Signals
Summarizes suspicious hosts, anomalous flows, high-risk alerts and predicted paths. **Backend:** aggregations over the telemetry/event store.

## Risk Trajectory
Interactive Recharts visualization. Solid cyan represents observed history; orange dashed line represents forecast. Hover shows risk/confidence; clicking a point opens a window drawer. **Backend:** historical and forecast time series.

## Attack Progression
Timeline of Credential Access → Lateral Movement → Command & Control. Clicking a stage opens evidence context. **Backend:** stage sequence from the forecasting engine.

## Network Graph
React Flow topology. Nodes are hosts; edges are flows. Blue/cyan = normal, red = suspicious, orange dashed = predicted. Click node for IP, hostname, role, risk, traffic, connections and state. Click edge for source, destination, protocol, port, traffic and risk. Zoom/pan/fit/reset are native React Flow controls. **Backend:** network graph endpoint.

## SHAP Risk Contributors
Eight ranked features with positive contributions. Clicking a feature opens description, contribution and risk implication. **Backend:** production SHAP/feature attribution payload.

## MITRE ATT&CK Mapping
Displays technique ID, name, tactic and confidence. Clicking opens why the technique was mapped and supporting evidence. **Backend:** mapping engine consuming forecast evidence.

## Alerts
Sortable-by-design investigation table with search, severity and status filters. Clicking an alert opens an investigation drawer. **Backend:** alert/event service.

## Upload PCAP / CSV
Dropzone accepts PCAP, PCAPNG and CSV. Demo simulates preprocessing and returns a staged row/packet count. **Backend:** multipart upload → parser → feature extraction → forecast job.

## Reports
Provides a demo report-generation interaction and enumerates production export fields. **Backend:** report service can produce PDF/JSON incident packages.

## Settings
Stores local UI preferences and exposes API integration placeholders. **Backend:** runtime configuration can be injected during deployment; secrets must remain server-side.

## Empty/loading/error states
The forecast hook shows a loading state. Upload rejects unsupported extensions. Production implementations should add API retry/error state, stale-data state, and empty-event state using the same component patterns.
