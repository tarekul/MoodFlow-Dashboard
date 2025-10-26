import { getStrengthColor, getStrengthStars } from "../utils/helpers";

function DrainerCard({ drainers }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        ⚠️ PRODUCTIVITY DRAINERS
      </h2>
      <p className="text-gray-600 mb-4">AVOID or manage these factors:</p>
      <div className="space-y-4">
        {drainers.map((drainer, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <div>
              <span className="text-2xl mr-3">😰</span>
              <span className="font-semibold text-gray-800">
                {drainer.factor}
              </span>
            </div>
            <div className="text-right">
              <div
                className={`font-bold ${getStrengthColor(drainer.strength)}`}
              >
                {drainer.correlation.toFixed(2)}{" "}
                {getStrengthStars(drainer.strength)}
              </div>
              <div className="text-sm text-gray-600">{drainer.strength}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DrainerCard;
