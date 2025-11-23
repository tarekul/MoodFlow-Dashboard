import React, { useEffect, useRef, useState } from "react";

const StreakMilestone = ({ streak, onClose }) => {
  const [show, setShow] = useState(false);
  const hasShownStreak = useRef(false);

  const milestones = {
    7: {
      emoji: "🎉",
      title: "One Week Strong!",
      message: "You logged 7 days in a row!",
      color: "from-green-400 to-emerald-500",
    },
    14: {
      emoji: "🔥",
      title: "Two Weeks!",
      message: "14 days of consistency!",
      color: "from-orange-400 to-red-500",
    },
    30: {
      emoji: "🏆",
      title: "Month Milestone!",
      message: "30 days! You're unstoppable!",
      color: "from-yellow-400 to-orange-500",
    },
    60: {
      emoji: "💪",
      title: "Two Months!",
      message: "60 days of dedication!",
      color: "from-blue-400 to-indigo-500",
    },
    90: {
      emoji: "👑",
      title: "Quarter Year!",
      message: "90 days! You're a legend!",
      color: "from-purple-400 to-pink-500",
    },
    100: {
      emoji: "💯",
      title: "Century Club!",
      message: "100 days! Incredible!",
      color: "from-pink-400 to-rose-500",
    },
  };

  const milestone = milestones[streak];

  useEffect(() => {
    if (milestone && hasShownStreak.current === false) {
      hasShownStreak.current = true;
      setShow(true);
    }
  }, [streak, milestone]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!milestone || !show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-scale-in">
        {/* Confetti effect */}
        <div className="text-6xl mb-4 animate-bounce">{milestone.emoji}</div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {milestone.title}
        </h2>

        <p className="text-lg text-gray-600 mb-4">{milestone.message}</p>

        {/* Streak badge */}
        <div
          className={`inline-block bg-gradient-to-r ${milestone.color} text-white px-8 py-4 rounded-xl shadow-lg mb-6`}
        >
          <div className="text-4xl font-bold">{streak} 🔥</div>
          <div className="text-sm opacity-90">day streak</div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-indigo-800">
            🌟 Keep up the amazing work! Consistency is key to understanding
            your productivity patterns.
          </p>
        </div>

        <button
          onClick={() => {
            setShow(false);
            setTimeout(onClose, 300);
          }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StreakMilestone;
