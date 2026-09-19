# Setup Guide

## 1. Install Node.js
Install Node.js 20 LTS or newer. Node 22 LTS is recommended.
Verify:
```bash
node -v
npm -v
```

## 2. Open the project
Extract/open `predictive-cyber-defence`, then open a terminal in that folder:
```bash
cd predictive-cyber-defence
```

## 3. Install dependencies
```bash
npm install
```

## 4. Start the development server
```bash
npm run dev
```

## 5. Open the browser
Vite normally prints:
```text
Local: http://localhost:5173/
```
Open **http://localhost:5173/dashboard**.

## 6. Build production files
```bash
npm run build
```
The compiled app is written to `dist/`.

## 7. Run production preview
```bash
npm run preview
```
Open the URL printed by Vite, normally `http://localhost:4173/`.

## 8. Common errors
### Port conflict
```bash
npm run dev -- --port 5174
```
### Dependency corruption
Windows PowerShell:
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```
macOS/Linux:
```bash
rm -rf node_modules
npm install
```
### TypeScript build failure
Run:
```bash
npm run build
```
Read the first error. Most implementation issues are surfaced there before Vite bundles the app.
### Direct route gives 404 after deployment
Configure the host to serve `index.html` for SPA routes such as `/network` and `/alerts`.
