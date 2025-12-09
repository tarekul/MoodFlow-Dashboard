import { useState } from "react";
import { QUALITY_OPTIONS } from "../utils/helpers";
import SleepIllustration from "./SleepIllustration";

const SleepScreen = ({ onComplete, initialHours, initialQuality }) => {
  const [hours, setHours] = useState(initialHours ?? 7);
  const [quality, setQuality] = useState(initialQuality ?? null);

  return (
    <div className="h-full w-full flex flex-col items-center animate-fade-in relative">
      {/* 1. HEADER */}
      <div className="text-center mt-2 relative z-10">
        <h1 className="text-3xl sm:text-4xl font-serif mb-1 text-gray-900">
          How did you sleep?
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Track both quantity and quality.
        </p>
      </div>

      {/* 2. ILLUSTRATION */}
      <div className="flex-1 min-h-0 flex items-center justify-center w-full py-4 relative z-0">
        <SleepIllustration />
      </div>

      {/* 3. CONTROLS */}
      <div className="w-full max-w-md space-y-4 shrink-0 mb-4 relative z-10">
        {/* Hours selector */}
        <div className="bg-white rounded-2xl p-5 shadow-xl border border-white/50 backdrop-blur-sm">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-indigo-600 tracking-tight">
              {hours}
              <span className="text-2xl ml-1 font-medium text-indigo-400">
                hrs
              </span>
            </div>
          </div>
          <input
            type="range"
            min="4"
            max="12"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium px-1">
            <span>4hrs</span>
            <span>12hrs</span>
          </div>
        </div>

        {/* Quality selector */}
        <div>
          <div className="text-gray-900 font-semibold mb-3 text-center text-sm uppercase tracking-wide opacity-80">
            Quality
          </div>
          <div className="flex gap-2 justify-center">
            {QUALITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setQuality(option.value)}
                className={`flex-1 py-3 rounded-xl border transition-all duration-200 ${
                  quality === option.value
                    ? "border-indigo-500 bg-indigo-600 text-white shadow-lg scale-105"
                    : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:bg-indigo-50"
                }`}
              >
                <div className="text-2xl mb-1">{option.emoji}</div>
                <div
                  className={`text-xs font-bold ${
                    quality === option.value ? "text-white" : "text-gray-600"
                  }`}
                >
                  {option.value}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={() => onComplete(hours, quality)}
          disabled={!quality}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SleepScreen;
