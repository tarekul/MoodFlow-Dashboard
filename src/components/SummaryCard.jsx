import React from "react";

function SummaryCard({ title, value, unit, description, color }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
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
