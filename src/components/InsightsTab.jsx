import { useState } from "react";
import BoosterCard from "./BoosterCard";
import DataStoryModal from "./DataStoryModal";
import DrainerCard from "./DrainerCard";
import LockedInsightsTab from "./LockedInsightsTab";
import SmartInsightsCard from "./SmartInsightsCard";
import TopRecommendation from "./TopRecommendation";

const InsightsTab = ({ displayData, storyData }) => {
  const [showStory, setShowStory] = useState(false);
  return displayData.boosters.length > 0 ? (
    <div className="space-y-4 sm:space-y-6">
      <SmartInsightsCard
        insights={displayData.smart_insights}
        setShowStory={setShowStory}
      />
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
      {showStory && storyData && (
        <DataStoryModal
          storyData={storyData}
          onClose={() => setShowStory(false)}
        />
      )}
    </div>
  ) : (
    <LockedInsightsTab displayData={displayData} />
  );
};

export default InsightsTab;
