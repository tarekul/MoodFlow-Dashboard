import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CalmVsChaoticIllustration from "../components/CalmVsChaoticIllustration";
import DietQualityIllustration from "../components/DietQualityIllustration";
import MoodIllustration from "../components/MoodIllustration";
import Notes from "../components/Notes";
import PhysicalActivityIllustration from "../components/PhysicalActivityIllustration";
import ProductivityIllustration from "../components/ProductivityIllustration";
import ProgressBar from "../components/ProgressBar";
import QuestionScreen from "../components/QuestionScreen";
import ScreenTimeSlider from "../components/ScreenTimeSlider";
import SleepScreen from "../components/SleepScreen";
import SocialInteractionsSlider from "../components/SocialInteractionsSlider";
import {
  ACTIVITY_TIME_OPTIONS,
  DIET_QUALITY_OPTIONS,
  getLocalDateString,
  MOOD_OPTIONS,
  PHYSICAL_ACTIVITY_OPTIONS,
  PRODUCTIVITY_OPTIONS,
  STRESS_OPTIONS,
} from "../utils/helpers";

import BlueprintSuccess from "../components/BlueprintSuccess";
import CancelButton from "../components/CancelButton";
import ContextTagsScreen from "../components/ContextTagsScreen";
import EditModeIndicator from "../components/EditModeIndicator";
import ExitButton from "../components/ExitButton";
import LogBackButton from "../components/LogBackButton";
import PredictionSuccess from "../components/PredictionSuccess";
import ShowLogSuccess from "../components/ShowLogSuccess";
import { analysisAPI, logsAPI } from "../utils/api";
import { checkBlueprintMatch } from "../utils/gamification";

const LogEntry = () => {
  const navigate = useNavigate();
  const { logId } = useParams();
  const isEditMode = Boolean(logId);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [matchResults, setMatchResults] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isMorningCheckIn, setIsMorningCheckIn] = useState(false);

  const [formData, setFormData] = useState({
    log_date: getLocalDateString(),
    mood: null,
    productivity: null,
    sleep_hours: null,
    sleep_quality: null,
    stress: null,
    physical_activity: null,
    activity_time: null,
    screen_time: null,
    diet_quality: null,
    social_interaction: null,
    notes: null,
    tags: [],
  });

  useEffect(() => {
    const hour = new Date().getHours();
    const isMorning = hour >= 5 && hour < 12;

    if (isMorning && !isEditMode) {
      setIsMorningCheckIn(true);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (isEditMode) {
      fetchLogData();
    }
  }, [logId]);

  const fetchLogData = async () => {
    try {
      setInitialLoading(true);
      const logs = await logsAPI.getMyLogs();
      const existingLog = logs.find((log) => log.id === parseInt(logId));

      if (existingLog) {
        setFormData({
          log_date: existingLog.log_date,
          mood: existingLog.mood,
          productivity: existingLog.productivity,
          sleep_hours: existingLog.sleep_hours,
          sleep_quality: existingLog.sleep_quality,
          stress: existingLog.stress,
          physical_activity: existingLog.physical_activity_min,
          activity_time: existingLog.activity_time,
          screen_time: existingLog.screen_time_hours,
          diet_quality: existingLog.diet_quality,
          social_interaction: existingLog.social_interaction_hours,
          notes: existingLog.notes,
          tags: existingLog.tags || [],
        });
      } else {
        setError("Log not found");
      }
    } catch (err) {
      setError("Failed to load log data");
      console.error(err);
    } finally {
      setInitialLoading(false);
    }
  };

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const goToNextStep = (dataSnapshot = formData) => {
    let nextIndex = currentStepIndex + 1;

    while (
      nextIndex < FLOW_CONFIG.length &&
      !FLOW_CONFIG[nextIndex].shouldShow(dataSnapshot)
    ) {
      nextIndex++;
    }

    if (nextIndex < FLOW_CONFIG.length) {
      setCurrentStepIndex(nextIndex);
    }
  };

  const goToPrevStep = () => {
    let prevIndex = currentStepIndex - 1;
    while (prevIndex >= 0 && !FLOW_CONFIG[prevIndex].shouldShow(formData)) {
      prevIndex--;
    }
    if (prevIndex >= 0) {
      setCurrentStepIndex(prevIndex);
    }
  };

  // --- API SUBMISSIONS ---

  const handleMorningSubmit = async (finalData) => {
    setLoading(true);
    try {
      const payload = {
        log_date: finalData.log_date,
        mood: finalData.mood,
        sleep_hours: finalData.sleep_hours,
        sleep_quality: finalData.sleep_quality,
      };

      await logsAPI.createLog(payload);

      const logs = await logsAPI.getMyLogs();
      if (logs.length > 7) {
        const analysis = await analysisAPI.getAnalysis();
        const forecast = analysis.smart_insights.find(
          (i) => i.type === "prediction"
        );
        if (forecast) {
          setPrediction(forecast.message);
          setShowSuccess(true);
          setLoading(false);
          return;
        }
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save morning log");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async (finalData) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        log_date: finalData.log_date,
        mood: finalData.mood,
        productivity: finalData.productivity,
        sleep_hours: finalData.sleep_hours,
        sleep_quality: finalData.sleep_quality,
        stress: finalData.stress,
        physical_activity_min: finalData.physical_activity,
        activity_time: finalData.activity_time,
        screen_time_hours: finalData.screen_time,
        diet_quality: finalData.diet_quality,
        social_interaction_hours: finalData.social_interaction,
        notes: finalData.notes,
        tags: finalData.tags,
      };

      if (isEditMode) {
        await logsAPI.updateLog(logId, payload);
      } else {
        await logsAPI.createLog(payload);
      }

      // Check Gamification (Blueprint Match)
      if (!isEditMode) {
        try {
          const analysis = await analysisAPI.getAnalysis();
          if (analysis?.perfect_day) {
            const matches = checkBlueprintMatch(
              finalData,
              analysis.perfect_day
            );
            if (matches && matches.length >= 3) {
              setMatchResults(matches);
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          console.log("Gamification check failed", e);
        }
      }

      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate(isEditMode ? "/my-logs" : "/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save log");
      setLoading(false);
    }
  };

  const FLOW_CONFIG = [
    {
      id: "mood",
      shouldShow: () => true,
      component: (
        <QuestionScreen
          title={
            isMorningCheckIn ? "Good Morning!" : "It's a new day to track!"
          }
          subtitle="Select the mood that best reflects how you feel at this moment."
          options={MOOD_OPTIONS}
          illustration={<MoodIllustration />}
          selectedValue={formData.mood}
          onSelect={(val) => {
            updateFormData({ mood: val });
            goToNextStep({ ...formData, mood: val });
          }}
        />
      ),
    },
    {
      id: "productivity",
      shouldShow: () => !isMorningCheckIn,
      component: (
        <QuestionScreen
          title="How productive were you?"
          subtitle="Think about what you accomplished today."
          options={PRODUCTIVITY_OPTIONS}
          illustration={<ProductivityIllustration />}
          selectedValue={formData.productivity}
          onSelect={(val) => {
            updateFormData({ productivity: val });
            goToNextStep({ ...formData, productivity: val });
          }}
        />
      ),
    },
    {
      id: "sleep",
      shouldShow: () => true,
      component: (
        <SleepScreen
          initialHours={formData.sleep_hours}
          initialQuality={formData.sleep_quality}
          onComplete={(hours, quality) => {
            const updated = {
              ...formData,
              sleep_hours: hours,
              sleep_quality: quality,
            };
            updateFormData(updated);

            if (isMorningCheckIn) {
              handleMorningSubmit(updated);
            } else {
              goToNextStep(updated);
            }
          }}
        />
      ),
    },
    {
      id: "stress",
      shouldShow: () => !isMorningCheckIn,
      component: (
        <QuestionScreen
          title="How did you feel?"
          subtitle="Think about how stressful your day was."
          options={STRESS_OPTIONS}
          illustration={<CalmVsChaoticIllustration />}
          selectedValue={formData.stress}
          onSelect={(val) => {
            updateFormData({ stress: val });
            goToNextStep({ ...formData, stress: val });
          }}
        />
      ),
    },
    {
      id: "activity_level",
      shouldShow: () => !isMorningCheckIn,
      component: (
        <QuestionScreen
          title="How active were you?"
          subtitle="Think about how active you were today."
          options={PHYSICAL_ACTIVITY_OPTIONS}
          illustration={<PhysicalActivityIllustration />}
          selectedValue={formData.physical_activity}
          onSelect={(val) => {
            updateFormData({ physical_activity: val });
            goToNextStep({ ...formData, physical_activity: val });
          }}
          onSkip={() => {
            updateFormData({ physical_activity: null });
            goToNextStep({ ...formData, physical_activity: null });
          }}
        />
      ),
    },
    {
      id: "activity_time",
      shouldShow: (data) => !isMorningCheckIn && data.physical_activity > 0,
      component: (
        <QuestionScreen
          title="When did you exercise?"
          subtitle="Timing matters for your energy levels."
          options={ACTIVITY_TIME_OPTIONS}
          illustration={<PhysicalActivityIllustration variant="time" />}
          selectedValue={formData.activity_time}
          onSelect={(val) => {
            updateFormData({ activity_time: val });
            goToNextStep({ ...formData, activity_time: val });
          }}
          onSkip={() => {
            updateFormData({ activity_time: null });
            goToNextStep({ ...formData, activity_time: null });
          }}
        />
      ),
    },
    {
      id: "screen_time",
      shouldShow: () => !isMorningCheckIn,
      component: (
        <ScreenTimeSlider
          initialValue={formData.screen_time}
          onComplete={(val) => {
            updateFormData({ screen_time: val });
            goToNextStep({ ...formData, screen_time: val });
          }}
          onSkip={() => {
            updateFormData({ screen_time: null });
            goToNextStep({ ...formData, screen_time: null });
          }}
        />
      ),
    },
    {
      id: "diet",
      shouldShow: () => !isMorningCheckIn,
      component: (
        <QuestionScreen
          title="How would you rate your diet today?"
          subtitle="Rate the overall quality of your meals and snacks."
          options={DIET_QUALITY_OPTIONS}
          illustration={<DietQualityIllustration />}
          selectedValue={formData.diet_quality}
          onSelect={(val) => {
            updateFormData({ diet_quality: val });
            goToNextStep({ ...formData, diet_quality: val });
          }}
          onSkip={() => {
            updateFormData({ diet_quality: null });
            goToNextStep({ ...formData, diet_quality: null });
          }}
        />
      ),
    },
    {
      id: "social",
      shouldShow: () => !isMorningCheckIn,
      component: (
        <SocialInteractionsSlider
          initialValue={formData.social_interaction}
          onComplete={(val) => {
            updateFormData({ social_interaction: val });
            goToNextStep({ ...formData, social_interaction: val });
          }}
          onSkip={() => {
            updateFormData({ social_interaction: null });
            goToNextStep({ ...formData, social_interaction: null });
          }}
        />
      ),
    },
    {
      id: "tags",
      shouldShow: () => !isMorningCheckIn,
      component: (
        <ContextTagsScreen
          initialTags={formData.tags}
          onComplete={(val) => {
            updateFormData({ tags: val });
            goToNextStep({ ...formData, tags: val });
          }}
          onSkip={() => {
            updateFormData({ tags: [] });
            goToNextStep({ ...formData, tags: [] });
          }}
        />
      ),
    },
    {
      id: "notes",
      shouldShow: () => !isMorningCheckIn,
      component: (
        <Notes
          initialValue={formData.notes}
          onComplete={(val) => {
            const updated = { ...formData, notes: val };
            updateFormData(updated);
            handleFinalSubmit(updated);
          }}
        />
      ),
    },
  ];

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading log data...</div>
        </div>
      </div>
    );
  }

  if (matchResults) {
    return <BlueprintSuccess matches={matchResults} navigate={navigate} />;
  }

  if (showSuccess && prediction) {
    return <PredictionSuccess prediction={prediction} navigate={navigate} />;
  }

  const currentStepConfig = FLOW_CONFIG[currentStepIndex];

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col overflow-hidden relative p-4">
      {showSuccess ? (
        <ShowLogSuccess />
      ) : (
        <>
          <div className="flex items-center justify-between min-h-[40px]">
            <div className="w-10">
              <LogBackButton
                isMorningCheckIn={isMorningCheckIn}
                currentStep={currentStepIndex + 1} // +1 for display
                loading={loading}
                setCurrentStep={() => goToPrevStep()}
              />
            </div>

            <div className="w-10 flex justify-end">
              {!isEditMode && <ExitButton navigate={navigate} />}
              {isEditMode && <CancelButton navigate={navigate} />}
            </div>
          </div>

          <div className="mt-2 w-full">
            {isEditMode && <EditModeIndicator formData={formData} />}
            <ProgressBar
              currentStep={currentStepIndex + 1}
              totalSteps={
                FLOW_CONFIG.filter((s) => s.shouldShow(formData)).length
              }
            />
          </div>

          <div className="flex-1 w-full min-h-0 flex flex-col relative pb-[env(safe-area-inset-bottom)]">
            {currentStepConfig ? (
              currentStepConfig.component
            ) : (
              <div>Error: Unknown Step</div>
            )}
          </div>
        </>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
            <div className="text-xl font-semibold">Saving your log...</div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 left-4 right-4 bg-red-50 border-2 border-red-500 rounded-lg p-4 shadow-lg z-50">
          <div className="font-semibold text-red-900">Error</div>
          <div className="text-red-700">{error}</div>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-red-600 underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default LogEntry;
