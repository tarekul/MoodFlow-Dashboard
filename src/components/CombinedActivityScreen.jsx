import React, { useEffect, useRef, useState } from "react";
import PhysicalActivityIllustration from "./PhysicalActivityIllustration";

const CombinedActivityScreen = ({
  activityLevel,
  activityTime,
  levelOptions,
  timeOptions,
  onUpdate,
  onNext,
}) => {
  const isComplete =
    activityLevel === 0 || (activityLevel !== null && activityTime !== null);

  const wasPreFilled = useRef(activityLevel !== null);

  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (isComplete && isInteracting && !wasPreFilled.current) {
      const timer = setTimeout(() => {
        onNext();
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [isComplete, isInteracting, onNext]);

  const handleLevelSelect = (val) => {
    setIsInteracting(true);
    if (val === 0) {
      onUpdate({ physical_activity: 0, activity_time: null });
    } else {
      onUpdate({ physical_activity: val });
    }
  };

  const handleTimeSelect = (val) => {
    setIsInteracting(true);
    onUpdate({ activity_time: val });
  };

  return (
    <div className="w-full h-full flex flex-col items-center animate-fade-in overflow-y-auto scrollbar-hide">
      <div className="w-full max-w-lg flex flex-col gap-6 p-4 pb-20">
        <div className="text-center shrink-0">
          <h1 className="text-2xl font-bold text-gray-900">Movement</h1>
          <p className="text-gray-500 text-sm">Track your physical activity.</p>
        </div>

        <div className="h-40 flex items-center justify-center">
          <PhysicalActivityIllustration
            variant={activityLevel > 0 ? "active" : "couch"}
          />
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm">
          <h3 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
            Intensity
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {levelOptions.map((opt) => {
              const isSelected = activityLevel === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleLevelSelect(opt.value)}
                  className={`
                    px-4 py-3 rounded-xl border-2 font-bold text-xs transition-all active:scale-95
                    ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm scale-105"
                        : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300"
                    }
                  `}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {activityLevel !== null && activityLevel > 0 && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm animate-slide-up">
            <h3 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
              When?
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {timeOptions.map((opt) => {
                const isSelected = activityTime === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleTimeSelect(opt.value)}
                    className={`
                      px-4 py-3 rounded-xl border-2 font-bold text-xs transition-all active:scale-95
                      ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm scale-105"
                          : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300"
                      }
                    `}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

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
          {!isComplete
            ? "Next Step"
            : wasPreFilled.current
            ? "Save Changes"
            : "Next Step"}
        </button>
      </div>
    </div>
  );
};

export default CombinedActivityScreen;
