import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashboardCard from "../../components/DashboardCard";
import ChartComponent from "../../components/ChartComponent";
import MoodBarChart from "../../components/MoodBarChart";
import { Box, CircularProgress, Alert } from "@mui/material";
import {
  getSystemAnalytics,
  fetchUserGrowthData,
  getMoodAndInputTypeStats,
} from "../../services/analyticsService";
import cardData from "../../utils/cardData";
import { prepareGenderData, prepareChallengeData } from "../../utils/analyticsUtils";
import UserGrowthChart from "../../components/UserGrowthChart";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [userGrowthData, setUserGrowthData] = useState(null);
  const [moodStats, setMoodStats] = useState(null); // For mood and input type stats
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const [analyticsData, growthData, moodStatsData] = await Promise.all([
          getSystemAnalytics(token),
          fetchUserGrowthData(token),
          getMoodAndInputTypeStats(token),
        ]);

        setAnalytics(analyticsData.analytics);
        setUserGrowthData(growthData);
        setMoodStats(moodStatsData); // Save mood and input type stats
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 3 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </DashboardLayout>
    );
  }

  const cards = cardData(analytics);
  const genderData = prepareGenderData(analytics.users.gender);
  const challengeData = prepareChallengeData(analytics.challenges);

  // Prepare data for the BarChart
  const barChartData = userGrowthData?.map((entry) => ({
    month: new Date(entry.date).toLocaleString("default", { month: "short" }),
    rainfall: parseInt(entry.user_count, 10),
  }));

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Cards Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gap: 3,
          }}
        >
          {cards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              growth={card.growth}
            />
          ))}
        </Box>

        {/* Charts Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
            },
            gap: 3,
            mt: 3,
          }}
        >
          <ChartComponent data={genderData} title="Gender Distribution" />
          <UserGrowthChart data={barChartData} />
          <ChartComponent data={challengeData} title="Challenges Overview" />
          
          <MoodBarChart data={moodStats?.moodCounts} />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
