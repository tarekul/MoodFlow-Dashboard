import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionPlanCard from "../components/ActionPlanCard.jsx";
import FeatureGuard from "../components/FeatureGuard.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import OnboardingIdentities from "../components/IdentitySelector.jsx";
import InsightsTab from "../components/InsightsTab.jsx";
import OverviewTab from "../components/OverviewTab.jsx";
import PerfectDayCard from "../components/PerfectDayCard.jsx";
import StartHere from "../components/StartHere.jsx";
import StreakMilestone from "../components/StreakMilestone.jsx";
import TabNavigation from "../components/TabNavigation.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { analysisAPI, logsAPI } from "../utils/api.js";
import calculateStreak from "../utils/calculateStreak.js";
import { getLocalDateString, getSummaryDescription } from "../utils/helpers.js";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout, onboardIdentities } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const [logs, setLogs] = useState(() => {
    const cached = localStorage.getItem("correlate_logs");
    return cached ? JSON.parse(cached) : [];
  });

  const [userData, setUserData] = useState(() => {
    const cached = localStorage.getItem("correlate_analysis");
    return cached ? JSON.parse(cached) : null;
  });

  const [storyData, setStoryData] = useState(null);

  const [loading, setLoading] = useState(logs.length === 0);

  const [isSyncing, setIsSyncing] = useState(false);

  const [streak, setStreak] = useState(0);
  const [showMilestone, setShowMilestone] = useState(false);
  const [previousStreak, setPreviousStreak] = useState(null);

  useEffect(() => {
    const syncData = async () => {
      setIsSyncing(true);

      try {
        const freshLogs = await logsAPI.getMyLogs();

        const hasDataChanged =
          JSON.stringify(freshLogs) !== localStorage.getItem("correlate_logs");

        setLogs(freshLogs);
        localStorage.setItem("correlate_logs", JSON.stringify(freshLogs));

        if (!userData || hasDataChanged) {
          console.log("Data changed or missing, fetching fresh analysis...");
          try {
            const freshAnalysis = await analysisAPI.getAnalysis();
            setUserData(freshAnalysis);
            localStorage.setItem(
              "correlate_analysis",
              JSON.stringify(freshAnalysis)
            );
          } catch (err) {
            if (err.response?.status === 400) {
              console.log("Analysis not ready (new user)");
            }
          }
        } else {
          console.log("Data unchanged. Skipping analysis API call.");
        }
      } catch (err) {
        console.error("Background sync failed:", err);
      } finally {
        setLoading(false);
        setIsSyncing(false);
      }
    };

    syncData();
  }, []);

  useEffect(() => {
    const fetchStory = async () => {
      if (logs.length > 0) {
        try {
          const story = await analysisAPI.getStory();
          setStoryData(story);
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchStory();
  }, [logs.length]);

  useEffect(() => {
    if (logs.length > 0) {
      const newStreak = calculateStreak(logs);

      if (previousStreak !== null && newStreak > previousStreak) {
        const milestones = [7, 14, 30, 60, 90, 100];
        if (milestones.includes(newStreak)) {
          setShowMilestone(true);
        }
      }
      setPreviousStreak(newStreak);
      setStreak(newStreak);
    }
  }, [logs]);

  const getTemporaryUserData = () => {
    if (!logs || logs.length === 0) return null;
    const avg = (key) =>
      logs.reduce((sum, log) => sum + (log[key] || 0), 0) / logs.length;

    return {
      days_logged: logs.length,
      date_range: {
        start: logs[0]?.log_date || "N/A",
        end: logs[logs.length - 1]?.log_date || "N/A",
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
          sleep_hours: log.sleep_hours,
        }))
        .reverse(),
      correlations: [],
      boosters: [],
      drainers: [],
      action_plan: [],
      top_recommendation: null,
      weekly_rhythm: { chart_data: [] },
    };
  };

  const displayData = userData || getTemporaryUserData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900">
            Waking up your AI...
          </h2>
          <p className="text-sm text-gray-500 mt-2">This may take up to 60s.</p>
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    if (!user.has_onboarded) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <OnboardingIdentities
            onComplete={async () => {
              onboardIdentities();
            }}
          />
        </div>
      );
    }

    return <StartHere navigate={navigate} logout={logout} />;
  }
  const keyFactor = userData?.correlations?.[0]?.factor;
  const todayStr = getLocalDateString();
  const todayLog = logs.find((log) => log.log_date === todayStr);
  const isFullyLogged = todayLog && todayLog.productivity !== null;
  const isPartiallyLogged = todayLog && todayLog.productivity === null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {showMilestone && (
        <StreakMilestone
          streak={streak}
          onClose={() => setShowMilestone(false)}
        />
      )}

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

      {isSyncing && (
        <div className="bg-indigo-600 text-white text-xs py-1 px-4 text-center animate-pulse">
          <div className="flex items-center justify-center gap-2">
            <RefreshCw size={12} className="animate-spin" />
            <span>Syncing with server... (You can still browse)</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-4 sm:mt-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 flex-grow w-full">
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

        {activeTab === "action-plan" && (
          <div className="space-y-6">
            <FeatureGuard
              daysLogged={displayData.days_logged}
              requiredDays={7}
              title="Perfect Day DNA"
            >
              {displayData.perfect_day ? (
                <PerfectDayCard blueprint={displayData.perfect_day} />
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Not enough data for blueprint.
                </div>
              )}
            </FeatureGuard>
            <FeatureGuard
              daysLogged={displayData.days_logged}
              requiredDays={7}
              title="Weekly Action Plan"
            >
              <ActionPlanCard action_plan={displayData.action_plan} />
            </FeatureGuard>
          </div>
        )}
      </main>

      <Footer userData={displayData} />
    </div>
  );
}

export default Dashboard;
