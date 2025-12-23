import {
  Dumbbell,
  Flame,
  Gem,
  Medal,
  RotateCcw,
  Sprout,
  Star,
  Sun,
  Trophy,
  Zap,
} from "lucide-react";
import React, { useState } from "react";

const TrophyCase = ({ gamification }) => {
  const [flippedBadgeId, setFlippedBadgeId] = useState(null);

  if (
    !gamification ||
    !Array.isArray(gamification) ||
    gamification.length === 0
  ) {
    return null;
  }

  const badgeDescriptions = {
    perfect_day:
      "Days where you hit all your key habits (Sleep, Screens, etc.).",
    streak: "Consecutive days you have logged your data.",
    diamond: "High Productivity (>7) despite High Stress (>7). Resilience!",
    unplugged: "Days with less than 2 hours of screen time.",
    flow_state: "The ideal zone: High Productivity (>8) AND High Mood (>8).",
    iron_body: "Days with over 60 minutes of physical activity.",
    zen_master: "Days where you kept stress levels very low (≤3).",
    consistency: "Total number of logs you have ever created.",
  };

  const iconMap = {
    Medal: Medal,
    Flame: Flame,
    Zap: Zap,
    Gem: Gem,
    Sprout: Sprout,
    Trophy: Trophy,
    Sun: Sun,
    Dumbbell: Dumbbell,
  };

  const colorVariants = {
    indigo: {
      gradient: "from-indigo-500 to-purple-600",
      border: "border-indigo-100",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      icon: "text-indigo-600",
    },
    orange: {
      gradient: "from-orange-400 to-red-500",
      border: "border-orange-100",
      bg: "bg-orange-50",
      text: "text-orange-600",
      icon: "text-orange-500",
    },
    cyan: {
      gradient: "from-cyan-400 to-blue-500",
      border: "border-cyan-100",
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      icon: "text-cyan-500",
    },
    green: {
      gradient: "from-emerald-400 to-teal-500",
      border: "border-emerald-100",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      icon: "text-emerald-500",
    },
    yellow: {
      gradient: "from-yellow-400 to-amber-500",
      border: "border-yellow-100",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      icon: "text-yellow-600",
    },
    red: {
      gradient: "from-red-400 to-rose-500",
      border: "border-red-100",
      bg: "bg-red-50",
      text: "text-red-700",
      icon: "text-red-600",
    },
    teal: {
      gradient: "from-teal-400 to-emerald-500",
      border: "border-teal-100",
      bg: "bg-teal-50",
      text: "text-teal-700",
      icon: "text-teal-600",
    },
  };

  const handleBadgeClick = (id) => {
    setFlippedBadgeId(flippedBadgeId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Trophy className="text-yellow-600" size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Achievements</h2>
          <p className="text-gray-500 text-xs">Click badges to see details</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">
        {gamification.map((badge) => {
          const IconComponent = iconMap[badge.icon] || Star;
          const style = colorVariants[badge.color] || colorVariants["indigo"];
          const mainValue = badge.level || badge.count;
          const subText = badge.level
            ? `${badge.count} Logs Total`
            : badge.label;
          const topLabel = badge.level ? badge.label : "Total";
          const description =
            badgeDescriptions[badge.id] || "A consistency milestone.";
          const isFlipped = flippedBadgeId === badge.id;

          return (
            <div
              key={badge.id}
              className="group perspective-[1000px] cursor-pointer h-full"
              onClick={() => handleBadgeClick(badge.id)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${style.gradient} rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}
              ></div>
              <div
                className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 [backface-visibility:hidden] bg-white border ${style.border} rounded-xl p-4 flex flex-col items-center justify-center text-center h-full shadow-sm group-hover:shadow-md transition-shadow`}
                >
                  <div className={`mb-3 p-3 rounded-full ${style.bg}`}>
                    <IconComponent className={style.icon} size={28} />
                  </div>
                  <div className="text-2xl font-black text-gray-900 mb-1 leading-none">
                    {mainValue}
                  </div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {badge.id === "consistency" ? topLabel : badge.label}
                  </div>
                  <div
                    className={`mt-2 text-[10px] font-medium px-2 py-1 rounded-full ${style.bg} ${style.text}`}
                  >
                    {badge.id === "consistency" ? subText : "Earned"}
                  </div>

                  <RotateCcw
                    size={12}
                    className="absolute top-2 right-2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <div
                  className={`absolute inset-0 h-full w-full rounded-xl p-5 text-center flex flex-col items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden] border ${style.border} ${style.bg} shadow-sm`}
                >
                  <IconComponent
                    className={`${style.icon} mb-2 opacity-50`}
                    size={20}
                  />
                  <p className={`text-sm font-bold leading-snug ${style.text}`}>
                    {description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {gamification.length < 4 && (
          <div className="border-2 border-dashed border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center text-center h-full opacity-60">
            <div className="mb-2 p-3 bg-gray-50 rounded-full">
              <Star className="text-gray-300" size={24} />
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Next Badge
            </div>
            <div className="text-[10px] text-gray-400 mt-1">
              Keep logging...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrophyCase;
