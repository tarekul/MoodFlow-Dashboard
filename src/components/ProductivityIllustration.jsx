import React from "react";

const ProductivityIllustration = () => {
  return (
    <div className="relative w-full max-w-[220px] aspect-square flex items-center justify-center font-sans">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          {/* Gradient for the bars (bottom up) */}
          <linearGradient
            id="bar-gradient"
            x1="0"
            y1="200"
            x2="0"
            y2="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#818CF8" /> {/* Indigo-400 */}
            <stop offset="1" stopColor="#4F46E5" /> {/* Indigo-600 */}
          </linearGradient>

          {/* Gradient for the trend line (left to right) */}
          <linearGradient
            id="line-gradient"
            x1="20"
            y1="0"
            x2="180"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#A5B4FC" /> {/* Indigo-300 */}
            <stop offset="1" stopColor="#C7D2FE" /> {/* Indigo-200 */}
          </linearGradient>

          {/* Glow for the success marker */}
          <filter
            id="success-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background subtle glow blob */}
        <path
          d="M100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180Z"
          fill="#E0E7FF"
          opacity="0.3"
          transform="translate(0, 10)"
        />

        {/* CHART BARS (Animated rise up) */}
        <g className="animate-[rise_1s_ease-out]">
          {/* Bar 1 (Low) */}
          <rect
            x="30"
            y="120"
            width="25"
            height="60"
            rx="6"
            fill="url(#bar-gradient)"
            opacity="0.7"
          />
          {/* Bar 2 (Medium) */}
          <rect
            x="70"
            y="90"
            width="25"
            height="90"
            rx="6"
            fill="url(#bar-gradient)"
            opacity="0.85"
          />
          {/* Bar 3 (Dip) */}
          <rect
            x="110"
            y="105"
            width="25"
            height="75"
            rx="6"
            fill="url(#bar-gradient)"
            opacity="0.8"
          />
          {/* Bar 4 (Peak) */}
          <rect
            x="150"
            y="50"
            width="25"
            height="130"
            rx="6"
            fill="url(#bar-gradient)"
          />
        </g>

        {/* TREND LINE & SUCCESS MARKER */}
        <g
          className="animate-[fadeIn_1.2s_ease-out_0.5s_both]"
          style={{ animationFillMode: "backwards" }}
        >
          {/* Connecting Line */}
          <path
            d="M42.5 120 C 42.5 120, 82.5 90, 82.5 90 S 122.5 105, 122.5 105 S 162.5 50, 162.5 50"
            stroke="url(#line-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Success Marker at Peak */}
          <g filter="url(#success-glow)">
            <circle
              cx="162.5"
              cy="50"
              r="14"
              fill="#4F46E5"
              className="animate-pulse"
              style={{ animationDuration: "3s" }}
            />
            <circle cx="162.5" cy="50" r="10" fill="#818CF8" />
            {/* Checkmark icon */}
            <path
              d="M156 50L160 54L169 45"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ProductivityIllustration;
