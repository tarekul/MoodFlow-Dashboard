import React, { useState } from "react";
import SummaryCard from "./components/SummaryCard";
import TabNavigation from "./components/TabNavigation";
import { allUsersData } from "./data/userData";

function App() {
  const [selectedUser, setSelectedUser] = useState("U022");
  const [activeTab, setActiveTab] = useState("overview"); // NEW: Tab state

  // Get current user's data
  const userData = allUsersData[selectedUser];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-indigo-600">
                MoodFlow Analytics
              </h1>
              <p className="text-gray-600 mt-1">
                Discover your unique productivity drivers
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Days Logged</div>
              <div className="text-2xl font-bold text-indigo-600">
                {userData.days_logged}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation - NEW */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <SummaryCard
                title="Avg Productivity"
                value={userData.summary.avg_productivity.toFixed(1)}
                unit="/10"
                description="Good range"
                color="text-indigo-600"
              />
              <SummaryCard
                title="Avg Mood"
                value={userData.summary.avg_mood.toFixed(1)}
                unit="/10"
                description="Room to improve"
                color="text-purple-600"
              />
              <SummaryCard
                title="Avg Sleep"
                value={userData.summary.avg_sleep.toFixed(1)}
                unit="hrs"
                description="Solid performance"
                color="text-blue-600"
              />
              <SummaryCard
                title="Avg Stress"
                value={userData.summary.avg_stress.toFixed(1)}
                unit="/10"
                description="Good range"
                color="text-red-600"
              />
            </div>

            {/* Placeholder for charts - we'll add these in Phase 4 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                📈 Trends Over Time
              </h2>
              <p className="text-gray-600">Chart coming in Phase 4...</p>
            </div>
          </div>
        )}

        {activeTab === "insights" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              💡 Insights
            </h2>
            <p className="text-gray-600">
              Insights content coming in Phase 6...
            </p>
          </div>
        )}

        {activeTab === "action-plan" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              🎯 Action Plan
            </h2>
            <p className="text-gray-600">Action plan coming in Phase 7...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
