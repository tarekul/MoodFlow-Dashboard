import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { getSocialInteractionContext } from "../utils/helpers";
import SocialInteractionIllustration from "./SocialInteractionIllustration";

const SocialInteractionsSlider = ({ onComplete, onSkip, initialValue }) => {
  const [hours, setHours] = useState(initialValue ?? 2);

  const context = getSocialInteractionContext(hours);

  const adjustHours = (amount) => {
    setHours((prev) => {
      const newVal = prev + amount;
      return Math.max(0, Math.min(24, Math.round(newVal * 10) / 10));
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center animate-fade-in overflow-y-auto scrollbar-hide bg-gray-50/50">
      <div className="w-full min-h-full flex flex-col items-center p-4 sm:p-6 gap-6 sm:gap-8">
        <div className="text-center shrink-0 z-10 mt-2">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900 tracking-tight">
            Social Time
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm max-w-xs mx-auto">
            How many hours did you spend interacting with others?
          </p>
        </div>

        <div className="shrink-0 relative z-0 flex items-center justify-center h-48 sm:h-64 w-full max-w-md my-auto">
          <SocialInteractionIllustration hours={hours} />
        </div>
        <div className="w-full max-w-md shrink-0 z-20 mb-2 flex flex-col gap-2">
          <div
            className={`bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border ${context.border} transition-colors duration-300`}
          >
            <div className="text-center mb-6">
              <span
                className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${context.color} transition-colors duration-300`}
              >
                {context.label}
              </span>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => adjustHours(-0.5)}
                className="p-4 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95 shadow-sm border border-transparent hover:border-indigo-100"
              >
                <ChevronDown size={28} />
              </button>

              <div className="flex flex-col items-center w-32">
                <span
                  className={`text-6xl font-black ${context.color} transition-colors duration-300 tracking-tight`}
                >
                  {hours}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Hours
                </span>
              </div>

              <button
                onClick={() => adjustHours(0.5)}
                className="p-4 bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95 shadow-sm border border-transparent hover:border-indigo-100"
              >
                <ChevronUp size={28} />
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-[10px] text-gray-400 font-medium">
                Tap arrows to adjust in 30 min increments
              </p>
            </div>
          </div>

          <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-3">
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
    </div>
  );
};

export default SocialInteractionsSlider;
