import React from "react";
import { INSIGHT_STYLES } from "../utils/helpers";

// Helper to highlight text dynamically based on the card's theme
const renderBoldText = (text, colorClass) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className={`font-extrabold ${colorClass}`}>
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
    <div className="mb-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 px-1">
        <div className="bg-indigo-100 p-2 rounded-lg">
          <span className="text-xl">🧠</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Smart Daily Insights
          </h2>
          <p className="text-xs text-gray-500 font-medium">
            AI-powered analysis of your logs
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {insights.map((insight, idx) => {
          // Determine style based on type
          // Note: We map your 'type' to our keys. 'prediction' -> 'forecast'
          let styleKey = "default";
          if (insight.type === "optimization") styleKey = "optimization";
          else if (insight.type === "prediction") styleKey = "forecast";
          else if (insight.type === "impact") styleKey = "impact";

          const theme = INSIGHT_STYLES[styleKey];

          return (
            <div
              key={idx}
              className={`
                relative group flex flex-col h-full
                p-5 rounded-2xl border transition-all duration-300
                hover:shadow-lg hover:-translate-y-1
                ${theme.bg} ${theme.border}
              `}
            >
              {/* Top Row: Icon and Badge */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`
                  w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm
                  ${theme.iconBg} ${theme.iconColor}
                `}
                >
                  {insight.icon || theme.icon}
                </div>

                <span
                  className={`
                  px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                  ${theme.badgeBg} ${theme.badgeText}
                `}
                >
                  {theme.label}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {renderBoldText(insight.message, theme.boldText)}
                </p>
              </div>

              {/* Decorative Corner Gradient (Optional Polish) */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/40 to-transparent rounded-tr-2xl pointer-events-none" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SmartInsightsCard;
