import { Lightbulb, TrendingUp } from "lucide-react";
import React from "react";
import { getFactorIcon } from "../utils/getFactorIcon";
import { getStrengthColor } from "../utils/helpers";

function BoosterCard({ boosters, comparisons = [] }) {
  const getComparisonBadge = (factor) => {
    const comparison = comparisons.find((c) => c.factor === factor);
    if (!comparison) return null;

    const threshold = 0.1;
    const diff = comparison.user_correlation - comparison.population_avg;

    if (diff > threshold) {
      return (
        <div className="mt-3 sm:mt-0 sm:ml-auto flex items-center gap-3 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
          <TrendingUp size={16} className="text-indigo-600" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wide text-indigo-700">
              More Responsive
            </span>
            <span className="text-[10px] text-indigo-500 font-medium">
              vs avg: {comparison.population_avg.toFixed(2)}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <TrendingUp size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Productivity Boosters
          </h2>
        </div>
        <p className="text-sm text-gray-500 pl-1">
          Doing more of these{" "}
          <span className="text-emerald-700 font-bold">increases</span> your
          output.
        </p>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 flex-1">
        {boosters.map((booster, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  {getFactorIcon(booster.factor)}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {booster.factor}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`text-sm font-bold ${getStrengthColor(
                        booster.strength
                      )}`}
                    >
                      +{booster.correlation.toFixed(2)}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                    <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                      {booster.strength} Correlation
                    </span>
                  </div>
                </div>
              </div>

              {getComparisonBadge(booster.factor)}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Pro Tip */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex gap-3 items-start text-sm text-gray-600">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <span className="font-semibold text-gray-900">Pro Tip: </span>
            Focus on boosters marked "More Responsive" — these are your unique
            strengths compared to others.
          </span>
        </div>
      </div>
    </div>
  );
}

export default BoosterCard;
