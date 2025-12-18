import React, { useState } from "react";

const Notes = ({ onComplete, initialValue }) => {
  const [notes, setNotes] = useState(initialValue ?? "");
  const [isFocused, setIsFocused] = useState(false);

  const handleSave = () => {
    onComplete(notes.trim() === "" ? null : notes);
  };

  const handleSkip = () => {
    onComplete(null);
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-between animate-fade-in relative px-4 h-full">
      {/* 1. HEADER */}
      <div className="w-full max-w-lg text-center pt-2 sm:pt-6 shrink-0 z-10">
        <div className="flex justify-center mb-2 sm:mb-4">
          <div className="p-2 sm:p-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm">
            <NotebookIcon />
          </div>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif mb-1 text-gray-900 leading-tight">
          Daily Notes
        </h2>
        <p className="text-gray-500 text-xs sm:text-base max-w-xs mx-auto leading-tight">
          Capture thoughts, highlights, or memories.
        </p>
      </div>

      {/* 2. INPUT AREA */}
      <div className="flex-1 w-full max-w-lg min-h-0 py-3 sm:py-6 z-10 flex flex-col">
        <div
          className={`
            flex-1 flex flex-col bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border transition-all duration-300 overflow-hidden relative
            ${
              isFocused
                ? "border-indigo-400 ring-4 ring-indigo-100 shadow-md"
                : "border-white/50"
            }
          `}
        >
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Today was..."
            className="w-full h-full p-4 sm:p-6 bg-transparent border-none resize-none focus:ring-0 text-gray-700 text-base sm:text-lg leading-relaxed placeholder-gray-400"
            spellCheck="false"
          />

          <div className="px-4 py-2 sm:px-6 sm:py-3 bg-white/50 border-t border-indigo-50 flex justify-end">
            <span className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
              {notes.length} chars
            </span>
          </div>
        </div>
      </div>

      {/* 3. FOOTER ACTIONS */}
      <div className="w-full max-w-lg shrink-0 z-20 pb-4">
        <button
          onClick={handleSave}
          className="w-full py-3 sm:py-4 bg-indigo-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:translate-y-0 flex items-center justify-center gap-2 group"
        >
          <span>{notes.trim() ? "Save Entry" : "Complete Log"}</span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>

        <button
          onClick={handleSkip}
          className="w-full mt-2 sm:mt-4 py-2 text-gray-400 hover:text-gray-600 text-xs sm:text-sm font-medium transition-colors"
        >
          Skip adding notes
        </button>
      </div>
    </div>
  );
};

// SVG Icon - responsive size
const NotebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500"
  >
    <path
      d="M16 2H8C6.89543 2 6 2.89543 6 4V20C6 21.1046 6.89543 22 8 22H16C17.1046 22 18 21.1046 18 20V4C18 2.89543 17.1046 2 16 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 6H14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10H14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14H14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 6H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 10H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 14H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Notes;
