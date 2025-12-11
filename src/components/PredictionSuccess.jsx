const PredictionSuccess = ({ prediction, navigate }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center animate-fade-in p-8 text-center">
      <div className="text-6xl mb-4">🔮</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Forecast Ready</h1>
      <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl my-6">
        <p className="text-lg text-indigo-900 font-medium">{prediction}</p>
      </div>
      <p className="text-gray-500 mb-8">
        Come back tonight to log your actual day!
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="px-8 py-3 bg-indigo-600 text-white rounded-full"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PredictionSuccess;
