import React, { useMemo, useState } from "react";

// Helper to find correlation or return 0 if not found
const getCorrelation = (correlations, factor) => {
  const corr = correlations.find((c) => c.factor === factor);
  return corr ? corr.correlation : 0;
};

// Helper to format the impact number for display
const formatImpact = (impact) => {
  if (impact > 0.01) return `+${impact.toFixed(1)}`;
  if (impact < -0.01) return `${impact.toFixed(1)}`;
  return `0.0`;
};

function ProductivityPredictor({ userData }) {
  const { summary, correlations } = userData;
  console.log(summary);

  // Set initial state of sliders to user's average
  const [todayMood, setTodayMood] = useState(summary.avg_mood);
  const [todayStress, setTodayStress] = useState(summary.avg_stress);
  const [todaySleep, setTodaySleep] = useState(summary.avg_sleep);

  // State to hold the final prediction and its parts
  const [prediction, setPrediction] = useState(null);
  const [breakdown, setBreakdown] = useState(null);

  // Memoize correlation values for performance
  const userCorrelations = useMemo(
    () => ({
      mood: getCorrelation(correlations, "Mood"),
      stress: getCorrelation(correlations, "Stress"),
      sleep: getCorrelation(correlations, "Sleep Duration"),
      // You can add more here later, like 'Physical Activity'
    }),
    [correlations]
  );

  const calculatePrediction = () => {
    const baseline = summary.avg_productivity;

    // Calculate individual impacts
    const moodImpact = (todayMood - summary.avg_mood) * userCorrelations.mood;
    const stressImpact =
      (todayStress - summary.avg_stress) * userCorrelations.stress;
    const sleepImpact =
      (todaySleep - summary.avg_sleep) * userCorrelations.sleep;

    // Sum impacts and clamp to a 1-10 scale
    const rawPrediction = baseline + moodImpact + stressImpact + sleepImpact;
    const finalPrediction = Math.max(1, Math.min(10, rawPrediction));

    setPrediction(finalPrediction.toFixed(1));
    setBreakdown({
      baseline: baseline.toFixed(1),
      mood: formatImpact(moodImpact),
      stress: formatImpact(stressImpact),
      sleep: formatImpact(sleepImpact),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculatePrediction();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* --- INPUT FORM --- */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Productivity Forecast
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your metrics for today to predict your productivity score.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Slider */}
          <div>
            <label
              htmlFor="mood"
              className="flex justify-between text-sm font-medium text-gray-700"
            >
              <span>😊 Today's Mood</span>
              <span className="font-bold text-indigo-600">
                {todayMood.toFixed(1)}
              </span>
            </label>
            <input
              type="range"
              id="mood"
              min="1"
              max="10"
              step="0.5"
              value={todayMood}
              onChange={(e) => setTodayMood(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Stress Slider */}
          <div>
            <label
              htmlFor="stress"
              className="flex justify-between text-sm font-medium text-gray-700"
            >
              <span>😰 Today's Stress</span>
              <span className="font-bold text-indigo-600">
                {todayStress.toFixed(1)}
              </span>
            </label>
            <input
              type="range"
              id="stress"
              min="1"
              max="10"
              step="0.5"
              value={todayStress}
              onChange={(e) => setTodayStress(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>

          {/* Sleep Input */}
          <div>
            <label
              htmlFor="sleep"
              className="flex justify-between text-sm font-medium text-gray-700"
            >
              <span>😴 Last Night's Sleep (hours)</span>
              <span className="font-bold text-indigo-600">
                {todaySleep.toFixed(1)}
              </span>
            </label>
            <input
              type="range"
              id="sleep"
              min="4"
              max="12"
              step="0.25"
              value={todaySleep}
              onChange={(e) => setTodaySleep(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            🔮 Calculate Forecast
          </button>
        </form>
      </div>

      {/* --- OUTPUT DISPLAY --- */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white flex flex-col items-center justify-center">
        {prediction ? (
          <>
            <span className="text-lg font-medium text-indigo-200">
              Predicted Productivity
            </span>
            <h3 className="text-7xl font-bold my-2">
              {prediction}
              <span className="text-5xl text-indigo-200">/10</span>
            </h3>

            <p className="text-indigo-100 text-center mb-6">
              {prediction > 8
                ? "You're set up for a fantastic day!"
                : prediction > 6
                ? "Looks like a solid day ahead."
                : "Focus on your key factors to boost your day."}
            </p>

            <div className="w-full bg-black bg-opacity-20 rounded-lg p-4 space-y-2">
              <h4 className="text-sm font-semibold text-indigo-200 uppercase tracking-wider mb-2">
                Contribution Breakdown
              </h4>
              <div className="flex justify-between text-lg">
                <span>Baseline Average</span>
                <span className="font-mono">{breakdown.baseline}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>😊 Mood Impact</span>
                <span className="font-mono">{breakdown.mood}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>😰 Stress Impact</span>
                <span className="font-mono">{breakdown.stress}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>😴 Sleep Impact</span>
                <span className="font-mono">{breakdown.sleep}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to plan your day?</h3>
            <p className="text-lg text-indigo-200">
              Fill out your metrics on the left to see your personalized
              productivity forecast.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductivityPredictor;
