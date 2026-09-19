# Predictive Cyber Defence

A polished React/TypeScript/Tailwind SOC dashboard for an SIH internal-round demonstration. It visualizes current risk, future risk, attack-stage forecasting, suspicious network paths, SHAP-style feature contributions, MITRE ATT&CK hypotheses and security alerts using centralized synthetic data.

> **Demo boundary:** the application is not connected to a real ML model or live network. PCAP/CSV ingestion is simulated so the UI can later be wired to a backend without changing the presentation layer.

## Prerequisites
- Node.js 20 LTS or newer (Node 22 LTS is recommended).
- npm 10+.
- Modern Chromium, Firefox or Edge browser.

## Installation
```bash
cd predictive-cyber-defence
npm install
```

## Run development server
```bash
npm run dev
```
Open the URL printed by Vite, normally **http://localhost:5173/**. The app redirects `/` to `/dashboard`.

## Production build
```bash
npm run build
```

## Production preview
```bash
npm run preview
```
Open the URL printed by Vite, normally **http://localhost:4173/**.

## Project structure
```text
src/
  components/       reusable UI, layout, charts, network, alerts, evidence, MITRE
  data/             centralized mock telemetry and forecasting data
  hooks/            forecast data hook
  pages/            routed application screens
  services/         API-shaped mock forecast/ingestion service
  types/            TypeScript security-domain interfaces
  utils/             reserved for domain helpers
  App.tsx           route map
  main.tsx          application bootstrap
```

## Environment variables
None are required by the demo. When connecting a backend, add a Vite variable such as:
```env
VITE_API_BASE_URL=https://your-api.example.com
```
Do not put secrets in `VITE_*` variables; they are exposed to the browser bundle.

## Replacing mock data with an API
1. Keep the interfaces in `src/types/security.ts` as the frontend contract.
2. Replace `getForecastSnapshot()` in `src/services/forecastService.ts` with `fetch()` or an HTTP client.
3. Return a `ForecastSnapshot` matching the current UI contract.
4. Replace `ingestTelemetry()` with a multipart upload endpoint.
5. Add polling/WebSocket/SSE only at the service/hook layer; components should continue receiving typed data.

Suggested API surface:
```text
GET  /v1/forecast?window=20m
POST /v1/telemetry/ingest
GET  /v1/network
GET  /v1/alerts
GET  /v1/mitre/mappings
GET  /v1/evidence/{eventId}
```

## Troubleshooting
- **`npm` is not recognized:** install Node.js and restart the terminal.
- **Port 5173 is busy:** run `npm run dev -- --port 5174`.
- **Blank page:** check the browser console and confirm the dev server is running; direct deep links require SPA fallback when deployed.
- **TypeScript errors after dependency changes:** remove `node_modules` and reinstall with `npm install`.
- **Network graph styles missing:** ensure the `@xyflow/react/dist/style.css` import is present in `NetworkGraph.tsx`.
