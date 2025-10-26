import React, { useState } from "react";
import SummaryCard from "./components/SummaryCard";
import { allUsersData } from "./data/userData";
import { getSummaryDescription } from "./utils/helpers";

function App() {
  const [selectedUser, setSelectedUser] = useState("U022");

  // Get current user's data
  const userData = allUsersData[selectedUser];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SummaryCard
            title="Avg Productivity"
            value={userData.summary.avg_productivity.toFixed(1)}
            unit="/10"
            description={getSummaryDescription(
              "productivity",
              userData.summary.avg_productivity
            )}
            color="text-indigo-600"
          />

          {/* TODO: Add the other 3 cards here */}
          {/* - Avg Mood (use avg_mood, purple color) */}
          <SummaryCard
            title="Avg Mood"
            value={userData.summary.avg_mood.toFixed(1)}
            unit="/10"
            description={getSummaryDescription(
              "mood",
              userData.summary.avg_mood
            )}
            color="text-purple-600"
          />
          {/* - Avg Sleep (use avg_sleep, blue color, "hrs" unit) */}
          <SummaryCard
            title="Avg Sleep"
            value={userData.summary.avg_sleep.toFixed(1)}
            unit="hrs"
            description={getSummaryDescription(
              "sleep",
              userData.summary.avg_sleep
            )}
            color="text-blue-600"
          />
          {/* - Avg Stress (use avg_stress, red color) */}
          <SummaryCard
            title="Avg Stress"
            value={userData.summary.avg_stress.toFixed(1)}
            unit="/10"
            description={getSummaryDescription(
              "stress",
              userData.summary.avg_stress
            )}
            color="text-red-600"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
