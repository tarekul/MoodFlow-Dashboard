const ExitButton = ({ navigate }) => {
  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="fixed top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all duration-200 text-gray-500 hover:text-gray-800 z-50 backdrop-blur-sm border border-gray-200 hover:border-gray-300"
      aria-label="Close and return to dashboard"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default ExitButton;
