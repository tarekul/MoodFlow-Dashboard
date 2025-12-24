import React, { useEffect, useRef, useState } from "react";
import MoodIllustration from "./MoodIllustration";

const MoodStressScreen = ({
  mood,
  stress,
  moodOptions,
  stressOptions,
  onUpdate,
  onNext,
}) => {
  const isComplete = mood !== null && stress !== null;

  const wasPreFilled = useRef(mood !== null && stress !== null);

  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (isComplete && isInteracting && !wasPreFilled.current) {
      const timer = setTimeout(() => {
        onNext();
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [mood, stress, onNext, isComplete, isInteracting]);

  const handleSelection = (field, value) => {
    setIsInteracting(true);
    onUpdate({ [field]: value });
  };

  const renderOptions = (options, currentValue, field) => (
    <div className="flex flex-wrap justify-center gap-2">
      {options.map((option) => {
        const isSelected = currentValue === option.value;
        const hasColor = !!option.color;

        return (
          <button
            key={option.value}
            onClick={() => handleSelection(field, option.value)}
            className={`
              relative flex flex-col items-center justify-center gap-0.5
              px-2 py-2 sm:px-4 sm:py-3 rounded-xl border-2 
              transition-all duration-200 active:scale-95 w-auto min-w-[70px] flex-1 sm:flex-none
              ${
                isSelected
                  ? hasColor
                    ? `${option.color} border-transparent text-white shadow-md scale-105`
                    : "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-indigo-100 scale-105"
                  : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300"
              }
            `}
          >
            <span className="font-bold text-[10px] sm:text-xs text-center whitespace-nowrap">
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center animate-fade-in overflow-y-auto scrollbar-hide">
      <div className="w-full max-w-lg flex flex-col gap-6 p-4 pb-20">
        <div className="text-center shrink-0 z-20">
          <h1 className="text-2xl font-bold text-gray-900">Check-in</h1>
          <p className="text-gray-500 text-sm">
            How are you feeling right now?
          </p>
        </div>

        <div className="shrink-0 relative z-10 flex items-center justify-center py-2 h-auto">
          <MoodIllustration />
        </div>

        <div className="relative z-0 bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            Current Mood
          </h3>
          {renderOptions(moodOptions, mood, "mood")}
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            Stress Level
          </h3>
          {renderOptions(stressOptions, stress, "stress")}
        </div>

        <button
          onClick={onNext}
          disabled={!isComplete}
          className={`
            w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all mt-2 duration-300
            ${
              isComplete
                ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {wasPreFilled.current ? "Save Changes" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default MoodStressScreen;
