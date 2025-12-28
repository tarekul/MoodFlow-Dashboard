import { Activity, Brain, LogOut, TrendingUp, Zap } from "lucide-react";
import React from "react";

const StartHere = ({ navigate, logout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold w-fit mb-6">
              <Zap size={14} className="fill-indigo-700" />
              <span>AI-Powered Insights</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Turn your days into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                data.
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Stop guessing why you feel tired or unproductive. Correlate finds
              the hidden links between your <strong>Sleep</strong>,{" "}
              <strong>Mood</strong>, and <strong>Stress</strong>.
            </p>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm text-xl">
                  🏆
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    The 7-Day Challenge
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Log for one week to unlock your{" "}
                    <strong>"Perfect Day DNA"</strong> and personalized
                    correlations.
                  </p>

                  <div className="w-full h-1.5 bg-gray-200 rounded-full mt-3 overflow-hidden">
                    <div className="w-[5%] h-full bg-indigo-500 rounded-full" />
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1 text-right">
                    0/7 Days
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/log-entry")}
                className="flex-1 px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Start My First Log</span>
              </button>

              <button
                onClick={logout}
                className="px-6 py-4 text-gray-500 font-semibold hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-8 sm:p-12 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center gap-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
              What you'll discover
            </h3>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-4 transition-transform hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <TrendingUp size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Hidden Correlations</h4>
                <p className="text-sm text-gray-500 mt-1">
                  "You are 25% more productive when you sleep {">"} 7 hours."
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-4 transition-transform hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <Brain size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Root Cause Analysis</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Discover if yesterday's stress is causing today's fatigue.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-4 transition-transform hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <Activity size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Your Action Plan</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Get daily, science-backed tasks to optimize your mood.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartHere;
