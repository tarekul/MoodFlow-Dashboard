import React, { useState } from "react";
import ScreenTimeIllustration from "./ScreenTimeIllustration";

const ScreenTimeSlider = () => {
  const [hours, setHours] = useState(4.5);

  // Dynamic color based on usage
  const getColor = (val) => {
    if (val <= 3) return "text-green-500";
    if (val <= 6) return "text-yellow-500";
    if (val <= 9) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-between p-8 animate-fade-in">
      <div className="text-center mt-12">
        <h1 className="text-4xl font-serif mb-4 text-gray-900">
          How much screen time did you have?
        </h1>
        <p className="text-gray-600 text-lg max-w-md">
          Track the amount of screen time you had today.
        </p>
      </div>
      <ScreenTimeIllustration />
      <div className="w-full max-w-md space-y-12">
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
      </div>
    </div>
  );
};

export default ScreenTimeSlider;
