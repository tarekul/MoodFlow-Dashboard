/**
 * Checks if the current log matches the Perfect Day DNA
 * Returns an array of "wins" (matched factors)
 */

export const checkBlueprintMatch = (logEntry, blueprint) => {
  if (!blueprint) return [];

  const matches = [];

  // 1. SLEEP: Match if within +/- 45 mins of target
  const sleepDiff = Math.abs(logEntry.sleep_hours - blueprint.sleep);
  if (sleepDiff <= 0.75) {
    matches.push({
      id: "sleep",
      label: "Sleep Target",
      value: `${logEntry.sleep_hours}h`,
      icon: "Moon",
    });
  }

  // 2. ACTIVITY: Match if >= Target (minus 10min buffer)
  const activity = logEntry.physical_activity || 0;
  if (activity >= blueprint.activity - 10) {
    matches.push({
      id: "activity",
      label: "Activity Goal",
      value: `${activity} min`,
      icon: "Dumbbell",
    });
  }

  // 3. SCREEN TIME: Match if <= Target (plus 30min buffer)
  const screens = logEntry.screen_time || 0;
  if (screens <= blueprint.screen_limit + 0.5) {
    matches.push({
      id: "screen",
      label: "Screen Limit",
      value: `${screens}h`,
      icon: "Smartphone",
    });
  }

  // 4. SOCIAL: Match if >= Target (minus 30min buffer)
  const social = logEntry.social_interaction || 0;
  const targetSocial = blueprint.social_hours || 0;
  if (social >= targetSocial - 0.5) {
    matches.push({
      id: "social",
      label: "Social Time",
      value: `${social}h`,
      icon: "Users",
    });
  }

  return matches;
};
