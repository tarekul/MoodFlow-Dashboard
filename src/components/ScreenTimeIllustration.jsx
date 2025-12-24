import React from "react";

const ScreenTimeIllustration = ({ hours }) => {
  const maxHours = 12;
  const clampedHours = Math.max(0, Math.min(hours, maxHours));
  const fillPercentage = Math.min((clampedHours / maxHours) * 100, 100);

  const getColor = (h) => {
    if (h <= 2) return { start: "#6EE7B7", end: "#10B981" }; // Emerald
    if (h <= 5) return { start: "#93C5FD", end: "#3B82F6" }; // Blue
    if (h <= 8) return { start: "#FDBA74", end: "#F97316" }; // Orange
    return { start: "#FCA5A5", end: "#EF4444" }; // Red
  };

  const colors = getColor(clampedHours);

  return (
    <div className="relative w-full max-w-[280px] aspect-[2.2/1] flex items-center justify-center">
      <svg
        viewBox="0 0 220 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="screenGradient" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>

          <clipPath id="screenContentClip">
            <rect x="18" y="12" width="184" height="76" rx="6" />
          </clipPath>
        </defs>

        {/* 1. Device Frame (Landscape Phone) */}
        <rect
          x="5"
          y="5"
          width="210"
          height="90"
          rx="14"
          fill="#1E293B" // Slate-800
          stroke="#475569" // Slate-600
          strokeWidth="3"
        />

        {/* 2. Dark Screen Background */}
        <rect x="18" y="12" width="184" height="76" rx="6" fill="#0F172A" />

        {/* 3. Screen Content (Clipped) */}
        <g clipPath="url(#screenContentClip)">
          {/* Subtle "App Grid" Background Pattern */}
          <g fill="#334155" opacity="0.3">
            <rect x="30" y="25" width="20" height="20" rx="4" />
            <rect x="65" y="25" width="20" height="20" rx="4" />
            <rect x="100" y="25" width="20" height="20" rx="4" />
            <rect x="135" y="25" width="20" height="20" rx="4" />

            <rect x="30" y="55" width="20" height="20" rx="4" />
            <rect x="65" y="55" width="20" height="20" rx="4" />
            <rect x="100" y="55" width="20" height="20" rx="4" />
            <rect x="135" y="55" width="20" height="20" rx="4" />
          </g>

          {/* The Progress Bar (Fills horizontally) */}
          <rect
            x="18"
            y="12"
            width={(184 * fillPercentage) / 100}
            height="76"
            fill="url(#screenGradient)"
            className="transition-all duration-300 ease-out"
            opacity="0.9"
          />

          {/* Glass Reflection / Glare */}
          <path
            d="M 18 12 L 80 88 L 120 88 L 58 12 Z"
            fill="white"
            fillOpacity="0.1"
            className="pointer-events-none"
          />
        </g>

        {/* 4. Camera / Home Button Details */}
        {/* Side Notch/Dynamic Island area */}
        <rect x="10" y="35" width="4" height="30" rx="2" fill="#334155" />

        {/* Camera Dot */}
        <circle cx="202" cy="50" r="3" fill="#334155" />
      </svg>
    </div>
  );
};

export default ScreenTimeIllustration;
