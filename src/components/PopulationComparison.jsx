import React from "react";

function PopulationComparison({ comparisons }) {
  const getComparisonIcon = (comparison) => {
    if (comparison === "higher") return "📈";
    if (comparison === "lower") return "📉";
    return "➡️";
  };

  const getComparisonMessage = (factor, comparison, userCorr) => {
    const isBooster = userCorr > 0;

    if (comparison === "typical") {
      return `Your ${factor.toLowerCase()} response is about average.`;
    }

    if (comparison === "higher") {
      // More sensitive (higher absolute correlation)
      if (isBooster) {
        return `You benefit MORE from ${factor.toLowerCase()} than most users! 🌟`;
      } else {
        return `You're MORE sensitive to this drainer than most users. ⚠️`;
      }
    }

    if (comparison === "lower") {
      // Less sensitive (lower absolute correlation)
      if (isBooster) {
        return `This matters LESS for you than the average user.`;
      } else {
        return `Good news! You're LESS affected by this drainer than most. ✨`;
      }
    }
  };

  const getBadgeStyle = (comparison) => {
    if (comparison === "higher")
      return "bg-orange-100 text-orange-700 border-orange-300";
    if (comparison === "lower")
      return "bg-green-100 text-green-700 border-green-300";
    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  const getBadgeLabel = (comparison, isBooster) => {
    if (comparison === "higher") {
      return isBooster ? "MORE RESPONSIVE" : "MORE SENSITIVE";
    }
    if (comparison === "lower") {
      return isBooster ? "LESS RESPONSIVE" : "LESS SENSITIVE";
    }
    return "TYPICAL";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        📊 How You Compare to Others
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Based on analysis of {comparisons.length} factors across our user
        population
      </p>

      <div className="space-y-3">
        {comparisons.map((comp, idx) => {
          const icon = getComparisonIcon(comp.comparison);
          const isBooster = comp.user_correlation > 0;
          const message = getComparisonMessage(
            comp.factor,
            comp.comparison,
            comp.user_correlation
          );
          const badgeStyle = getBadgeStyle(comp.comparison);
          const badgeLabel = getBadgeLabel(comp.comparison, isBooster);

          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 
                         hover:shadow-md transition-shadow"
            >
              <div className="text-2xl">{icon}</div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800">
                    {comp.factor}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${badgeStyle}`}
                  >
                    {badgeLabel}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-2">{message}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>
                    Your correlation:{" "}
                    <strong>{comp.user_correlation.toFixed(2)}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Average: <strong>{comp.population_avg.toFixed(2)}</strong>
                  </span>
                  <span>•</span>
                  <span className="text-indigo-600">
                    Abs diff:{" "}
                    {Math.abs(
                      Math.abs(comp.user_correlation) -
                        Math.abs(comp.population_avg)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <p className="text-sm text-indigo-800">
          💡 <strong>Why this matters:</strong> Understanding your unique
          patterns helps you focus on what actually works FOR YOU, not generic
          advice that works "on average."
        </p>
      </div>
    </div>
  );
}

export default PopulationComparison;
