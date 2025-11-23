// Calculate consecutive days streak
const calculateStreak = (logs) => {
  if (!logs || logs.length === 0) return 0;

  // Sort logs by date (newest first)
  const sortedLogs = [...logs].sort((a, b) => 
    new Date(b.log_date) - new Date(a.log_date)
  );

  // Get today's date (without time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get yesterday's date
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Parse the most recent log date
  const [year, month, day] = sortedLogs[0].log_date.split('-').map(Number);
  const mostRecentLog = new Date(year, month - 1, day);

  // Check if streak is still active (logged today or yesterday)
  const isStreakActive = 
    mostRecentLog.getTime() === today.getTime() || 
    mostRecentLog.getTime() === yesterday.getTime();

  if (!isStreakActive) return 0;

  // Count consecutive days
  let streak = 1;
  for (let i = 0; i < sortedLogs.length - 1; i++) {
    const [currYear, currMonth, currDay] = sortedLogs[i].log_date.split('-').map(Number);
    const [nextYear, nextMonth, nextDay] = sortedLogs[i + 1].log_date.split('-').map(Number);
    
    const currentDate = new Date(currYear, currMonth - 1, currDay);
    const nextDate = new Date(nextYear, nextMonth - 1, nextDay);

    // Calculate difference in days
    const diffTime = currentDate.getTime() - nextDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
    } else {
      break; // Streak broken
    }
  }

  return streak;
};
