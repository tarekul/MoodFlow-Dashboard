import React from "react";
import ContextTagsScreen from "./ContextTagsScreen";
import Notes from "./Notes";

const FinalDetailsScreen = ({ tags, notes, onUpdate, onSubmit }) => {
  return (
    <div className="w-full h-full flex flex-col items-center animate-fade-in bg-gray-50/50">
      <div className="shrink-0 pt-6 pb-4 text-center z-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Final Details
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Add context to your day.
        </p>
      </div>

      <div className="flex-1 w-full max-w-md overflow-y-auto scrollbar-hide px-4 pb-24">
        <div className="mb-6">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
            What happened today?
          </h3>
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 shadow-sm border border-gray-100">
            <ContextTagsScreen
              initialTags={tags}
              onComplete={(val) => onUpdate({ tags: val })}
              isEmbedded={true}
            />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
            Any thoughts?
          </h3>
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[160px]">
            <Notes
              initialValue={notes}
              onComplete={(val) => onUpdate({ notes: val })}
              isEmbedded={true}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/90 to-transparent z-20 flex justify-center pb-[env(safe-area-inset-bottom)]">
        <button
          onClick={() => onSubmit({ tags, notes })}
          className="w-full max-w-md py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:translate-y-0 flex items-center justify-center gap-2"
        >
          <span>Complete Log</span>
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FinalDetailsScreen;
