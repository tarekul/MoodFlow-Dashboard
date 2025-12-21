import { Medal, Star, Trophy, Zap } from "lucide-react";
import React from "react";

const TrophyCase = ({ gamification }) => {
  if (!gamification) return null;

  const { blueprint_badges, total_logs } = gamification;

  // Calculate generic "Level" based on total logs
  const level = Math.floor(total_logs / 5) + 1;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
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
        {/* BADGE 1: Blueprint Matches */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-white border border-indigo-100 rounded-xl p-4 flex flex-col items-center text-center h-full hover:shadow-md transition-shadow">
            <div className="mb-2 p-3 bg-indigo-50 rounded-full">
              <Medal className="text-indigo-600" size={28} />
            </div>
            <div className="text-2xl font-black text-gray-900 mb-1">
              {blueprint_badges}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Blueprint Days
            </div>
            <div className="mt-2 text-[10px] text-indigo-400 font-medium bg-indigo-50 px-2 py-1 rounded-full">
              Matches your DNA
            </div>
          </div>
        </div>

        {/* BADGE 2: Consistency Level */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-white border border-orange-100 rounded-xl p-4 flex flex-col items-center text-center h-full hover:shadow-md transition-shadow">
            <div className="mb-2 p-3 bg-orange-50 rounded-full">
              <Zap className="text-orange-500" size={28} />
            </div>
            <div className="text-2xl font-black text-gray-900 mb-1">
              Lvl {level}
            </div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Consistency
            </div>
            <div className="mt-2 text-[10px] text-orange-400 font-medium bg-orange-50 px-2 py-1 rounded-full">
              {total_logs} Logs Total
            </div>
          </div>
        </div>

        {/* BADGE 3: Placeholder (Coming Soon) */}
        <div className="border-2 border-dashed border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center text-center h-full opacity-60">
          <div className="mb-2 p-3 bg-gray-50 rounded-full">
            <Star className="text-gray-300" size={24} />
          </div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Next Badge
          </div>
          <div className="text-[10px] text-gray-400 mt-1">Coming soon...</div>
        </div>
      </div>
    </div>
  );
};

export default TrophyCase;
