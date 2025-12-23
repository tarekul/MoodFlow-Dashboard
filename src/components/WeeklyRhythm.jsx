import { Calendar, TrendingUp } from "lucide-react";
import React from "react";

const WeeklyRhythm = ({ data }) => {
  if (!data || !data.chart_data) return null;

  const { chart_data, best_day, insight, percent_diff } = data;
  const MAX_SCALE = 10;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Calendar className="text-indigo-600" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Weekly Rhythm</h2>
            <p className="text-gray-500 text-xs">
              Discover your natural peak days
            </p>
          </div>
        </div>

        {/* Insight Badge */}
        {best_day && (
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-lg">
            <TrendingUp size={16} className="text-emerald-600" />
            <span className="text-xs font-medium text-emerald-800">
              {percent_diff}% boost on{" "}
              <span className="font-bold">{best_day}s</span>
            </span>
          </div>
        )}
      </div>

      {/* The Bar Chart */}
      {/* FIXED: Removed 'items-end' so columns can stretch. Increased height slightly. */}
      <div className="flex justify-between h-48 gap-2 sm:gap-4 mt-4">
        {chart_data.map((item) => {
          const isBest = item.day === best_day;
          const heightPercent = Math.min((item.score / MAX_SCALE) * 100, 100);
          const shortDay = item.day.substring(0, 3);

          return (
            // Column: Flex col to stack Score -> Bar -> Label
            <div
              key={item.day}
              className="flex flex-col items-center justify-end flex-1 group h-full"
            >
              {/* Tooltip (Score) - Reserved space (h-6) prevents jumping */}
              <div
                className={`h-6 mb-1 text-xs font-bold transition-all duration-300 ${
                  isBest
                    ? "text-indigo-600 scale-110"
                    : "text-gray-400 opacity-0 group-hover:opacity-100"
                }`}
              >
                {item.score > 0 ? item.score : ""}
              </div>

              {/* The Bar Track - FIXED: Given explicit height (h-32) to ensure drawing area exists */}
              <div className="w-full bg-gray-100 rounded-t-lg relative h-32 flex items-end overflow-hidden">
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${
                    isBest
                      ? "bg-gradient-to-t from-indigo-500 to-purple-500 shadow-lg shadow-indigo-200"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                ></div>
              </div>

              {/* Day Label */}
              <div
                className={`mt-3 text-xs font-medium ${
                  isBest ? "text-indigo-600 font-bold" : "text-gray-400"
                }`}
              >
                {shortDay}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer / Context */}
      <div className="mt-4 pt-4 border-t border-gray-50 text-center sm:text-left">
        <p className="text-sm text-gray-500 italic">"{insight}"</p>
      </div>
    </div>
  );
};

export default WeeklyRhythm;
