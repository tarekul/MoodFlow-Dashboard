import React from "react";

const renderBoldText = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="text-indigo-800 font-extrabold">
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
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🧠</span>
        <h2 className="text-xl font-bold text-gray-800">
          Smart Daily Insights
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className={`relative p-5 rounded-xl border transition-all duration-200 hover:shadow-md flex flex-col h-full
              ${
                insight.type === "forecast"
                  ? "bg-indigo-50 border-indigo-100"
                  : insight.type === "optimization"
                  ? "bg-emerald-50 border-emerald-100"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-2 rounded-lg ${
                  insight.type === "forecast"
                    ? "bg-indigo-100 text-indigo-600"
                    : insight.type === "optimization"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span className="text-xl block h-6 w-6 text-center leading-6">
                  {insight.icon || (insight.type === "forecast" ? "🔮" : "💡")}
                </span>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">
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
