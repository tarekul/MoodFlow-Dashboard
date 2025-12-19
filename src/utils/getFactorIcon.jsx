import {
  Activity,
  Clock,
  CloudSun,
  Dumbbell,
  Moon,
  Smartphone,
  Smile,
  Users,
  ZapOff,
} from "lucide-react";
import React from "react";

export const getFactorIcon = (factorName) => {
  if (!factorName) return <Activity size={24} strokeWidth={2} />;

  const key = factorName
    .toLowerCase()
    .replace(" hours", "")
    .replace(" min", "")
    .trim();

  const iconProps = { size: 24, strokeWidth: 2 };

  const iconMap = {
    stress: <ZapOff {...iconProps} />,
    "physical activity": <Dumbbell {...iconProps} />,
    "screen time": <Smartphone {...iconProps} />,
    sleep: <Moon {...iconProps} />,
    mood: <Smile {...iconProps} />,
    "social interaction": <Users {...iconProps} />,
    weather: <CloudSun {...iconProps} />,
    "activity time": <Clock {...iconProps} />,
    "morning workout": <Dumbbell {...iconProps} />,
    "afternoon workout": <Dumbbell {...iconProps} />,
    "evening workout": <Dumbbell {...iconProps} />,
  };

  return iconMap[key] || <Activity {...iconProps} />;
};
