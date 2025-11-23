import { getStrengthColor, getStrengthStars } from "../utils/helpers";

function BoosterCard({ boosters, comparisons = [] }) {
  const getComparison = (factor) => {
    return comparisons.find((c) => c.factor === factor);
  };

  const getComparisonBadge = (comparison) => {
    if (!comparison) return null;

    const threshold = 0.1;
    const diff = comparison.user_correlation - comparison.population_avg;

    let status = "typical";
    if (diff > threshold) status = "higher";
    if (diff < -threshold) status = "lower";

    if (status === "typical") {
      return (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300">
            TYPICAL
          </span>
          <span className="text-gray-600">
            Your response is about average (avg:{" "}
            {comparison.population_avg.toFixed(2)})
          </span>
        </div>
      );
    }

    if (status === "higher") {
      return (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-300 font-semibold">
            📈 MORE RESPONSIVE
          </span>
          <span className="text-orange-700">
            You benefit MORE from this than most users! (avg:{" "}
            {comparison.population_avg.toFixed(2)})
          </span>
        </div>
      );
    }

    if (status === "lower") {
      return (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-300">
            📉 LESS RESPONSIVE
          </span>
          <span className="text-blue-700">
            This matters less for you than average (avg:{" "}
            {comparison.population_avg.toFixed(2)})
          </span>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
        🚀 PRODUCTIVITY BOOSTERS
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        Do MORE of these to increase productivity:
      </p>
      <div className="space-y-4">
        {boosters.map((booster, idx) => {
          const comparison = getComparison(booster.factor);

          return (
            <div
              key={idx}
              className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">😊</span>
                  <span className="font-semibold text-sm sm:text-base text-gray-800">
                    {booster.factor}
                  </span>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold text-sm sm:text-base ${getStrengthColor(
                      booster.strength
                    )}`}
                  >
                    +{booster.correlation.toFixed(2)}{" "}
                    <span className="hidden sm:inline">
                      {getStrengthStars(booster.strength)}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {booster.strength}
                  </div>
                </div>
              </div>

              {getComparisonBadge(comparison)}
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-xs sm:text-sm text-green-800">
          💡 <strong>Pro tip:</strong> Focus on boosters marked "MORE
          RESPONSIVE" - these are your unique strengths!
        </p>
      </div>
    </div>
  );
}

export default BoosterCard;
