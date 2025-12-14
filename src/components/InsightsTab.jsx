import BoosterCard from "./BoosterCard";
import DrainerCard from "./DrainerCard";
import LockedInsightsTab from "./LockedInsightsTab";
import SmartInsightsCard from "./SmartInsightsCard";
import TopRecommendation from "./TopRecommendation";

const InsightsTab = ({ displayData }) => {
  return displayData.boosters.length > 0 ? (
    <div className="space-y-4 sm:space-y-6">
      <SmartInsightsCard insights={displayData.smart_insights} />
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
    <LockedInsightsTab displayData={displayData} />
  );
};

export default InsightsTab;
