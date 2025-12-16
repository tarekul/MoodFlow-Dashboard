import React, { useState } from "react";
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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 border border-gray-100 shadow-xl rounded-xl">
        <p className="text-sm font-bold text-gray-700 mb-2">
          {new Date(label).toLocaleDateString("en-US", {
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
              <span className="text-gray-900 font-bold">{entry.value}</span>
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
    stress: true,
  });

  const toggleLine = (key) => {
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const today = new Date().toISOString().split("T")[0];
  const hasToday = data.some((d) => d.log_date === today);

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>📈</span> Trends Over Time
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Toggle categories to focus your view
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            {
              key: "mood",
              label: "Mood",
              color: "#8b5cf6",
              bg: "bg-purple-100",
            },
            {
              key: "productivity",
              label: "Productivity",
              color: "#3b82f6",
              bg: "bg-blue-100",
            },
            {
              key: "stress",
              label: "Stress",
              color: "#ef4444",
              bg: "bg-red-100",
            },
          ].map((item) => (
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
              data={data}
              margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
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

              {visibleLines.mood && (
                <Area
                  type="monotone"
                  dataKey="mood"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorMood)"
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              )}

              {visibleLines.productivity && (
                <Area
                  type="monotone"
                  dataKey="productivity"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorProd)"
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              )}

              {visibleLines.stress && (
                <Area
                  type="monotone"
                  dataKey="stress"
                  stroke="#ef4444"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorStress)"
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="sm:hidden text-center mt-2 text-xs text-gray-400 flex items-center justify-center gap-1">
        Swipe chart to see history
      </div>
    </div>
  );
}

export default TimeSeriesChart;
