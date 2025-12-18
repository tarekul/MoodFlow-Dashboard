const ExitButton = ({ navigate }) => {
  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-all text-gray-500 hover:text-gray-800 active:scale-95"
    >
      <svg
        className="h-4 w-4"
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
