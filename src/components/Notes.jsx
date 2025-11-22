import React, { useState } from "react";

const Notes = ({ onComplete }) => {
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    onComplete(notes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-between p-8">
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-serif mb-2 text-gray-900 text-center">
          Notes
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Add any additional notes about your day
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How was your day? What stood out to you?"
            className="w-full h-64 p-4 border border-gray-200 rounded-xl resize-none"
          />

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              disabled={!notes.trim()}
              className="px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
