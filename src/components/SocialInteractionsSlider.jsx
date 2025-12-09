import React, { useState } from "react";
import SocialInteractionIllustration from "./SocialInteractionIllustration";

const SocialInteractionsSlider = ({ onComplete, onSkip, initialValue }) => {
  const [hours, setHours] = useState(initialValue ?? 2);

  const getColor = (val) => {
    if (val <= 3.5) return "text-blue-500";
    if (val <= 6.5) return "text-yellow-500";
    if (val <= 8) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 w-full flex-1 flex flex-col items-center justify-between p-11 animate-fade-in">
      <div className="text-center mt-4 sm:mt-12 relative z-10 px-4">
        <h1 className="text-2xl sm:text-4xl font-serif mb-1 text-gray-900 leading-tight">
          How much social interaction did you have?
        </h1>
        <p className="text-gray-600 text-xs sm:text-base max-w-xs mx-auto">
          How much time you spent socializing today.
        </p>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center w-full py-2 sm:py-4 relative z-0">
        <SocialInteractionIllustration hours={hours} />
      </div>
      <div className="w-full max-w-md space-y-8 sm:space-y-12 shrink-0 pb-8">
        <div className="flex flex-wrap justify-center gap-3 mb-3">
          <label className="text-slate-500 font-medium">
            Social Interaction
          </label>
          <div className={`text-3xl font-bold ${getColor(hours)}`}>
            {hours}{" "}
            <span className="text-sm text-slate-400 font-normal">hours</span>
          </div>
        </div>

        <input
          type="range"
          min="0"
          max="8"
          step="0.5"
          value={hours}
          onChange={(e) => setHours(parseFloat(e.target.value))}
          className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />

        <div className="flex justify-between mt-2 text-xs text-slate-400">
          <span>0h</span>
          <span>4h</span>
          <span>8h+</span>
        </div>
        <button
          onClick={() => onComplete(hours)}
          className="w-full py-2 bg-indigo-600 text-white rounded-full font-semibold text-md hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

export default SocialInteractionsSlider;
