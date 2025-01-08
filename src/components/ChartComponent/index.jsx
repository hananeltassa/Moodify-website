import React, { useContext } from "react";
import { PieChart } from "@mui/x-charts";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import { ThemeContext } from "../../context/ThemeContext";

const ChartComponent = ({ data = [], title }) => {
  const { mode } = useContext(ThemeContext);

  if (!Array.isArray(data)) {
    console.error("Invalid data provided to ChartComponent. Expected an array.");
    data = [];
  }

  return (
    <Card
      sx={{
        backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
        p: 2,
        borderRadius: 2,
        boxShadow: mode === "dark" ? "0 4px 10px rgba(0, 0, 0, 0.7)" : "0 4px 10px rgba(0, 0, 0, 0.1)",
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
          {title}
        </Typography>

        {/* Centered Pie Chart */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
          }}
        >
          {data.length > 0 ? (
            <PieChart
              series={[{ data }]}
              width={300}
              height={300}
              sx={{
                "& .pie-chart-label": {
                  fill: mode === "dark" ? "#ffffff" : "#000000",
                },
              }}
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

        {/* Custom Legend */}
        {data.length > 0 && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            mt={3}
          >
            {data.map((item) => (
              <Box key={item.id} sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    mr: 1,
                  }}
                ></Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: mode === "dark" ? "#ffffff" : "#000000",
                  }}
                >
                  {item.id}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartComponent;