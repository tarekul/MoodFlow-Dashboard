import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./providers/AuthProvider";
import { analysisAPI } from "./utils/api";

// Import your existing components
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
import { getSummaryDescription } from "./utils/helpers";

// Your existing Dashboard component - now fetches from API
function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analysis from API
  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const data = await analysisAPI.getAnalysis();
        setUserData(data);
        setError(null);
      } catch (err) {
        console.error("Analysis error:", err);
        if (err.response?.status === 400) {
          setError(err.response.data.detail || "Need at least 7 days of data");
        } else {
          setError("Failed to load analysis");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-2xl font-bold text-gray-900 mb-2">
            Loading your analysis...
          </div>
          <div className="text-gray-600">
            Analyzing your productivity patterns
          </div>
        </div>
      </div>
    );
  }

  // Error state - need more data
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Need More Data
            </h2>
            <p className="text-gray-600 mb-2">
              Logged in as: <span className="font-semibold">{user?.email}</span>
            </p>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-indigo-800">
                💡 <strong>Tip:</strong> Log at least 7 days of mood,
                productivity, sleep, and stress data to get your personalized
                analysis!
              </p>
            </div>
            <button
              onClick={logout}
              className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get key factor for badges
  const keyFactor = userData.correlations[0]?.factor;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header - Updated without user selector */}
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

            {/* User Info - Replaced dropdown with logged-in user info */}
            <div className="flex items-center gap-6 self-start md:self-auto">
              <div className="text-right">
                <div className="text-sm text-gray-600">Logged in as:</div>
                <div className="font-semibold text-gray-900">{user?.email}</div>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-600">Days Logged</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {userData.days_logged}
                </div>
              </div>

              <button
                onClick={logout}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content - Your existing code works as-is! */}
      <main className="max-w-7xl mx-auto px-4 py-6">
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
                isKeyFactor={keyFactor === "Sleep Hours"}
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

// Main App component with routing
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
