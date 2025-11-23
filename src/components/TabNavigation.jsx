import React from "react";

function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", label: "📊 Overview" },
    { id: "insights", label: "💡 Insights" },
    { id: "action-plan", label: "🎯 Action Plan" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-1 flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            flex-1 py-3 px-4 rounded-md font-medium 
            transition-all duration-200
            ${
              activeTab === tab.id
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabNavigation;
