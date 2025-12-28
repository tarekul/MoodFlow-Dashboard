import { Clock, Lock } from "lucide-react";
import React from "react";

const FeatureGuard = ({ children, daysLogged, requiredDays, title }) => {
  // STATE 1: UNLOCKED
  if (daysLogged >= requiredDays) {
    return <div className="animate-fade-in">{children}</div>;
  }

  // STATE 2: BLURRED PREVIEW (The "Next Step" - within 1 day of unlocking)
  const isNextUnlock = daysLogged === requiredDays - 1;

  if (isNextUnlock) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
        <div className="filter blur-md opacity-50 select-none pointer-events-none transform scale-[1.02]">
          {children || <div className="h-64 bg-gray-100 w-full" />}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/30">
          <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/50 text-center max-w-xs transform transition-transform group-hover:scale-105">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock size={24} className="animate-pulse" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg">
              Unlocks Tomorrow!
            </h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Log one more day to reveal your {title}.
            </p>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[90%]" />
            </div>
            <div className="text-[10px] text-gray-400 mt-1 text-right">
              {daysLogged}/{requiredDays} Days
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STATE 3: STANDARD LOCKED (Future Goals)
  return (
    <div className="h-full min-h-[200px] bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center opacity-60">
      <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-3">
        <Lock size={20} />
      </div>
      <h3 className="font-bold text-gray-400">Locked: {title}</h3>
      <p className="text-xs text-gray-400 mt-1">
        Requires {requiredDays} days of data
      </p>
      <div className="mt-3 text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500">
        {requiredDays - daysLogged} days left
      </div>
    </div>
  );
};

export default FeatureGuard;
