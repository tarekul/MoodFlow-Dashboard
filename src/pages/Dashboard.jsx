import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionPlanCard from "../components/ActionPlanCard.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import InsightsTab from "../components/InsightsTab.jsx";
import OverviewTab from "../components/OverviewTab.jsx";
import PerfectDayCard from "../components/PerfectDayCard.jsx";
import StreakMilestone from "../components/StreakMilestone.jsx";
import TabNavigation from "../components/TabNavigation.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { analysisAPI, logsAPI } from "../utils/api.js";
import calculateStreak from "../utils/calculateStreak.js";
import { getLocalDateString, getSummaryDescription } from "../utils/helpers.js";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(null);
  const [storyData, setStoryData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logsLoading, setLogsLoading] = useState(true);
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
      if (err.response?.status === 400) {
        console.log("Analysis not ready yet (expected for new users)");
      } else {
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

  useEffect(() => {
    Promise.all([fetchAnalysis(), fetchLogs()]);
  }, []);

  useEffect(() => {
    const fetchStory = async () => {
      const story = await analysisAPI.getStory();
      console.log(story);
      setStoryData(story);
    };
    fetchStory();
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
      time_series: logs
        .map((log) => ({
          log_date: log.log_date,
          mood: log.mood,
          productivity: log.productivity,
          stress: log.stress,
        }))
        .reverse(),
      correlations: [],
      boosters: [],
      drainers: [],
      action_plan: [],
      population_comparison: [],
      top_recommendation: {
        factor: "Consistency",
        correlation: 0,
        potential_gain: 0,
      },
      weekly_rhythm: {
        chart_data: [],
        best_day: null,
        insight: "",
        percent_diff: 0,
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

  const todayStr = getLocalDateString();
  const todayLog = logs.find((log) => log.log_date === todayStr);
  const isFullyLogged = todayLog && todayLog.productivity !== null;
  const isPartiallyLogged = todayLog && todayLog.productivity === null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Streak Milestone Modal */}
      {showMilestone && (
        <StreakMilestone
          streak={streak}
          onClose={() => setShowMilestone(false)}
        />
      )}

      {/* Header */}
      <Header
        isFullyLogged={isFullyLogged}
        isPartiallyLogged={isPartiallyLogged}
        todayLog={todayLog}
        navigate={navigate}
        displayData={displayData}
        streak={streak}
        user={user}
        logout={logout}
      />

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 flex-grow w-full">
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
          <OverviewTab
            displayData={displayData}
            keyFactor={keyFactor}
            getSummaryDescription={getSummaryDescription}
          />
        )}

        {activeTab === "insights" && (
          <InsightsTab displayData={displayData} storyData={storyData} />
        )}

        {activeTab === "action-plan" &&
          (displayData.action_plan.length > 0 ? (
            <>
              <PerfectDayCard blueprint={displayData.perfect_day} />
              <ActionPlanCard action_plan={displayData.action_plan} />
            </>
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
