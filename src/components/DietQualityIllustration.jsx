import React from "react";

const DietQualityIllustration = () => {
  return (
    <div className="my-12 flex items-center justify-center">
      {/* Main Container with subtle gradient background */}
      <div className="w-64 h-64 relative bg-gradient-to-tr from-orange-50 via-stone-50 to-green-50 rounded-2xl overflow-hidden shadow-sm">
        {/* --- THE SPECTRUM PATH (Curved Line) --- */}
        {/* Created using a large border radius to form an arc */}
        <div className="absolute bottom-12 left-0 w-full h-32 overflow-hidden opacity-30">
          <div className="w-[120%] h-full border-t-4 border-dashed border-indigo-300 rounded-t-full absolute top-8 -left-[10%] rotate-6"></div>
        </div>

        {/* --- THE "BAD" QUALITY SIDE (Left - Processed/Dull) --- */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
          {/* Burger/Fast Food Icon representing processed food */}
          <div className="relative transform -rotate-12 scale-90 origin-bottom-right hover:scale-95 transition-transform">
            {/* Top Bun */}
            <div className="w-14 h-7 bg-amber-700/80 rounded-t-full relative">
              {/* Sesame seeds (dots) */}
              <div className="absolute top-2 left-3 w-1 h-1 bg-amber-200 rounded-full opacity-50"></div>
              <div className="absolute top-3 left-8 w-1 h-1 bg-amber-200 rounded-full opacity-50"></div>
              <div className="absolute top-4 left-5 w-1 h-1 bg-amber-200 rounded-full opacity-50"></div>
            </div>
            {/* Patty/Cheese layers */}
            <div className="w-16 h-3 bg-red-800/80 rounded-md -mx-1 my-1"></div>
            <div className="w-16 h-2 bg-yellow-600/80 rounded-md -mx-1 mb-1"></div>
            {/* Bottom Bun */}
            <div className="w-14 h-5 bg-amber-700/80 rounded-b-xl"></div>

            {/* Sluggish aura effect */}
            <div className="absolute -inset-4 bg-amber-900/20 blur-md rounded-full -z-10"></div>
          </div>
        </div>

        {/* --- THE "GOOD" QUALITY SIDE (Right - Fresh/Vibrant) --- */}
        <div className="absolute right-6 top-1/2 -translate-y-[60%] z-10">
          {/* Pear & Leaf Icon representing fresh produce */}
          <div className="relative transform rotate-12 scale-110 origin-bottom-left hover:scale-125 transition-transform">
            {/* Leaf */}
            <div className="absolute -top-4 right-1/2 w-6 h-6 bg-green-500 rounded-tr-3xl rounded-bl-xl"></div>
            {/* Stem */}
            <div className="absolute -top-2 right-1/2 translate-x-2 w-1 h-3 bg-green-700 rounded-full"></div>
            {/* Pear Body (stacked shapes for organic look) */}
            <div className="relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 bg-green-300 rounded-t-3xl"></div>
              <div className="absolute top-6 -left-1 w-12 h-12 bg-green-300 rounded-full"></div>
            </div>

            {/* Vibrant aura effect */}
            <div className="absolute -inset-4 bg-green-300/30 blur-xl rounded-full -z-10"></div>
          </div>
        </div>

        {/* --- THE INDICATOR (Slider Knob) --- */}
        {/* Positioned slightly past center towards the 'good' side */}
        <div className="absolute top-1/2 left-[58%] -translate-y-1/2 -translate-x-1/2 z-20">
          <div className="w-5 h-5 bg-indigo-500 rounded-full ring-4 ring-indigo-200 shadow-sm animate-pulse"></div>
          {/* Subtle arrow pointing right */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-indigo-300"></div>
        </div>

        {/* --- MOOD PARTICLES (Matching previous illustrations) --- */}
        {/* Dull particles on left */}
        <div className="absolute bottom-10 left-10 w-2 h-2 bg-amber-800/30 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-10 left-16 w-1.5 h-1.5 bg-amber-800/40 rounded-full animate-pulse delay-1000"></div>

        {/* Bright particles on right */}
        <div className="absolute top-12 right-16 w-2.5 h-2.5 bg-green-400/60 rounded-full animate-pulse"></div>
        <div className="absolute bottom-16 right-10 w-2 h-2 bg-green-300/70 rounded-full animate-pulse delay-300"></div>
      </div>
    </div>
  );
};

export default DietQualityIllustration;
