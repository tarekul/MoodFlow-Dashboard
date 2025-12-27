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

export const MOOD_OPTIONS = [
  { value: 10, label: "Awesome" },
  { value: 8, label: "Good" },
  { value: 6, label: "Neutral" },
  { value: 4, label: "Bad" },
  { value: 2, label: "Terrible" },
];

export const PRODUCTIVITY_OPTIONS = [
  { value: 10, label: "Crushed it" },
  { value: 8, label: "Productive" },
  { value: 6, label: "Average" },
  { value: 4, label: "Struggled" },
  { value: 2, label: "Off Day" },
];

export const QUALITY_OPTIONS = [
  { value: "Poor" },
  { value: "Fair" },
  { value: "Good" },
  { value: "Excellent" },
];

export const STRESS_OPTIONS = [
  { value: 10, label: "Burned Out", color: "bg-red-500" },
  { value: 8, label: "Strained", color: "bg-orange-500" },
  { value: 5, label: "Moderate", color: "bg-yellow-500" },
  { value: 3, label: "Low", color: "bg-blue-400" },
  { value: 1, label: "Zen", color: "bg-cyan-400" },
];

export const PHYSICAL_ACTIVITY_OPTIONS = [
  { value: 100, label: "90+ mins" },
  { value: 75, label: "60-90 mins" },
  { value: 45, label: "30-60 mins" },
  { value: 22, label: "15-30 mins" },
  { value: 0, label: "None" },
];

export const ACTIVITY_TIME_OPTIONS = [
  { value: "Morning", label: "Morning" },
  { value: "Afternoon", label: "Afternoon" },
  { value: "Evening", label: "Evening" },
];

export const DIET_QUALITY_OPTIONS = [
  {
    value: "Good",
    label: "Good",
    desc: "Balanced, whole foods.",
    color: "bg-emerald-500",
  },
  {
    value: "Average",
    label: "Average",
    desc: "Standard mix, decent energy.",
    color: "bg-amber-500",
  },
  {
    value: "Poor",
    label: "Poor",
    desc: "Processed, sugar, or fast food.",
    color: "bg-rose-500",
  },
];

export const SOCIAL_INTERACTION_OPTIONS = [
  { value: 10, label: "Good" },
  { value: 8, label: "Average" },
  { value: 6, label: "Poor" },
];

export const getLocalDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isDaytime = () => {
  const hour = new Date().getHours(); // 0–23
  return hour >= 6 && hour < 18; // 6am–6pm = day
};

export const getScreenTimeUsageContext = (val) => {
  // 1. Minimal (<= 2 hours): Emerald
  // Matches illustration's #10B981
  if (val <= 2)
    return {
      color: "text-emerald-500",
      bg: "bg-emerald-500",
      border: "border-emerald-200",
      label: "Minimal",
    };

  // 2. Moderate (<= 5 hours): Blue
  // Matches illustration's #3B82F6
  if (val <= 5)
    return {
      color: "text-blue-500",
      bg: "bg-blue-500",
      border: "border-blue-200",
      label: "Moderate",
    };

  // 3. High (<= 8 hours): Orange
  // Matches illustration's #F97316
  if (val <= 8)
    return {
      color: "text-orange-500",
      bg: "bg-orange-500",
      border: "border-orange-200",
      label: "High",
    };

  // 4. Very High (> 8 hours): Red
  // Matches illustration's #EF4444
  return {
    color: "text-red-500",
    bg: "bg-red-500",
    border: "border-red-200",
    label: "Very High",
  };
};

export const getSocialInteractionContext = (val) => {
  if (val <= 2)
    return {
      color: "text-blue-500",
      bg: "bg-blue-500",
      border: "border-blue-200",
      label: "Quiet",
    };
  if (val <= 5)
    return {
      color: "text-indigo-500",
      bg: "bg-indigo-500",
      border: "border-indigo-200",
      label: "Balanced",
    };
  if (val <= 7)
    return {
      color: "text-purple-500",
      bg: "bg-purple-500",
      border: "border-purple-200",
      label: "Social",
    };
  return {
    color: "text-pink-500",
    bg: "bg-pink-500",
    border: "border-pink-200",
    label: "Butterfly",
  };
};

export const INSIGHT_STYLES = {
  forecast: {
    bg: "bg-white",
    border: "border-indigo-100 hover:border-indigo-300",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-700",
    boldText: "text-indigo-700",

    icon: "🔮",
    label: "Forecast",
  },
  optimization: {
    bg: "bg-white",
    border: "border-emerald-100 hover:border-emerald-300",

    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    boldText: "text-emerald-700",

    icon: "⚡",
    label: "Optimization",
  },
  impact: {
    bg: "bg-white",
    border: "border-amber-100 hover:border-amber-300",

    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    boldText: "text-amber-800",

    icon: "💡",
    label: "Impact",
  },
  root_cause: {
    bg: "bg-gradient-to-br from-gray-50 to-slate-100",
    border: "border-slate-200",
    icon: "🔗",
    iconBg: "bg-slate-800",
    iconColor: "text-white",
    label: "Root Cause",
    badgeBg: "bg-slate-200",
    badgeText: "text-slate-700",
    boldText: "text-slate-800",
  },
  default: {
    bg: "bg-white",
    border: "border-gray-200",

    iconBg: "bg-gray-50",
    iconColor: "text-gray-500",
    badgeBg: "bg-gray-100",
    badgeText: "text-gray-600",
    boldText: "text-gray-900",

    icon: "📝",
    label: "Insight",
  },
};

export const CONTEXT_TAG_OPTIONS = [
  { id: "wfh", label: "Work from Home" },
  { id: "office", label: "Office Day" },
  { id: "cafe", label: "Cafe" },
  { id: "deadline", label: "Deadline/Busy" },
  { id: "travel", label: "Traveling" },
  { id: "sick", label: "Sick" },
  { id: "social", label: "Social Event" },
  { id: "family", label: "Family Time" },
  { id: "vacation", label: "Vacation" },
  { id: "fasting", label: "Fasting" },
  { id: "burnout", label: "Burnout" },
  { id: "recovery", label: "Recovery Day" },
  { id: "deep_work", label: "Deep Work" },
  { id: "low_energy", label: "Low Energy" },
];
