import React from "react";

const StressIllustration = () => {
  return (
    <div className="my-8 flex items-center justify-center relative z-0">
      <svg
        viewBox="0 0 280 140"
        className="w-full max-w-[320px] h-auto drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="chaosGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>

          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" /> {/* Blue-400 */}
            <stop offset="100%" stopColor="#2DD4BF" /> {/* Teal-400 */}
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <circle cx="70" cy="70" r="50" fill="#FEF2F2" />
        <circle cx="70" cy="70" r="35" fill="#FEE2E2" opacity="0.5" />

        <circle cx="210" cy="70" r="50" fill="#EFF6FF" />
        <circle cx="210" cy="70" r="35" fill="#DBEAFE" opacity="0.5" />

        <g transform="translate(20, 20)">
          <path
            d="M 30 50 
               Q 10 20, 40 10 
               Q 70 0, 60 40 
               Q 80 20, 90 50 
               Q 100 80, 60 70 
               Q 90 100, 50 90 
               Q 20 100, 30 60 
               Q 0 70, 10 40 
               Q 0 10, 30 30"
            stroke="url(#chaosGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          <path
            d="M10 20 L20 25 L15 35"
            stroke="#FCA5A5"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          <path
            d="M80 85 L90 80 L95 90"
            stroke="#FCA5A5"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          <circle cx="85" cy="25" r="3" fill="#EF4444" opacity="0.6" />
        </g>

        <g transform="translate(160, 20)">
          <path
            d="M 10 40 C 30 20, 50 20, 90 40"
            stroke="url(#flowGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          <path
            d="M 0 55 C 30 35, 70 35, 100 55"
            stroke="url(#flowGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          <path
            d="M 10 70 C 40 50, 60 50, 90 70"
            stroke="url(#flowGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          <circle cx="50" cy="20" r="4" fill="#60A5FA" opacity="0.6" />
          <circle cx="80" cy="85" r="3" fill="#2DD4BF" opacity="0.6" />
        </g>

        <path
          d="M 120 70 H 160"
          stroke="#E2E8F0"
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default StressIllustration;
