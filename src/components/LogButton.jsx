import { ArrowRight, CheckCircle2, Plus } from "lucide-react";
import React from "react";

const LogButton = ({
  isFullyLogged,
  isPartiallyLogged,
  todayLog,
  navigate,
}) => {
  if (isFullyLogged) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-100 shadow-sm shadow-emerald-100/50 transition-all">
        <CheckCircle2 size={18} className="text-emerald-500" />
        <span className="text-sm font-bold tracking-tight">Day Complete</span>
      </div>
    );
  }

  if (isPartiallyLogged) {
    return (
      <button
        onClick={() => navigate(`/log-entry/${todayLog.id}`)}
        className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all whitespace-nowrap overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        <span>Continue Entry</span>
        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate("/log-entry")}
      className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all whitespace-nowrap"
    >
      <Plus size={18} />
      <span>Log Today</span>
    </button>
  );
};

export default LogButton;
