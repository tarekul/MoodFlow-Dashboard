import { useState } from "react";
import BoosterCard from "./BoosterCard";
import DataStoryModal from "./DataStoryModal";
import DrainerCard from "./DrainerCard";
import FeatureGuard from "./FeatureGuard";
import SmartInsightsCard from "./SmartInsightsCard";
import TopRecommendation from "./TopRecommendation";

const InsightsTab = ({ displayData, storyData }) => {
  const [showStory, setShowStory] = useState(false);

  return (
    <div className="space-y-4 sm:space-y-6">
      <FeatureGuard
        daysLogged={displayData.days_logged}
        requiredDays={5}
        title="Smart Insights"
      >
        <SmartInsightsCard
          insights={displayData.smart_insights}
          daysLogged={displayData.days_logged}
          setShowStory={setShowStory}
        />
      </FeatureGuard>
      <FeatureGuard
        daysLogged={displayData.days_logged}
        requiredDays={7}
        title="Top Recommendation"
      >
        <TopRecommendation
          top_recommendation={displayData.top_recommendation}
          summary={displayData.summary}
        />
      </FeatureGuard>
      <FeatureGuard
        daysLogged={displayData.days_logged}
        requiredDays={7}
        title="Boosters"
      >
        <BoosterCard
          boosters={displayData.boosters}
          comparisons={displayData.population_comparison || []}
        />
      </FeatureGuard>
      <FeatureGuard
        daysLogged={displayData.days_logged}
        requiredDays={7}
        title="Drainers"
      >
        <DrainerCard
          drainers={displayData.drainers}
          comparisons={displayData.population_comparison || []}
        />
      </FeatureGuard>
      {showStory && storyData && (
        <DataStoryModal
          storyData={storyData}
          onClose={() => setShowStory(false)}
        />
      )}
    </div>
  );
};

export default InsightsTab;
