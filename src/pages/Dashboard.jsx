import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionPlanCard from "../components/ActionPlanCard";
import BoosterCard from "../components/BoosterCard";
import CorrelationChart from "../components/CorrelationChart";
import DrainerCard from "../components/DrainerCard";
import Footer from "../components/Footer";
import StreakMilestone from "../components/StreakMilestone";
import SummaryCard from "../components/SummaryCard";
import TabNavigation from "../components/TabNavigation";
import TimeSeriesChart from "../components/TimeSeriesChart";
import TopRecommendation from "../components/TopRecommendation";
import { useAuth } from "../contexts/AuthContext";
import { analysisAPI, logsAPI } from "../utils/api";
import calculateStreak from "../utils/calculateStreak";
import { getSummaryDescription } from "../utils/helpers";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logsLoading, setLogsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [streak, setStreak] = useState(0);
  const [showMilestone, setShowMilestone] = useState(true);
  const [previousStreak, setPreviousStreak] = useState(null);

  // Fetch analysis from API
  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const data = await analysisAPI.getAnalysis();
      setUserData(data);
      setError(null);
    } catch (err) {
      // Expected error when user has < 7 days of data - don't log to console
      if (err.response?.status === 400) {
        setError(err.response.data.detail || "Need at least 7 days of data");
      } else {
        // Unexpected errors should still be logged
        console.error("Analysis error:", err);
        setError("Failed to load analysis");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      setLogsLoading(true);
      const data = await logsAPI.getMyLogs();
      setLogs(data);
    } catch (err) {
      console.error("Failed to load logs:", err);
    } finally {
      setLogsLoading(false);
    }
  };

  // Fetch both in parallel on mount
  useEffect(() => {
    Promise.all([fetchAnalysis(), fetchLogs()]);
  }, []);

  // Calculate streak whenever logs change
  useEffect(() => {
    if (logs.length > 0) {
      const newStreak = calculateStreak(logs);

      // Check if we hit a milestone
      const milestones = [7, 14, 30, 60, 90, 100];
      if (
        previousStreak !== null &&
        milestones.includes(newStreak) &&
        newStreak > previousStreak
      ) {
        setShowMilestone(true);
      }

      setPreviousStreak(newStreak);
      setStreak(newStreak);
    }
  }, [logs, previousStreak]);

  // Loading state - wait for both to finish
  if (loading || logsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Loading your analysis...
          </div>
          <div className="text-sm sm:text-base text-gray-600">
            Analyzing your productivity patterns
          </div>
        </div>
      </div>
    );
  }

  // Error state - need more data
  if (error) {
    // Calculate progress if we have logs
    const daysLogged = logs.length;
    const daysNeeded = 7;
    const progress = Math.min((daysLogged / daysNeeded) * 100, 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center">
            <div className="text-5xl sm:text-6xl mb-4">📊</div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
              {daysLogged > 0 ? "Almost There!" : "Need More Data"}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-2">
              Logged in as: <span className="font-semibold">{user?.email}</span>
            </p>

            {daysLogged > 0 ? (
              <>
                {/* Progress Bar */}
                <div className="my-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {daysLogged} / {daysNeeded} days logged
                    </span>
                    <span className="text-sm font-bold text-indigo-600">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-indigo-600 font-semibold mt-2">
                    {daysNeeded - daysLogged} more{" "}
                    {daysNeeded - daysLogged === 1 ? "day" : "days"} to unlock
                    analysis! 🎯
                  </p>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                  <p className="text-xs sm:text-sm text-indigo-800">
                    🌟 <strong>Keep going!</strong> Log{" "}
                    {daysNeeded - daysLogged} more{" "}
                    {daysNeeded - daysLogged === 1 ? "day" : "days"} to get your
                    personalized productivity insights with correlation
                    analysis!
                  </p>
                </div>

                <button
                  onClick={() => navigate("/log-entry")}
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all mb-3"
                >
                  + Log Today
                </button>
              </>
            ) : (
              <>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                  {error}
                </p>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                  <p className="text-xs sm:text-sm text-indigo-800">
                    💡 <strong>Tip:</strong> Log at least 7 days of mood,
                    productivity, sleep, and stress data to get your
                    personalized analysis!
                  </p>
                </div>

                <button
                  onClick={() => navigate("/log-entry")}
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all mb-3"
                >
                  Start Logging
                </button>
              </>
            )}

            <div className="mt-4">
              <button
                onClick={logout}
                className="w-full sm:w-auto px-6 py-2 text-gray-600 hover:text-gray-900 font-medium border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-base sm:text-xl text-gray-600">
            Loading your data...
          </div>
        </div>
      </div>
    );
  }

  // Get key factor for badges
  const keyFactor = userData.correlations[0]?.factor;

  const hasLoggedToday = logs.some(
    (log) => log.log_date === new Date().toISOString().split("T")[0]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Streak Milestone Modal */}
      {showMilestone && (
        <StreakMilestone
          streak={streak}
          onClose={() => setShowMilestone(false)}
        />
      )}

      {/* Header - Responsive Layout */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between">
            {/* Left: Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                MoodFlow Dashboard
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                Discover your unique productivity drivers
              </p>
            </div>

            {/* Right: All Actions & Stats */}
            <div className="flex items-center gap-3">
              {/* Status Badge */}
              {hasLoggedToday ? (
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-3 rounded-xl text-center shadow-md">
                  <div className="text-xl font-bold">✓</div>
                  <div className="text-xs opacity-90 whitespace-nowrap">
                    logged today
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/log-entry")}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all whitespace-nowrap"
                >
                  + Log Today
                </button>
              )}

              {/* My Logs Button */}
              <button
                onClick={() => navigate("/my-logs")}
                className="px-5 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-100 transition-all whitespace-nowrap"
              >
                My Logs
              </button>

              {/* Days Logged */}
              <div className="text-center px-3">
                <div className="text-xs text-gray-600">Days Logged</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {userData.days_logged}
                </div>
              </div>

              {/* Streak Badge */}
              <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-3 rounded-xl text-center shadow-md">
                <div className="text-2xl font-bold">{streak}🔥</div>
                <div className="text-xs opacity-90 whitespace-nowrap">
                  day streak
                </div>
              </div>

              {/* User Info */}
              <div className="text-right border-l border-gray-300 pl-3">
                <div className="text-xs text-gray-600">Logged in as</div>
                <div className="text-sm font-semibold text-gray-900">
                  {user?.email}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-all whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Tablet/Mobile Layout */}
          <div className="lg:hidden">
            {/* Title Section */}
            <div className="mb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                MoodFlow Dashboard
              </h1>
              <p className="text-sm sm:text-lg text-gray-600 mt-1">
                Discover your unique productivity drivers
              </p>
            </div>

            {/* Stats & Actions Section - Mobile Stacked */}
            <div className="space-y-3">
              {/* Row 1: Status Badge + Action Buttons + Streak */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {hasLoggedToday ? (
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-center shadow-md">
                    <div className="text-lg sm:text-xl font-bold">✓</div>
                    <div className="text-xs opacity-90 whitespace-nowrap">
                      logged today
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/log-entry")}
                    className="px-4 sm:px-5 py-2 bg-indigo-600 text-white rounded-full text-sm sm:text-base font-semibold hover:bg-indigo-700 transition-all whitespace-nowrap"
                  >
                    + Log Today
                  </button>
                )}

                <button
                  onClick={() => navigate("/my-logs")}
                  className="px-4 sm:px-5 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm sm:text-base font-semibold hover:bg-indigo-100 transition-all whitespace-nowrap"
                >
                  My Logs
                </button>

                {/* Streak Badge */}
                <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-center shadow-md ml-auto sm:ml-0">
                  <div className="text-lg sm:text-2xl font-bold">
                    {streak}🔥
                  </div>
                  <div className="text-xs opacity-90 whitespace-nowrap">
                    day streak
                  </div>
                </div>
              </div>

              {/* Row 2: User Info + Stats + Logout */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-between">
                {/* User Email - Hidden on smallest screens, shown as compact on small+ */}
                <div className="hidden xs:block text-left">
                  <div className="text-xs text-gray-600">Logged in as:</div>
                  <div className="text-sm font-semibold text-gray-900 truncate max-w-[150px] sm:max-w-none">
                    {user?.email}
                  </div>
                </div>

                {/* Days Logged */}
                <div className="text-left sm:text-center">
                  <div className="text-xs text-gray-600">Days Logged</div>
                  <div className="text-xl sm:text-2xl font-bold text-indigo-600">
                    {userData.days_logged}
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-600 hover:text-gray-900 font-medium border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-all whitespace-nowrap ml-auto"
                >
                  Logout
                </button>
              </div>

              {/* Row 3: User Email on Mobile (only shown on smallest screens) */}
              <div className="xs:hidden text-center py-2 border-t border-gray-200">
                <div className="text-xs text-gray-600">Logged in as:</div>
                <div className="text-sm font-semibold text-gray-900 truncate">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {activeTab === "overview" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Summary Cards - Responsive Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
          <div className="space-y-4 sm:space-y-6">
            <TopRecommendation
              top_recommendation={userData.top_recommendation}
              summary={userData.summary}
            />
            <BoosterCard
              boosters={userData.boosters}
              comparisons={userData.population_comparison}
            />
            <DrainerCard
              drainers={userData.drainers}
              comparisons={userData.population_comparison}
            />
          </div>
        )}

        {activeTab === "action-plan" && (
          <ActionPlanCard action_plan={userData.action_plan} />
        )}
      </main>

      <Footer userData={userData} />
    </div>
  );
}

export default Dashboard;
