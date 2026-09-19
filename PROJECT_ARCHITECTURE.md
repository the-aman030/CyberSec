# Project Architecture

## Frontend architecture
The application is a client-rendered React SPA using TypeScript, Vite and Tailwind CSS. React Router owns screen navigation. Domain data is represented by interfaces in `src/types/security.ts`.

```text
PCAP / CSV
    ↓
Preprocessing
    ↓
Feature Extraction
    ↓
Risk Model
    ↓
Forecast Engine
    ↓
Attack Stage Prediction
    ↓
Explainability (SHAP)
    ↓
MITRE Mapping
    ↓
React Dashboard
```

## Component architecture
```text
AppShell
├── Sidebar
├── Header
└── Routed Page
    ├── Panel / Badge / Metric
    ├── Recharts risk visualization
    ├── React Flow network visualization
    ├── SHAP bars
    ├── MITRE list
    ├── Alert table
    └── Investigation Drawer / Upload Modal
```

## Data flow
Pages call `useForecast()`. The hook calls `getForecastSnapshot()` in `forecastService.ts`. The service currently returns a deep clone of `mockForecast`. This makes the service the replacement boundary for a real API.

## Mock data architecture
`src/data/mockForecast.ts` contains the complete typed snapshot: risk history, future risk, stages, contributors, hosts, edges, MITRE mappings and alerts. There is no random data generated during rendering, which keeps the SIH demonstration deterministic.

## Forecasting pipeline
The frontend assumes the backend performs flow parsing, feature extraction, model inference, temporal forecasting, stage classification, explainability and ATT&CK mapping. The frontend visualizes the resulting evidence; it does not claim to perform ML inference.

## Network graph architecture
`NetworkGraph.tsx` converts typed network nodes/edges into React Flow nodes/edges. Each node carries the original security object in `data`, so click handlers can open a detailed investigation drawer. Edge styling encodes normal/suspicious/predicted state.

## State management
Local React state is sufficient for the demo: drawer selections, filters, upload state and settings. Forecast data is shared by the `useForecast` hook. A production application can introduce TanStack Query for server cache, stale-state handling and polling without changing the visual component contracts.

## Routing
Routes:
- `/dashboard`
- `/risk-trajectory`
- `/attack-progression`
- `/network`
- `/evidence`
- `/mitre`
- `/alerts`
- `/reports`
- `/settings`

## Chart architecture
Recharts is used for the risk trajectory. The chart consumes typed `RiskPoint` objects and keeps visualization concerns isolated from the service layer.

## Future backend integration
Recommended contract:
```text
GET  /v1/forecast?window=20m
POST /v1/telemetry/ingest
GET  /v1/network?window=20m
GET  /v1/alerts?status=open
GET  /v1/mitre/mappings
GET  /v1/evidence/{eventId}
```
Use JSON schemas/OpenAPI for the contract and validate payloads at the boundary.

Example forecast response shape:
```json
{
  "currentRisk": 86,
  "confidence": 82,
  "currentAttackStage": "Lateral Movement",
  "riskHistory": [],
  "predictedStages": [],
  "riskContributors": [],
  "networkNodes": [],
  "networkEdges": [],
  "mitreTechniques": [],
  "alerts": []
}
```

## Security considerations
- Treat uploaded PCAP/CSV as untrusted input.
- Enforce file size/type limits server-side.
- Authenticate and authorize API calls.
- Never put API secrets in Vite client variables.
- Redact sensitive IP/user/account data where appropriate.
- Log model version, feature version and forecast timestamp for auditability.
- Distinguish predicted behavior from confirmed incidents in UI and APIs.
- Validate MITRE mappings and preserve evidence provenance.

## Deployment architecture
```text
Browser
  ↓ HTTPS
CDN / Static Host
  ↓
React SPA
  ↓ HTTPS / WSS
API Gateway
  ├── Forecast Service
  ├── Telemetry Ingestion
  ├── Network/Evidence Service
  └── Alert/MITRE Service
       ↓
Feature Store / Event Store / Model Serving
```
For deployment, configure SPA fallback to `index.html`, TLS, CSP and appropriate API CORS/origin policy.
