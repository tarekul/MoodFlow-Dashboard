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

  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [matchResults, setMatchResults] = useState(null);
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

  const [isMorningCheckIn, setIsMorningCheckIn] = useState(false);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const hour = new Date().getHours();
    const isMorning = hour >= 5 && hour < 12;

    if (isMorning && !isEditMode) {
      setIsMorningCheckIn(true);
      setCurrentStep(1);
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

  const submitMorningLog = async (data) => {
    setLoading(true);
    try {
      const payload = {
        log_date: data.log_date,
        mood: data.mood,
        sleep_hours: data.sleep_hours,
        sleep_quality: data.sleep_quality,
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
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Failed to save morning log");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSelect = (mood) => {
    const updatedData = { ...formData, mood };
    setFormData(updatedData);

    if (isMorningCheckIn) {
      setCurrentStep(3);
    } else {
      setCurrentStep(2);
    }
  };

  const handleProductivitySelect = (productivity) => {
    setFormData({ ...formData, productivity });
    setCurrentStep(3);
  };

  const handleSleepSelect = (hours, quality) => {
    const updatedData = {
      ...formData,
      sleep_hours: hours,
      sleep_quality: quality,
    };
    setFormData(updatedData);

    if (isMorningCheckIn) {
      submitMorningLog(updatedData);
    } else {
      setCurrentStep(4);
    }
  };

  const handleStressSelect = (stress) => {
    setFormData({ ...formData, stress });
    setCurrentStep(5);
  };

  const handlePhysicalActivitySelect = (physical_activity) => {
    const updatedFormData = { ...formData, physical_activity };
    setFormData(updatedFormData);

    if (physical_activity === 0) {
      setCurrentStep(6);
    } else {
      setCurrentStep(5.5);
    }
  };

  const handleActivityTimeSelect = (activity_time) => {
    setFormData({ ...formData, activity_time });
    setCurrentStep(6);
  };

  const handleScreenTimeSelect = (screen_time) => {
    setFormData({ ...formData, screen_time });
    setCurrentStep(7);
  };

  const handleDietQualitySelect = (diet_quality) => {
    setFormData({ ...formData, diet_quality });
    setCurrentStep(8);
  };

  const handleSocialInteractionSelect = (social_interaction) => {
    setFormData({ ...formData, social_interaction });
    setCurrentStep(9);
  };

  const handleTagsSelect = (tags) => {
    setFormData({ ...formData, tags });
    setCurrentStep(10);
  };

  const handleNotesSelect = async (notes) => {
    const finalData = { ...formData, notes };
    setFormData(finalData);

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

      if (!isEditMode) {
        try {
          // Fetch analysis to get the blueprint
          const analysis = await analysisAPI.getAnalysis();

          if (analysis && analysis.perfect_day) {
            // Check for matches
            const matches = checkBlueprintMatch(
              finalData,
              analysis.perfect_day
            );

            // If they hit at least 3 targets, show the special screen!
            if (matches && matches.length >= 3) {
              setMatchResults(matches);
              setLoading(false);
              return; // Stop here, UI will render BlueprintSuccess
            }
          }
        } catch (e) {
          console.log("Could not fetch analysis for gamification", e);
          // Fail silently and proceed to normal success
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

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col overflow-hidden relative p-4">
      {/* Show success screen OR the regular flow */}
      {showSuccess ? (
        <ShowLogSuccess />
      ) : (
        <>
          <div className="flex items-center justify-between min-h-[40px]">
            <div className="w-10">
              <LogBackButton
                isMorningCheckIn={isMorningCheckIn}
                currentStep={currentStep}
                loading={loading}
                setCurrentStep={(step) => {
                  if (isMorningCheckIn && step === 2) {
                    setCurrentStep(1);
                  } else {
                    setCurrentStep(step);
                  }
                }}
              />
            </div>

            <div className="w-10 flex justify-end">
              {!isEditMode && <ExitButton navigate={navigate} />}
              {isEditMode && <CancelButton navigate={navigate} />}
            </div>
          </div>

          {/* Edit mode indicator */}
          <div className="mt-2 w-full">
            {isEditMode && <EditModeIndicator formData={formData} />}
            <ProgressBar currentStep={currentStep} />
          </div>

          <div className="flex-1 w-full min-h-0 flex flex-col relative pb-[env(safe-area-inset-bottom)]">
            {currentStep === 1 && (
              <QuestionScreen
                title={
                  isMorningCheckIn
                    ? "Good Morning!"
                    : "It's a new day to track!"
                }
                subtitle="Select the mood that best reflects how you feel at this moment."
                options={MOOD_OPTIONS}
                illustration={<MoodIllustration />}
                onSelect={handleMoodSelect}
                selectedValue={formData.mood}
              />
            )}

            {/* Productivity only shows if NOT morning */}
            {currentStep === 2 && !isMorningCheckIn && (
              <QuestionScreen
                title="How productive were you?"
                subtitle="Think about what you accomplished today."
                options={PRODUCTIVITY_OPTIONS}
                illustration={<ProductivityIllustration />}
                onSelect={handleProductivitySelect}
                selectedValue={formData.productivity}
              />
            )}

            {currentStep === 3 && (
              <SleepScreen
                onComplete={handleSleepSelect}
                initialQuality={formData.sleep_quality}
              />
            )}

            {currentStep === 4 && !isMorningCheckIn && (
              <QuestionScreen
                title="How did you feel?"
                subtitle="Think about how stressful your day was."
                options={STRESS_OPTIONS}
                illustration={<CalmVsChaoticIllustration />}
                onSelect={handleStressSelect}
                selectedValue={formData.stress}
              />
            )}
            {currentStep === 5 && !isMorningCheckIn && (
              <QuestionScreen
                title="How active were you?"
                subtitle="Think about how active you were today."
                options={PHYSICAL_ACTIVITY_OPTIONS}
                illustration={<PhysicalActivityIllustration />}
                onSelect={handlePhysicalActivitySelect}
                selectedValue={formData.physical_activity}
                onSkip={() => {
                  setFormData({ ...formData, physical_activity: null });
                  setCurrentStep(6);
                }}
              />
            )}

            {currentStep === 5.5 && !isMorningCheckIn && (
              <QuestionScreen
                title="When did you exercise?"
                subtitle="Timing matters for your energy levels."
                options={ACTIVITY_TIME_OPTIONS}
                illustration={<PhysicalActivityIllustration variant="time" />}
                onSelect={handleActivityTimeSelect}
                selectedValue={formData.activity_time}
                onSkip={() => {
                  setFormData({ ...formData, activity_time: null });
                  setCurrentStep(6);
                }}
              />
            )}

            {currentStep === 6 && !isMorningCheckIn && (
              <ScreenTimeSlider
                onComplete={handleScreenTimeSelect}
                onSkip={() => {
                  setFormData({ ...formData, screen_time: null });
                  setCurrentStep(7);
                }}
                initialValue={formData.screen_time}
              />
            )}
            {currentStep === 7 && !isMorningCheckIn && (
              <QuestionScreen
                title="How would you rate your diet today?"
                subtitle="Rate the overall quality of your meals and snacks — think about balance, portion sizes, and nutrients."
                options={DIET_QUALITY_OPTIONS}
                illustration={<DietQualityIllustration />}
                onSelect={handleDietQualitySelect}
                selectedValue={formData.diet_quality}
                onSkip={() => {
                  setFormData({ ...formData, diet_quality: null });
                  setCurrentStep(8);
                }}
              />
            )}
            {currentStep === 8 && !isMorningCheckIn && (
              <SocialInteractionsSlider
                onComplete={handleSocialInteractionSelect}
                onSkip={() => {
                  setFormData({ ...formData, social_interaction: null });
                  setCurrentStep(9);
                }}
                initialValue={formData.social_interaction}
              />
            )}

            {currentStep === 9 && !isMorningCheckIn && (
              <ContextTagsScreen
                onComplete={handleTagsSelect}
                initialTags={formData.tags}
                onSkip={() => {
                  setFormData({ ...formData, tags: [] });
                  setCurrentStep(11);
                }}
              />
            )}
            {currentStep === 10 && !isMorningCheckIn && (
              <Notes
                onComplete={handleNotesSelect}
                initialValue={formData.notes}
              />
            )}
          </div>
        </>
      )}

      {/* Loading & Error Overlays */}
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
