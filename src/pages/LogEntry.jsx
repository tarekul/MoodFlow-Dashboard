import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalmVsChaoticIllustration from "../components/CalmVsChaoticIllustration";
import DietQualityIllustration from "../components/DietQualityIllustration";
import MoonIllustration from "../components/MoonIllustration";
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

const LogEntry = () => {
  const navigation = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-between p-8">
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
        />
      )}

      {currentStep === 6 && (
        <ScreenTimeSlider onComplete={handleScreenTimeSelect} />
      )}

      {currentStep === 7 && (
        <QuestionScreen
          title="How would you rate your diet today?"
          subtitle="Rate the overall quality of your meals and snacks — think about balance, portion sizes, and nutrients."
          options={DIET_QUALITY_OPTIONS}
          illustration={<DietQualityIllustration />}
          onSelect={handleDietQualitySelect}
        />
      )}

      {currentStep === 8 && (
        <SocialInteractionsSlider onComplete={handleSocialInteractionSelect} />
      )}

      {currentStep === 9 && (
        <QuestionScreen
          title="How was the weather?"
          subtitle="Look at the weather outside"
          options={WEATHER_OPTIONS}
          illustration={<WeatherIllustration />}
          onSelect={handleWeatherSelect}
        />
      )}
    </div>
  );
};

export default LogEntry;
