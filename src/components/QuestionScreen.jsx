import React from "react";

const QuestionScreen = ({
  title,
  subtitle,
  options,
  illustration,
  onSelect,
  onSkip,
  selectedValue,
}) => {
  return (
    <div className="flex-1 w-full flex flex-col items-center animate-fade-in h-full relative">
      {/* HEADER: Tighter padding and responsive text sizes */}
      <div className="text-center pt-2 px-4 sm:pt-6 shrink-0 z-10 w-full max-w-sm">
        <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-1 text-gray-900 tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm max-w-[280px] sm:max-w-sm mx-auto leading-tight sm:leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* ILLUSTRATION: Flexible container */}
      <div className="flex-1 w-full min-h-0 flex items-center justify-center py-1 sm:py-4 relative z-0">
        <div className="h-full w-full max-h-[35vh] sm:max-h-[300px] flex items-center justify-center">
          {illustration}
        </div>
      </div>

      {/* FOOTER: Smaller buttons on small screens */}
      <div className="w-full max-w-2xl px-2 pb-4 sm:px-4 sm:pb-8 shrink-0 z-20">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {options.map((option) => {
            const isSelected = selectedValue === option.value;

            return (
              <button
                key={option.value}
                onClick={() => onSelect(option.value)}
                className={`
                  relative group flex items-center justify-center gap-2
                  px-3 py-2 sm:px-6 sm:py-3 rounded-full border-2 
                  font-semibold text-xs sm:text-sm transition-all duration-200
                  active:scale-95 shadow-sm hover:shadow-md
                  ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-indigo-100"
                      : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:text-indigo-600"
                  }
                `}
              >
                {option.emoji && (
                  <span className="text-base sm:text-xl transform transition-transform group-hover:scale-110">
                    {option.emoji}
                  </span>
                )}
                <span>{option.label}</span>

                {isSelected && (
                  <div className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full p-0.5 shadow-sm">
                    <svg
                      className="w-2 h-2 sm:w-3 sm:h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {onSkip && (
          <div className="mt-2 sm:mt-4 text-center">
            <button
              onClick={onSkip}
              className="text-[10px] sm:text-xs text-gray-400 hover:text-gray-600 font-medium underline decoration-gray-300 hover:decoration-gray-500 underline-offset-4 transition-colors p-2"
            >
              Skip this question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen;
