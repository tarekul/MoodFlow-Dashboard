const ProductivityIllustration = () => (
  <div className="w-64 h-64 relative flex items-end justify-center">
    {/* Bar chart */}
    <div className="flex gap-4 items-end h-48">
      <div className="w-12 h-20 bg-indigo-300 rounded-t-lg"></div>
      <div className="w-12 h-32 bg-indigo-400 rounded-t-lg"></div>
      <div className="w-12 h-40 bg-indigo-500 rounded-t-lg"></div>
      <div className="w-12 h-24 bg-indigo-400 rounded-t-lg"></div>
    </div>
  </div>
);

export default ProductivityIllustration;
