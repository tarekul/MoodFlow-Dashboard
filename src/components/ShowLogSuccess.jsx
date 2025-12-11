const ShowLogSuccess = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
      <div className="text-center">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-4xl font-serif mb-4 text-gray-900">Great job!</h1>
        <p className="text-gray-600 text-lg mb-8">
          Your day has been logged successfully
        </p>
        <div className="text-gray-400 text-sm">Redirecting to dashboard...</div>
      </div>
    </div>
  );
};

export default ShowLogSuccess;
