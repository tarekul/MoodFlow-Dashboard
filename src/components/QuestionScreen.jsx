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
    <div className="w-full h-full flex flex-col items-center animate-fade-in relative">
      <div className="text-center pt-8 pb-4 sm:pt-12 px-6 relative z-10 shrink-0">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900 tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="flex-1 w-full flex items-center justify-center p-4 min-h-0 relative z-0">
        <div className="w-full max-w-lg h-full max-h-[40vh] sm:max-h-[50vh] flex items-center justify-center">
          {illustration}
        </div>
      </div>

      <div className="w-full max-w-2xl px-4 pb-8 sm:pb-12 shrink-0 z-20">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {options.map((option) => {
            const isSelected = selectedValue === option.value;

            return (
              <button
                key={option.value}
                onClick={() => onSelect(option.value)}
                className={`
                  relative group flex items-center justify-center gap-2
                  px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 
                  font-semibold text-sm sm:text-base transition-all duration-200
                  active:scale-95 shadow-sm hover:shadow-md
                  ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-indigo-100"
                      : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:text-indigo-600"
                  }
                `}
              >
                {option.emoji && (
                  <span className="text-xl sm:text-2xl transform transition-transform group-hover:scale-110">
                    {option.emoji}
                  </span>
                )}
                <span>{option.label}</span>

                {isSelected && (
                  <div className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full p-0.5 shadow-sm">
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
          <div className="mt-6 text-center">
            <button
              onClick={onSkip}
              className="text-xs sm:text-sm text-gray-400 hover:text-gray-600 font-medium underline decoration-gray-300 hover:decoration-gray-500 underline-offset-4 transition-colors p-2"
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
