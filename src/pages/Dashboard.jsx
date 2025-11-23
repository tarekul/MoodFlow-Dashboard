import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionPlanCard from "../components/ActionPlanCard.jsx";
import BoosterCard from "../components/BoosterCard.jsx";
import CorrelationChart from "../components/CorrelationChart.jsx";
import DrainerCard from "../components/DrainerCard.jsx";
import Footer from "../components/Footer.jsx";
import StreakMilestone from "../components/StreakMilestone.jsx";
import SummaryCard from "../components/SummaryCard.jsx";
import TabNavigation from "../components/TabNavigation.jsx";
import TimeSeriesChart from "../components/TimeSeriesChart.jsx";
import TopRecommendation from "../components/TopRecommendation.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { analysisAPI, logsAPI } from "../utils/api.js";
import calculateStreak from "../utils/calculateStreak.js";
import { getSummaryDescription } from "../utils/helpers.js";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logsLoading, setLogsLoading] = useState(true);
  // Removed unused 'error' state variable
  const [streak, setStreak] = useState(0);
  const [showMilestone, setShowMilestone] = useState(true);
  const [previousStreak, setPreviousStreak] = useState(null);

  // Fetch analysis from API
  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const data = await analysisAPI.getAnalysis();
      setUserData(data);
    } catch (err) {
      // Expected error when user has < 7 days of data - don't log to console
      if (err.response?.status === 400) {
        // We don't set an error state here because we handle the lack of data
        // by showing the temporary dashboard.
        console.log("Analysis not ready yet (expected for new users)");
      } else {
        // Unexpected errors should still be logged
        console.error("Analysis error:", err);
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

  // Calculate temporary user data if backend analysis is not ready
  const getTemporaryUserData = () => {
    if (!logs || logs.length === 0) return null;

    const avg = (key) =>
      logs.reduce((sum, log) => sum + (log[key] || 0), 0) / logs.length;

    return {
      days_logged: logs.length,
      date_range: {
        start: logs[logs.length - 1]?.log_date || "N/A",
        end: logs[0]?.log_date || "N/A",
      },
      summary: {
        avg_productivity: avg("productivity"),
        avg_mood: avg("mood"),
        avg_sleep: avg("sleep_hours"),
        avg_stress: avg("stress"),
      },
      // Map logs to chart format and reverse to show oldest to newest
      time_series: logs
        .map((log) => ({
          log_date: log.log_date,
          mood: log.mood,
          productivity: log.productivity,
          stress: log.stress,
        }))
        .reverse(),
      correlations: [], // Empty for now
      boosters: [],
      drainers: [],
      action_plan: [],
      population_comparison: [],
      // Dummy top recommendation to prevent crashes
      top_recommendation: {
        factor: "Consistency",
        correlation: 0,
        potential_gain: 0,
      },
    };
  };

  // Use real data if available, otherwise use calculated temporary data
  const displayData = userData || getTemporaryUserData();

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

  // Empty State - Only show if absolutely NO logs
  if (logs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center">
            <div className="text-5xl sm:text-6xl mb-4">📊</div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
              Welcome to MoodFlow!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Start tracking your days to unlock personalized insights.
            </p>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
              <p className="text-xs sm:text-sm text-indigo-800">
                💡 <strong>Tip:</strong> Log at least 7 days of mood,
                productivity, sleep, and stress data to get your personalized AI
                analysis!
              </p>
            </div>

            <button
              onClick={() => navigate("/log-entry")}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all mb-3"
            >
              Start Logging
            </button>

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

  if (!displayData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-base sm:text-xl text-gray-600">
            Processing data...
          </div>
        </div>
      </div>
    );
  }

  // Get key factor for badges (only if real analysis exists)
  const keyFactor = userData?.correlations?.[0]?.factor;

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
                  {displayData.days_logged}
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
                    {displayData.days_logged}
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
        {/* BANNER FOR NEW USERS */}
        {!userData && logs.length > 0 && (
          <div
            className="bg-indigo-50 border-l-4 border-indigo-500 text-indigo-700 p-4 mb-6 rounded shadow-sm flex items-start gap-3"
            role="alert"
          >
            <span className="text-2xl">👋</span>
            <div>
              <p className="font-bold">Welcome to your Dashboard!</p>
              <p className="text-sm sm:text-base">
                You are seeing your daily stats. Detailed AI analysis
                (correlations, boosters, and action plans) will unlock after{" "}
                <strong>7 days of logging</strong>. ({7 - logs.length} days to
                go!)
              </p>
            </div>
          </div>
        )}

        {activeTab === "overview" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Summary Cards - Responsive Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <SummaryCard
                title="Avg Productivity"
                value={displayData.summary.avg_productivity.toFixed(1)}
                unit="/10"
                description={getSummaryDescription(
                  "productivity",
                  displayData.summary.avg_productivity
                )}
                color="text-indigo-600"
                isKeyFactor={false}
              />
              <SummaryCard
                title="Avg Mood"
                value={displayData.summary.avg_mood.toFixed(1)}
                unit="/10"
                description={getSummaryDescription(
                  "mood",
                  displayData.summary.avg_mood
                )}
                color="text-purple-600"
                isKeyFactor={keyFactor === "Mood"}
              />
              <SummaryCard
                title="Avg Sleep"
                value={displayData.summary.avg_sleep.toFixed(1)}
                unit="hrs"
                description={getSummaryDescription(
                  "sleep",
                  displayData.summary.avg_sleep
                )}
                color="text-blue-600"
                isKeyFactor={keyFactor === "Sleep Hours"}
              />
              <SummaryCard
                title="Avg Stress"
                value={displayData.summary.avg_stress.toFixed(1)}
                unit="/10"
                description={getSummaryDescription(
                  "stress",
                  displayData.summary.avg_stress
                )}
                color="text-red-600"
                isKeyFactor={keyFactor === "Stress"}
              />
            </div>

            <TimeSeriesChart data={displayData.time_series} />

            {/* Only show Correlation Chart if we actually have data for it */}
            {displayData.correlations.length > 0 ? (
              <CorrelationChart correlations={displayData.correlations} />
            ) : (
              <div className="bg-white p-8 rounded-lg text-center text-gray-500 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center h-[300px]">
                <div className="text-4xl mb-2">📊</div>
                <h3 className="text-lg font-semibold text-gray-700">
                  Correlation Analysis Locked
                </h3>
                <p className="text-gray-500 max-w-md">
                  Keep logging! We need a few more days of data to identify what
                  boosts or drains your productivity.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Hide Insights/Action Plan tabs if we don't have full data */}
        {activeTab === "insights" &&
          (displayData.boosters.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              <TopRecommendation
                top_recommendation={displayData.top_recommendation}
                summary={displayData.summary}
              />
              <BoosterCard
                boosters={displayData.boosters}
                comparisons={displayData.population_comparison || []}
              />
              <DrainerCard
                drainers={displayData.drainers}
                comparisons={displayData.population_comparison || []}
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-100">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                Insights Locked
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                Your personalized boosters, drainers, and recommendations will
                appear here once you've logged 7 days of data.
              </p>
              <div className="mt-6 w-full max-w-xs mx-auto bg-gray-100 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      (displayData.days_logged / 7) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {displayData.days_logged}/7 days logged
              </p>
            </div>
          ))}

        {activeTab === "action-plan" &&
          (displayData.action_plan.length > 0 ? (
            <ActionPlanCard action_plan={displayData.action_plan} />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-100">
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                Action Plan Locked
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                We need more data to generate a personalized weekly action plan
                for you. Keep logging!
              </p>
            </div>
          ))}
      </main>

      <Footer userData={displayData} />
    </div>
  );
}

export default Dashboard;
