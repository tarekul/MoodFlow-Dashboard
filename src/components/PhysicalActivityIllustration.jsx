import React from "react";

const PhysicalActivityIllustration = () => {
  return (
    <div className="my-2 flex items-center justify-center bg-blue-50">
      <div className="w-64 h-64 relative overflow-hidden scale-75 sm:scale-90 md:scale-100 origin-center transition-transform">
        {/* --- Motion lines (Background) --- */}
        <div className="absolute w-16 h-1 bg-blue-400 top-1/4 left-1/4 rounded-full opacity-80 z-0"></div>
        <div className="absolute w-13 h-1 bg-blue-300 top-[calc(40%-1px)] left-1/13 rounded-full opacity-70 z-0"></div>
        <div className="absolute w-15 h-1 bg-blue-400 top-6/10 left-1/10 rounded-full opacity-90 z-0"></div>

        {/* --- The Figure Wrapper --- */}
        {/* The existing `scale-110` will multiply with the parent's scale */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 z-10 scale-110">
          {/* 1. HEAD */}
          <div className="absolute w-8 h-8 bg-green-500 rounded-full left-[82px] top-[20px] z-20"></div>

          {/* 2. BACK ARM */}
          {/* Parent: Upper Arm */}
          <div className="absolute w-5 h-12 bg-green-400 rounded-full left-[70px] top-[62px] rotate-[110deg] origin-top z-0">
            <div className="absolute w-5 h-12 bg-green-400 rounded-full top-[35px] -left-2 -rotate-[70deg] origin-top"></div>
          </div>

          {/* 3. BACK LEG */}
          <div className="absolute w-5 h-16 bg-green-400 rounded-lg left-[60px] top-[85px] rotate-[25deg] origin-top z-0">
            <div className="absolute w-5 h-15 bg-green-400 rounded-md top-[53px] left-1 rotate-[34deg] origin-top"></div>
          </div>

          {/* 4. TORSO */}
          <div className="absolute w-6 h-16 bg-green-500 rounded-lg left-[60px] top-[50px] rotate-[25deg] z-10"></div>

          {/* 5. FRONT LEG */}
          <div className="absolute w-5 h-14 bg-green-300 rounded-lg left-[40px] top-[100px] -rotate-[60deg] origin-top z-20">
            <div className="absolute w-5 h-13 bg-green-300 rounded-md top-[45px] left-1 rotate-[40deg] origin-top"></div>
          </div>

          {/* 6. FRONT ARM */}
          <div className="absolute w-5 h-12 bg-green-300 rounded-lg left-[66px] top-[60px] -rotate-[60deg] origin-top z-20">
            <div className="absolute w-5 h-12 bg-green-300 rounded-lg top-[37px] -left-2 -rotate-[70deg] origin-top"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalActivityIllustration;
