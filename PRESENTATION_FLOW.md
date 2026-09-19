# SIH Presentation Flow — 3–5 Minutes

## 1. Start at Current Risk — 25 sec
**Click:** `/dashboard`.
**What appears:** 86% High Risk, active signals and the live-looking SOC header.
**Say:** “The platform starts by converting current network behavior into a single operational risk score. The key point is that this is predictive, not just retrospective monitoring.”
**Technical concept:** risk aggregation and operational triage.

## 2. Show Future Risk — 25 sec
**Click:** Risk Trajectory or the forecast points.
**What appears:** observed solid line transitions to orange dashed forecast; 63 → 74 → 86%.
**Say:** “Instead of waiting for an attack to complete, the forecast estimates how risk evolves across future windows, with confidence attached.”
**Technical concept:** temporal forecasting and uncertainty.

## 3. Show Attack Stage — 25 sec
**Click:** Lateral Movement stage.
**What appears:** evidence drawer with 82% confidence and forecast window.
**Say:** “The model does not only output a number. It estimates the next likely attack stage, here lateral movement.”
**Technical concept:** sequence/stage prediction.

## 4. Explain Why — 30 sec
**Click:** Evidence & SHAP, then SYN Activity.
**What appears:** ranked feature contribution and explanation drawer.
**Say:** “This is the explainability layer. SYN activity, unique hosts and port diversity are the strongest contributors in this demonstration, so an evaluator can inspect why risk moved upward.”
**Technical concept:** feature attribution / SHAP-style explanation.

## 5. Show Suspicious Host — 30 sec
**Click:** Network → `192.168.1.5`.
**What appears:** suspected host details: high risk, traffic, connections and state.
**Say:** “We can move from the forecast to an actual investigation target. This host is the strongest candidate in the predicted path.”
**Technical concept:** entity-level investigation.

## 6. Follow Predicted Path — 25 sec
**Click:** orange dashed edge toward `192.168.1.25`.
**What appears:** source, destination, protocol, port, traffic and path risk.
**Say:** “The orange dashed path is not presented as confirmed compromise. It is the predicted path the analyst should validate next.”
**Technical concept:** graph-based attack-path forecasting.

## 7. Map to MITRE — 25 sec
**Click:** MITRE ATT&CK → T1021.
**What appears:** Remote Services, tactic, confidence and supporting evidence.
**Say:** “The behavior is mapped to a standard ATT&CK technique, which turns a model prediction into familiar analyst language.”
**Technical concept:** threat-informed interpretation.

## 8. Open Alert — 25 sec
**Click:** Alerts → `ALT-1042`.
**What appears:** investigation drawer with source, destination, stage, confidence and status.
**Say:** “The same forecast context is actionable through the alert workflow, where the analyst can investigate and prioritize.”
**Technical concept:** detection-to-investigation workflow.

## 9. Conclude — 20 sec
**Say:** “So the value is the chain: telemetry → current risk → future risk → predicted stage → explainability → suspicious path → ATT&CK mapping → analyst action. This frontend is a deterministic demonstration layer; the architecture is already separated so a real forecasting API can replace the mock service.”

## Backup interaction
Use **Ingest telemetry** if asked about input. Select a `.csv` or `.pcap` file. The demo stages it locally and explicitly labels the result as simulated. This demonstrates the intended ingestion boundary without pretending that a production parser/model is present.
