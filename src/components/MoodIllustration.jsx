import React from "react";
import { isDaytime } from "../utils/helpers";

const MoodIllustration = () => {
  const isDay = isDaytime();

  return (
    // FIX: Using clamp() for width ensures it shrinks on iPhone 5 (small screens)
    // w-[clamp(180px,50vw,220px)] means: "Be at least 180px, ideally 50% of viewport width, but max 220px"
    <div
      className={`
        relative aspect-square flex items-center justify-center overflow-hidden 
        rounded-full border-4 border-white shadow-2xl transition-colors duration-1000
        w-[clamp(160px,50vw,220px)]
        ${isDay ? "bg-indigo-50" : "bg-slate-900"}
      `}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient
            id="sky-gradient"
            x1="100"
            y1="0"
            x2="100"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            {isDay ? (
              <>
                <stop stopColor="#DBEAFE" />
                <stop offset="1" stopColor="#EEF2FF" />
              </>
            ) : (
              <>
                <stop stopColor="#0F172A" />
                <stop offset="1" stopColor="#1E1B4B" />
              </>
            )}
          </linearGradient>

          <linearGradient
            id="sun-gradient"
            x1="100"
            y1="40"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FDE047" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient
            id="moon-gradient"
            x1="80"
            y1="50"
            x2="120"
            y2="120"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F3F4F6" />
            <stop offset="1" stopColor="#9CA3AF" />
          </linearGradient>

          <filter id="sun-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="moon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <rect width="200" height="200" fill="url(#sky-gradient)" />

        {isDay ? (
          <g className="animate-[pulse_4s_ease-in-out_infinite]">
            <circle cx="100" cy="90" r="35" fill="#FEF3C7" opacity="0.5" />
            <circle cx="100" cy="90" r="28" fill="#FDE68A" opacity="0.6" />
            <circle
              cx="100"
              cy="90"
              r="20"
              fill="url(#sun-gradient)"
              filter="url(#sun-glow)"
            />
          </g>
        ) : (
          <g className="animate-[pulse_5s_ease-in-out_infinite]">
            <circle
              cx="100"
              cy="90"
              r="30"
              fill="#E2E8F0"
              opacity="0.2"
              filter="url(#moon-glow)"
            />
            <circle cx="100" cy="90" r="22" fill="url(#moon-gradient)" />
            <circle cx="110" cy="85" r="4" fill="#6B7280" opacity="0.1" />
            <circle cx="95" cy="100" r="3" fill="#6B7280" opacity="0.1" />
            <circle cx="92" cy="82" r="2" fill="#6B7280" opacity="0.1" />
          </g>
        )}

        <g opacity={isDay ? "1" : "0.3"}>
          <path
            d="M140 70C135 70 130 75 130 80C130 80 120 80 120 90C120 100 130 100 130 100H160C170 100 175 90 170 80C165 70 150 70 140 70Z"
            fill="white"
            opacity="0.8"
          />
          <path
            d="M40 80C30 80 20 90 25 100C25 100 15 105 20 115C25 125 40 120 40 120H70C80 120 85 110 80 100C75 90 60 85 55 85"
            fill="white"
          />
        </g>

        <path
          d="M-20 150C30 130 80 160 120 140C160 120 220 140 220 140V220H-20V150Z"
          fill={isDay ? "#818CF8" : "#4338CA"}
        />
        <path
          d="M-20 220V170C20 160 60 180 100 170C140 160 180 170 220 180V220H-20Z"
          fill={isDay ? "#4F46E5" : "#1E1B4B"}
        />

        {isDay ? (
          <>
            <g className="text-indigo-400" style={{ opacity: 0.6 }}>
              <path
                d="M50 50C50 50 53 53 56 50"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M56 50C56 50 59 53 62 50"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
            <g
              className="text-indigo-400"
              style={{
                opacity: 0.4,
                transform: "translate(20px, -10px) scale(0.8)",
              }}
            >
              <path
                d="M50 50C50 50 53 53 56 50"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M56 50C56 50 59 53 62 50"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </>
        ) : (
          <g className="animate-pulse">
            <circle cx="30" cy="40" r="1.5" fill="white" opacity="0.8" />
            <circle cx="160" cy="30" r="1.5" fill="white" opacity="0.6" />
            <circle cx="180" cy="60" r="1" fill="white" opacity="0.5" />
            <circle cx="60" cy="20" r="1" fill="white" opacity="0.4" />
            <circle cx="130" cy="110" r="1" fill="white" opacity="0.3" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default MoodIllustration;
