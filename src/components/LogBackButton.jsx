const LogBackButton = ({
  isMorningCheckIn,
  currentStep,
  loading,
  setCurrentStep,
}) => {
  if (!isMorningCheckIn && currentStep > 1 && currentStep <= 10 && !loading) {
    return (
      <button
        onClick={() => setCurrentStep(currentStep - 1)}
        className="fixed top-6 left-6 flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white rounded-full shadow-md hover:shadow-lg transition-all text-gray-600 hover:text-gray-900 z-50"
      >
        <span>←</span>
        <span hidden sm:inline>
          Back
        </span>
      </button>
    );
  }
};

export default LogBackButton;
