import { Flame, Gem, Leaf, Medal, Star, Trophy, Zap } from "lucide-react";
import React from "react";

const TrophyCase = ({ gamification }) => {
  if (
    !gamification ||
    !Array.isArray(gamification) ||
    gamification.length === 0
  ) {
    return null;
  }

  const iconMap = {
    Medal: Medal,
    Flame: Flame,
    Zap: Zap,
    Gem: Gem,
    Leaf: Leaf,
    Trophy: Trophy,
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
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Trophy className="text-yellow-600" size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Achievements</h2>
          <p className="text-gray-500 text-xs">Your consistency milestones</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Map over the dynamic badges list */}
        {gamification.map((badge) => {
          const IconComponent = iconMap[badge.icon] || Star;

          // Default to indigo if color is missing/invalid
          const style = colorVariants[badge.color] || colorVariants["indigo"];

          // Logic: Display 'level' (e.g. "Lvl 3") if it exists, otherwise the count
          const mainValue = badge.level || badge.count;

          // Logic: If showing Level, show count in subtitle. If showing Count, show specific label or subtitle
          const subText = badge.level
            ? `${badge.count} Logs Total`
            : badge.label;
          const topLabel = badge.level ? badge.label : "Total";

          return (
            <div key={badge.id} className="relative group cursor-default">
              {/* Hover Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${style.gradient} rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              ></div>

              <div
                className={`relative bg-white border ${style.border} rounded-xl p-4 flex flex-col items-center text-center h-full hover:shadow-md transition-shadow`}
              >
                <div className={`mb-3 p-3 rounded-full ${style.bg}`}>
                  <IconComponent className={style.icon} size={28} />
                </div>

                <div className="text-2xl font-black text-gray-900 mb-1">
                  {mainValue}
                </div>

                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {badge.id === "consistency" ? topLabel : badge.label}
                </div>

                {/* Optional Tag/Subtitle */}
                <div
                  className={`mt-2 text-[10px] font-medium px-2 py-1 rounded-full ${style.bg} ${style.text}`}
                >
                  {badge.id === "consistency" ? subText : "Earned"}
                </div>
              </div>
            </div>
          );
        })}

        {/* Placeholder for Next Badge (Visual filler if they have few badges) */}
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
