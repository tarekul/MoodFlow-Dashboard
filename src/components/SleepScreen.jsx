import { useState } from "react";
import { QUALITY_OPTIONS } from "../utils/helpers";
import SleepIllustration from "./SleepIllustration";

const SleepScreen = ({ onComplete }) => {
  const [hours, setHours] = useState(7);
  const [quality, setQuality] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-between p-8 animate-fade-in">
      <div className="text-center mt-12">
        <h1 className="text-4xl font-serif mb-4 text-gray-900">
          How did you sleep?
        </h1>
        <p className="text-gray-600 text-lg max-w-md">
          Track both quantity and quality of sleep.
        </p>
      </div>
      <SleepIllustration />
      <div className="w-full max-w-md space-y-8">
        {/* Hours selector */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-indigo-600">{hours}hrs</div>
            <div className="text-gray-600 mt-2">Hours slept</div>
          </div>
          <input
            type="range"
            min="4"
            max="12"
            step="0.5"
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>4hrs</span>
            <span>12hrs</span>
          </div>
        </div>

        {/* Quality selector */}
        <div>
          <div className="text-gray-900 font-semibold mb-3 text-center">
            Quality
          </div>
          <div className="flex gap-3 justify-center">
            {QUALITY_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setQuality(option.value)}
                className={`flex-1 py-4 rounded-xl border-2 transition-all ${
                  quality === option.value
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-indigo-200 bg-white hover:border-indigo-400"
                }`}
              >
                <div className="text-3xl mb-1">{option.emoji}</div>
                <div className="text-sm font-medium text-gray-900">
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
          className="w-full py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
      <div></div> {/* Spacer */}
    </div>
  );
};

export default SleepScreen;
