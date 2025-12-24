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
    <div className="w-full h-full flex flex-col justify-between items-center animate-fade-in overflow-y-auto scrollbar-hide bg-gray-50/50">
      <div className="w-full min-h-full flex flex-col items-center p-4 sm:p-6 gap-4 sm:gap-8">
        <div className="text-center shrink-0 z-10 w-full max-w-sm mt-2">
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-2 text-gray-900 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm max-w-[280px] sm:max-w-sm mx-auto leading-tight sm:leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="shrink-0 relative z-0 flex items-center justify-center h-48 xs:h-56 sm:h-72 w-full max-w-md my-auto">
          <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-full flex items-center justify-center">
            {illustration}
          </div>
        </div>

        <div className="w-full max-w-2xl shrink-0 z-20 mb-2">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {options.map((option) => {
              const isSelected = selectedValue === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => onSelect(option.value)}
                  className={`
                    relative group flex items-center justify-center gap-2
                    px-4 py-3 sm:px-6 sm:py-4 rounded-2xl border-2 
                    font-semibold text-xs sm:text-sm transition-all duration-200
                    active:scale-95 shadow-sm hover:shadow-md w-auto min-w-[100px]
                    ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-indigo-100"
                        : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:text-indigo-600"
                    }
                  `}
                >
                  <span>{option.label}</span>

                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white rounded-full p-0.5 shadow-sm border-2 border-white">
                      <svg
                        className="w-3 h-3"
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
            <div className="mt-4 text-center">
              <button
                onClick={onSkip}
                className="text-xs text-gray-400 hover:text-gray-600 font-medium hover:underline transition-colors py-2 px-4"
              >
                Skip this question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionScreen;
