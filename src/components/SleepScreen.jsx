import { useState } from "react";
import { QUALITY_OPTIONS } from "../utils/helpers";
import SleepIllustration from "./SleepIllustration";

const SleepScreen = ({ onComplete, initialHours, initialQuality }) => {
  const [hours, setHours] = useState(initialHours ?? 7);
  const [quality, setQuality] = useState(initialQuality ?? null);

  return (
    <div className="h-full w-full flex flex-col items-center justify-between animate-fade-in relative px-4 pb-6">
      <div className="text-center pt-8 sm:pt-12 shrink-0 z-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 tracking-tight">
          How did you sleep?
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Track both duration and quality for better insights.
        </p>
      </div>

      <div className="flex-1 w-full min-h-0 flex items-center justify-center relative z-0 py-2">
        <div className="w-full max-w-xs sm:max-w-sm max-h-[30vh] sm:max-h-[40vh] flex items-center justify-center">
          <SleepIllustration />
        </div>
      </div>

      <div className="w-full max-w-md space-y-4 shrink-0 z-20">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="text-center mb-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">
              Duration
            </span>
            <div className="text-5xl font-black text-indigo-600 tracking-tight flex items-baseline justify-center">
              {hours}
              <span className="text-xl ml-1 font-bold text-indigo-300">
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
            className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-indigo-600 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400 mt-3 px-1">
            <span>3 hrs</span>
            <span>8 hrs</span>
            <span>12 hrs</span>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-3">
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
                    flex-1 flex flex-col items-center justify-center py-3 px-1 rounded-xl border-2 transition-all duration-200 active:scale-95
                    ${
                      isActive
                        ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md transform -translate-y-1"
                        : "border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-gray-200"
                    }
                  `}
                >
                  <span
                    className={`text-2xl mb-1 transition-transform ${
                      isActive ? "scale-110" : ""
                    }`}
                  >
                    {option.emoji}
                  </span>
                  <span
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-tight ${
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
            w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2
            ${
              !quality
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 hover:-translate-y-0.5 active:translate-y-0"
            }
          `}
        >
          {!quality ? "Select Quality to Continue" : "Next Step →"}
        </button>
      </div>
    </div>
  );
};

export default SleepScreen;
