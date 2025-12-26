import { Play } from "lucide-react"; // Import a Play icon if you have lucide, otherwise use emoji
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

function SmartInsightsCard({ insights, setShowStory }) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="mb-8 animate-fade-in-up">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-1">
        {/* Left Side: Title & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-600 shadow-sm">
            {/* Brain Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              Smart Daily Insights
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              AI-powered analysis of your logs
            </p>
          </div>
        </div>

        {/* Right Side: The "Story" Button */}
        <button
          onClick={() => setShowStory(true)}
          className="
            group relative
            flex items-center gap-2
            px-5 py-2.5
            bg-gradient-to-r from-fuchsia-600 to-purple-600
            text-white text-sm font-bold
            rounded-full
            shadow-md shadow-purple-200
            transition-all duration-300
            hover:shadow-lg hover:shadow-purple-300 hover:-translate-y-0.5 active:translate-y-0
            overflow-hidden
          "
        >
          {/* Shine Effect on Hover */}
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <Play size={20} />
          <span>Play Data Story</span>
        </button>
      </div>

      {/* --- GRID SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {insights.map((insight, idx) => {
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

              <div className="flex-1">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {renderBoldText(insight.message, theme.boldText)}
                </p>
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/40 to-transparent rounded-tr-2xl pointer-events-none" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SmartInsightsCard;
