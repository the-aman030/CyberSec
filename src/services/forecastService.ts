import { mockForecast } from "../data/mockForecast";
import type { ForecastSnapshot } from "../types/security";
export async function getForecastSnapshot(): Promise<ForecastSnapshot> {
  await new Promise((r) => setTimeout(r, 180));
  return structuredClone(mockForecast);
}
export async function ingestTelemetry(
  file: File,
): Promise<{ message: string; rows: number }> {
  await new Promise((r) => setTimeout(r, 700));
  return {
    message: `${file.name} staged for preprocessing (demo only).`,
    rows: Math.floor(Math.random() * 9000) + 1000,
  };
}
