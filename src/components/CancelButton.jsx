import React from "react";

const CancelButton = ({ navigate }) => {
  return (
    <button
      onClick={() => navigate("/my-logs")}
      className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md border border-gray-100 transition-all text-gray-400 hover:text-red-500 active:scale-95"
      aria-label="Cancel"
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
