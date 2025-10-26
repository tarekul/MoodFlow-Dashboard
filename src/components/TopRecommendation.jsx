function TopRecommendation({ top_recommendation, summary }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">
          🎯 YOUR #1 PRODUCTIVITY DRIVER
        </h2>
        <div className="text-5xl mb-4">{top_recommendation.factor}</div>
        <p className="text-xl mb-4">
          Correlation:{" "}
          <span className="font-bold">
            {top_recommendation.correlation.toFixed(2)}
          </span>{" "}
          (EXTREMELY STRONG)
        </p>
        <div className="bg-white/20 rounded-lg p-4">
          <p className="text-lg">
            💡 <strong>Potential Impact:</strong> Improving your{" "}
            {top_recommendation.factor.toLowerCase()} by 2 points could boost
            productivity by{" "}
            <strong>
              +{top_recommendation.potential_gain.toFixed(1)} points
            </strong>
            (
            {(
              (top_recommendation.potential_gain / summary.avg_productivity) *
              100
            ).toFixed(0)}
            % improvement)
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopRecommendation;
