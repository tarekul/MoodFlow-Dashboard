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
    <div className="w-full flex-1 flex flex-col items-center justify-between animate-fade-in h-full">
      <div className="text-center mt-4 sm:mt-12 relative z-10 px-4">
        <h1 className="text-2xl sm:text-4xl font-serif mb-1 text-gray-900 leading-tight">
          {title}
        </h1>
        <p className="text-gray-600 text-xs sm:text-base max-w-xs mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Illustration Area */}
      <div className="flex-1 min-h-0 flex items-center justify-center w-full py-2 sm:py-4 relative z-0">
        {illustration}
      </div>

      <div className="w-full max-w-md mb-4 sm:mb-12 px-2">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          {options.slice(0, 3).map((option) => (
            <button
              key={option.label}
              onClick={() => onSelect(option.value)}
              className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full border-2 transition-all font-medium text-sm sm:text-base ${
                selectedValue === option.value
                  ? "border-indigo-500 bg-indigo-100 text-indigo-900"
                  : `border-indigo-300 hover:border-indigo-500 ${
                      option.color ? option.color : "bg-white"
                    } hover:bg-indigo-50 text-gray-900`
              }`}
            >
              {option.emoji && (
                <span className="mr-1 sm:mr-2">{option.emoji}</span>
              )}
              {option.label}
            </button>
          ))}
        </div>

        {/* Second row of options (if any) */}
        {options.length > 3 && (
          <div className="flex justify-center gap-2 sm:gap-3">
            {options.slice(3).map((option) => (
              <button
                key={option.label}
                onClick={() => onSelect(option.value)}
                className={`px-4 sm:px-8 py-2 sm:py-3 rounded-full border-2 transition-all font-medium text-sm sm:text-base ${
                  selectedValue === option.value
                    ? "border-indigo-500 bg-indigo-100 text-indigo-900"
                    : `border-indigo-300 hover:border-indigo-500 ${
                        option.color ? option.color : "bg-white"
                      } hover:bg-indigo-50 text-gray-900`
                }`}
              >
                {option.emoji && (
                  <span className="mr-1 sm:mr-2">{option.emoji}</span>
                )}
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Skip link */}
        {onSkip && (
          <button
            onClick={onSkip}
            className="mt-3 sm:mt-6 text-gray-500 hover:text-gray-700 text-xs sm:text-sm underline w-full text-center"
          >
            Skip this question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen;
