`````markdown
# Predictive Cyber Defence

A SOC-oriented predictive cyber-defence dashboard designed to visualize network risk, forecast attack-stage progression, analyse suspicious network paths, provide explainable security insights, and map predicted behaviour to MITRE ATT&CK.

> **Prototype Status:** The current demonstration uses centralized synthetic telemetry. The application is not connected to a live network or production ML model. PCAP/CSV ingestion and backend integration are structured so the presentation layer can later be connected to a real predictive pipeline.

---

## Features

- Current and forecasted network risk visualization
- Multi-stage attack progression forecasting
- Predicted attack stage and confidence
- Suspicious network-path visualization
- SHAP-style feature contribution analysis
- MITRE ATT&CK technique mapping
- Security alert and evidence views
- Centralized synthetic telemetry
- API-ready service layer for future backend integration
- Responsive SOC dashboard interface

---

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- Plotly
- React Flow

### Data & Application Layer
- TypeScript interfaces for security-domain data
- Centralized synthetic telemetry
- API-shaped service layer

### Planned Backend / ML Integration
- Python
- FastAPI
- Scapy
- Pandas
- NumPy
- PyTorch
- LSTM-based Temporal World Model
- SHAP
- MITRE ATT&CK

> The current repository contains the frontend prototype. The backend and ML components listed above represent the intended integration architecture.

---

## Prerequisites

- Node.js 20 LTS or newer
- Node.js 22 LTS recommended
- npm 10+
- Modern Chromium, Firefox, or Edge browser

---

## Installation

Clone the repository:

````bash
git clone https://github.com/the-aman030/CyberSec.git
cd CyberSec
`````

Install dependencies:

```bash
npm install
```

---

## Run Development Server

Start the development server:

```bash
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173/
```

The application redirects `/` to `/dashboard`.

---

## Production Build

Create a production build:

```bash
npm run build
```

---

## Production Preview

Preview the production build locally:

```bash
npm run preview
```

Open the URL printed by Vite, normally:

```text
http://localhost:4173/
```

---

## Project Structure

```text
src/
├── components/
│   ├── UI and layout
│   ├── charts
│   ├── network visualization
│   ├── alerts
│   ├── evidence
│   └── MITRE ATT&CK
│
├── data/
│   └── centralized mock telemetry and forecasting data
│
├── hooks/
│   └── forecast data hooks
│
├── pages/
│   └── routed application screens
│
├── services/
│   └── API-shaped mock forecast and ingestion services
│
├── types/
│   └── TypeScript security-domain interfaces
│
├── utils/
│   └── domain utilities
│
├── App.tsx
└── main.tsx
```

---

## System Workflow

The current prototype demonstrates the following analyst workflow:

```text
Synthetic Telemetry
        ↓
Network Behaviour
        ↓
Risk Assessment
        ↓
Attack-Stage Forecast
        ↓
Attack Progression
        ↓
Network / Attack Path
        ↓
Explainability
        ↓
MITRE ATT&CK Context
        ↓
Security Alerts & Evidence
        ↓
Analyst Decision
```

The intended production workflow will replace synthetic telemetry with real network and security data.

---

## Data Sources

The intended data pipeline is designed to support:

* PCAP files
* Network flow / telemetry data
* Security logs
* Honeypot interactions
* Other structured security events

The current prototype uses synthetic telemetry to demonstrate the complete dashboard and analyst workflow.

---

## Explainability

The dashboard includes SHAP-style feature contribution visualizations to demonstrate how individual network features can influence a risk prediction.

Example features represented in the prototype include:

* SYN activity
* Unique hosts
* Port diversity
* Flow behaviour
* Network activity patterns

The current implementation is a UI representation and is **not connected to a live SHAP model**.

---

## MITRE ATT&CK Integration

The dashboard provides MITRE ATT&CK context for predicted or observed attack behaviours.

The intended integration maps relevant security behaviours to standardized:

* Tactics
* Techniques
* Sub-techniques

This allows analysts to interpret predicted attack activity using a common threat-intelligence framework.

---

## Environment Variables

No environment variables are required for the current prototype.

When connecting the frontend to a backend API, configure:

```env
VITE_API_BASE_URL=https://your-api.example.com
```

> Do not store secrets in `VITE_*` variables. Vite exposes these variables to the browser bundle.

---

## Backend Integration

The frontend is structured around typed data contracts so that the current synthetic services can later be replaced with real API calls.

The primary integration points are:

```text
src/types/security.ts
src/services/forecastService.ts
```

### Suggested API Surface

```text
GET  /v1/forecast?window=20m
POST /v1/telemetry/ingest
GET  /v1/network
GET  /v1/alerts
GET  /v1/mitre/mappings
GET  /v1/evidence/{eventId}
```

### Integration Approach

1. Maintain the existing interfaces in `src/types/security.ts`.
2. Replace the mock implementation of `getForecastSnapshot()` with an API request.
3. Return a `ForecastSnapshot` matching the existing frontend contract.
4. Replace `ingestTelemetry()` with a multipart upload/API endpoint.
5. Add polling, WebSocket, or Server-Sent Events at the service/hook layer when required.
6. Keep UI components independent from the backend implementation.

This allows the presentation layer to remain largely unchanged when the predictive backend is introduced.

---

## Prototype Boundary

The current repository is a **frontend prototype for demonstration and evaluation**.

The following are currently simulated:

* Network telemetry
* Forecast values
* Attack progression
* SHAP-style feature contributions
* MITRE ATT&CK mappings
* Security alerts
* PCAP/CSV ingestion

The prototype does **not** currently claim to perform live network monitoring or real-time attack prediction.

The architecture is designed to allow these components to be progressively replaced with real data-processing and machine-learning services.

---

## Troubleshooting

### `npm` is not recognized

Install Node.js and restart the terminal.

### Port 5173 is already in use

Run:

```bash
npm run dev -- --port 5174
```

### Blank page

Check the browser console and confirm that the Vite development server is running.

For deployed environments, ensure SPA fallback/routing is configured correctly.

### TypeScript errors after dependency changes

Remove `node_modules` and reinstall:

```bash
rm -rf node_modules
npm install
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

### Network graph styles are missing

Ensure the React Flow stylesheet is imported in `NetworkGraph.tsx`:

```ts
import '@xyflow/react/dist/style.css';
```

---

## Development Tools

* Git
* GitHub
* Visual Studio Code

---

## Project Status

**Current:** Frontend SOC prototype with synthetic telemetry

**Next Integration Stage:**

```text
Real PCAP / Flow Data
        ↓
Feature Extraction
        ↓
Temporal Network States
        ↓
LSTM Temporal World Model
        ↓
Attack Forecasting
        ↓
SHAP + MITRE ATT&CK
        ↓
Defence Simulation
        ↓
SOC Dashboard
```

---

## Repository

GitHub: [https://github.com/the-aman030/CyberSec](https://github.com/the-aman030/CyberSec)

```
```
