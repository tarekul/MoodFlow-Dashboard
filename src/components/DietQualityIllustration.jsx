import React from "react";

const DietQualityIllustration = () => {
  return (
    // Container: Ensures responsiveness. Fills width up to max, maintains square aspect.
    <div className="relative w-full max-w-[220px] aspect-square flex items-center justify-center p-2">
      {/* Subtle background blob for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-100/50 to-green-100/50 rounded-[3rem] rotate-3 scale-95 -z-10"></div>

      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          {/* --- GRADIENTS --- */}
          {/* Warm/Heavy gradient for processed food */}
          <linearGradient id="bad-food-grad" x1="0" y1="0" x2="0" y2="100%">
            <stop stopColor="#F59E0B" /> {/* Amber-500 */}
            <stop offset="1" stopColor="#B45309" /> {/* Amber-700 */}
          </linearGradient>

          {/* Fresh/Vibrant gradient for healthy food */}
          <linearGradient id="good-food-grad" x1="0" y1="0" x2="0" y2="100%">
            <stop stopColor="#86EFAC" /> {/* Green-300 */}
            <stop offset="1" stopColor="#22C55E" /> {/* Green-500 */}
          </linearGradient>

          {/* Spectrum path gradient fade */}
          <linearGradient id="path-grad" x1="0" y1="0" x2="100%" y2="0%">
            <stop stopColor="#FDBA74" stopOpacity="0.4" /> {/* Orange-300 */}
            <stop offset="1" stopColor="#86EFAC" stopOpacity="0.4" />{" "}
            {/* Green-300 */}
          </linearGradient>

          {/* Soft glow filter */}
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- THE SPECTRUM PATH (Curved arc) --- */}
        <path
          d="M 30 140 Q 100 90 170 140"
          stroke="url(#path-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="8 10"
        />

        {/* --- THE "BAD" SIDE (Left - Burger) --- */}
        <g transform="translate(30, 110) rotate(-10)">
          {/* Heavy Aura Blob */}
          <circle
            cx="0"
            cy="0"
            r="35"
            fill="#FDBA74"
            opacity="0.2"
            filter="url(#soft-glow)"
          />

          {/* Burger Icon */}
          <g transform="translate(-18, -15)">
            {/* Top Bun */}
            <path d="M 0 12 C 0 2, 36 2, 36 12" fill="url(#bad-food-grad)" />
            {/* Seeds */}
            <circle cx="10" cy="6" r="1.5" fill="#FDE68A" opacity="0.7" />
            <circle cx="20" cy="8" r="1.5" fill="#FDE68A" opacity="0.7" />
            <circle cx="28" cy="5" r="1.5" fill="#FDE68A" opacity="0.7" />
            {/* Patty & Cheese Lines */}
            <rect
              x="2"
              y="14"
              width="32"
              height="4"
              rx="2"
              fill="#92400E"
            />{" "}
            {/* Meat */}
            <rect
              x="4"
              y="18"
              width="28"
              height="2"
              rx="1"
              fill="#FCD34D"
            />{" "}
            {/* Cheese */}
            {/* Bottom Bun */}
            <path
              d="M 2 22 C 2 28, 34 28, 34 22 V 20 H 2 V 22 Z"
              fill="url(#bad-food-grad)"
            />
          </g>
        </g>

        {/* --- THE "GOOD" SIDE (Right - Fruit) --- */}
        <g transform="translate(170, 110) rotate(10)">
          {/* Fresh Aura Blob */}
          <circle
            cx="0"
            cy="0"
            r="35"
            fill="#86EFAC"
            opacity="0.2"
            filter="url(#soft-glow)"
          />

          {/* Apple/Fruit Icon */}
          <g transform="translate(-15, -20)">
            {/* Leaf */}
            <path d="M 15 0 Q 22 -8 28 0 Q 22 10 15 0" fill="#4ADE80" />
            {/* Stem */}
            <path
              d="M 15 2 C 15 2, 13 -4, 18 -6"
              stroke="#65A30D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Fruit Body */}
            <path
              d="M 15 5 C 0 5, 0 35, 15 35 C 30 35, 30 5, 15 5"
              fill="url(#good-food-grad)"
            />
            {/* Shine highlight */}
            <ellipse
              cx="22"
              cy="12"
              rx="3"
              ry="5"
              fill="white"
              opacity="0.3"
              transform="rotate(-20)"
            />
          </g>
        </g>

        {/* --- THE INDICATOR KNOB --- */}
        {/* Positioned on the curve, slightly towards the good side */}
        <g transform="translate(125, 115)">
          {/* Pulsing outer ring */}
          <circle
            cx="0"
            cy="0"
            r="12"
            fill="#A5B4FC"
            opacity="0.4"
            className="animate-pulse"
          />
          {/* Solid center knob */}
          <circle
            cx="0"
            cy="0"
            r="7"
            fill="#6366F1"
            stroke="white"
            strokeWidth="2"
            shadow="sm"
          />
        </g>

        {/* --- FLOATING PARTICLES --- */}
        <g className="animate-pulse" style={{ animationDuration: "3s" }}>
          <circle cx="50" cy="80" r="2" fill="#FDBA74" opacity="0.6" />
          <circle
            cx="150"
            cy="70"
            r="3"
            fill="#86EFAC"
            opacity="0.6"
            style={{ animationDelay: "1s" }}
          />
          <circle
            cx="100"
            cy="160"
            r="2"
            fill="#CBD5E1"
            opacity="0.4"
            style={{ animationDelay: "0.5s" }}
          />
        </g>
      </svg>
    </div>
  );
};

export default DietQualityIllustration;
