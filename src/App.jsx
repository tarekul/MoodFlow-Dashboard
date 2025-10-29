import React, { useState } from "react";
import ActionPlanCard from "./components/ActionPlanCard";
import BoosterCard from "./components/BoosterCard";
import CorrelationChart from "./components/CorrelationChart";
import DrainerCard from "./components/DrainerCard";
import Footer from "./components/Footer";
import PopulationComparison from "./components/PopulationComparison";
import ProductivityPredictor from "./components/ProductivityPredictor";
import SummaryCard from "./components/SummaryCard";
import TabNavigation from "./components/TabNavigation";
import TimeSeriesChart from "./components/TimeSeriesChart";
import TopRecommendation from "./components/TopRecommendation";
import { allUsersData } from "./data/userData";
import { getSummaryDescription } from "./utils/helpers";

function App() {
  const [selectedUser, setSelectedUser] = useState("U022");
  const [activeTab, setActiveTab] = useState("overview"); // NEW: Tab state

  // Get current user's data
  const userData = allUsersData[selectedUser];
  const keyFactor = userData.correlations[0].factor; // Top correlation

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">
                MoodFlow Dashboard
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                Discover your unique productivity drivers
              </p>
            </div>
            <div className="flex items-center gap-4 self-start md:self-auto">
              {/* User Selector */}
              <div>
                <label className="text-sm text-gray-600 block mb-1">
                  User:
                </label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="border-2 border-gray-300 rounded-lg px-4 py-2 
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 bg-white text-gray-700 font-medium cursor-pointer
                 transition-all duration-200 hover:border-indigo-400"
                >
                  <option value="U022">U022 - Mood-Driven</option>
                  <option value="U007">U007 - High Performer</option>
                  <option value="U001">U001 - Screen-Sensitive</option>
                </select>
              </div>

              {/* Days Logged */}
              <div className="text-right">
                <div className="text-sm text-gray-600">Days Logged</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {userData.days_logged}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
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
                description={getSummaryDescription(
                  "productivity",
                  userData.summary.avg_productivity
                )}
                color="text-indigo-600"
                isKeyFactor={false}
              />
              <SummaryCard
                title="Avg Mood"
                value={userData.summary.avg_mood.toFixed(1)}
                unit="/10"
                description={getSummaryDescription(
                  "mood",
                  userData.summary.avg_mood
                )}
                color="text-purple-600"
                isKeyFactor={keyFactor === "Mood"}
              />
              <SummaryCard
                title="Avg Sleep"
                value={userData.summary.avg_sleep.toFixed(1)}
                unit="hrs"
                description={getSummaryDescription(
                  "sleep",
                  userData.summary.avg_sleep
                )}
                color="text-blue-600"
                isKeyFactor={keyFactor === "Sleep"}
              />
              <SummaryCard
                title="Avg Stress"
                value={userData.summary.avg_stress.toFixed(1)}
                unit="/10"
                description={getSummaryDescription(
                  "stress",
                  userData.summary.avg_stress
                )}
                color="text-red-600"
                isKeyFactor={keyFactor === "Stress"}
              />
            </div>

            <TimeSeriesChart data={userData.time_series} />

            <CorrelationChart correlations={userData.correlations} />
          </div>
        )}

        {activeTab === "insights" && (
          <div className="space-y-6">
            <TopRecommendation
              top_recommendation={userData.top_recommendation}
              summary={userData.summary}
            />
            <PopulationComparison
              comparisons={userData.population_comparison}
            />
            <BoosterCard boosters={userData.boosters} />
            <DrainerCard drainers={userData.drainers} />
          </div>
        )}

        {activeTab === "forecast" && (
          <ProductivityPredictor userData={userData} />
        )}

        {activeTab === "action-plan" && (
          <ActionPlanCard action_plan={userData.action_plan} />
        )}
      </main>

      <Footer userData={userData} />
    </div>
  );
}

export default App;
