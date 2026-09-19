import { useEffect, useState } from "react";
import { getForecastSnapshot } from "../services/forecastService";
import type { ForecastSnapshot } from "../types/security";
export function useForecast() {
  const [data, setData] = useState<ForecastSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getForecastSnapshot()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}
