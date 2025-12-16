import React, { useState } from "react";
import DefaultIcon from "./DefaultIcon";
import MoodIcon from "./MoodIcon";
import ProductivityIcon from "./ProductivityIcon";
import SleepIcon from "./SleepIcon";
import StressIcon from "./StressIcon";

const getIcon = (type, colorClass) => {
  const baseClasses = `w-6 h-6 ${colorClass}`;
  switch (type) {
    case "mood":
      return <MoodIcon baseClasses={baseClasses} />;
    case "sleep":
      return <SleepIcon baseClasses={baseClasses} />;
    case "stress":
      return <StressIcon baseClasses={baseClasses} />;
    case "productivity":
      return <ProductivityIcon baseClasses={baseClasses} />;
    default:
      return <DefaultIcon baseClasses={baseClasses} />;
  }
};
function SummaryCard({ title, value, unit, description, color, isKeyFactor }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getStyles = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes("mood"))
      return { type: "mood", bg: "bg-purple-50", text: "text-purple-600" };
    if (lower.includes("sleep"))
      return { type: "sleep", bg: "bg-blue-50", text: "text-blue-600" };
    if (lower.includes("stress"))
      return { type: "stress", bg: "bg-orange-50", text: "text-orange-600" };
    if (lower.includes("productivity"))
      return {
        type: "productivity",
        bg: "bg-indigo-50",
        text: "text-indigo-600",
      };
    return { type: "default", bg: "bg-gray-50", text: "text-gray-600" };
  };

  const style = getStyles(title);

  return (
    <div
      className={`relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-md z-0 hover:z-10
      ${
        isKeyFactor
          ? "border-indigo-500 ring-1 ring-indigo-500 shadow-sm"
          : "border-gray-100 shadow-sm"
      }`}
    >
      <div className="p-5 flex flex-col h-full justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl ${style.bg} flex items-center justify-center`}
            >
              {getIcon(style.type, style.text)}
            </div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide truncate">
              {title.replace("Avg ", "")}
            </div>
          </div>

          {isKeyFactor && (
            <div
              className="relative ml-2"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <button className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider whitespace-nowrap cursor-help hover:bg-indigo-100 transition-colors focus:outline-none">
                Key Factor
                <svg
                  className="w-3 h-3 opacity-70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>

              <div
                className={`absolute bottom-full right-0 mb-2 w-48 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-xl 
                transform transition-all duration-200 origin-bottom-right z-50 text-center font-normal normal-case leading-relaxed
                ${
                  showTooltip
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                This factor has the strongest correlation with your productivity
                levels.
                <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-baseline gap-1">
            <span className={`text-3xl sm:text-4xl font-black ${color}`}>
              {value}
            </span>
            <span className="text-sm sm:text-base text-gray-400 font-medium">
              {unit}
            </span>
          </div>
          <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100">
            <span className="text-xs font-semibold text-gray-500">
              {description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
