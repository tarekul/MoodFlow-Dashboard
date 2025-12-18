import React from "react";

const SleepIllustration = () => {
  return (
    <div className="relative aspect-square flex items-center justify-center w-[clamp(100px,22vh,220px)]">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl rounded-full"
      >
        <defs>
          <linearGradient
            id="deep-sleep"
            x1="100"
            y1="0"
            x2="100"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1E1B4B" />
            <stop offset="1" stopColor="#312E81" />
          </linearGradient>

          <linearGradient
            id="dream-wave-1"
            x1="0"
            y1="0"
            x2="200"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6366F1" stopOpacity="0.6" />
            <stop offset="1" stopColor="#A5B4FC" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient
            id="dream-wave-2"
            x1="200"
            y1="0"
            x2="0"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#818CF8" stopOpacity="0.5" />
            <stop offset="1" stopColor="#C7D2FE" stopOpacity="0.1" />
          </linearGradient>

          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="100" cy="100" r="98" fill="url(#deep-sleep)" />

        <g className="animate-[pulse_8s_ease-in-out_infinite]">
          <path
            d="M0 100C30 120 70 80 100 110C130 140 170 90 200 120V200H0V100Z"
            fill="url(#dream-wave-1)"
            style={{ mixBlendMode: "overlay" }}
          />
        </g>
        <g
          className="animate-[pulse_10s_ease-in-out_infinite]"
          style={{ animationDelay: "1s" }}
        >
          <path
            d="M0 140C40 110 80 160 120 130C160 100 180 150 200 130V200H0V140Z"
            fill="url(#dream-wave-2)"
            style={{ mixBlendMode: "soft-light" }}
          />
        </g>

        <circle
          cx="100"
          cy="70"
          r="15"
          fill="#FDE68A"
          filter="url(#soft-glow)"
          opacity="0.8"
          className="animate-pulse"
          style={{ animationDuration: "4s" }}
        />

        <circle
          cx="60"
          cy="90"
          r="2"
          fill="#C7D2FE"
          opacity="0.6"
          className="animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        <circle
          cx="140"
          cy="50"
          r="3"
          fill="#C7D2FE"
          opacity="0.4"
          className="animate-pulse"
          style={{ animationDuration: "5s" }}
        />
        <circle
          cx="120"
          cy="110"
          r="1.5"
          fill="#C7D2FE"
          opacity="0.5"
          className="animate-pulse"
          style={{ animationDuration: "7s" }}
        />
      </svg>
    </div>
  );
};

export default SleepIllustration;
