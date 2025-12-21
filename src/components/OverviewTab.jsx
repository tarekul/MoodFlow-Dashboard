import CorrelationChart from "./CorrelationChart";
import SummaryCard from "./SummaryCard";
import TimeSeriesChart from "./TimeSeriesChart";
import TrophyCase from "./TrophyCase";

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

      <TrophyCase gamification={displayData.gamification} />

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
  );
};

export default OverviewTab;
