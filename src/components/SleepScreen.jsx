import { useEffect, useRef, useState } from "react";
import { QUALITY_OPTIONS } from "../utils/helpers";
import SleepIllustration from "./SleepIllustration";

const SleepScreen = ({
  onComplete,
  initialQuality,
  initialHours,
  initialBedTime,
  initialWakeTime,
}) => {
  const [bedTime, setBedTime] = useState(initialBedTime ?? "23:00");
  const [wakeTime, setWakeTime] = useState(initialWakeTime ?? "07:00");
  const [hours, setHours] = useState(initialHours ?? 8);
  const [quality, setQuality] = useState(initialQuality ?? null);

  const wasPreFilled = useRef(!!initialQuality);

  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (quality && isInteracting && !wasPreFilled.current) {
      const timer = setTimeout(() => {
        onComplete(hours, quality, bedTime, wakeTime);
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [quality, hours, isInteracting, onComplete, bedTime, wakeTime]);

  useEffect(() => {
    calculateDuration(bedTime, wakeTime);
  }, [bedTime, wakeTime]);

  const calculateDuration = (start, end) => {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);

    let startMin = startH * 60 + startM;
    let endMin = endH * 60 + endM;

    if (endMin < startMin) {
      endMin += 24 * 60;
    }

    const diffMinutes = endMin - startMin;
    const diffHours = diffMinutes / 60;

    setHours(Math.round(diffHours * 10) / 10);
  };

  const handleQualitySelect = (val) => {
    setIsInteracting(true);
    setQuality(val);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center animate-fade-in overflow-y-auto scrollbar-hide bg-gray-50/50">
      <div className="w-full min-h-full flex flex-col items-center p-4 sm:p-6 gap-4 sm:gap-6">
        <div className="text-center shrink-0 z-10 mt-2">
          <h1 className="text-2xl sm:text-3xl font-bold mb-0.5 text-gray-900 tracking-tight leading-tight">
            How did you sleep?
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm max-w-[280px] mx-auto">
            Set your sleep window.
          </p>
        </div>

        <div className="shrink-0 h-40 xs:h-48 sm:h-56 w-full max-w-md my-auto relative z-0 flex items-center justify-center">
          <SleepIllustration />
        </div>

        <div className="w-full max-w-md shrink-0 z-20 mb-2 flex flex-col gap-2">
          {/* TIME INPUT CARD */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="text-center mb-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                Total Duration
              </span>
              <div className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight flex items-baseline justify-center">
                {hours}
                <span className="text-sm sm:text-xl ml-1 font-bold text-indigo-300">
                  hrs
                </span>
              </div>
            </div>

            <div className="flex gap-4 border-t border-gray-100 pt-4">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                  Bedtime
                </label>
                <input
                  type="time"
                  value={bedTime}
                  onChange={(e) => setBedTime(e.target.value)}
                  className="w-full p-2 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 font-bold text-center focus:ring-2 focus:ring-indigo-100 outline-none"
                />
              </div>

              <div className="flex items-center text-gray-300 pt-4">→</div>

              <div className="flex-1">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                  Wake Up
                </label>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full p-2 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 font-bold text-center focus:ring-2 focus:ring-indigo-100 outline-none"
                />
              </div>
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
                    onClick={() => handleQualitySelect(option.value)}
                    className={`
                      flex-1 flex flex-col items-center justify-center py-2 sm:py-3 px-1 rounded-xl border-2 transition-all duration-200 active:scale-95
                      ${
                        isActive
                          ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-md transform -translate-y-0.5 scale-105"
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
            onClick={() => onComplete(hours, quality, bedTime, wakeTime)}
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
            {!quality
              ? "Select Quality"
              : wasPreFilled.current
              ? "Save Changes"
              : "Next Step →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SleepScreen;
