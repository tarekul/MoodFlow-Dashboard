import React from "react";

const WeatherIllustration = () => {
  // Custom CSS for animations
  const customStyles = `
    @keyframes rainfall {
      0% { transform: translateY(-20%) translateX(5%); opacity: 0; }
      20% { opacity: 1; }
      100% { transform: translateY(150%) translateX(-10%); opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes drift {
      0%, 100% { transform: translateX(0px); }
      50% { transform: translateX(4px); }
    }
    .animate-rainfall {
      animation: rainfall 1.2s linear infinite;
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    .animate-drift {
      animation: drift 5s ease-in-out infinite;
    }
  `;

  return (
    <div className="my-12 flex items-center justify-center">
      <style>{customStyles}</style>

      {/* Main Container */}
      <div className="w-96 h-40 bg-white rounded-3xl border-4 border-gray-100 shadow-xl flex overflow-hidden relative">
        {/* ===========================
            ZONE 1: SUNNY (Left) - Unchanged
           =========================== */}
        <div className="flex-1 relative bg-blue-50 overflow-hidden group">
          <div className="absolute top-6 left-6 w-12 h-12 bg-yellow-400 rounded-full shadow-lg z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-yellow-200 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-2 left-2 w-20 h-20 border border-yellow-100 rounded-full opacity-40"></div>
          <div className="absolute -bottom-6 -left-4 w-32 h-16 bg-green-200 rounded-[50%] rotate-6"></div>
        </div>

        {/* Divider 1 */}
        <div className="w-1 h-full bg-white relative z-20">
          <div className="absolute inset-0 border-l border-dashed border-gray-300"></div>
        </div>

        {/* ===========================
            ZONE 2: CLOUDY (Middle) - UPDATED
           =========================== */}
        <div className="flex-1 relative bg-gradient-to-b from-gray-50 to-blue-50 overflow-hidden">
          {/* 1. Wind Lines (SVG Background) */}
          <svg
            className="absolute inset-0 w-full h-full opacity-40"
            viewBox="0 0 100 100"
          >
            <path
              d="M 10 20 Q 30 10 50 20"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1"
              className="animate-drift"
            />
            <path
              d="M 60 80 Q 80 90 90 80"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1"
              className="animate-drift"
              style={{ animationDelay: "1s" }}
            />
          </svg>

          {/* 2. Back Cloud (Darker, adds depth) */}
          <div className="absolute top-12 left-8">
            <div
              className="w-16 h-8 bg-gray-200 rounded-full relative animate-drift"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="absolute -top-4 left-2 w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="absolute -top-2 left-8 w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* 3. Front Cloud (White, Fluffy, Floating) */}
          <div className="absolute top-6 left-2 animate-float">
            <div className="relative">
              {/* Main body */}
              <div className="w-20 h-10 bg-white rounded-full shadow-sm z-10 relative"></div>
              {/* Fluff 1 */}
              <div className="absolute -top-6 left-2 w-10 h-10 bg-white rounded-full shadow-sm z-10"></div>
              {/* Fluff 2 */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-white rounded-full shadow-sm z-10"></div>

              {/* Hidden Sun Glow peeking from behind */}
              <div className="absolute -top-2 left-6 w-12 h-12 bg-yellow-200 rounded-full blur-md -z-10 opacity-50"></div>
            </div>
          </div>
        </div>

        {/* Divider 2 */}
        <div className="w-1 h-full bg-white relative z-20">
          <div className="absolute inset-0 border-l border-dashed border-gray-300"></div>
        </div>

        {/* ===========================
            ZONE 3: RAINY (Right) - Unchanged
           =========================== */}
        <div className="flex-1 relative bg-slate-700 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-slate-600 rounded-full opacity-80"></div>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
          >
            <line
              x1="20"
              y1="0"
              x2="15"
              y2="15"
              className="animate-rainfall stroke-blue-300"
              strokeWidth="2"
              style={{ animationDelay: "0.1s" }}
            />
            <line
              x1="50"
              y1="10"
              x2="45"
              y2="25"
              className="animate-rainfall stroke-blue-300"
              strokeWidth="2"
              style={{ animationDelay: "0.5s" }}
            />
            <line
              x1="80"
              y1="5"
              x2="75"
              y2="20"
              className="animate-rainfall stroke-blue-300"
              strokeWidth="2"
              style={{ animationDelay: "0.9s" }}
            />
            <line
              x1="35"
              y1="-10"
              x2="30"
              y2="5"
              className="animate-rainfall stroke-blue-300"
              strokeWidth="2"
              style={{ animationDelay: "1.3s" }}
            />
          </svg>
          <div className="absolute bottom-3 right-3 w-16 h-4 bg-slate-600 rounded-[50%] border border-slate-500 opacity-50">
            <div
              className="absolute top-1 left-4 w-6 h-2 border border-slate-400 rounded-[50%] animate-ping"
              style={{ animationDuration: "2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherIllustration;
