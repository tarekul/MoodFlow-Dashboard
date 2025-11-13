import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalmVsChaoticIllustration from "../components/CalmVsChaoticIllustration";
import MoonIllustration from "../components/MoonIllustration";
import PhysicalActivityIllustration from "../components/PhysicalActivityIllustration";
import ProductivityIllustration from "../components/ProductivityIllustration";
import ProgressBar from "../components/ProgressBar";
import QuestionScreen from "../components/QuestionScreen";
import SleepScreen from "../components/SleepScreen";
import {
  MOOD_OPTIONS,
  PHYSICAL_ACTIVITY_OPTIONS,
  PRODUCTIVITY_OPTIONS,
  STRESS_OPTIONS,
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
    </div>
  );
};

export default LogEntry;
