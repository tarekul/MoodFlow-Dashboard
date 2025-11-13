const ScreenTimeIllustration = () => {
  return (
    <div className="my-12 flex items-center justify-center">
      <div className="w-64 h-40 relative">
        {/* Stylized eye reflecting a screen */}
        {/* Outer eye shape */}
        <div className="w-full h-full bg-white rounded-[50%] border-4 border-gray-800"></div>
        {/* Iris */}
        <div className="absolute w-20 h-20 bg-blue-500 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        {/* Pupil */}
        <div className="absolute w-10 h-10 bg-gray-800 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        {/* Screen glare reflection */}
        <div className="absolute w-5 h-5 bg-white rounded-sm top-[45%] left-[48%] -translate-x-1/2 -translate-y-1/2 opacity-90 rotate-12"></div>
      </div>
    </div>
  );
};

export default ScreenTimeIllustration;
