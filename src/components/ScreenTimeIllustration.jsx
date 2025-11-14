const ScreenTimeIllustration = ({ hours }) => {
  // Calculate intensity (0 to 1).
  // We start showing strain after 2 hours, maxing out at 12.
  const intensity = Math.max(0, Math.min((hours - 2) / 10, 1));

  return (
    <div className="my-8 flex items-center justify-center">
      {/* Increased size slightly for detail */}
      <div className="w-64 h-32 relative">
        {/* 1. Outer eye shape & Base White */}
        <div className="w-full h-full bg-white rounded-[50%] border-4 border-gray-800 overflow-hidden relative shadow-lg">
          {/* 2. General Redness (Sclera inflammation) */}
          {/* Using mix-blend-multiply allows the white to turn pinkish/red without covering details */}
          <div
            className="absolute inset-0 bg-red-500 mix-blend-multiply transition-opacity duration-500 ease-in-out"
            style={{ opacity: intensity * 0.3 }} // Max 30% redness so it's not solid red
          ></div>

          {/* 3. Veins (SVG Overlay) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 256 128"
          >
            <g
              fill="none"
              stroke="#EF4444" // Red-500
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-opacity duration-500 ease-in-out"
              style={{ opacity: intensity }} // Opacity controlled by slider
            >
              {/* Left Side Veins */}
              <path d="M-10 64 Q 20 50 40 64" />
              <path d="M-5 64 Q 15 80 35 75" />
              <path d="M-5 64 Q 20 30 30 45" />

              {/* Right Side Veins */}
              <path d="M266 64 Q 236 50 216 64" />
              <path d="M261 64 Q 241 80 221 75" />
              <path d="M261 64 Q 236 30 226 45" />

              {/* Bottom veins creeping up */}
              <path d="M128 138 Q 120 110 110 100" />
              <path d="M128 138 Q 140 110 146 100" />
            </g>
          </svg>

          {/* 4. Iris */}
          <div className="absolute w-24 h-24 bg-blue-500 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-blue-600"></div>

          {/* 5. Pupil */}
          <div className="absolute w-12 h-12 bg-gray-900 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

          {/* 6. Screen glare reflection */}
          <div className="absolute w-6 h-6 bg-white rounded-sm top-[40%] left-[55%] opacity-90 rotate-12 blur-[1px]"></div>
        </div>
      </div>
    </div>
  );
};

export default ScreenTimeIllustration;
