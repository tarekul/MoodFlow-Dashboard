import {
  AlertCircle,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { getFactorIcon } from "../utils/getFactorIcon";
import { getStrengthColor } from "../utils/helpers";

function DrainerCard({ drainers, comparisons = [] }) {
  const getComparisonBadge = (factor) => {
    const comparison = comparisons.find((c) => c.factor === factor);
    if (!comparison) return null;

    const threshold = 0.1;
    const diff = comparison.user_correlation - comparison.population_avg;

    if (diff < -threshold) {
      return (
        <div className="mt-3 sm:mt-0 sm:ml-auto flex items-center gap-3 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100">
          <AlertCircle size={16} className="text-rose-600" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wide text-rose-700">
              More Sensitive
            </span>
            <span className="text-[10px] text-rose-500 font-medium">
              vs avg: {comparison.population_avg.toFixed(2)}
            </span>
          </div>
        </div>
      );
    }

    if (diff > threshold) {
      return (
        <div className="mt-3 sm:mt-0 sm:ml-auto flex items-center gap-3 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-100">
          <ShieldCheck size={16} className="text-teal-600" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wide text-teal-700">
              Less Sensitive
            </span>
            <span className="text-[10px] text-teal-500 font-medium">
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
          <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
            <AlertTriangle size={20} />
          </div>
          <h2 className="text-lg font-bold text-gray-900">
            Productivity Drainers
          </h2>
        </div>
        <p className="text-sm text-gray-500 pl-1">
          Avoid or manage these factors to{" "}
          <span className="text-rose-700 font-bold">prevent burnout</span>.
        </p>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 flex-1">
        {drainers.map((drainer, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-xl border border-gray-100 hover:border-rose-200 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Dynamic Icon */}
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 group-hover:bg-rose-100 transition-colors">
                  {getFactorIcon(drainer.factor)}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {drainer.factor}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className={`text-sm font-bold ${getStrengthColor(
                        drainer.strength
                      )}`}
                    >
                      {drainer.correlation.toFixed(2)}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                    <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                      {drainer.strength} Correlation
                    </span>
                  </div>
                </div>
              </div>

              {getComparisonBadge(drainer.factor)}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Priority Tip */}
      <div className="p-4 bg-rose-50 border-t border-rose-100">
        <div className="flex gap-3 items-start text-sm text-rose-800">
          <Lightbulb className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <span className="font-bold">Priority: </span>
            Focus on managing drainers marked "More Sensitive" — these hurt you
            more than the average person!
          </span>
        </div>
      </div>
    </div>
  );
}

export default DrainerCard;
