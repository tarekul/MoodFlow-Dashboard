function TopRecommendation({ top_recommendation, summary }) {
  const potentialGain = top_recommendation.potential_gain || 0;
  const currentAvg = summary.avg_productivity || 1;
  const percentageGain = ((potentialGain / currentAvg) * 100).toFixed(0);

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-lg text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start justify-between">
          <div className="space-y-2 relative z-10">
            <h2 className="text-xs font-bold tracking-widest text-indigo-200 uppercase mb-1">
              🎯 Your #1 Productivity Driver
            </h2>
            <div className="text-4xl sm:text-5xl font-black tracking-tight">
              {top_recommendation.factor}
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              <span className="font-semibold">
                Correlation: {top_recommendation.correlation.toFixed(2)}
              </span>
              <span className="opacity-75 text-xs uppercase">
                • Extremely Strong
              </span>
            </div>
          </div>

          <div className="w-full sm:w-auto mt-4 sm:mt-0 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-5 max-w-md">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-indigo-100 text-sm mb-2 leading-relaxed">
                  Improving your{" "}
                  <strong>{top_recommendation.factor.toLowerCase()}</strong> by
                  2 points could boost productivity by:
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">
                    +{potentialGain.toFixed(1)} pts
                  </span>
                  <span className="text-sm font-medium text-emerald-300">
                    ({percentageGain}% improvement)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopRecommendation;
