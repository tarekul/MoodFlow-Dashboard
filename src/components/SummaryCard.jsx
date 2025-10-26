import React from "react";

function SummaryCard({ title, value, unit, description, color, isKeyFactor }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 relative transition-all
      ${isKeyFactor ? "ring-2 ring-indigo-500 shadow-lg" : ""}`}
    >
      {isKeyFactor && (
        <span
          className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-600 
                         to-purple-600 text-white text-xs px-3 py-1 rounded-full 
                         font-bold shadow-md"
        >
          🔥 Key Factor
        </span>
      )}
      <div className="text-sm text-gray-600">{title}</div>
      <div className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
        {unit}
      </div>
      <div className="text-sm text-gray-500 mt-1">{description}</div>
    </div>
  );
}

export default SummaryCard;
