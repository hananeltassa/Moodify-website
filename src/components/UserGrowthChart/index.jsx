import React, { useContext } from "react";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { chartsGridClasses } from "@mui/x-charts/ChartsGrid";
import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";

const UserGrowthChart = ({ data }) => {
  const { mode } = useContext(ThemeContext);

  const chartSetting = {
    yAxis: [{ label: "User Growth (Count)" }],
    height: 300,
  };

  return (
    <Card
      sx={{
        backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
        p: 2,
        borderRadius: 2,
        boxShadow:
          mode === "dark"
            ? "0 4px 10px rgba(0, 0, 0, 0.8)"
            : "0 4px 10px rgba(0, 0, 0, 0.3)",
        color: mode === "dark" ? "#ffffff" : "#000000",
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: "left",
            color: mode === "dark" ? "#ffffff" : "#000000",
          }}
        >
          User Growth Over Time
        </Typography>

        {/* Bar Chart */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 350,
          }}
        >
          {data && data.length > 0 ? (
            <BarChart
              dataset={data}
              xAxis={[
                { scaleType: "band", dataKey: "month", label: "Month" },
              ]}
              series={[
                {
                  dataKey: "rainfall",
                  label: "User Growth",
                  valueFormatter: (value) => `${value} users`,
                  color: mode === "dark" ? "#90caf9" : "#1976d2",
                },
              ]}
              grid={{ horizontal: true, vertical: true }}
              sx={{
                [`& .${axisClasses.left} .${axisClasses.label}`]: {
                  transform: "translateX(-10px)",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: mode === "dark" ? "#ffffff" : "#555",
                },
                [`& .${axisClasses.bottom} .${axisClasses.label}`]: {
                  transform: "translateY(10px)",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: mode === "dark" ? "#ffffff" : "#555",
                },
                [`& .${chartsGridClasses.line}`]: {
                  strokeDasharray: "4 4",
                  strokeWidth: 1.5,
                  stroke: mode === "dark" ? "#424242" : "#e0e0e0",
                },
              }}
              {...chartSetting}
            />
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: mode === "dark" ? "rgba(255,255,255,0.7)" : "text.secondary",
              }}
            >
              No data available
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserGrowthChart;