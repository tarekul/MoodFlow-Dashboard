import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalmVsChaoticIllustration from "../components/CalmVsChaoticIllustration";
import DietQualityIllustration from "../components/DietQualityIllustration";
import MoonIllustration from "../components/MoonIllustration";
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
  MOOD_OPTIONS,
  PHYSICAL_ACTIVITY_OPTIONS,
  PRODUCTIVITY_OPTIONS,
  STRESS_OPTIONS,
  WEATHER_OPTIONS,
} from "../utils/helpers";

import { logsAPI } from "../utils/api";

const LogEntry = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    log_date: new Date().toISOString().split("T")[0],
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

  const handleMoodSelect = (mood) => {
    setFormData({
      ...formData,
      mood,
    });
    setCurrentStep(currentStep + 1);
  };

  const handleProductivitySelect = (productivity) => {
    setFormData({ ...formData, productivity });
    setCurrentStep(3);
  };

  const handleSleepSelect = (hours, quality) => {
    setFormData({ ...formData, sleep_hours: hours, sleep_quality: quality });
    setCurrentStep(4);
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
      await logsAPI.createLog({
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
      });

      setLoading(false);
      setShowSuccess(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save log");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-between p-8">
      {/* Show success screen OR the regular flow */}
      {showSuccess ? (
        // Success Screen - takes over the whole page
        <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
          <div className="text-center">
            <div className="text-8xl mb-6">🎉</div>
            <h1 className="text-4xl font-serif mb-4 text-gray-900">
              Great job!
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Your day has been logged successfully
            </p>
            <div className="text-gray-400 text-sm">
              Redirecting to dashboard...
            </div>
          </div>
        </div>
      ) : (
        // Regular flow - all your steps
        <>
          {/* Back Button */}
          {currentStep > 1 && currentStep <= 10 && !loading && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-gray-600 hover:text-gray-900 z-50"
            >
              <span>←</span>
              <span>Back</span>
            </button>
          )}

          <ProgressBar currentStep={currentStep} />

          {currentStep === 1 && (
            <QuestionScreen
              title="It's a new day to track!"
              subtitle="Select the mood that best reflects how you feel at this moment."
              options={MOOD_OPTIONS}
              illustration={<MoonIllustration />}
              onSelect={handleMoodSelect}
            />
          )}

          {currentStep === 2 && (
            <QuestionScreen
              title="How productive were you?"
              subtitle="Think about what you accomplished today."
              options={PRODUCTIVITY_OPTIONS}
              illustration={<ProductivityIllustration />}
              onSelect={handleProductivitySelect}
            />
          )}

          {currentStep === 3 && <SleepScreen onComplete={handleSleepSelect} />}

          {currentStep === 4 && (
            <QuestionScreen
              title="How did you feel?"
              subtitle="Think about how stressful your day was."
              options={STRESS_OPTIONS}
              illustration={<CalmVsChaoticIllustration />}
              onSelect={handleStressSelect}
            />
          )}

          {currentStep === 5 && (
            <QuestionScreen
              title="How active were you?"
              subtitle="Think about how active you were today."
              options={PHYSICAL_ACTIVITY_OPTIONS}
              illustration={<PhysicalActivityIllustration />}
              onSelect={handlePhysicalActivitySelect}
              onSkip={() => {
                setFormData({ ...formData, physical_activity: null });
                setCurrentStep(6);
              }}
            />
          )}

          {currentStep === 6 && (
            <ScreenTimeSlider
              onComplete={handleScreenTimeSelect}
              onSkip={() => {
                setFormData({ ...formData, screen_time: null });
                setCurrentStep(7);
              }}
            />
          )}

          {currentStep === 7 && (
            <QuestionScreen
              title="How would you rate your diet today?"
              subtitle="Rate the overall quality of your meals and snacks — think about balance, portion sizes, and nutrients."
              options={DIET_QUALITY_OPTIONS}
              illustration={<DietQualityIllustration />}
              onSelect={handleDietQualitySelect}
              onSkip={() => {
                setFormData({ ...formData, diet_quality: null });
                setCurrentStep(8);
              }}
            />
          )}

          {currentStep === 8 && (
            <SocialInteractionsSlider
              onComplete={handleSocialInteractionSelect}
              onSkip={() => {
                setFormData({ ...formData, social_interaction: null });
                setCurrentStep(9);
              }}
            />
          )}

          {currentStep === 9 && (
            <QuestionScreen
              title="How was the weather?"
              subtitle="Look at the weather outside"
              options={WEATHER_OPTIONS}
              illustration={<WeatherIllustration />}
              onSelect={handleWeatherSelect}
              onSkip={() => {
                setFormData({ ...formData, weather: null });
                setCurrentStep(10);
              }}
            />
          )}

          {currentStep === 10 && <Notes onComplete={handleNotesSelect} />}
        </>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
            <div className="text-xl font-semibold">Saving your log...</div>
          </div>
        </div>
      )}

      {/* Error Message */}
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
