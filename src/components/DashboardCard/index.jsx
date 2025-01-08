import React, { useContext } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";

const DashboardCard = ({ title, value, icon, growth, growthColor }) => {
  const { mode } = useContext(ThemeContext);

  return (
    <Card
      sx={{
        background: mode === "dark"
          ? `linear-gradient(to right, #333, ${growthColor})`
          : `linear-gradient(to right, #fff, ${growthColor})`,
        boxShadow: mode === "dark" ? "0px 4px 10px rgba(0,0,0,0.4)" : "0px 4px 10px rgba(0,0,0,0.1)",
        borderRadius: 3,
        width: "100%",
        height: "150px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Icon */}
          <Box sx={{ fontSize: 30, color: mode === "dark" ? "#fff" : "#000" }}>{icon}</Box>

          {/* Growth */}
          <Typography
            variant="subtitle2"
            sx={{
              color: growth > 0 ? "green" : "red",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {growth > 0 ? `+${growth}%` : `${growth}%`}
          </Typography>
        </Box>

        {/* Title and Value */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: mode === "dark" ? "rgba(255,255,255,0.7)" : "text.secondary",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: mode === "dark" ? "#fff" : "#000",
            }}
          >
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;