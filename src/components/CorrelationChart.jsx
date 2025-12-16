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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const value = data.correlation;
    const isPositive = value > 0;

    let strength = "Weak";
    if (Math.abs(value) > 0.3) strength = "Moderate";
    if (Math.abs(value) > 0.6) strength = "Strong";

    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 border border-gray-100 shadow-xl rounded-xl z-50">
        <p className="font-bold text-gray-800 mb-1">{label}</p>
        <div className="flex items-center gap-2 text-sm">
          <span
            className={`w-2 h-2 rounded-full ${
              isPositive ? "bg-blue-500" : "bg-red-500"
            }`}
          />
          <span className="text-gray-600">Impact:</span>
          <span
            className={`font-bold ${
              isPositive ? "text-blue-600" : "text-red-600"
            }`}
          >
            {value > 0 ? "+" : ""}
            {value.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider font-semibold">
          {strength} {isPositive ? "Boost" : "Drain"}
        </p>
      </div>
    );
  }
  return null;
};

function CorrelationChart({ correlations }) {
  const sortedData = [...correlations].sort(
    (a, b) => b.correlation - a.correlation
  );

  const chartHeight = Math.max(400, sortedData.length * 60);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span>📊</span> Correlation Strength
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          How strictly each factor influences your productivity.
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart
            layout="vertical"
            data={sortedData}
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            barSize={20}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#f3f4f6"
            />

            <XAxis
              type="number"
              domain={[-1, 1]}
              ticks={[-1, -0.5, 0, 0.5, 1]}
              stroke="#9ca3af"
              fontSize={12}
              tickFormatter={(val) => (val > 0 ? `+${val}` : val)}
            />

            <YAxis
              dataKey="factor"
              type="category"
              width={100}
              tick={{ fill: "#4b5563", fontSize: 13, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />

            <ReferenceLine x={0} stroke="#9ca3af" strokeWidth={2} />

            <ReferenceLine x={0.5} stroke="#bfdbfe" strokeDasharray="4 4" />
            <ReferenceLine x={-0.5} stroke="#fecaca" strokeDasharray="4 4" />

            <Bar dataKey="correlation" radius={[4, 4, 4, 4]}>
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.correlation > 0 ? "#3b82f6" : "#ef4444"}
                  fillOpacity={0.8 + Math.abs(entry.correlation) * 0.2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-xs sm:text-sm text-gray-600 font-medium">
            Boosts Productivity (Right)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-xs sm:text-sm text-gray-600 font-medium">
            Drains Productivity (Left)
          </span>
        </div>
      </div>
    </div>
  );
}

export default CorrelationChart;
