import React, { useState } from "react";
import ScreenTimeIllustration from "./ScreenTimeIllustration";

const ScreenTimeSlider = ({ onComplete, onSkip, initialValue }) => {
  const [hours, setHours] = useState(initialValue ?? 4.5);

  // Dynamic color based on usage
  const getColor = (val) => {
    if (val <= 3) return "text-green-500";
    if (val <= 6) return "text-yellow-500";
    if (val <= 9) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-between p-8 animate-fade-in">
      <div className="text-center mt-8 sm:mt-12 shrink-0">
        <h1 className="text-4xl font-serif mb-4 text-gray-900">
          How much screen time did you have?
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto px-4">
          Track the amount of screen time you had today.
        </p>
      </div>
      <div className="shrink-1 flex items-center justify-center my-4 sm:my-8 scale-90 sm:scale-100">
        <ScreenTimeIllustration hours={hours} />
      </div>
      <div className="w-full max-w-md space-y-8 sm:space-y-12 shrink-0 pb-8">
        <div className="flex flex-wrap justify-center gap-3 mb-3">
          <label className="text-slate-500 font-medium">Screen Time</label>
          <div className={`text-3xl font-bold ${getColor(hours)}`}>
            {hours}{" "}
            <span className="text-sm text-slate-400 font-normal">hours</span>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="12"
          step="0.5"
          value={hours}
          onChange={(e) => setHours(parseFloat(e.target.value))}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />

        <div className="flex justify-between mt-2 text-xs text-slate-400">
          <span>0h</span>
          <span>6h</span>
          <span>12h+</span>
        </div>
        <button
          onClick={() => onComplete(hours)}
          className="w-full py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </button>

        {/* Skip link - only show if onSkip is provided */}
        {onSkip && (
          <button
            onClick={onSkip}
            className="mt-6 text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Skip this question
          </button>
        )}
      </div>
    </div>
  );
};

export default ScreenTimeSlider;
