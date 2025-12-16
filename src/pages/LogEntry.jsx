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
import WeatherIllustration from "../components/WeatherIllustration";
import {
  DIET_QUALITY_OPTIONS,
  getLocalDateString,
  MOOD_OPTIONS,
  PHYSICAL_ACTIVITY_OPTIONS,
  PRODUCTIVITY_OPTIONS,
  STRESS_OPTIONS,
  WEATHER_OPTIONS,
} from "../utils/helpers";

import CancelButton from "../components/CancelButton";
import EditModeIndicator from "../components/EditModeIndicator";
import ExitButton from "../components/ExitButton";
import LogBackButton from "../components/LogBackButton";
import PredictionSuccess from "../components/PredictionSuccess";
import ShowLogSuccess from "../components/ShowLogSuccess";
import { analysisAPI, logsAPI } from "../utils/api";

const LogEntry = () => {
  const navigate = useNavigate();
  const { logId } = useParams();

  const isEditMode = Boolean(logId);

  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    log_date: getLocalDateString(),
    mood: null,
    productivity: null,
    sleep_hours: null,
    sleep_quality: null,
    stress: null,
    physical_activity: null,
    screen_time: null,
    diet_quality: null,
    social_interaction: null,
    weather: null,
    notes: null,
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
          screen_time: existingLog.screen_time_hours,
          diet_quality: existingLog.diet_quality,
          social_interaction: existingLog.social_interaction_hours,
          weather: existingLog.weather,
          notes: existingLog.notes,
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
      // UPDATE: Include mood in the morning payload
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

    // UPDATE: If morning, skip Productivity (Step 2) and go to Sleep (Step 3)
    if (isMorningCheckIn) {
      setCurrentStep(3);
    } else {
      setCurrentStep(currentStep + 1);
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
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStressSelect = (stress) => {
    setFormData({ ...formData, stress });
    setCurrentStep(5);
  };

  const handlePhysicalActivitySelect = (physical_activity) => {
    setFormData({ ...formData, physical_activity });
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

  const handleWeatherSelect = (weather) => {
    setFormData({ ...formData, weather });
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
        screen_time_hours: finalData.screen_time,
        diet_quality: finalData.diet_quality,
        social_interaction_hours: finalData.social_interaction,
        weather: finalData.weather,
        notes: finalData.notes,
      };

      if (isEditMode) {
        await logsAPI.updateLog(logId, payload);
      } else {
        await logsAPI.createLog(payload);
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

  // Custom "Prediction Success" Screen
  if (showSuccess && prediction) {
    return <PredictionSuccess prediction={prediction} navigate={navigate} />;
  }

  return (
    <div className="h-[100dvh] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-between p-4 relative">
      {/* Show success screen OR the regular flow */}
      {showSuccess ? (
        <ShowLogSuccess />
      ) : (
        <>
          {/* Back Button */}
          <LogBackButton
            isMorningCheckIn={isMorningCheckIn}
            currentStep={currentStep}
            loading={loading}
            // UPDATE: Custom setter to handle the jump back from Sleep (3) to Mood (1)
            setCurrentStep={(step) => {
              if (isMorningCheckIn && step === 2) {
                setCurrentStep(1);
              } else {
                setCurrentStep(step);
              }
            }}
          />
          {!isEditMode && <ExitButton navigate={navigate} />}
          {isEditMode && <CancelButton navigate={navigate} />}

          {/* Edit mode indicator */}
          {isEditMode && <EditModeIndicator formData={formData} />}
          <ProgressBar currentStep={currentStep} />

          {currentStep === 1 && (
            <QuestionScreen
              title={
                isMorningCheckIn ? "Good Morning!" : "It's a new day to track!"
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
              initialHours={formData.sleep_hours}
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
            <QuestionScreen
              title="How was the weather?"
              subtitle="Look at the weather outside"
              options={WEATHER_OPTIONS}
              illustration={<WeatherIllustration />}
              onSelect={handleWeatherSelect}
              selectedValue={formData.weather}
              onSkip={() => {
                setFormData({ ...formData, weather: null });
                setCurrentStep(10);
              }}
            />
          )}
          {currentStep === 10 && !isMorningCheckIn && (
            <Notes
              onComplete={handleNotesSelect}
              initialValue={formData.notes}
            />
          )}
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
