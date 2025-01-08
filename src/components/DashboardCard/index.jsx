import React, { useContext } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";

const DashboardCard = ({ title, value, icon, growth }) => {
  const { mode } = useContext(ThemeContext);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 2,
        boxShadow: mode === "dark" ? "0px 4px 10px rgba(0,0,0,0.4)" : "0px 4px 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        height: "150px",
        backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
        },
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
        {/* Icon and Growth Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              fontSize: 32,
              color: mode === "dark" ? "#ffffff" : "#000000",
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              color: growth > 0 ? "#4caf50" : "#f44336",
              fontWeight: "bold",
            }}
          >
            {growth > 0 ? `+${growth}%` : `${growth}%`}
          </Typography>
        </Box>

        {/* Title and Value Section */}
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: mode === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
              textTransform: "uppercase",
              fontSize: "12px",
              marginBottom: "4px",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: mode === "dark" ? "#ffffff" : "#000000",
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