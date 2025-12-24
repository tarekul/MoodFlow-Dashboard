import React, { useState } from "react";
import { CONTEXT_TAG_OPTIONS } from "../utils/helpers";

const ContextTagsScreen = ({
  onComplete,
  onSkip,
  initialTags = [],
  isEmbedded = false,
}) => {
  const [selectedTags, setSelectedTags] = useState(initialTags || []);

  const toggleTag = (tagId) => {
    let newTags;
    if (selectedTags.includes(tagId)) {
      newTags = selectedTags.filter((id) => id !== tagId);
    } else {
      newTags = [...selectedTags, tagId];
    }
    setSelectedTags(newTags);

    if (isEmbedded && onComplete) {
      onComplete(newTags);
    }
  };

  const renderGrid = () => (
    <div
      className={`grid grid-cols-2 gap-2 sm:gap-3 ${
        !isEmbedded ? "max-w-md mx-auto" : ""
      }`}
    >
      {CONTEXT_TAG_OPTIONS.map((option) => {
        const isSelected = selectedTags.includes(option.id);
        return (
          <button
            key={option.id}
            onClick={() => toggleTag(option.id)}
            className={`
              relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 sm:gap-3 text-left
              ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50 shadow-sm"
                  : "border-transparent bg-gray-50/50 hover:bg-gray-100" // Cleaner look for embedded
              }
            `}
          >
            <span className="text-xl sm:text-2xl">{option.icon}</span>
            <span
              className={`text-xs sm:text-sm font-semibold leading-tight ${
                isSelected ? "text-indigo-700" : "text-gray-600"
              }`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );

  if (isEmbedded) {
    return <div className="w-full">{renderGrid()}</div>;
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="text-center mb-8 pt-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Any specific context?
        </h1>
        <p className="text-gray-600 text-lg px-4">
          Select tags that apply to today.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">{renderGrid()}</div>

      <div className="mt-auto pt-6 px-4 pb-6 max-w-md mx-auto w-full">
        <button
          onClick={() => onComplete(selectedTags)}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-transform transform active:scale-95 mb-3"
        >
          Continue
        </button>
        <button
          onClick={onSkip}
          className="w-full text-gray-500 py-2 font-semibold"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default ContextTagsScreen;
