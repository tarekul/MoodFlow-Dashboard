import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { getScreenTimeUsageContext } from "../utils/helpers";
import ScreenTimeIllustration from "./ScreenTimeIllustration";

const ScreenTimeSlider = ({ onComplete, onSkip, initialValue }) => {
  const [hours, setHours] = useState(Math.floor(initialValue ?? 4));
  const [minutes, setMinutes] = useState(
    Math.round(((initialValue ?? 4) % 1) * 60)
  );
  const decimalHours = hours + minutes / 60;
  const context = getScreenTimeUsageContext(decimalHours);

  const adjustHours = (amount) => {
    setHours((prev) => Math.max(0, Math.min(24, prev + amount)));
  };

  const adjustMinutes = (amount) => {
    let newMins = minutes + amount;
    if (newMins >= 60) {
      setMinutes(0);
      adjustHours(1);
    } else if (newMins < 0) {
      setMinutes(55);
    } else {
      setMinutes(newMins);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center animate-fade-in overflow-y-auto scrollbar-hide bg-gray-50/50">
      <div className="w-full min-h-full flex flex-col items-center p-4 sm:p-6 gap-6 sm:gap-8">
        <div className="text-center shrink-0 z-10 mt-2">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900 tracking-tight">
            Screen Time
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
            Check your phone settings and enter the exact time.
          </p>
        </div>

        <div className="shrink-0 relative z-0 flex items-center justify-center h-48 sm:h-64 w-full max-w-md my-auto">
          <ScreenTimeIllustration hours={decimalHours} />
        </div>

        <div className="w-full max-w-md shrink-0 z-20 mb-2 flex flex-col gap-2">
          <div
            className={`bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border ${context.border} transition-colors duration-300`}
          >
            <div className="text-center mb-6">
              <span
                className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${context.color} transition-colors duration-300`}
              >
                {context.label} usage
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-8">
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => adjustHours(1)}
                  className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors active:scale-90"
                >
                  <ChevronUp size={24} />
                </button>

                <div className="flex flex-col items-center">
                  <span
                    className={`text-4xl sm:text-5xl font-black ${context.color} tabular-nums transition-colors duration-300`}
                  >
                    {hours}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Hours
                  </span>
                </div>

                <button
                  onClick={() => adjustHours(-1)}
                  className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors active:scale-90"
                >
                  <ChevronDown size={24} />
                </button>
              </div>

              <div className="text-3xl font-black text-gray-200 pb-6">:</div>

              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => adjustMinutes(5)}
                  className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors active:scale-90"
                >
                  <ChevronUp size={24} />
                </button>

                <div className="flex flex-col items-center">
                  <span
                    className={`text-4xl sm:text-5xl font-black ${context.color} tabular-nums transition-colors duration-300`}
                  >
                    {minutes.toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Mins
                  </span>
                </div>

                <button
                  onClick={() => adjustMinutes(-5)}
                  className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors active:scale-90"
                >
                  <ChevronDown size={24} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-3">
            <button
              onClick={() => onComplete(Number(decimalHours.toFixed(2)))}
              className="w-full py-3 sm:py-4 bg-indigo-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:translate-y-0"
            >
              Confirm Time
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

export default ScreenTimeSlider;
