import React from "react";

const PhysicalActivityIllustration = () => {
  return (
    <div className="relative w-full max-w-[220px] aspect-square flex items-center justify-center overflow-hidden rounded-3xl bg-blue-50/50 border-4 border-white shadow-xl">
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
