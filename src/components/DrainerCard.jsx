import { getStrengthColor, getStrengthStars } from "../utils/helpers";

function DrainerCard({ drainers, comparisons = [] }) {
  const getComparison = (factor) => {
    return comparisons.find((c) => c.factor === factor);
  };

  const getComparisonBadge = (comparison) => {
    if (!comparison) return null;

    const threshold = 0.1;
    const diff = comparison.user_correlation - comparison.population_avg;

    let status = "typical";

    if (diff < -threshold) status = "more_sensitive";

    if (diff > threshold) status = "less_sensitive";

    if (status === "more_sensitive") {
      return (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-300 font-semibold">
            ⚠️ MORE SENSITIVE
          </span>
          <span className="text-red-700">
            You're MORE affected by this than most users! (avg:{" "}
            {comparison.population_avg.toFixed(2)})
          </span>
        </div>
      );
    }

    if (status === "less_sensitive") {
      return (
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-300">
            ✨ LESS SENSITIVE
          </span>
          <span className="text-green-700">
            Good news! You're LESS affected than average (avg:{" "}
            {comparison.population_avg.toFixed(2)})
          </span>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
        ⚠️ PRODUCTIVITY DRAINERS
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        AVOID or manage these factors:
      </p>
      <div className="space-y-4">
        {drainers.map((drainer, idx) => {
          const comparison = getComparison(drainer.factor);

          return (
            <div
              key={idx}
              className="p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">😰</span>
                  <span className="font-semibold text-sm sm:text-base text-gray-800">
                    {drainer.factor}
                  </span>
                </div>
                <div className="text-right">
                  <div
                    className={`font-bold text-sm sm:text-base ${getStrengthColor(
                      drainer.strength
                    )}`}
                  >
                    {drainer.correlation.toFixed(2)}{" "}
                    <span className="hidden sm:inline">
                      {getStrengthStars(drainer.strength)}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {drainer.strength}
                  </div>
                </div>
              </div>

              {getComparisonBadge(comparison)}
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-xs sm:text-sm text-red-800">
          💡 <strong>Priority:</strong> Focus on managing drainers marked "MORE
          SENSITIVE" - these hurt you more than average!
        </p>
      </div>
    </div>
  );
}

export default DrainerCard;
