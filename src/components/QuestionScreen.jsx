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
    <div className="w-full flex-1 flex flex-col items-center justify-between animate-fade-in">
      {/* Header */}
      <div className="text-center mt-12">
        <h1 className="text-4xl font-serif mb-4 text-gray-900">{title}</h1>
        <p className="text-gray-600 text-lg max-w-md mx-auto">{subtitle}</p>
      </div>

      {/* Illustration */}
      <div className="my-12">{illustration}</div>

      {/* Options */}
      <div className="w-full max-w-md mb-12">
        <div className="flex flex-wrap justify-center gap-3 mb-3">
          {options.slice(0, 3).map((option) => (
            <button
              key={option.label}
              onClick={() => onSelect(option.value)}
              className={`px-8 py-3 rounded-full border-2 transition-all font-medium ${
                selectedValue === option.value
                  ? "border-indigo-500 bg-indigo-100 text-indigo-900"
                  : `border-indigo-300 hover:border-indigo-500 ${
                      option.color ? option.color : "bg-white"
                    } hover:bg-indigo-50 text-gray-900`
              }`}
            >
              {option.emoji && <span className="mr-2">{option.emoji}</span>}
              {option.label}
            </button>
          ))}
        </div>
        {options.length > 3 && (
          <div className="flex justify-center gap-3">
            {options.slice(3).map((option) => (
              <button
                key={option.label}
                onClick={() => onSelect(option.value)}
                className={`px-8 py-3 rounded-full border-2 transition-all font-medium ${
                  selectedValue === option.value
                    ? "border-indigo-500 bg-indigo-100 text-indigo-900"
                    : `border-indigo-300 hover:border-indigo-500 ${
                        option.color ? option.color : "bg-white"
                      } hover:bg-indigo-50 text-gray-900`
                }`}
              >
                {option.emoji && <span className="mr-2">{option.emoji}</span>}
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Skip link - only show if onSkip is provided */}
        {onSkip && (
          <button
            onClick={onSkip}
            className="mt-6 text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Skip this question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen;
