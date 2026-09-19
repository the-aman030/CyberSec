import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  ComposedChart,
  ReferenceLine,
} from "recharts";
import type { RiskPoint } from "../../types/security";
export function RiskChart({
  data,
  onPoint,
}: {
  data: RiskPoint[];
  onPoint?: (p: RiskPoint) => void;
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
          onClick={(s: any) =>
            s?.activePayload?.[0]?.payload &&
            onPoint?.(s.activePayload[0].payload)
          }
        >
          <defs>
            <linearGradient id="confidence" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.14} />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickLine={false} />
          <YAxis domain={[0, 100]} tickLine={false} />
          <Tooltip
            contentStyle={{
              background: "#0b1727",
              border: "1px solid #20324a",
              borderRadius: 8,
              fontSize: 11,
            }}
            labelStyle={{ color: "#cbd5e1" }}
            formatter={(v: any, n: any) => [
              n === "risk" ? `${v}%` : v,
              n === "risk" ? "Risk" : "Confidence",
            ]}
          />
          <Area
            dataKey="confidence"
            type="monotone"
            stroke="none"
            fill="url(#confidence)"
          />
          <ReferenceLine y={80} stroke="#f87171" strokeDasharray="4 4" />
          <Line
            type="monotone"
            dataKey="risk"
            stroke="#22d3ee"
            strokeWidth={2.5}
            dot={(p: any) =>
              p.payload.forecast ? (
                <circle
                  {...p}
                  r={4}
                  fill="#fb923c"
                  stroke="#07111f"
                  strokeWidth={2}
                />
              ) : (
                <circle {...p} r={2.5} fill="#22d3ee" stroke="#07111f" />
              )
            }
            strokeDasharray="0"
          />
          <Line
            type="monotone"
            dataKey="risk"
            data={data.filter((d) => d.forecast)}
            stroke="#fb923c"
            strokeWidth={2.5}
            strokeDasharray="6 5"
            dot={{ r: 4, fill: "#fb923c", stroke: "#07111f" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
