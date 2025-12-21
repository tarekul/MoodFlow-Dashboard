import {
  Apple,
  Dumbbell,
  HelpCircle,
  Leaf,
  Moon,
  Smartphone,
  Smile,
  Users,
} from "lucide-react";
import { getStrengthColor } from "../utils/helpers";

function ActionPlanCard({ action_plan }) {
  const iconMap = {
    Smile: Smile,
    Moon: Moon,
    Leaf: Leaf,
    Dumbbell: Dumbbell,
    Smartphone: Smartphone,
    Users: Users,
    Apple: Apple,
  };

  const colorMap = {
    Smile: "bg-amber-100 text-amber-600",
    Moon: "bg-indigo-100 text-indigo-600",
    Leaf: "bg-emerald-100 text-emerald-600",
    Dumbbell: "bg-rose-100 text-rose-600",
    Smartphone: "bg-blue-100 text-blue-600",
    Users: "bg-purple-100 text-purple-600",
    Apple: "bg-green-100 text-green-600",
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-white border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            YOUR ACTION PLAN
          </h2>
          <p className="text-gray-600 mt-2">
            Focus on these top priorities this week for maximum impact:
          </p>
        </div>

        {/* List of Action Items */}
        <div className="divide-y divide-gray-100">
          {action_plan.map((item) => {
            const IconComponent = iconMap[item.icon] || HelpCircle;

            const colors = colorMap[item.icon] || "bg-gray-100 text-gray-600";

            return (
              <div
                key={item.priority}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                {/* Top Row: Info & Impact Score */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                  <div className="flex gap-4">
                    <div
                      className={`p-3 rounded-xl h-fit flex-shrink-0 ${colors}`}
                    >
                      <IconComponent size={32} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Priority {item.priority}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 ${getStrengthColor(
                            item.strength
                          )}`}
                        >
                          {item.strength}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 leading-tight">
                        {item.factor}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Correlation: {item.correlation.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center sm:flex-col sm:items-end gap-2 bg-indigo-50 sm:bg-transparent p-3 sm:p-0 rounded-lg w-fit sm:w-auto">
                    <div className="text-sm font-medium text-indigo-800 sm:text-gray-500">
                      Potential Impact
                    </div>
                    <div className="text-2xl font-black text-indigo-600">
                      +{item.potential_impact.toFixed(1)}{" "}
                      <span className="text-base font-normal text-indigo-400">
                        pts
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    📋 Daily Actions
                  </div>
                  <ul className="space-y-3">
                    {item.daily_actions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <div className="mt-1 min-w-[1.25rem] h-5 w-5 rounded-full border-2 border-indigo-100 flex items-center justify-center bg-indigo-50 text-indigo-600">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 leading-relaxed">
                          {action}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-3 text-sm bg-blue-50 text-blue-800 px-4 py-3 rounded-lg border border-blue-100">
                  <span className="text-xl">🎯</span>
                  <div>
                    <span className="font-bold mr-1">Success Metric:</span>
                    {item.success_metric}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ActionPlanCard;
