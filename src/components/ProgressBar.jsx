const ProgressBar = ({ currentStep }) => {
  return (
    <div className="w-full max-w-xl mt-4 mb-4 mx-auto">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 10) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
