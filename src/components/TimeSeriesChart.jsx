import React, { useMemo, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getLocalDateString } from "../utils/helpers";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const localDate = new Date(label + "T00:00:00");
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 border border-gray-100 shadow-xl rounded-xl z-50">
        <p className="text-sm font-bold text-gray-700 mb-2">
          {localDate.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-xs font-medium"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-gray-500 capitalize">{entry.name}:</span>
              <span className="text-gray-900 font-bold">
                {entry.payload[`original_${entry.dataKey}`] ?? entry.value}
                {entry.dataKey === "sleep" ? " hrs" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

function TimeSeriesChart({ data }) {
  const [visibleLines, setVisibleLines] = useState({
    mood: true,
    productivity: true,
    stress: false,
    sleep: false,
  });

  const toggleLine = (key) => {
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const chartData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      sleep: d.sleep_hours ? Math.min(d.sleep_hours, 10) : null,
      original_sleep: d.sleep_hours,
    }));
  }, [data]);

  const today = getLocalDateString();
  const hasToday = data.some((d) => d.log_date === today);

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem + "T00:00:00");
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const METRICS = [
    { key: "mood", label: "Mood", color: "#8b5cf6", bg: "bg-purple-100" },
    {
      key: "productivity",
      label: "Productivity",
      color: "#3b82f6",
      bg: "bg-blue-100",
    },
    { key: "stress", label: "Stress", color: "#ef4444", bg: "bg-red-100" },
    { key: "sleep", label: "Sleep", color: "#06b6d4", bg: "bg-cyan-100" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>📈</span> Trends Over Time
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Toggle categories to explore correlations
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {METRICS.map((item) => (
            <button
              key={item.key}
              onClick={() => toggleLine(item.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border
                ${
                  visibleLines[item.key]
                    ? `${item.bg} border-transparent text-gray-800 opacity-100 shadow-sm`
                    : "bg-gray-50 border-gray-200 text-gray-400 opacity-60"
                }
              `}
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  visibleLines[item.key] ? "" : "bg-gray-400"
                }`}
                style={{
                  backgroundColor: visibleLines[item.key]
                    ? item.color
                    : undefined,
                }}
              />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto pb-2 scrollbar-hide">
        <div className="min-w-[600px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 20, right: 30, left: -20, bottom: 0 }}
            >
              <defs>
                {METRICS.map((m) => (
                  <linearGradient
                    key={m.key}
                    id={`color${m.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor={m.color} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={m.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f3f4f6"
              />

              <XAxis
                dataKey="log_date"
                tickFormatter={formatXAxis}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />

              <YAxis
                domain={[0, 10]}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#9ca3af",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />

              {hasToday && (
                <ReferenceLine
                  x={today}
                  stroke="#22c55e"
                  strokeDasharray="3 3"
                  label={{
                    value: "TODAY",
                    position: "top",
                    fill: "#22c55e",
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                />
              )}

              {METRICS.map(
                (m) =>
                  visibleLines[m.key] && (
                    <Area
                      key={m.key}
                      type="monotone"
                      dataKey={m.key}
                      name={m.label}
                      stroke={m.color}
                      strokeWidth={3}
                      fillOpacity={1}
                      fill={`url(#color${m.key})`}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  )
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default TimeSeriesChart;
