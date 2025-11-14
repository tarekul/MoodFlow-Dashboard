const MoonIllustration = () => {
  return (
    <div className="my-12">
      {/* TODO: Add illustration or use CSS to create something similar */}
      <div className="w-40 h-40 relative">
        {/* Moon circle */}
        <div className="absolute inset-0 bg-indigo-300 rounded-full opacity-50" />
        {/* Wave pattern - simplified */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-50 to-indigo-100"
          style={{ clipPath: "ellipse(100% 74% at 60% 96%)" }}
        />
        {/* Spaced wave lines */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-br from-blue-50 to-indigo-300"
          style={{ clipPath: "ellipse(100% 94% at 60% 96%)" }}
        />
        <div
          className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-br from-blue-50 to-indigo-300 opacity-80"
          style={{ clipPath: "ellipse(110% 90% at 55% 96%)" }}
        />
        <div
          className="absolute bottom-4 left-0 right-0 h-1 bg-gradient-to-br from-blue-50 to-indigo-300 opacity-60"
          style={{ clipPath: "ellipse(105% 92% at 65% 96%)" }}
        />
        <div
          className="absolute bottom-6 left-0 right-0 h-1 bg-gradient-to-br from-blue-50 to-indigo-300 opacity-40"
          style={{ clipPath: "ellipse(100% 94% at 60% 96%)" }}
        />
      </div>
    </div>
  );
};

export default MoonIllustration;
