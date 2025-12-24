import React, { useState } from "react";
import { CONTEXT_TAG_OPTIONS } from "../utils/helpers";

const ContextTagsScreen = ({ onComplete, onSkip, initialTags = [] }) => {
  const [selectedTags, setSelectedTags] = useState(initialTags || []);

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="text-center mb-8 pt-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Any specific context?
        </h1>
        <p className="text-gray-600 text-lg px-4">
          Select any tags that apply to today. This helps explain your scores.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {CONTEXT_TAG_OPTIONS.map((option) => {
            const isSelected = selectedTags.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => toggleTag(option.id)}
                className={`
                  relative p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 text-left
                  ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50 shadow-md transform scale-[1.02]"
                      : "border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50"
                  }
                `}
              >
                <span className="text-2xl">{option.icon}</span>
                <span
                  className={`font-semibold ${
                    isSelected ? "text-indigo-700" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </span>

                {/* Checkmark indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 text-indigo-500">
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
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto pt-6 px-4 pb-6 max-w-md mx-auto w-full">
        <button
          onClick={() => onComplete(selectedTags)}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-transform transform active:scale-95 mb-3"
        >
          {selectedTags.length > 0 ? "Continue" : "Continue (No Tags)"}
        </button>

        <button
          onClick={onSkip}
          className="w-full bg-transparent text-gray-500 py-2 font-semibold hover:text-gray-700 transition-colors"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default ContextTagsScreen;
