const ProgressBar = ({ currentStep }) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div
            key={step}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              step < currentStep
                ? "bg-green-500" // Completed - green!
                : step === currentStep
                ? "bg-indigo-500" // Current - indigo!
                : "bg-gray-300" // Not yet - gray
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
