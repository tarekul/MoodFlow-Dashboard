import React, { useEffect, useState } from "react";
import NotebookIcon from "./NotebookIcon";

const Notes = ({ onComplete, initialValue, isEmbedded = false }) => {
  const [notes, setNotes] = useState(initialValue ?? "");

  useEffect(() => {
    if (isEmbedded && onComplete) {
      onComplete(notes.trim() === "" ? null : notes);
    }
  }, [notes, isEmbedded]);

  const handleStandaloneSave = () => {
    onComplete(notes.trim() === "" ? null : notes);
  };

  const TextAreaComponent = () => (
    <div className="w-full h-full relative group">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Today was..."
        className={`
          w-full p-4 bg-transparent border-none resize-none focus:ring-0 text-gray-700 
          placeholder-gray-400 leading-relaxed
          ${
            isEmbedded ? "min-h-[160px] text-sm sm:text-base" : "h-full text-lg"
          }
        `}
        spellCheck="false"
      />
      <div className="absolute bottom-2 right-4 pointer-events-none">
        <span className="text-[10px] font-medium text-gray-300 group-hover:text-indigo-300 transition-colors">
          {notes.length} chars
        </span>
      </div>
    </div>
  );

  if (isEmbedded) {
    return <TextAreaComponent />;
  }
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-between animate-fade-in relative px-4 h-full">
      <div className="w-full max-w-lg text-center pt-2 sm:pt-6 shrink-0 z-10">
        <div className="flex justify-center mb-2 sm:mb-4">
          <div className="p-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm">
            <NotebookIcon />
          </div>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif mb-1 text-gray-900">
          Daily Notes
        </h2>
      </div>

      <div className="flex-1 w-full max-w-lg py-6 z-10">
        <div className="flex-1 h-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 overflow-hidden">
          <TextAreaComponent />
        </div>
      </div>

      <div className="w-full max-w-lg shrink-0 z-20 pb-4">
        <button
          onClick={handleStandaloneSave}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-indigo-700"
        >
          {notes.trim() ? "Save Entry" : "Complete Log"}
        </button>
      </div>
    </div>
  );
};

export default Notes;
