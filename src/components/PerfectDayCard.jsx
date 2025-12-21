import {
  Dumbbell,
  Moon,
  Smartphone,
  Tag,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import React, { useState } from "react";

const PerfectDayCard = ({ blueprint }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!blueprint) return null;

  return (
    <div className="relative mb-8 rounded-2xl shadow-lg text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative p-6 z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <span className="text-2xl">🧬</span>
            </div>
            <div>
              <h2 className="text-lg font-bold">Your Perfect Day DNA</h2>
              <p className="text-indigo-100 text-xs">
                Based on your top best days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-red-500/20 px-3 py-1.5 rounded-full backdrop-blur-md border border-red-200/20">
              <Zap size={13} className="text-red-200" />
              <span className="font-bold text-xs uppercase text-red-100 tracking-wide">
                Max Stress: {blueprint.stress_limit}
              </span>
            </div>

            <div
              className="relative ml-2 cursor-help"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
            >
              <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1.5 rounded-full backdrop-blur-md border border-emerald-200/20 transition-colors hover:bg-emerald-500/30">
                <Trophy size={13} className="text-emerald-200" />
                <span className="font-bold text-xs uppercase text-emerald-100 tracking-wide">
                  Target: {blueprint.avg_score}/10
                </span>
              </div>

              {showTooltip && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-3 bg-gray-900/95 text-white text-[11px] leading-tight rounded-xl shadow-xl border border-white/10 z-50 text-center animate-in fade-in zoom-in duration-200">
                  This is the average productivity score you achieved on your
                  best days.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900/95"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* 1. Sleep */}
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-1 text-indigo-100">
              <Moon size={14} />{" "}
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Sleep
              </span>
            </div>
            <div className="text-2xl font-bold">{blueprint.sleep}h</div>
          </div>

          {/* 2. Activity */}
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-1 text-indigo-100">
              <Dumbbell size={14} />{" "}
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Activity
              </span>
            </div>
            <div className="text-xl font-bold truncate">
              {blueprint.workout_time || "Any time"}
            </div>
            <div className="text-xs opacity-75">{blueprint.activity} mins</div>
          </div>

          {/* 3. Screen Limit */}
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-1 text-indigo-100">
              <Smartphone size={14} />{" "}
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Screen Limit
              </span>
            </div>
            <div className="text-2xl font-bold text-amber-300">
              &lt; {blueprint.screen_limit}h
            </div>
          </div>

          {/* 4. Social */}
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-1 text-indigo-100">
              <Users size={14} />{" "}
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Social
              </span>
            </div>
            <div className="text-2xl font-bold">{blueprint.social_hours}h</div>
          </div>

          {/* 5. Best Tags */}
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10 col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-1 text-indigo-100">
              <Tag size={14} />{" "}
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Tag
              </span>
            </div>
            <div className="text-lg font-bold capitalize leading-tight mt-1 truncate">
              {blueprint.best_context}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfectDayCard;
