const SleepIllustration = () => {
  return (
    <div className="my-12">
      <div className="w-64 h-64 relative">
        {/* Crescent Moon: Created by overlapping two circles */}
        <div className="w-40 h-40 bg-yellow-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
        <div className="w-32 h-32 bg-blue-50 rounded-full absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[60%]"></div>

        {/* Stars with Twinkle Effect*/}
        {/* Star 1: Standard Pulse */}
        <div className="w-2 h-2 bg-indigo-600 rounded-full absolute top-8 left-12 opacity-90 animate-pulse"></div>
        {/* Star 2: Delayed by 75ms */}
        <div className="w-1 h-1 bg-indigo-600 rounded-full absolute top-16 right-8 opacity-80 animate-pulse delay-75"></div>
        {/* Star 3: Delayed by 200ms */}
        <div className="w-1 h-1 bg-indigo-600 rounded-full absolute bottom-12 left-6 opacity-70 animate-pulse delay-200"></div>
        {/* Star 4: Delayed by 500ms */}
        <div className="w-2 h-2 bg-indigo-600 rounded-full absolute bottom-20 right-20 opacity-70 animate-pulse delay-500"></div>
        {/* Star 5: Delayed by 1s */}
        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full absolute top-24 left-24 opacity-60 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default SleepIllustration;
