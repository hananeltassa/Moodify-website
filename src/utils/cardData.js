import PersonIcon from "@mui/icons-material/Person";
import MoodIcon from "@mui/icons-material/Mood";
import ChallengeIcon from "@mui/icons-material/EmojiEvents";

const cardData = (analytics) => [
  {
    title: "Total Users",
    value: analytics.users.total,
    icon: <PersonIcon fontSize="large" />,
    growth: 2.6,
  },
  {
    title: "Banned Users",
    value: analytics.users.banned,
    icon: <PersonIcon fontSize="large" />,
    growth: -0.1,
  },
  {
    title: "Spotify Connected",
    value: analytics.users.spotify_connected,
    icon: <MoodIcon fontSize="large" />,
    growth: 3.2,
  },
  {
    title: "Total Challenges",
    value: analytics.challenges.total,
    icon: <ChallengeIcon fontSize="large" />,
    growth: 1.8,
  },
  {
    title: "Completed Challenges",
    value: analytics.challenges.completed,
    icon: <ChallengeIcon fontSize="large" />,
    growth: 4.5,
  },
  {
    title: "Mood Detections",
    value: analytics.mood_detections.total,
    icon: <MoodIcon fontSize="large" />,
    growth: 2.1,
  },
];

export default cardData;