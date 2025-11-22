import React from "react";

const SocialInteractionIllustration = ({ hours }) => {
  // Normalize hours: 0 to 10 scale for intensity calculation.
  // 0-2: Low/Quiet, 4-6: Balanced, 8+: Loud/Busy
  const intensity = Math.max(0, Math.min(hours / 10, 1));

  // Helper for dynamic color interpolation (Blue -> Yellow -> Pink/Red)
  const getBaseColor = () => {
    if (intensity < 0.4) return "bg-blue-100 border-blue-300"; // Quiet
    if (intensity < 0.7) return "bg-yellow-100 border-yellow-400"; // Social
    return "bg-pink-100 border-pink-500"; // Loud/Party
  };

  return (
    <div className="my-8 flex items-center justify-center">
      <div className="w-64 h-40 relative flex items-center justify-center">
        {/* 1. Background Aura (Social Noise) */}
        {/* Expands and changes color based on intensity */}
        <div
          className={`absolute rounded-full transition-all duration-700 ease-out opacity-20 blur-xl
            ${intensity > 0.6 ? "bg-purple-500 animate-pulse" : "bg-blue-400"}
          `}
          style={{
            width: `${100 + intensity * 150}px`,
            height: `${100 + intensity * 150}px`,
          }}
        ></div>

        {/* 2. Floating Speech Bubbles (SVG Overlay) */}
        {/* We map over fixed positions, but control opacity with intensity */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {[
            { top: "10%", left: "10%", delay: "0ms", rotate: "-12deg" },
            { top: "5%", right: "15%", delay: "100ms", rotate: "12deg" },
            { bottom: "20%", left: "5%", delay: "200ms", rotate: "-6deg" },
            { bottom: "30%", right: "5%", delay: "300ms", rotate: "8deg" },
            { top: "50%", left: "-10%", delay: "400ms", rotate: "-20deg" }, // Far left
            { top: "40%", right: "-12%", delay: "500ms", rotate: "15deg" }, // Far right
          ].map((bubble, index) => {
            // Determine if this specific bubble should show based on intensity threshold
            const isVisible = intensity > (index + 1) * 0.14; // Stagger appearance

            return (
              <div
                key={index}
                className={`absolute transition-all duration-500 ease-back-out ${
                  isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
                style={{
                  top: bubble.top,
                  left: bubble.left,
                  right: bubble.right,
                  bottom: bubble.bottom,
                  transitionDelay: bubble.delay,
                }}
              >
                {/* The Bubble Graphic */}
                <div
                  className={`w-12 h-10 bg-white border-2 rounded-2xl flex items-center justify-center shadow-sm
                    ${
                      intensity > 0.8
                        ? "border-pink-400 animate-bounce"
                        : "border-gray-300"
                    }
                  `}
                  style={{ transform: `rotate(${bubble.rotate})` }}
                >
                  <div className="w-6 h-1 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. The Avatar Head */}
        <div
          className={`relative z-10 w-24 h-24 rounded-full border-4 shadow-lg transition-colors duration-500 ${getBaseColor()}`}
        >
          {/* Eyes */}
          <div className="absolute top-8 left-0 w-full flex justify-center gap-4">
            {/* Eyes blink/close when low energy, widen when high energy */}
            <div
              className={`w-3 h-3 bg-gray-800 rounded-full transition-all duration-300 ${
                intensity > 0.8 ? "h-4 w-4" : ""
              }`}
            ></div>
            <div
              className={`w-3 h-3 bg-gray-800 rounded-full transition-all duration-300 ${
                intensity > 0.8 ? "h-4 w-4" : ""
              }`}
            ></div>
          </div>

          {/* Mouth (SVG for morphing expression) */}
          <svg
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-8"
            viewBox="0 0 50 30"
          >
            <path
              fill="none"
              stroke="#1F2937"
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-all duration-500 ease-in-out"
              // Morphing Logic:
              // Low (0-3): Small flat line/slight smile
              // Med (4-7): Big curve smile
              // High (8+): Open mouth circle (O shape)
              d={
                intensity < 0.4
                  ? "M 15 15 Q 25 15 35 15" // Flat/Neutral
                  : intensity < 0.8
                  ? "M 10 10 Q 25 25 40 10" // Smile
                  : "M 15 10 Q 25 25 35 10 Q 25 -5 15 10" // Open/Chattering Mouth (Cycle)
              }
            />
          </svg>

          {/* Sweat drop (Only appears at very high intensity) */}
          <div
            className={`absolute top-4 right-3 w-2 h-3 bg-blue-400 rounded-full opacity-0 transition-opacity duration-500 ${
              intensity > 0.85 ? "opacity-100" : ""
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SocialInteractionIllustration;
