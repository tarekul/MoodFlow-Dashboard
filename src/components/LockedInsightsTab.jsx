const LockedInsightsTab = ({ displayData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-100">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="text-2xl font-bold text-gray-700 mb-2">Insights Locked</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        Your personalized boosters, drainers, and recommendations will appear
        here once you've logged 7 days of data.
      </p>
      <div className="mt-6 w-full max-w-xs mx-auto bg-gray-100 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
          style={{
            width: `${Math.min((displayData.days_logged / 7) * 100, 100)}%`,
          }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {displayData.days_logged}/7 days logged
      </p>
    </div>
  );
};

export default LockedInsightsTab;
