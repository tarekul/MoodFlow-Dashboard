const CalmVsChaoticIllustration = () => {
  return (
    <div className="my-12 flex items-center justify-center">
      <div className="w-64 h-64 relative">
        {/* Calm Side - Smooth, parallel lines */}
        <div className="absolute w-1/2 h-1 bg-blue-300 top-1/4 left-0 rotate-[15deg] rounded-full opacity-80"></div>
        <div className="absolute w-1/2 h-1 bg-green-300 top-1/2 left-0 rotate-[15deg] rounded-full opacity-80"></div>
        <div className="absolute w-1/2 h-1 bg-blue-400 top-3/4 left-0 rotate-[15deg] rounded-full opacity-80"></div>

        {/* Divider (optional, subtle) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gray-300"></div>

        {/* Chaotic Side - Tangled, intersecting lines */}
        <div className="absolute w-1/2 h-1 bg-yellow-400 top-[40%] right-0 -rotate-[30deg] rounded-full"></div>
        <div className="absolute w-1/2 h-1 bg-orange-400 top-[60%] right-0 rotate-[50deg] rounded-full"></div>
        <div className="absolute w-1/2 h-1 bg-red-500 top-[50%] right-0 rotate-[120deg] rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default CalmVsChaoticIllustration;
