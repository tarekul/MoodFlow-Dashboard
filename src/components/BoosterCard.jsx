import { getStrengthColor, getStrengthStars } from "../utils/helpers";

function BoosterCard({ boosters, comparisons = [] }) {
  const getComparisonBadge = (factor) => {
    const comparison = comparisons.find((c) => c.factor === factor);
    if (!comparison) return null;

    const threshold = 0.1;
    const diff = comparison.user_correlation - comparison.population_avg;

    if (diff > threshold) {
      return (
        <div className="mt-3 sm:mt-0 sm:ml-auto flex flex-col items-start sm:items-end">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
            📈 More Responsive
          </span>
          <span className="text-[10px] text-gray-500 mt-1">
            vs avg: {comparison.population_avg.toFixed(2)}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-green-50/50">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          🚀 Productivity Boosters
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Do <span className="font-bold text-green-700">MORE</span> of these to
          increase productivity:
        </p>
      </div>

      <div className="p-6 space-y-4">
        {boosters.map((booster, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 transition-colors shadow-sm group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-2xl border border-green-100">
                  😊
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {booster.factor}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className={`font-bold ${getStrengthColor(
                        booster.strength
                      )}`}
                    >
                      +{booster.correlation.toFixed(2)}
                    </span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-gray-500 text-xs uppercase font-semibold tracking-wide">
                      {booster.strength} {getStrengthStars(booster.strength)}
                    </span>
                  </div>
                </div>
              </div>

              {getComparisonBadge(booster.factor)}
            </div>
          </div>
        ))}

        <div className="bg-green-50 rounded-lg p-3 text-sm text-green-800 flex gap-2 items-start">
          <span>💡</span>
          <span>
            <strong>Pro tip:</strong> Focus on boosters marked "More Responsive"
            - these are your unique strengths!
          </span>
        </div>
      </div>
    </div>
  );
}

export default BoosterCard;
