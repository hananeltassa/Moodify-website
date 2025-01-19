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
        borderRadius: "5px",
        height: "160px",
        background: mode === "dark"
          ? "linear-gradient(135deg, #1e1e1e, #2b2b2b)"
          : "linear-gradient(135deg, #ffffff, #f9f9f9)",
        border: mode === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", 
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
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
            marginBottom: "8px",
          }}
        >
          {/* Icon Section */}
          <Box
            sx={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              color: mode === "dark" ? "primary.main" : "primary.main",
              fontSize: "32px",
            }}
          >
            {icon}
          </Box>

          {/* Growth Section */}
          <Typography
            variant="subtitle2"
            sx={{
              color: growth > 0 ? "#4caf50" : "#f44336",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "14px",
            }}
          >
            {growth > 0 ? `▲ +${growth}%` : `▼ ${growth}%`}
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
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
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
