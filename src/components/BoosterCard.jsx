import { getStrengthColor, getStrengthStars } from "../utils/helpers";

function BoosterCard({ boosters }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        🚀 PRODUCTIVITY BOOSTERS
      </h2>
      <p className="text-gray-600 mb-4">
        Do MORE of these to increase productivity:
      </p>
      <div className="space-y-4">
        {boosters.map((booster, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
          >
            <div>
              <span className="text-2xl mr-3">😊</span>
              <span className="font-semibold text-gray-800">
                {booster.factor}
              </span>
            </div>
            <div className="text-right">
              <div
                className={`font-bold ${getStrengthColor(booster.strength)}`}
              >
                +{booster.correlation.toFixed(2)}{" "}
                {getStrengthStars(booster.strength)}
              </div>
              <div className="text-sm text-gray-600">{booster.strength}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoosterCard;
