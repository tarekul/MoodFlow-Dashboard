import { useState } from "react";
import { QUALITY_OPTIONS } from "../utils/helpers";
import SleepIllustration from "./SleepIllustration";

const SleepScreen = ({ onComplete, initialHours, initialQuality }) => {
  const [hours, setHours] = useState(initialHours ?? 7);
  const [quality, setQuality] = useState(initialQuality ?? null);

  return (
    <div className="w-full h-full flex flex-col justify-between items-center animate-fade-in overflow-y-auto scrollbar-hide bg-gray-50/50">
      <div className="w-full min-h-full flex flex-col items-center p-4 sm:p-6 gap-4 sm:gap-6">
        <div className="text-center shrink-0 z-10 mt-2">
          <h1 className="text-2xl sm:text-3xl font-bold mb-0.5 text-gray-900 tracking-tight leading-tight">
            How did you sleep?
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm max-w-[280px] mx-auto">
            Track duration and quality.
          </p>
        </div>

        <div className="shrink-0 h-40 xs:h-48 sm:h-56 w-full max-w-md my-auto relative z-0 flex items-center justify-center">
          <SleepIllustration />
        </div>

        <div className="w-full max-w-md shrink-0 z-20 mb-2 flex flex-col gap-2">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100">
            <div className="text-center mb-1 sm:mb-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                Duration
              </span>
              <div className="text-3xl sm:text-5xl font-black text-indigo-600 tracking-tight flex items-baseline justify-center">
                {hours}
                <span className="text-sm sm:text-xl ml-1 font-bold text-indigo-300">
                  hrs
                </span>
              </div>
            </div>

            <input
              type="range"
              min="3"
              max="12"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:bg-gray-200 transition-colors focus:outline-none"
            />
            <div className="flex justify-between text-[9px] sm:text-[10px] uppercase font-bold text-gray-400 mt-1 px-1">
              <span>3h</span>
              <span>8h</span>
              <span>12h</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-1">
              Quality
            </div>
            <div className="flex gap-2 justify-between">
              {QUALITY_OPTIONS.map((option) => {
                const isActive = quality === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setQuality(option.value)}
                    className={`
                      flex-1 flex flex-col items-center justify-center py-2 sm:py-3 px-1 rounded-xl border-2 transition-all duration-200 active:scale-95
                      ${
                        isActive
                          ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md transform -translate-y-0.5"
                          : "border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-gray-200"
                      }
                    `}
                  >
                    <span
                      className={`text-lg sm:text-2xl mb-0.5 transition-transform ${
                        isActive ? "scale-110" : ""
                      }`}
                    >
                      {option.emoji}
                    </span>
                    <span
                      className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-tight ${
                        isActive ? "text-indigo-700" : "text-gray-400"
                      }`}
                    >
                      {option.value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onComplete(hours, quality)}
            disabled={!quality}
            className={`
              w-full py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2
              ${
                !quality
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0"
              }
            `}
          >
            {!quality ? "Select Quality" : "Next Step →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SleepScreen;
