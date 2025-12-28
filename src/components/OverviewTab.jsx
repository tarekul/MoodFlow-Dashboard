import CorrelationChart from "./CorrelationChart";
import FeatureGuard from "./FeatureGuard";
import SummaryCard from "./SummaryCard";
import TimeSeriesChart from "./TimeSeriesChart";
import TrophyCase from "./TrophyCase";
import WeeklyRhythm from "./WeeklyRhythm";

const OverviewTab = ({ displayData, keyFactor, getSummaryDescription }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

      <FeatureGuard
        daysLogged={displayData.days_logged}
        requiredDays={3}
        title="Weekly Rhythm"
      >
        <WeeklyRhythm data={displayData.weekly_rhythm} />
      </FeatureGuard>

      <FeatureGuard
        daysLogged={displayData.days_logged}
        requiredDays={1}
        title="Badges"
      >
        <TrophyCase gamification={displayData.gamification} />
      </FeatureGuard>

      <TimeSeriesChart data={displayData.time_series} />

      <FeatureGuard
        daysLogged={displayData.days_logged}
        requiredDays={7}
        title="Correlations"
      >
        <CorrelationChart correlations={displayData.correlations} />
      </FeatureGuard>
    </div>
  );
};

export default OverviewTab;
