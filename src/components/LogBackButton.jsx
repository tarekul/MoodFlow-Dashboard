const LogBackButton = ({
  isMorningCheckIn,
  currentStep,
  loading,
  setCurrentStep,
}) => {
  if (!isMorningCheckIn && currentStep > 1 && currentStep <= 10 && !loading) {
    return (
      <button
        onClick={() =>
          setCurrentStep(currentStep === 5.5 ? 5 : currentStep - 1)
        }
        className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-all text-gray-600 hover:text-indigo-600 active:scale-95"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    );
  }
  return null;
};
export default LogBackButton;
