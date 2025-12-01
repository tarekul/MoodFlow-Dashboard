import React, { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TimeSeriesChart({ data }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 480;

  const [focusedLine, setFocusedLine] = useState(null);

  const toggleFocus = (line) => {
    if (!isMobile) return; // only allow tap highlight on mobile
    setFocusedLine((prev) => (prev === line ? null : line));
  };

  const weeklyTicks = data
    .filter((d) => new Date(d.log_date).getDay() === 0)
    .map((d) => d.log_date);

  const today = new Date().toISOString().split("T")[0];
  const hasToday = data.some((d) => d.log_date === today);

  const formatShortDate = (value) =>
    new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        📈 Trends Over Time
      </h2>

      <div className="overflow-x-auto" style={{ paddingBottom: 10 }}>
        <div
          style={{
            width: data.length > 15 ? data.length * 45 : "100%",
            minWidth: "100%",
            height: 300,
            position: "relative",
          }}
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            debounce={50}
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

              <XAxis
                dataKey="log_date"
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
                ticks={weeklyTicks}
                hide={isMobile}
                tickFormatter={(value) =>
                  isMobile ? "" : formatShortDate(value)
                }
              />

              <YAxis
                domain={[0, 10]}
                stroke="#6b7280"
                style={{ fontSize: "12px" }}
              />

              {/* 🟩 Today marker */}
              {hasToday && (
                <ReferenceLine
                  x={today}
                  stroke="#22c55e"
                  strokeDasharray="4 4"
                  label={{
                    value: "Today",
                    position: "top",
                    fill: "#22c55e",
                    fontSize: 12,
                  }}
                />
              )}

              <Tooltip
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                }
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="mood"
                stroke="#8b5cf6"
                strokeWidth={focusedLine && focusedLine !== "mood" ? 1 : 3}
                opacity={focusedLine && focusedLine !== "mood" ? 0.2 : 1}
                name="Mood"
                dot={{ fill: "#8b5cf6", r: 4 }}
                activeDot={{ r: 7 }}
                onClick={() => toggleFocus("mood")}
              />

              <Line
                type="monotone"
                dataKey="productivity"
                stroke="#3b82f6"
                strokeWidth={
                  focusedLine && focusedLine !== "productivity" ? 1 : 3
                }
                opacity={
                  focusedLine && focusedLine !== "productivity" ? 0.2 : 1
                }
                name="Productivity"
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 7 }}
                onClick={() => toggleFocus("productivity")}
              />

              <Line
                type="monotone"
                dataKey="stress"
                stroke="#ef4444"
                strokeWidth={focusedLine && focusedLine !== "stress" ? 1 : 3}
                opacity={focusedLine && focusedLine !== "stress" ? 0.2 : 1}
                name="Stress"
                dot={{ fill: "#ef4444", r: 4 }}
                activeDot={{ r: 7 }}
                onClick={() => toggleFocus("stress")}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        💡 Tap any line on mobile to highlight it. Scroll horizontally to
        explore long trends!
      </p>
    </div>
  );
}

export default TimeSeriesChart;
