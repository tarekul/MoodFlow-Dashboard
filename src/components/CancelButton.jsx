const CancelButton = ({ navigate }) => {
  return (
    <button
      onClick={() => navigate("/my-logs")}
      className="fixed top-6 right-6 px-4 py-2 text-gray-600 hover:text-gray-900 z-50"
    >
      Cancel
    </button>
  );
};

export default CancelButton;
