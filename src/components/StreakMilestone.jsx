import React, { useEffect, useRef, useState } from "react";

const StreakMilestone = ({ streak, onClose }) => {
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);
  const hasShownStreak = useRef(false);

  const milestones = {
    7: {
      emoji: "🎉",
      title: "One Week Strong!",
      message: "You've logged 7 days in a row.",
      color: "from-green-400 to-emerald-600",
      bgInfo: "bg-green-50 text-green-800 border-green-200",
      buttonShadow: "shadow-green-200",
    },
    14: {
      emoji: "🔥",
      title: "Two Weeks!",
      message: "14 days of pure consistency!",
      color: "from-orange-400 to-red-600",
      bgInfo: "bg-orange-50 text-orange-800 border-orange-200",
      buttonShadow: "shadow-orange-200",
    },
    30: {
      emoji: "🏆",
      title: "Month Milestone!",
      message: "30 days! You are unstoppable.",
      color: "from-yellow-400 to-amber-600",
      bgInfo: "bg-yellow-50 text-yellow-800 border-yellow-200",
      buttonShadow: "shadow-yellow-200",
    },
    60: {
      emoji: "💪",
      title: "Two Months!",
      message: "60 days of dedication!",
      color: "from-blue-400 to-indigo-600",
      bgInfo: "bg-blue-50 text-blue-800 border-blue-200",
      buttonShadow: "shadow-blue-200",
    },
    90: {
      emoji: "👑",
      title: "Quarter Year!",
      message: "90 days! You're a legend.",
      color: "from-purple-400 to-pink-600",
      bgInfo: "bg-purple-50 text-purple-800 border-purple-200",
      buttonShadow: "shadow-purple-200",
    },
    100: {
      emoji: "💯",
      title: "Century Club!",
      message: "100 days! Absolutely incredible.",
      color: "from-pink-400 to-rose-600",
      bgInfo: "bg-pink-50 text-pink-800 border-pink-200",
      buttonShadow: "shadow-pink-200",
    },
  };

  const milestone = milestones[streak];

  useEffect(() => {
    if (!milestone) return;

    const storageKey = `moodflow_milestone_seen_${streak}`;
    const hasSeen = localStorage.getItem(storageKey);

    if (!hasSeen && hasShownStreak.current === false) {
      hasShownStreak.current = true;
      setRender(true);

      localStorage.setItem(storageKey, "true");

      setTimeout(() => setShow(true), 10);
    }
  }, [streak, milestone]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setRender(false);
      onClose();
    }, 300);
  };

  if (!milestone || !render) return null;

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center p-4 transition-all duration-300 ${
        show
          ? "bg-black/60 backdrop-blur-sm opacity-100"
          : "bg-black/0 opacity-0"
      }`}
    >
      <div
        className={`relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${
          show ? "scale-100 translate-y-0" : "scale-90 translate-y-8"
        }`}
      >
        <div
          className={`absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br ${milestone.color} opacity-20 blur-3xl`}
        />
        <div
          className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br ${milestone.color} opacity-20 blur-3xl`}
        />

        <div className="relative p-8 text-center flex flex-col items-center">
          <div className="text-7xl mb-6 animate-bounce drop-shadow-md">
            {milestone.emoji}
          </div>

          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">
            {milestone.title}
          </h2>

          <p className="text-gray-500 font-medium mb-8 leading-relaxed">
            {milestone.message}
          </p>

          <div className="relative mb-8">
            <div
              className={`text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b ${milestone.color} drop-shadow-sm`}
            >
              {streak}
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">
              Day Streak
            </div>
          </div>

          <div
            className={`w-full rounded-2xl p-4 mb-6 border ${milestone.bgInfo}`}
          >
            <p className="text-sm font-semibold">
              ✨ Consistency unlocked! You're building a powerful habit.
            </p>
          </div>

          <button
            onClick={handleClose}
            className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all bg-gradient-to-r ${milestone.color} ${milestone.buttonShadow}`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreakMilestone;
