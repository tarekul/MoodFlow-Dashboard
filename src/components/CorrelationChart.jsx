import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function CorrelationChart({ correlations }) {
  // Combine boosters and drainers into one array for the chart
  const chartData = correlations.map((item) => ({
    factor: item.factor,
    correlation: item.correlation,
    // Determine color based on positive/negative
    fill: item.correlation > 0 ? "#3b82f6" : "#ef4444",
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Correlation Strength
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        How each factor impacts your productivity (positive = boost, negative =
        drain)
      </p>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="factor"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            style={{ fontSize: "12px" }}
          />
          <YAxis
            domain={[-1, 1]}
            ticks={[-1, -0.5, 0, 0.5, 1]}
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
            formatter={(value) => value.toFixed(2)}
          />
          <ReferenceLine y={0} stroke="#6b7280" strokeWidth={2} />
          <Bar dataKey="correlation" radius={[8, 8, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">
            Positive (Boosts Productivity)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">
            Negative (Drains Productivity)
          </span>
        </div>
      </div>
    </div>
  );
}

export default CorrelationChart;
