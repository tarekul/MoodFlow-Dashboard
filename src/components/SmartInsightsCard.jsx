// src/components/SmartInsightsCard.jsx
import React from "react";

function SmartInsightsCard({ insights }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        🧠 Smart Daily Insights
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border shadow-sm transition-all hover:shadow-md
              ${
                insight.type === "forecast"
                  ? "bg-indigo-50 border-indigo-200"
                  : insight.type === "optimization"
                  ? "bg-emerald-50 border-emerald-200"
                  : "bg-white border-gray-200"
              }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">
                {insight.icon || (insight.type === "forecast" ? "🔮" : "💡")}
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">
                  {insight.type === "forecast"
                    ? "Daily Forecast"
                    : insight.type === "optimization"
                    ? "Optimization"
                    : "Impact Analysis"}
                </div>
                <p className="text-gray-800 text-sm font-medium leading-relaxed">
                  {insight.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SmartInsightsCard;
