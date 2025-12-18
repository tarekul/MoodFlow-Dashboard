import React, { useState } from "react";
import { getScreenTimeUsageContext } from "../utils/helpers";
import ScreenTimeIllustration from "./ScreenTimeIllustration";

const ScreenTimeSlider = ({ onComplete, onSkip, initialValue }) => {
  const [hours, setHours] = useState(initialValue ?? 4);

  const context = getScreenTimeUsageContext(hours);
  const max = 12;
  const percentage = (hours / max) * 100;

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-between animate-fade-in relative px-4 h-full">
      {/* HEADER */}
      <div className="text-center pt-2 px-4 sm:pt-6 shrink-0 z-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900 tracking-tight">
          Screen Time
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm max-w-xs mx-auto">
          Estimate your total screen time.
        </p>
      </div>

      {/* ILLUSTRATION */}
      <div className="flex-1 w-full min-h-0 flex items-center justify-center relative z-0 py-1">
        <ScreenTimeIllustration hours={hours} />
      </div>

      {/* CONTROLS */}
      <div className="w-full max-w-md shrink-0 z-20 pb-4 flex flex-col gap-2">
        <div
          className={`bg-white/80 backdrop-blur-md rounded-3xl p-2 sm:p-6 shadow-sm border ${context.border} transition-colors duration-300`}
        >
          <div className="flex flex-col items-center mb-2 sm:mb-6">
            <span
              className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1 ${context.color} transition-colors duration-300`}
            >
              {context.label}
            </span>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-3xl sm:text-6xl font-black ${context.color} transition-colors duration-300`}
              >
                {hours}
              </span>
              <span className="text-sm sm:text-xl font-bold text-gray-400">
                hrs
              </span>
            </div>
          </div>

          <div className="relative w-full h-8 sm:h-10 flex items-center">
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              className="w-full absolute z-20 opacity-0 cursor-pointer h-full"
            />

            <div className="w-full h-3 sm:h-4 bg-gray-100 rounded-full overflow-hidden relative z-10">
              <div
                className={`h-full ${context.bg} transition-all duration-150 ease-out`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div
              className="absolute h-6 w-6 sm:h-8 sm:w-8 bg-white border-2 border-gray-100 rounded-full shadow-md z-10 pointer-events-none transition-all duration-150 ease-out flex items-center justify-center -translate-x-1/2"
              style={{ left: `${percentage}%` }}
            >
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${context.bg}`}
              />
            </div>
          </div>

          <div className="flex justify-between text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 mt-2 px-1">
            <span>0h</span>
            <span>6h</span>
            <span>12h+</span>
          </div>
        </div>

        <div className="mt-1 sm:mt-6 space-y-2 sm:space-y-3">
          <button
            onClick={() => onComplete(hours)}
            className="w-full py-3 sm:py-4 bg-indigo-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:translate-y-0"
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
