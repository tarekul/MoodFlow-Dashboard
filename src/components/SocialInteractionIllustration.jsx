import React from "react";

const SocialInteractionIllustration = ({ hours }) => {
  // Normalize hours (0-8) to a scale factor (0-1)
  const safeHours = Math.max(0, Math.min(hours, 8));
  const intensity = safeHours / 8;

  // Configuration for "Bubbles" (Friends)
  // They appear radially around the center "Self" bubble
  const bubbles = [
    { angle: 0, dist: 60, minHours: 1 },
    { angle: 120, dist: 60, minHours: 2 },
    { angle: 240, dist: 60, minHours: 3 },
    { angle: 60, dist: 85, minHours: 5 },
    { angle: 180, dist: 85, minHours: 6.5 },
    { angle: 300, dist: 85, minHours: 7.5 },
  ];

  // Dynamic Color Logic
  const getMainColor = () => {
    if (hours <= 2) return "#3B82F6"; // Blue
    if (hours <= 5) return "#6366F1"; // Indigo
    if (hours <= 7) return "#A855F7"; // Purple
    return "#EC4899"; // Pink
  };
  const mainColor = getMainColor();

  return (
    <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          {/* Main Gradient for bubbles */}
          <radialGradient
            id="bubbleGrad"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(0.3 0.3) scale(0.8)"
          >
            <stop offset="0" stopColor="white" stopOpacity="0.4" />
            <stop offset="1" stopColor={mainColor} stopOpacity="0.1" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- CONNECTING LINES --- */}
        {/* Lines draw out from center to active bubbles */}
        <g
          stroke={mainColor}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
        >
          {bubbles.map((b, i) => {
            const rad = (b.angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * b.dist;
            const y = 100 + Math.sin(rad) * b.dist;
            const isActive = hours >= b.minHours;

            return isActive ? (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={x}
                y2={y}
                className="animate-[grow_0.5s_ease-out_forwards]"
                strokeDasharray="100"
                strokeDashoffset="0"
              />
            ) : null;
          })}
        </g>

        {/* --- CENTER BUBBLE (YOU) --- */}
        <g className="animate-[pulse_3s_infinite]">
          <circle
            cx="100"
            cy="100"
            r={25 + intensity * 5}
            fill={mainColor}
            className="transition-all duration-500"
          />
          <circle
            cx="100"
            cy="100"
            r={25 + intensity * 5}
            fill="url(#bubbleGrad)"
          />
          {/* Smile Expression changes with intensity */}
          <path
            d={
              intensity < 0.3
                ? "M 90 100 H 110" // Neutral
                : "M 90 102 Q 100 112 110 102" // Smile
            }
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            transform={`translate(0, ${intensity < 0.3 ? 5 : 0})`}
          />
          {/* Eyes */}
          <circle cx="92" cy="92" r="2" fill="white" />
          <circle cx="108" cy="92" r="2" fill="white" />
        </g>

        {/* --- SURROUNDING BUBBLES (FRIENDS) --- */}
        {bubbles.map((b, i) => {
          const rad = (b.angle * Math.PI) / 180;
          const x = 100 + Math.cos(rad) * b.dist;
          const y = 100 + Math.sin(rad) * b.dist;
          const isActive = hours >= b.minHours;

          return (
            <g
              key={i}
              transform={`translate(${x}, ${y})`}
              className={`transition-all duration-500 ${
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            >
              <circle r="15" fill="white" stroke={mainColor} strokeWidth="2" />
              {/* Chat Lines inside bubble */}
              <path
                d="M -5 -2 H 5"
                stroke={mainColor}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />
              <path
                d="M -5 3 H 2"
                stroke={mainColor}
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />
            </g>
          );
        })}

        {/* --- PARTY PARTICLES (High Intensity) --- */}
        {hours > 6 && (
          <g
            className="animate-spin"
            style={{ animationDuration: "10s", transformOrigin: "100px 100px" }}
          >
            <circle cx="100" cy="40" r="3" fill="#F472B6" />
            <circle cx="160" cy="100" r="2" fill="#60A5FA" />
            <circle cx="100" cy="160" r="3" fill="#34D399" />
            <circle cx="40" cy="100" r="2" fill="#FBBF24" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default SocialInteractionIllustration;
