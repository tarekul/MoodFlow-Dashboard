import React, { useState } from "react";
import { getScreenTimeUsageContext } from "../utils/helpers";
import ScreenTimeIllustration from "./ScreenTimeIllustration";

const ScreenTimeSlider = ({ onComplete, onSkip, initialValue }) => {
  const [hours, setHours] = useState(initialValue ?? 4);

  const context = getScreenTimeUsageContext(hours);

  const max = 12;
  const percentage = (hours / max) * 100;

  return (
    <div className="h-full w-full flex flex-col items-center justify-between animate-fade-in relative px-4 pb-6">
      <div className="text-center pt-8 sm:pt-12 shrink-0 z-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 tracking-tight">
          Screen Time
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-xs mx-auto">
          Estimate your total screen time today.
        </p>
      </div>

      <div className="flex-1 w-full min-h-0 flex items-center justify-center relative z-0 py-2">
        <ScreenTimeIllustration hours={hours} />
      </div>

      <div className="w-full max-w-md shrink-0 z-20">
        <div
          className={`bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border ${context.border} transition-colors duration-300`}
        >
          <div className="flex flex-col items-center mb-6">
            <span
              className={`text-xs font-bold uppercase tracking-widest mb-1 ${context.color} transition-colors duration-300`}
            >
              {context.label}
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-6xl font-black ${context.color} transition-colors duration-300`}
              >
                {hours}
              </span>
              <span className="text-xl font-bold text-gray-400">hrs</span>
            </div>
          </div>

          <div className="relative w-full h-10 flex items-center">
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              className="w-full absolute z-20 opacity-0 cursor-pointer h-full"
            />

            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden relative z-10">
              <div
                className={`h-full ${context.bg} transition-all duration-150 ease-out`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div
              className="absolute h-8 w-8 bg-white border-2 border-gray-100 rounded-full shadow-md z-10 pointer-events-none transition-all duration-150 ease-out flex items-center justify-center"
              style={{ left: `calc(${percentage}% - 16px)` }}
            >
              <div className={`w-3 h-3 rounded-full ${context.bg}`} />
            </div>
          </div>

          <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400 mt-2 px-1">
            <span>0 hrs</span>
            <span>6 hrs</span>
            <span>12+ hrs</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => onComplete(hours)}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:translate-y-0"
          >
            Continue
          </button>

          {onSkip && (
            <button
              onClick={onSkip}
              className="w-full py-2 text-gray-400 hover:text-gray-600 text-xs sm:text-sm font-medium transition-colors"
            >
              Skip this step
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScreenTimeSlider;
