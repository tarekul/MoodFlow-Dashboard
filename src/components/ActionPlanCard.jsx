import { getStrengthColor } from "../utils/helpers";

function ActionPlanCard({ action_plan }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          📅 YOUR ACTION PLAN
        </h2>
        <p className="text-gray-600 mb-6">
          Focus on these THREE things this week for maximum impact:
        </p>
        {action_plan.map((item) => (
          <div
            key={item.priority}
            className="mb-6 border-b border-gray-200 pb-6 last:border-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    PRIORITY {item.priority}: {item.factor}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-sm font-semibold ${getStrengthColor(
                        item.strength
                      )}`}
                    >
                      {item.strength}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">
                      Correlation: {item.correlation.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right sm:text-right">
                <div className="text-sm text-gray-600">Potential Impact</div>
                <div className="text-2xl font-bold text-indigo-600">
                  +{item.potential_impact.toFixed(1)} pts
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <div className="font-semibold text-gray-700 mb-2">
                📋 DAILY ACTIONS:
              </div>
              <ul className="space-y-2">
                {item.daily_actions.map((action, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-3">
              <span className="font-semibold text-blue-700">
                🎯 Success Metric:{" "}
              </span>
              <span className="text-blue-600">{item.success_metric}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActionPlanCard;
