const CancelButton = ({ navigate }) => {
  return (
    <button
      onClick={() => navigate("/my-logs")}
      className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-md border border-gray-100 hover:shadow-lg transition-all text-gray-400 hover:text-red-500 active:scale-95"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};
export default CancelButton;
