import React, { useContext } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography, Paper } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext

const MoodBarChart = ({ data = [], title = "Mood Distribution", width = 500, height = 300, ...props }) => {
  const { mode } = useContext(ThemeContext); // Access mode from ThemeContext

  const isDarkMode = mode === "dark";

  if (!data || data.length === 0) {
    return (
      <Paper
        elevation={isDarkMode ? 3 : 1}
        sx={{
          width: "100%",
          textAlign: "center",
          padding: 2,
          borderRadius: 2,
          border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          backgroundColor: isDarkMode ? "#1e1e1e" : "#f9f9f9",
        }}
      >
        <Typography variant="h6" color={isDarkMode ? "text.secondary" : "text.primary"}>
          No data available
        </Typography>
      </Paper>
    );
  }

  const xAxisData = data.map((item) => item.mood); 
  const yAxisData = data.map((item) => item.total);

  return (
    <Paper
      elevation={isDarkMode ? 3 : 1}
      sx={{
        width: "100%",
        padding: 3,
        borderRadius: 2,
        border: isDarkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
        backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
        color: isDarkMode ? "#FF6100" : "#FF6100",
      }}
      {...props}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 1,
          textAlign: "left",
          color: isDarkMode ? "#ffffff" : "#000000",
        }}
      >
        {title}
      </Typography>

      {/* Bar Chart */}
      <Box sx={{ display: "flex", justifyContent: "center", height: height }}>
        <BarChart
          width={width}
          height={height}
          xAxis={[
            {
              data: xAxisData,
              scaleType: "band",
              labelStyle: { fill: isDarkMode ? "#ffffff" : "#000000" },
            },
          ]}
          series={[
            {
              data: yAxisData,
              label: "Mood Count",
              color: isDarkMode ? "#90caf9" : "#1976d2",
            },
          ]}
          yAxis={[
            {
              label: "Count",
              labelStyle: { fill: isDarkMode ? "#ffffff" : "#000000" },
            },
          ]}
        />
      </Box>
    </Paper>
  );
};

export default MoodBarChart;
