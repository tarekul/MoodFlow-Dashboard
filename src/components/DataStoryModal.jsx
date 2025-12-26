import { X } from "lucide-react";
import React, { useState } from "react";

const DataStoryModal = ({ storyData, onClose }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  // --- UPDATE: Added mappings for 'teal', 'yellow', and 'slate' ---
  const getTheme = (theme) => {
    switch (theme) {
      case "purple":
        return "from-violet-600 to-fuchsia-600";
      case "red":
        return "from-orange-500 to-red-600";
      case "blue":
        return "from-blue-500 to-indigo-600";
      case "green":
        return "from-emerald-500 to-teal-600";
      case "indigo":
        return "from-indigo-600 to-purple-700";
      case "teal":
        return "from-teal-500 to-emerald-600"; // For Physical Activity
      case "yellow":
        return "from-yellow-400 to-orange-500"; // For Social (Positive)
      case "slate":
        return "from-slate-700 to-gray-900"; // For Social (Negative/Lone Wolf)
      case "orange":
        return "from-orange-400 to-amber-600";

      default:
        return "from-gray-700 to-gray-900";
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (slideIndex < storyData.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (slideIndex > 0) setSlideIndex(slideIndex - 1);
  };

  if (!storyData || storyData.length === 0) return null;

  const slide = storyData[slideIndex];

  return (
    <div className="fixed inset-0 z-[110] bg-black flex items-center justify-center">
      {/* Background with Animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getTheme(
          slide.theme
        )} transition-colors duration-700 ease-in-out`}
      />

      {/* Progress Bars */}
      <div className="absolute top-4 left-0 w-full px-4 flex gap-1.5 z-20">
        {storyData.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 rounded-full flex-1 transition-all duration-300 ${
              idx <= slideIndex ? "bg-white/90" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      <button
        onClick={onClose}
        className="absolute top-8 right-6 text-white/70 hover:text-white z-20 transition-colors"
      >
        <X size={32} />
      </button>

      {/* --- SLIDE CONTENT --- */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center h-full justify-center">
        {/* 1. Header & Icon */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full shadow-lg mb-6 text-5xl border border-white/20">
            {slide.emoji}
          </div>
          <div className="text-xs font-bold text-white/60 uppercase tracking-[0.2em] mb-2">
            {slide.title}
          </div>
          <h2 className="text-4xl font-black text-white leading-tight drop-shadow-md">
            {slide.headline}
          </h2>
        </div>

        {/* 2. The Insight Card (Glassmorphism) */}
        <div className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl mb-6 animate-fade-in-up delay-100">
          <div className="text-3xl font-bold text-white mb-4 border-b border-white/10 pb-4">
            {slide.data_highlight}
          </div>
          <p className="text-lg text-white/90 font-medium leading-relaxed">
            {/* Render Markdown-style bolding */}
            {slide.narrative.split("**").map((part, i) =>
              i % 2 === 1 ? (
                <span
                  key={i}
                  className="text-white font-black bg-white/20 px-1 rounded"
                >
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </p>
        </div>

        {/* 3. The Action Box */}
        <div className="w-full bg-white text-gray-900 rounded-2xl p-5 shadow-2xl animate-fade-in-up delay-200 transform translate-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
              Your Action Plan
            </span>
          </div>
          <p className="font-bold text-lg leading-snug">{slide.action}</p>
        </div>
      </div>

      {/* Navigation Zones */}
      <div
        className="absolute left-0 top-0 h-full w-1/4 z-0"
        onClick={handlePrev}
      />
      <div
        className="absolute right-0 top-0 h-full w-3/4 z-0"
        onClick={handleNext}
      />
    </div>
  );
};

export default DataStoryModal;
