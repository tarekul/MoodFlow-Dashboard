const Toast = ({ toast, onClose }) => {
  const styles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-white",
  };

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "⚠",
  };

  return (
    <div
      className={`${
        styles[toast.type]
      } px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md pointer-events-auto animate-slide-in-right`}
    >
      <span className="text-2xl">{icons[toast.type]}</span>
      <span className="flex-1 font-medium">{toast.message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 transition-colors text-xl"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
