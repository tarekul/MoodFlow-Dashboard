import React from "react";

const renderBoldText = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="text-indigo-700 font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

function SmartInsightsCard({ insights }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        🧠 Smart Daily Insights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <span className="text-2xl mt-1">
                {insight.icon || (insight.type === "forecast" ? "🔮" : "💡")}
              </span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-70 mb-1">
                  {insight.type === "forecast"
                    ? "Daily Forecast"
                    : insight.type === "optimization"
                    ? "Optimization"
                    : "Impact Analysis"}
                </div>
                <p className="text-gray-800 text-sm font-medium leading-relaxed">
                  {renderBoldText(insight.message)}
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
