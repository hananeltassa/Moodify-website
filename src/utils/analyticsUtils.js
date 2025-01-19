export const prepareGenderData = (genderAnalytics) => {
    const { male = 0, female = 0, prefer_not_to_say = 0 } = genderAnalytics || {};
    const total = male + female + prefer_not_to_say;
  
    if (total === 0) {
      return [
        { id: "Male", value: 0, color: "#3b82f6" },
        { id: "Female", value: 0, color: "#f43f5e" },
        { id: "Prefer Not to Say", value: 0, color: "#f59e0b" },
      ];
    }
  
    return [
      { id: "Male", value: (male / total) * 100, color: "#3b82f6" },
      { id: "Female", value: (female / total) * 100, color: "#f43f5e" },
      { id: "Prefer Not to Say", value: (prefer_not_to_say / total) * 100, color: "#f59e0b" },
    ];
};
  
export const prepareChallengeData = (challengeAnalytics) => [
    {
      id: "Total Challenges",
      value: challengeAnalytics.total,
      color: "#3b82f6",
    },
    {
      id: "Completed Challenges",
      value: challengeAnalytics.completed,
      color: "#10b981",
    },
];
  