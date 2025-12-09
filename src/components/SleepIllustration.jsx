const SleepIllustration = () => {
  return (
    <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
      {/* Crescent Moon */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-yellow-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
      <div className="w-16 h-16 sm:w-22 sm:h-22 bg-blue-50 rounded-full absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[60%]"></div>

      {/* Stars */}

      {/* Star 1: Top-Left */}
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-600 rounded-full absolute top-[30%] left-[40%] opacity-90 animate-pulse"></div>

      {/* Star 2: Mid-Right */}
      <div className="w-1 h-1 bg-indigo-600 rounded-full absolute top-[50%] right-[20%] opacity-80 animate-pulse delay-75"></div>

      {/* Star 3: Bottom-Left */}
      <div className="w-1 h-1 bg-indigo-600 rounded-full absolute bottom-[40%] left-[10%] opacity-70 animate-pulse delay-200"></div>

      {/* Star 4: Bottom-Right */}
      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-600 rounded-full absolute bottom-[20%] right-[20%] opacity-70 animate-pulse delay-500"></div>

      {/* Star 5: Bottom-Mid */}
      <div className="w-1.25 h-1.25 sm:w-1.5 sm:h-1.5 bg-indigo-600 rounded-full absolute top-[80%] left-[80%] opacity-60 animate-pulse delay-1000"></div>
    </div>
  );
};

export default SleepIllustration;
