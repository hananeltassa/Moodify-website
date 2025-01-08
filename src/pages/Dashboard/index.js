import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashboardCard from "../../components/DashboardCard";
import ChartComponent from "../../components/ChartComponent";
import { Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";

const Dashboard = () => {
  const cards = [
    {
      title: "Total Users",
      value: "714k",
      icon: <PersonIcon fontSize="large" />,
      growth: 2.6,
      growthColor: "rgba(135,206,250,0.2)", // Light blue
    },
    {
      title: "New Users",
      value: "1.35m",
      icon: <PersonIcon fontSize="large" />,
      growth: -0.1,
      growthColor: "rgba(216,191,216,0.2)", // Light purple
    },
    {
      title: "Purchase Orders",
      value: "1.72m",
      icon: <ShoppingCartIcon fontSize="large" />,
      growth: 2.8,
      growthColor: "rgba(255,239,179,0.4)", // Light yellow
    },
    {
      title: "Messages",
      value: "234",
      icon: <MessageIcon fontSize="large" />,
      growth: 3.6,
      growthColor: "rgba(255,182,193,0.3)", // Light red
    },
  ];

  const visitsData = [
    { id: "America", value: 43.8, color: "#3b82f6" },
    { id: "Asia", value: 31.3, color: "#f59e0b" },
    { id: "Europe", value: 18.8, color: "#8b5cf6" },
    { id: "Africa", value: 6.3, color: "#f43f5e" },
  ];

  const genderData = [
    { id: "Male", value: 60, color: "#3b82f6" },
    { id: "Female", value: 35, color: "#f43f5e" },
    { id: "Other", value: 5, color: "#f59e0b" },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        {/* Cards Container */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 3, // Spacing between cards
          }}
        >
          {cards.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              growth={card.growth}
              growthColor={card.growthColor}
            />
          ))}
        </Box>

        {/* Charts Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            },
            gap: 3,
            mt: 3,
          }}
        >
          <ChartComponent data={visitsData} title="Visits by Region" />
          <ChartComponent data={genderData} title="Gender Distribution" />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;