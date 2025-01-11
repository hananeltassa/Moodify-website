import PersonIcon from "@mui/icons-material/Person";
import MoodIcon from "@mui/icons-material/Mood";
import ChallengeIcon from "@mui/icons-material/EmojiEvents";

const calculateGrowth = (current, previous) => {
  if (!previous || previous <= 0) {
    return current > 0 ? "100.00" : "0.00";
  }

  let growth = (((current - previous) / previous) * 100).toFixed(2);

  growth = Math.max(-100, Math.min(100, growth));

  return growth > 0 ? `${growth}` : `${growth}`;
};

const cardData = (analytics) => [
  {
    title: "Total Users",
    value: analytics.users.total,
    icon: <PersonIcon fontSize="large" />,
    growth: calculateGrowth(analytics.users.total, analytics.users.previous_total),
  },
  {
    title: "Banned Users",
    value: analytics.users.banned,
    icon: <PersonIcon fontSize="large" />,
    growth: calculateGrowth(analytics.users.banned, analytics.users.previous_banned),
  },
  {
    title: "Spotify Connected",
    value: analytics.users.spotify_connected,
    icon: <MoodIcon fontSize="large" />,
    growth: calculateGrowth(
      analytics.users.spotify_connected,
      analytics.users.previous_spotify_connected
    ),
  },
  {
    title: "Total Challenges",
    value: analytics.challenges.total,
    icon: <ChallengeIcon fontSize="large" />,
    growth: calculateGrowth(
      analytics.challenges.total,
      analytics.challenges.previous_total
    ),
  },
  {
    title: "Completed Challenges",
    value: analytics.challenges.completed,
    icon: <ChallengeIcon fontSize="large" />,
    growth: calculateGrowth(
      analytics.challenges.completed,
      analytics.challenges.previous_completed
    ),
  },
  {
    title: "Mood Detections",
    value: analytics.mood_detections.total,
    icon: <MoodIcon fontSize="large" />,
    growth: calculateGrowth(
      analytics.mood_detections.total,
      analytics.mood_detections.previous_total
    ),
  },
];

export default cardData;
