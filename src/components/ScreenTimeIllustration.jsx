import React from "react";

const ScreenTimeIllustration = ({ hours }) => {
  // 1. Calculations
  const maxHours = 12;
  const clampedHours = Math.max(0, Math.min(hours, maxHours));
  const fillPercentage = clampedHours / maxHours; // 0 to 1

  // 2. Color Logic (Green -> Blue -> Orange -> Red)
  const getColor = (h) => {
    if (h <= 2) return { top: "#6EE7B7", bottom: "#10B981" }; // Emerald
    if (h <= 5) return { top: "#93C5FD", bottom: "#3B82F6" }; // Blue
    if (h <= 8) return { top: "#FDBA74", bottom: "#F97316" }; // Orange
    return { top: "#FCA5A5", bottom: "#EF4444" }; // Red
  };

  const colors = getColor(clampedHours);

  // 3. Sand Height Calculations (SVG coordinates)
  // The bottom bulb area starts around y=55 and ends at y=95. Height is ~40 units.
  const sandMaxHeight = 38;
  const currentSandHeight = sandMaxHeight * fillPercentage;
  const sandYPosition = 95 - currentSandHeight; // Fill from bottom up

  return (
    <div className="relative w-full max-w-[180px] aspect-[1] flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          {/* Dynamic Sand Gradient */}
          <linearGradient
            id="sandGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={colors.top} />
            <stop offset="1" stopColor={colors.bottom} />
          </linearGradient>

          {/* Glass Reflection Gradient */}
          <linearGradient id="glassShine" x1="0" y1="0" x2="100%" y2="0%">
            <stop offset="0" stopColor="white" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor="white" stopOpacity="0.1" />
          </linearGradient>

          {/* Clip path for the bottom sand to stay inside the bulb shape */}
          <clipPath id="bottomBulbClip">
            <path d="M 25 50 C 25 50, 30 95, 50 95 C 70 95, 75 50, 75 50 H 25 Z" />
          </clipPath>
        </defs>

        {/* --- BACKGROUND GLOW --- */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill={colors.top}
          opacity="0.1"
          className="transition-colors duration-500"
        />

        {/* --- GLASS CONTAINER --- */}
        {/* The main hourglass shape */}
        <path
          d="M 30 5 
             H 70 
             Q 75 5, 75 15 
             Q 75 40, 55 50 
             Q 75 60, 75 85 
             Q 75 95, 70 95 
             H 30 
             Q 25 95, 25 85 
             Q 25 60, 45 50 
             Q 25 40, 25 15 
             Q 25 5, 30 5 Z"
          fill="white"
          fillOpacity="0.2"
          stroke="#94A3B8" // Slate-400
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* --- SAND (ACCUMULATION) --- */}
        <g clipPath="url(#bottomBulbClip)">
          {/* The rising level of sand */}
          <rect
            x="0"
            y={sandYPosition}
            width="100"
            height="100"
            fill="url(#sandGradient)"
            className="transition-all duration-500 ease-out"
          />

          {/* Top surface of the sand (elliptical curve for depth) */}
          {clampedHours > 0 && (
            <ellipse
              cx="50"
              cy={sandYPosition}
              rx="23"
              ry="3"
              fill={colors.top}
              opacity="0.8"
              className="transition-all duration-500 ease-out"
            />
          )}
        </g>

        {/* --- TRICKLE STREAM --- */}
        {/* Shows that time is currently accumulating (digital flow) */}
        {/* Only show if there is actually time logged (> 0) */}
        {clampedHours > 0 && clampedHours < 12 && (
          <path
            d="M 50 50 L 50 90"
            stroke="url(#sandGradient)"
            strokeWidth="2"
            strokeDasharray="4 2"
            opacity="0.6"
          />
        )}

        {/* --- GLASS HIGHLIGHTS (Reflection) --- */}
        {/* Top Shine */}
        <path
          d="M 32 10 Q 32 30, 48 45"
          stroke="url(#glassShine)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Bottom Shine */}
        <path
          d="M 28 85 Q 28 65, 45 55"
          stroke="url(#glassShine)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Top Cap */}
        <rect x="28" y="2" width="44" height="4" rx="2" fill="#475569" />
        {/* Bottom Cap */}
        <rect x="28" y="94" width="44" height="4" rx="2" fill="#475569" />
      </svg>
    </div>
  );
};

export default ScreenTimeIllustration;
