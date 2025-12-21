import {
  CheckCircle,
  Dumbbell,
  Moon,
  Smartphone,
  Trophy,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const BlueprintSuccess = ({ matches, navigate }) => {
  const [visibleItems, setVisibleItems] = useState([]);

  // Staggered animation effect
  useEffect(() => {
    matches.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, index * 400 + 500); // Start after 500ms, then every 400ms
    });
  }, [matches]);

  const iconMap = {
    Moon: Moon,
    Dumbbell: Dumbbell,
    Smartphone: Smartphone,
    Users: Users,
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 animate-fade-in relative">
      {/* Celebration Header */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="bg-white p-4 rounded-full shadow-xl mb-4 relative z-10 inline-block">
          <Trophy size={48} className="text-yellow-500 animate-bounce" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">
          Blueprint Matched!
        </h1>
        <p className="text-gray-600">
          You hit{" "}
          <span className="font-bold text-indigo-600">
            {matches.length} DNA targets
          </span>{" "}
          today.
          <br />
          You're setting yourself up for success.
        </p>
      </div>

      {/* The Checklist Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-indigo-50 w-full max-w-sm overflow-hidden">
        {matches.map((match, index) => {
          const Icon = iconMap[match.icon];
          const isVisible = visibleItems.includes(index);

          return (
            <div
              key={match.id}
              className={`
                flex items-center justify-between p-4 border-b border-gray-50 last:border-0 transition-all duration-500
                ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Icon size={20} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-800 text-sm">
                    {match.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    Hit: {match.value}
                  </div>
                </div>
              </div>
              <div className="text-green-500">
                <CheckCircle
                  size={24}
                  fill="#dcfce7"
                  className="text-green-600"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all active:scale-95"
      >
        See Dashboard
      </button>
    </div>
  );
};

export default BlueprintSuccess;
