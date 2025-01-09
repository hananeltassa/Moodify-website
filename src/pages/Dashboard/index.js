import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashboardCard from "../../components/DashboardCard";
import ChartComponent from "../../components/ChartComponent";
import { Box, CircularProgress, Alert } from "@mui/material";
import { getSystemAnalytics } from "../../services/analyticsService";
import cardData from "../../utils/cardData";
import { prepareGenderData, prepareChallengeData } from "../../utils/analyticsUtils";

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const data = await getSystemAnalytics(token);
        setAnalytics(data.analytics);
      } catch (err) {
        setError(err.message || "Error fetching analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
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
          <ChartComponent data={challengeData} title="Challenges Overview" />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;