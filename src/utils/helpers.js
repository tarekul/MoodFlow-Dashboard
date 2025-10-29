/**
 * Helper function to determine the description based on the value and type of metric.
 * @param {string} type - The metric type (e.g., "productivity", "mood", "sleep", "stress")
 * @param {number} value - The numerical value of the metric
 * @returns {string} - The descriptive string
 */
export const getSummaryDescription = (type, value) => {
  switch (type) {
    case "productivity":
    case "mood":
      // For metrics where higher is better (scale 1-10)
      if (value >= 7.5) return "Solid performance";
      if (value >= 5) return "Good range";
      return "Room to improve";

    case "sleep":
      // For sleep, a specific range is best
      if (value >= 7 && value <= 8.5) return "Solid performance";
      if (value >= 6 && value <= 9.5) return "Good range";
      return "Room to improve"; // < 6 or > 9.5 hours

    case "stress":
      // For stress, lower is better (scale 1-10)
      if (value < 3.5) return "Solid performance";
      if (value < 5.5) return "Good range";
      return "Room to improve"; // >= 5.5

    default:
      // A safe fallback
      return "Good range";
  }
};

export const getStrengthColor = (strength) => {
  if (strength === "STRONG") return "text-red-600";
  if (strength === "MODERATE") return "text-yellow-600";
  return "text-gray-500";
};

export const getStrengthStars = (strength) => {
  if (strength === "STRONG") return "⭐⭐⭐";
  if (strength === "MODERATE") return "⭐⭐";
  return "⭐";
};

// Helper to find correlation or return 0 if not found
export const getCorrelation = (correlations, factor) => {
  const corr = correlations.find((c) => c.factor === factor);
  return corr ? corr.correlation : 0;
};

// Helper to format the impact number for display
export const formatImpact = (impact) => {
  if (impact > 0.01) return `+${impact.toFixed(1)}`;
  if (impact < -0.01) return `${impact.toFixed(1)}`;
  return `0.0`;
};
