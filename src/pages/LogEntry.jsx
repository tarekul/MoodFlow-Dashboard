import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CombinedActivityScreen from "../components/CombinedActivityScreen";
import DietQualityIllustration from "../components/DietQualityIllustration";
import FinalDetailsScreen from "../components/FinalDetailsScreen";
import MoodStressScreen from "../components/MoodStressScreen";
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
import EditModeIndicator from "../components/EditModeIndicator";
import ExitButton from "../components/ExitButton";
import LogBackButton from "../components/LogBackButton";
import PredictionSuccess from "../components/PredictionSuccess";
import SaveAction from "../components/SaveAction";
import ShowLogSuccess from "../components/ShowLogSuccess";
import { analysisAPI, logsAPI } from "../utils/api";
import { checkBlueprintMatch } from "../utils/gamification";

const LogEntry = () => {
  const navigate = useNavigate();
  const { logId } = useParams();
  const isEditMode = Boolean(logId);

  // --- STATE ---
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [matchResults, setMatchResults] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isMorningCheckIn, setIsMorningCheckIn] = useState(false);

  const [formData, setFormData] = useState({
    log_date: getLocalDateString(),
    mood: null,
    productivity: null,
    sleep_hours: null,
    sleep_bed_time: null,
    sleep_wake_time: null,
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
    const initializeLog = async () => {
      setInitialLoading(true);
      try {
        const today = getLocalDateString();
        const logs = await logsAPI.getMyLogs();

        if (isEditMode) {
          const existingLog = logs.find((log) => log.id === parseInt(logId));
          if (existingLog) {
            populateFormData(existingLog);
          } else {
            setError("Log not found");
          }
        } else {
          const existingTodayLog = logs.find((l) => l.log_date === today);

          if (existingTodayLog) {
            navigate(`/log/${existingTodayLog.id}`, { replace: true });
            return;
          }

          const hour = new Date().getHours();
          if (hour >= 5 && hour < 12) {
            setIsMorningCheckIn(true);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to initialize log");
      } finally {
        setInitialLoading(false);
      }
    };

    initializeLog();
  }, [logId, isEditMode, navigate]);

  const populateFormData = (existingLog) => {
    setFormData({
      log_date: existingLog.log_date,
      mood: existingLog.mood,
      productivity: existingLog.productivity,
      sleep_hours: existingLog.sleep_hours,
      sleep_quality: existingLog.sleep_quality,
      sleep_bed_time: existingLog.sleep_bed_time,
      sleep_wake_time: existingLog.sleep_wake_time,
      stress: existingLog.stress,
      physical_activity: existingLog.physical_activity_min,
      activity_time: existingLog.activity_time,
      screen_time: existingLog.screen_time_hours,
      diet_quality: existingLog.diet_quality,
      social_interaction: existingLog.social_interaction_hours,
      notes: existingLog.notes,
      tags: existingLog.tags || [],
    });
  };

  // --- HELPERS ---
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

  const handleEarlySave = () => {
    handleFinalSubmit(formData);
  };

  // --- API ---
  const handleMorningSubmit = async (finalData) => {
    setLoading(true);
    try {
      const payload = {
        log_date: finalData.log_date,
        mood: finalData.mood,
        stress: finalData.stress,
        sleep_hours: finalData.sleep_hours,
        sleep_quality: finalData.sleep_quality,
      };

      await logsAPI.createLog(payload);

      // Prediction Logic
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
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async (finalData) => {
    setLoading(true);
    try {
      const payload = {
        log_date: finalData.log_date,
        mood: finalData.mood,
        productivity: finalData.productivity,
        sleep_hours: finalData.sleep_hours,
        sleep_quality: finalData.sleep_quality,
        sleep_bed_time: finalData.sleep_bed_time,
        sleep_wake_time: finalData.sleep_wake_time,
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

  // --- CONFIG ---
  const FLOW_CONFIG = [
    {
      id: "mood_stress",
      shouldShow: () => true,
      component: (
        <MoodStressScreen
          mood={formData.mood}
          stress={formData.stress}
          moodOptions={MOOD_OPTIONS}
          stressOptions={STRESS_OPTIONS}
          onUpdate={updateFormData}
          onNext={() => goToNextStep()}
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
            goToNextStep();
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
          initialBedTime={formData.sleep_bed_time}
          initialWakeTime={formData.sleep_wake_time}
          onComplete={(hours, quality, bedTime, wakeTime) => {
            const updated = {
              ...formData,
              sleep_hours: hours,
              sleep_quality: quality,
              sleep_bed_time: bedTime,
              sleep_wake_time: wakeTime,
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
      id: "activity_combined",
      shouldShow: () => !isMorningCheckIn,
      component: (
        <CombinedActivityScreen
          activityLevel={formData.physical_activity}
          activityTime={formData.activity_time}
          levelOptions={PHYSICAL_ACTIVITY_OPTIONS}
          timeOptions={ACTIVITY_TIME_OPTIONS}
          onUpdate={updateFormData}
          onNext={() => goToNextStep()}
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
            goToNextStep();
          }}
          onSkip={() => {
            updateFormData({ screen_time: null });
            goToNextStep();
          }}
        />
      ),
    },
    {
      id: "diet",
      shouldShow: () => !isMorningCheckIn,
      component: (
        <QuestionScreen
          title="How would you rate your diet?"
          subtitle="Rate the overall quality of your meals."
          options={DIET_QUALITY_OPTIONS}
          illustration={<DietQualityIllustration />}
          selectedValue={formData.diet_quality}
          onSelect={(val) => {
            updateFormData({ diet_quality: val });
            goToNextStep();
          }}
          onSkip={() => {
            updateFormData({ diet_quality: null });
            goToNextStep();
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
            goToNextStep();
          }}
          onSkip={() => {
            updateFormData({ social_interaction: null });
            goToNextStep();
          }}
        />
      ),
    },
    {
      id: "details",
      shouldShow: () => !isMorningCheckIn,
      component: (
        <FinalDetailsScreen
          tags={formData.tags}
          notes={formData.notes}
          loading={loading}
          onUpdate={updateFormData}
          onSubmit={(details) => {
            const updated = { ...formData, ...details };
            handleFinalSubmit(updated);
          }}
        />
      ),
    },
  ];

  // --- RENDER ---
  if (initialLoading)
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/50 flex flex-col items-center gap-6 max-w-xs w-full">
          {/* Custom Spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {isEditMode ? "Loading Entry..." : "Setting up..."}
            </h3>
            <p className="text-sm text-gray-500 font-medium animate-pulse">
              Getting your data ready
            </p>
          </div>
        </div>
      </div>
    );
  if (matchResults)
    return <BlueprintSuccess matches={matchResults} navigate={navigate} />;
  if (showSuccess && prediction)
    return <PredictionSuccess prediction={prediction} navigate={navigate} />;

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
                currentStep={currentStepIndex + 1}
                loading={loading}
                setCurrentStep={() => goToPrevStep()}
              />
            </div>
            <div className="flex justify-end">
              {isEditMode ? (
                <SaveAction
                  onSave={handleEarlySave}
                  loading={loading}
                  disabled={loading}
                />
              ) : (
                <ExitButton navigate={navigate} />
              )}
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
    </div>
  );
};

export default LogEntry;
