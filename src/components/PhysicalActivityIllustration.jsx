import React from "react";

const PhysicalActivityIllustration = ({ variant = "default" }) => {
  // ---------------------------------------------------------------------------
  // VARIANT: TIME OF DAY (Sun/Moon Cycle)
  // ---------------------------------------------------------------------------
  if (variant === "time") {
    return (
      <div className="relative aspect-square flex items-center justify-center overflow-hidden rounded-3xl bg-indigo-50/50 border-4 border-white shadow-xl w-[clamp(100px,22vh,220px)]">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Sky Gradient */}
            <linearGradient
              id="sky-gradient"
              x1="100"
              y1="0"
              x2="100"
              y2="200"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#60A5FA" /> {/* Blue-400 */}
              <stop offset="1" stopColor="#E0E7FF" /> {/* Indigo-100 */}
            </linearGradient>
          </defs>

          {/* Background Sky */}
          <rect
            width="200"
            height="200"
            fill="url(#sky-gradient)"
            opacity="0.3"
          />

          {/* Horizon Line */}
          <path
            d="M0 160 Q 100 150 200 160 V 200 H 0 V 160 Z"
            fill="#818CF8"
            opacity="0.2"
          />

          {/* Arc Path (The Cycle) */}
          <path
            d="M 20 160 Q 100 20 180 160"
            stroke="#A5B4FC"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* Morning Sun (Rising Left) */}
          <g>
            <circle
              cx="40"
              cy="120"
              r="12"
              fill="#FCD34D"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            {/* Rays */}
            <path
              d="M40 100 V95 M40 140 V145 M20 120 H15 M60 120 H65 M26 106 L22 102 M54 134 L58 138 M26 134 L22 138 M54 106 L58 102"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>

          {/* Noon Sun (High Center) */}
          <g className="animate-pulse" style={{ animationDuration: "4s" }}>
            <circle
              cx="100"
              cy="60"
              r="16"
              fill="#FDBA74"
              stroke="#EA580C"
              strokeWidth="2"
            />
            {/* Rays */}
            <path
              d="M100 35 V28 M100 85 V92 M75 60 H68 M125 60 H132 M82 42 L77 37 M118 78 L123 83 M82 78 L77 83 M118 42 L123 37"
              stroke="#EA580C"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Evening Moon (Right) */}
          <g>
            <path
              d="M160 120 C 160 120 150 115 150 125 C 150 135 160 140 160 140 C 155 142 145 138 145 125 C 145 112 155 108 160 120 Z"
              fill="#DDD6FE"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              transform="scale(1.2) translate(-20, -10)"
            />
            {/* Stars */}
            <path
              d="M170 100 L172 102 M180 110 L181 111 M140 110 L138 108"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // VARIANT: DEFAULT (Runner)
  // ---------------------------------------------------------------------------
  return (
    <div className="relative aspect-square flex items-center justify-center overflow-hidden rounded-3xl bg-blue-50/50 border-4 border-white shadow-xl w-[clamp(100px,22vh,220px)]">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient
            id="front-limb-gradient"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#86EFAC" />
            <stop offset="1" stopColor="#4ADE80" />
          </linearGradient>

          <linearGradient
            id="body-gradient"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4ADE80" />
            <stop offset="1" stopColor="#22C55E" />
          </linearGradient>

          <linearGradient
            id="speed-gradient"
            x1="0"
            y1="0"
            x2="200"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#BFDBFE" stopOpacity="0" />
            <stop offset="0.5" stopColor="#BFDBFE" />
            <stop offset="1" stopColor="#BFDBFE" stopOpacity="0" />
          </linearGradient>

          <filter id="motion-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2,0" />
          </filter>
        </defs>

        <g className="animate-pulse" style={{ animationDuration: "1.5s" }}>
          <path
            d="M-20 60 H120"
            stroke="url(#speed-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#motion-blur)"
            className="animate-[dash_2s_linear_infinite]"
            style={{ strokeDasharray: "100, 200" }}
          />
          <path
            d="M40 100 H220"
            stroke="url(#speed-gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            filter="url(#motion-blur)"
            className="animate-[dash_1.5s_linear_infinite]"
            style={{ strokeDasharray: "80, 150" }}
          />
          <path
            d="M-50 150 H180"
            stroke="url(#speed-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#motion-blur)"
            className="animate-[dash_2.5s_linear_infinite]"
            style={{ strokeDasharray: "120, 250" }}
          />
        </g>

        <g transform="translate(-10, 0)">
          <path
            d="M 125 65 Q 90 90 70 60"
            stroke="url(#body-gradient)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M 105 115 Q 55 140 25 115"
            stroke="url(#body-gradient)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />

          <circle cx="130" cy="50" r="18" fill="url(#body-gradient)" />

          <path
            d="M 125 65 L 105 115"
            stroke="url(#body-gradient)"
            strokeWidth="24"
            strokeLinecap="round"
          />

          <path
            d="M 105 115 Q 150 90 150 140"
            stroke="url(#front-limb-gradient)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M 125 65 Q 155 80 165 50"
            stroke="url(#front-limb-gradient)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        <path
          d="M10 170 Q 100 160 190 180"
          stroke="#DBEAFE"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default PhysicalActivityIllustration;
