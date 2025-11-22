const QuestionScreen = ({
  title,
  subtitle,
  options,
  illustration,
  onSelect,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-between p-8 animate-fade-in">
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
              className={`px-8 py-3 rounded-full border-2 border-indigo-300 hover:border-indigo-500 ${
                option.color ? option.color : "bg-white"
              } hover:bg-indigo-50 transition-all text-gray-900 font-medium`}
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
                className={`px-8 py-3 rounded-full border-2 border-indigo-300 hover:border-indigo-500 ${
                  option.color ? option.color : "bg-white"
                } hover:bg-indigo-50 transition-all text-gray-900 font-medium`}
              >
                {option.emoji && <span className="mr-2">{option.emoji}</span>}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen;
